import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getReports, getReportsByStatus } from '../services/api' // Sesuaikan path jika berbeda

export default function Dashboard() {
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('Semua')

  useEffect(() => {
    fetchReports(filter)
  }, [filter])

  // AMBIL DATA ASLI, HAPUS DATA DUMMY
  const fetchReports = async (status) => {
    try {
      setLoading(true)
      const response = status === 'Semua'
        ? await getReports()
        : await getReportsByStatus(status)
      
      const data = Array.isArray(response) ? response : response?.data || []
      setReports(data)
    } catch (error) {
      console.error("Gagal memuat data:", error)
      setReports([]) // Kosongkan jika gagal, bukan pakai dummy
    } finally {
      setLoading(false)
    }
  }

  const filteredReports = useMemo(() => {
    const normalized = searchQuery.toLowerCase()
    return reports.filter(report => {
      const nama = (report.pelapor_nama || report.nama || '').toLowerCase()
      const lokasi = (report.lokasi || '').toLowerCase()
      const kategori = (report.jenis_gangguan || report.kategori || '').toLowerCase()
      
      const matchSearch = nama.includes(normalized) || lokasi.includes(normalized) || kategori.includes(normalized)
      const matchFilter = filter === 'Semua' || report.status === filter
      return matchSearch && matchFilter
    })
  }, [reports, searchQuery, filter])

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase()
    if (s === 'pending') return 'bg-amber-400/20 text-amber-700 border-amber-400/30'
    if (s === 'diproses') return 'bg-blue-400/20 text-blue-700 border-blue-400/30'
    return 'bg-emerald-400/20 text-emerald-700 border-emerald-400/30'
  }

  const getStatusIcon = (status) => {
    const s = (status || '').toLowerCase()
    if (s === 'pending') return 'schedule'
    if (s === 'diproses') return 'autorenew'
    return 'check_circle'
  }

  const getCategoryIcon = (jenis) => {
    const j = (jenis || '').toLowerCase()
    if (j.includes('lampu')) return 'lightbulb'
    if (j.includes('saluran')) return 'water_drop'
    if (j.includes('trotoar')) return 'directions_walk'
    if (j.includes('galian')) return 'construction'
    return 'warning'
  }

  return (
    // INI DIA PEMBUNGKUS UTAMANYA YANG TADI HILANG 👇
    <div className="bg-infrastructure text-on-surface min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 glass border-b border-white/20">
        <div className="text-2xl font-black tracking-tight text-sigap-blue cursor-pointer" onClick={() => navigate('/')}>SIGAP</div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-slate-600 hover:text-sigap-blue font-medium text-sm transition-colors duration-200 cursor-pointer" onClick={() => navigate('/')}>Beranda</a>
          <a className="text-slate-600 hover:text-sigap-blue font-medium text-sm transition-colors duration-200 cursor-pointer" onClick={() => navigate('/laporkan')}>Laporkan</a>
          <a className="text-sigap-blue border-b-2 border-sigap-blue pb-1 text-sm font-medium cursor-pointer">Dashboard</a>
        </nav>
        
        {/* LOGIKA PINTAR: Cek apakah petugas sedang login */}
        {localStorage.getItem('isOfficer') === 'true' ? (
          <button onClick={() => navigate('/manajemen')} className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-label-md text-label-md hover:bg-emerald-700 active:scale-95 transition-all">
            Dashboard Petugas
          </button>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-sigap-blue text-white px-5 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">
            Login Petugas
          </button>
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
                placeholder="Cari laporan..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {['Semua', 'Pending', 'Diproses', 'Selesai'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === status
                  ? 'bg-sigap-blue text-white shadow-lg shadow-sigap-blue/30'
                  : 'bg-white/60 border border-white/40 text-slate-600 hover:text-sigap-blue'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

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
              <div key={report.id} className="glass-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group bg-white/60 border border-white/40">
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  {/* MEMANGGIL GAMBAR ASLI DENGAN FALLBACK YANG KUAT */}
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt="Bukti Laporan" 
                    // Kita borong semua kemungkinan nama kolom dari database
                    src={report.image_url || report.imageUrl || report.foto || report.image || report.gambar || 'https://via.placeholder.com/400x300?text=Tidak+Ada+Gambar'} 
                    // Jika URL rusak/gagal dimuat, otomatis tampilkan placeholder
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Gambar+Rusak/Proses' }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 backdrop-blur-md rounded-full font-label-sm text-[10px] font-bold border uppercase tracking-wider ${getStatusBadge(report.status)}`}>
                      <span className="material-symbols-outlined text-[14px]">{getStatusIcon(report.status)}</span>
                      {report.status || 'Pending'}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-sigap-blue text-[20px]">{getCategoryIcon(report.jenis_gangguan || report.kategori)}</span>
                    <h3 className="font-bold text-slate-800">{report.jenis_gangguan || report.kategori}</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-slate-600">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span className="text-sm">{report.lokasi}</span>
                    </div>
                    {report.createdAt && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        <span className="text-sm">
                          {new Date(report.createdAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}