import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getReports, getReportsByStatus } from '../services/api'

const dummyReports = [
  {
    id: 'REP-8821',
    pelapor_nama: 'Andi Wijaya',
    jenis_gangguan: 'Jalan Berlubang Parah',
    lokasi: 'Jl. Gatot Subroto No. 12, Jakarta',
    status: 'Pending',
    createdAt: '2026-05-05T03:45:00Z',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVBHtq8v1hQlwkBppbHqLtq-Bbe3L1glqS8e4lSOPcxJSb50ZRvRILQz66iqm6Gl5eK4DMw9fLsnkCZIlUbwKN2xYc6jQP9a5xwVXYJWSkUjHDCMU3C5scmsC57wnmNWD6D3TzLg6l9mXPpYYEoxAZPy7Gm6acq7DN1gvY_SLxsGOO6W97SxqAEnNfyrDCTXbqcWH42OFY1HotGLSVi7w6qUDThNFg2OXQ9b6Sm8CZPranYlCC9HmEjvMEnIeMYbji4pvi3qZ0_lNi'
  },
  {
    id: 'REP-8790',
    pelapor_nama: 'Rina Safitri',
    jenis_gangguan: 'Lampu Jalan Padam',
    lokasi: 'Kawasan Industri Pulogadung',
    status: 'Diproses',
    createdAt: '2026-05-04T12:20:00Z',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKpdyiUY4qdZPOA133FmQDIuS5qSD99ZslGF2YYQzH8j--vG8wtHk914iQcpyBLB56gaRaA1EAlV9S2SHLveAXfYJ4RGPQ8ihoFIxjIB9Ftvq-9iT6VbL3jw1x34RX_xD-I-U_VHfthR2ruxW-2oYotDLSzhYn9zQ0nNPO4sbGia4TBkDXSsMST86wMESjf5o1921A8To_eFXADRtp1S_9ifcln6kAwwcN9pECO6rxHNqdy4XNCC_a2ut7DGZpit74bs4oPrtei42c'
  },
  {
    id: 'REP-8755',
    pelapor_nama: 'Budi Darsono',
    jenis_gangguan: 'Saluran Air Tersumbat',
    lokasi: 'Perumahan Menteng Pratama',
    status: 'Selesai',
    createdAt: '2026-05-02T01:15:00Z',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQuWvvh9NcnbTXyn-Xy2EtRykzZzKAY2piIvMIbhLDbdYLb_dA99YTcMAynh6xfkX1vv81xKgoEgTDpZ5E0Mt6sfl3bOSS4i-e7_6mqKXq8xQpIFv_7BqkuWjvesCJXMSfmR0eoc-2x_QpgxAZ7UvSl2JXkLy7FE-5O3qRf_1__ySLdv2IfuprmYqDvcCnpGuAqW4NuEO1WLtbfTOTNn1TFjgKKAkBKHts-41u54xM3i8U5jMyeOSc73WxlshV1S0gyAs_MbtPBeYz'
  },
  {
    id: 'REP-8830',
    pelapor_nama: 'Maya Lestari',
    jenis_gangguan: 'Trotoar Rusak Berat',
    lokasi: 'Jl. Sudirman (Dekat MRT)',
    status: 'Pending',
    createdAt: '2026-05-05T07:30:00Z',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt-olRtsmDVwMlOa5sztPBr9tbKOyTidbwFIGYlmCFL_NXb1FHlR2gao5M8RhdJAEkh-9mpWi_jjgB-5m-CfmJG3IxMuDW7Ga_dH6dWPimtAxCsxJnFLDYg7hB5WwW0pex8NjUh5-YRcpqOHtvqfMqi9Tq_txePzflI4tvqWnDT19ayM-kyuGJX0UbWXQbQld2iw-B4dhgxjB6nXFYH7lgsU8c0rGtIENQldcrDuOxmmtF8X62BGAfcIfIPnqEYZi_yaL8imoH7wiR'
  },
  {
    id: 'REP-8815',
    pelapor_nama: 'Bayu Putra',
    jenis_gangguan: 'Pekerjaan Galian Pipa',
    lokasi: 'Jl. Rasuna Said, Kuningan',
    status: 'Diproses',
    createdAt: '2026-05-05T02:00:00Z',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGGITMoyxQcG26yxRgV_79NcMRLgIl8Imio9GPLHL6K_Q6JWrLzHr0psRdz1WqPJ4HeP3zNs4O78p41vPbCAVtlRzbHpdVxPRjfFn6AmVASpRQw5CBzyecXUvWawDxcGFHiOpiD7sWvEtWpdJDVQIODK3mc1dNyzoATrClqUxIPSM17_mdPRwCoDVgNBU9kwO-N7jB8uUhz_cKgpWWn1lLbn8S7j_BnDZ9AB8MqhqD0SudPanxSAETbKUVV58uRuHIfKKG889AGkc5'
  }
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('Semua')

  useEffect(() => {
    fetchReports(filter)
  }, [filter])

  const fetchReports = async (status) => {
    try {
      setLoading(true)
      const response = status === 'Semua'
        ? await getReports()
        : await getReportsByStatus(status)
      const data = Array.isArray(response) ? response : response?.data || []
      const fallback = status === 'Semua'
        ? dummyReports
        : dummyReports.filter((report) => report.status === status)
      setReports(data.length ? data : fallback)
    } catch (error) {
      const fallback = status === 'Semua'
        ? dummyReports
        : dummyReports.filter((report) => report.status === status)
      setReports(fallback)
    } finally {
      setLoading(false)
    }
  }

  const filteredReports = useMemo(() => {
    const normalized = searchQuery.toLowerCase()
    return reports.filter(report => {
      const matchSearch =
        (report.pelapor_nama || '').toLowerCase().includes(normalized) ||
        (report.lokasi || '').toLowerCase().includes(normalized) ||
        (report.jenis_gangguan || '').toLowerCase().includes(normalized)
      const matchFilter = filter === 'Semua' || report.status === filter
      return matchSearch && matchFilter
    })
  }, [reports, searchQuery, filter])

  const getStatusBadge = (status) => {
    if (status === 'Pending') {
      return 'bg-blue-500/20 text-blue-700 border-blue-500/20'
    }
    if (status === 'Diproses') {
      return 'bg-amber-500/20 text-amber-700 border-amber-500/20'
    }
    return 'bg-emerald-500/20 text-emerald-700 border-emerald-500/20'
  }

  const getStatusIcon = (status) => {
    if (status === 'Pending') return 'schedule'
    if (status === 'Diproses') return 'autorenew'
    return 'check_circle'
  }

  const getCategoryIcon = (jenis) => {
    if (jenis.toLowerCase().includes('lampu')) return 'lightbulb'
    if (jenis.toLowerCase().includes('saluran')) return 'water_drop'
    if (jenis.toLowerCase().includes('trotoar')) return 'directions_walk'
    if (jenis.toLowerCase().includes('galian')) return 'construction'
    return 'warning'
  }

  return (
    <div className="bg-infrastructure text-on-surface min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 glass border-b border-white/20">
        <div className="text-2xl font-black tracking-tight text-sigap-blue cursor-pointer" onClick={() => navigate('/')}>SIGAP</div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-slate-600 hover:text-sigap-blue font-medium text-sm transition-colors duration-200 cursor-pointer" onClick={() => navigate('/')}>Beranda</a>
          <a className="text-slate-600 hover:text-sigap-blue font-medium text-sm transition-colors duration-200 cursor-pointer" onClick={() => navigate('/laporkan')}>Laporkan</a>
          <a className="text-sigap-blue border-b-2 border-sigap-blue pb-1 text-sm font-medium cursor-pointer">Dashboard</a>
        </nav>
        <button onClick={() => navigate('/login')} className="bg-sigap-blue text-on-primary px-5 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">
          Login Petugas
        </button>
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
            <button className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl hover:bg-white/80 transition-colors text-label-md font-label-md">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
              Filter
            </button>
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
              <p className="text-secondary mt-2">Memuat laporan...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredReports.map((report) => (
              <div key={report.id} className="glass-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={report.jenis_gangguan} src={report.image_url} />
                  <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-500 tracking-tighter uppercase">CloudFront CDN</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 backdrop-blur-md rounded-full font-label-sm text-label-sm border ${getStatusBadge(report.status)}`}>
                      <span className="material-symbols-outlined text-[14px]">{getStatusIcon(report.status)}</span>
                      {report.status}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-sigap-blue text-[20px]">{getCategoryIcon(report.jenis_gangguan)}</span>
                    <h3 className="font-label-md text-label-md text-on-surface">{report.jenis_gangguan}</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-on-secondary-container">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span className="text-body-sm font-body-sm">{report.lokasi}</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-secondary-container">
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                      <span className="text-body-sm font-body-sm">
                        {new Date(report.createdAt).toLocaleDateString('id-ID')} • {new Date(report.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/30 flex justify-between items-center">
                    <span className="text-[10px] text-outline font-medium uppercase tracking-widest">ID: #{report.id}</span>
                    <button className="text-sigap-blue font-label-md text-label-md hover:underline">Lihat Detail</button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white/40 backdrop-blur-md border-2 border-dashed border-white/60 rounded-xl flex flex-col items-center justify-center p-8 text-center opacity-70 hover:opacity-100 transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center mb-4 shadow-sm">
                <span className="material-symbols-outlined text-sigap-blue text-[32px]">add_a_photo</span>
              </div>
              <h3 className="font-h3 text-h3 text-sigap-blue mb-2">Tambah Laporan</h3>
              <p className="font-body-sm text-body-sm text-on-secondary-container">Gunakan fitur kamera untuk melaporkan gangguan baru secara langsung.</p>
              <button onClick={() => navigate('/laporkan')} className="mt-6 px-6 py-2 bg-sigap-blue text-white rounded-lg font-label-md text-label-md shadow-md hover:shadow-lg transition-shadow">Mulai Kamera</button>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 md:hidden bg-white/80 backdrop-blur-lg border-t border-white/20 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center justify-center text-slate-500">
          <span className="material-symbols-outlined">home</span>
          <span className="font-inter text-[11px] font-semibold uppercase tracking-wider mt-1">Beranda</span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-500">
          <span className="material-symbols-outlined">campaign</span>
          <span className="font-inter text-[11px] font-semibold uppercase tracking-wider mt-1">Laporkan</span>
        </div>
        <div className="flex flex-col items-center justify-center text-sigap-blue bg-sigap-blue/10 rounded-xl px-4 py-1">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="font-inter text-[11px] font-semibold uppercase tracking-wider mt-1">Dashboard</span>
        </div>
      </nav>

      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/60 backdrop-blur-md border-t border-white/30">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="text-lg font-bold text-sigap-blue">SIGAP</div>
          <p className="font-inter text-sm text-slate-600 text-center md:text-left max-w-sm">
            © 2024 SIGAP - Sistem Informasi Gangguan Publik & Jalan. Melayani masyarakat untuk infrastruktur yang lebih baik.
          </p>
        </div>
        <div className="flex gap-8">
          <a className="font-inter text-sm text-slate-600 hover:text-sigap-blue hover:underline transition-all opacity-80 hover:opacity-100 cursor-pointer">Tentang Kami</a>
          <a className="font-inter text-sm text-slate-600 hover:text-sigap-blue hover:underline transition-all opacity-80 hover:opacity-100 cursor-pointer">Kebijakan Privasi</a>
          <a className="font-inter text-sm text-slate-600 hover:text-sigap-blue hover:underline transition-all opacity-80 hover:opacity-100 cursor-pointer">Bantuan</a>
          <a className="font-inter text-sm text-slate-600 hover:text-sigap-blue hover:underline transition-all opacity-80 hover:opacity-100 cursor-pointer">Kontak</a>
        </div>
      </footer>
    </div>
  )
}
