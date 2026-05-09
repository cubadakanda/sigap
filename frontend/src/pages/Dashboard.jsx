import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getReports, getReportsByStatus } from '../services/api';

// Memperbaiki masalah ikon marker default pada Leaflet di React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Kustom Icon untuk membedakan status di Peta (Opsional tapi keren)
const createCustomIcon = (status) => {
  let color = '#f59e0b'; // Pending (Kuning)
  if (status === 'Diproses') color = '#3b82f6'; // Diproses (Biru)
  if (status === 'Selesai') color = '#10b981'; // Selesai (Hijau)

  return new L.DivIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState(null); // State untuk layar penuh

  useEffect(() => {
    fetchReports(filter);
  }, [filter]);

  const fetchReports = async (status) => {
    try {
      setLoading(true);
      const response = status === 'Semua' ? await getReports() : await getReportsByStatus(status);
      const data = Array.isArray(response) ? response : response?.data || [];
      setReports(data);
    } catch (error) {
      console.error("Gagal memuat data:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = useMemo(() => {
    const normalized = searchQuery.toLowerCase();
    return reports.filter(report => {
      const nama = (report.pelapor_nama || report.nama || '').toLowerCase();
      const lokasi = (report.lokasi || '').toLowerCase();
      const kategori = (report.jenis_gangguan || report.kategori || '').toLowerCase();
      const matchSearch = nama.includes(normalized) || lokasi.includes(normalized) || kategori.includes(normalized);
      const matchFilter = filter === 'Semua' || report.status === filter;
      return matchSearch && matchFilter;
    });
  }, [reports, searchQuery, filter]);

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'pending') return 'bg-amber-400/20 text-amber-700 border-amber-400/30';
    if (s === 'diproses') return 'bg-blue-400/20 text-blue-700 border-blue-400/30';
    return 'bg-emerald-400/20 text-emerald-700 border-emerald-400/30';
  };

  const getStatusIcon = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'pending') return 'schedule';
    if (s === 'diproses') return 'autorenew';
    return 'check_circle';
  };

  const getCategoryIcon = (jenis) => {
    const j = (jenis || '').toLowerCase();
    if (j.includes('lampu')) return 'lightbulb';
    if (j.includes('saluran')) return 'water_drop';
    if (j.includes('trotoar')) return 'directions_walk';
    if (j.includes('galian')) return 'construction';
    return 'warning';
  };

  // Helper untuk mendapatkan gambar yang aman
  const getSafeImageUrl = (report) => {
    return report.image_url || report.imageUrl || report.foto || report.image || report.gambar || 'https://via.placeholder.com/400x300?text=Tidak+Ada+Gambar';
  };

  // Mengekstrak laporan yang memiliki koordinat valid untuk ditampilkan di peta
  const mapReports = filteredReports.filter(report => {
    // Memeriksa keberadaan kolom latitude dan longitude langsung
    if (report.latitude && report.longitude) return true;
    
    // Atau mencoba mengekstrak dari string lokasi (contoh: "Koordinat: -6.123, 106.123")
    if (report.lokasi && report.lokasi.includes(',')) {
      const parts = report.lokasi.replace('Koordinat: ', '').split(',');
      if (parts.length === 2 && !isNaN(parseFloat(parts[0])) && !isNaN(parseFloat(parts[1]))) {
        return true;
      }
    }
    return false;
  });

  return (
    <div className="bg-infrastructure text-on-surface min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 glass border-b border-white/20">
        <div className="text-2xl font-black tracking-tight text-sigap-blue cursor-pointer" onClick={() => navigate('/')}>SIGAP</div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-slate-600 hover:text-sigap-blue font-medium text-sm transition-colors duration-200 cursor-pointer" onClick={() => navigate('/')}>Beranda</a>
          <a className="text-slate-600 hover:text-sigap-blue font-medium text-sm transition-colors duration-200 cursor-pointer" onClick={() => navigate('/laporkan')}>Laporkan</a>
          <a className="text-sigap-blue border-b-2 border-sigap-blue pb-1 text-sm font-medium cursor-pointer">Dashboard</a>
        </nav>
        {localStorage.getItem('isOfficer') === 'true' ? (
          <button onClick={() => navigate('/manajemen')} className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-label-md text-label-md hover:bg-emerald-700 active:scale-95 transition-all">Dashboard Petugas</button>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-sigap-blue text-white px-5 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">Login Petugas</button>
        )}
      </header>

      <main className="pt-24 pb-32 px-8 max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-inter font-bold text-h1 text-sigap-blue mb-2">Pantauan Real-Time SIGAP</h1>
            <p className="font-body-md text-body-md text-on-secondary-container">Monitoring gangguan infrastruktur publik dan jalan dari laporan warga secara langsung.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                className="pl-10 pr-4 py-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl focus:ring-2 focus:ring-sigap-blue focus:border-sigap-blue outline-none transition-all w-64 text-body-sm"
                placeholder="Cari laporan..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {['Semua', 'Pending', 'Diproses', 'Selesai'].map((status) => (
            <button
              key={status} onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === status ? 'bg-sigap-blue text-white shadow-lg shadow-sigap-blue/30' : 'bg-white/60 border border-white/40 text-slate-600 hover:text-sigap-blue'}`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* --- BAGIAN PETA DITAMBAHKAN DI SINI --- */}
        {!loading && mapReports.length > 0 && (
          <div className="mb-10 bg-white/60 border border-white/40 p-4 rounded-2xl shadow-sm glass-card">
            <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sigap-blue">map</span> Peta Sebaran Laporan
            </h2>
            <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-inner border border-slate-200 z-0 relative">
              <MapContainer 
                center={[-6.200000, 106.816666]} // Pusat default (Jakarta)
                zoom={10} 
                style={{ height: '100%', width: '100%', zIndex: 1 }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
                
                {mapReports.map((report) => {
                  let lat, lng;
                  // Logika mengekstrak koordinat
                  if (report.latitude && report.longitude) {
                    lat = parseFloat(report.latitude); lng = parseFloat(report.longitude);
                  } else if (report.lokasi && report.lokasi.includes(',')) {
                    const parts = report.lokasi.replace('Koordinat: ', '').split(',');
                    lat = parseFloat(parts[0]); lng = parseFloat(parts[1]);
                  }

                  if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
                    return (
                      <Marker key={report.id} position={[lat, lng]} icon={createCustomIcon(report.status)}>
                        <Popup className="sigap-custom-popup">
                          <div className="w-48">
                            <img src={getSafeImageUrl(report)} alt="Bukti" className="w-full h-32 object-cover rounded-md mb-2 cursor-pointer" onClick={() => setSelectedImage(getSafeImageUrl(report))} />
                            <h4 className="font-bold text-sm text-slate-800">{report.jenis_gangguan || 'Laporan'}</h4>
                            <p className="text-xs text-slate-600 line-clamp-2 mb-2">{report.deskripsi || report.lokasi}</p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusBadge(report.status)}`}>
                              {report.status || 'Pending'}
                            </span>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  }
                  return null;
                })}
              </MapContainer>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sigap-blue"></div>
              <p className="text-slate-500 mt-2">Memuat laporan dari AWS...</p>
            </div>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-12 bg-white/40 rounded-2xl border border-white/50">
            <p className="text-slate-500 font-medium">Belum ada laporan yang sesuai.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div key={report.id} className="glass-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group bg-white/60 border border-white/40 flex flex-col h-full">
                <div 
                  className="relative h-48 overflow-hidden bg-slate-200 cursor-pointer" 
                  onClick={() => setSelectedImage(getSafeImageUrl(report))} // FITUR KLIK GAMBAR
                >
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt="Bukti Laporan" src={getSafeImageUrl(report)} 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Gambar+Rusak' }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                     <span className="material-symbols-outlined text-white text-3xl drop-shadow-md">zoom_in</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 backdrop-blur-md rounded-full font-label-sm text-[10px] font-bold border uppercase tracking-wider ${getStatusBadge(report.status)}`}>
                      <span className="material-symbols-outlined text-[14px]">{getStatusIcon(report.status)}</span>
                      {report.status || 'Pending'}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-sigap-blue text-[20px]">{getCategoryIcon(report.jenis_gangguan || report.kategori)}</span>
                      <h3 className="font-bold text-slate-800">{report.jenis_gangguan || report.kategori}</h3>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2 text-slate-600">
                        <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">location_on</span>
                        <span className="text-sm line-clamp-2">{report.lokasi}</span>
                      </div>
                    </div>
                  </div>
                  {report.created_at || report.createdAt ? (
                    <div className="flex items-center gap-2 text-slate-500 mt-auto pt-3 border-t border-slate-200/50">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      <span className="text-xs">{new Date(report.created_at || report.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- MODAL / LIGHTBOX GAMBAR FULL SCREEN --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)} // Tutup modal jika area luar diklik
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex justify-center">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors flex items-center gap-2"
              onClick={() => setSelectedImage(null)}
            >
              <span className="font-medium text-sm tracking-widest uppercase">Tutup</span>
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <img 
              src={selectedImage} 
              alt="Preview Full Screen" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()} // Mencegah klik gambar menutup modal
            />
          </div>
        </div>
      )}
    </div>
  );
}