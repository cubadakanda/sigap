import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MapComponent from '../components/MapComponent'
import { getReports } from '../services/api'

const dummyReports = [
  {
    id: 'REP-8821',
    pelapor_nama: 'Andi Wijaya',
    jenis_gangguan: 'Jalan Berlubang Parah',
    lokasi: 'Jl. Gatot Subroto No. 12, Jakarta',
    deskripsi: 'Lubang jalan berdiameter 30cm yang berbahaya untuk lalu lintas',
    status: 'Pending',
    createdAt: '2026-05-05T03:45:00Z',
    latitude: -6.2145,
    longitude: 106.8272,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVBHtq8v1hQlwkBppbHqLtq-Bbe3L1glqS8e4lSOPcxJSb50ZRvRILQz66iqm6Gl5eK4DMw9fLsnkCZIlUbwKN2xYc6jQP9a5xwVXYJWSkUjHDCMU3C5scmsC57wnmNWD6D3TzLg6l9mXPpYYEoxAZPy7Gm6acq7DN1gvY_SLxsGOO6W97SxqAEnNfyrDCTXbqcWH42OFY1HotGLSVi7w6qUDThNFg2OXQ9b6Sm8CZPranYlCC9HmEjvMEnIeMYbji4pvi3qZ0_lNi'
  },
  {
    id: 'REP-8790',
    pelapor_nama: 'Rina Safitri',
    jenis_gangguan: 'Lampu Jalan Padam',
    lokasi: 'Kawasan Industri Pulogadung',
    deskripsi: 'Beberapa lampu jalan di kawasan ini tidak menyala pada malam hari',
    status: 'Diproses',
    createdAt: '2026-05-04T12:20:00Z',
    latitude: -6.2356,
    longitude: 106.9145,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKpdyiUY4qdZPOA133FmQDIuS5qSD99ZslGF2YYQzH8j--vG8wtHk914iQcpyBLB56gaRaA1EAlV9S2SHLveAXfYJ4RGPQ8ihoFIxjIB9Ftvq-9iT6VbL3jw1x34RX_xD-I-U_VHfthR2ruxW-2oYotDLSzhYn9zQ0nNPO4sbGia4TBkDXSsMST86wMESjf5o1921A8To_eFXADRtp1S_9ifcln6kAwwcN9pECO6rxHNqdy4XNCC_a2ut7DGZpit74bs4oPrtei42c'
  },
  {
    id: 'REP-8755',
    pelapor_nama: 'Budi Darsono',
    jenis_gangguan: 'Saluran Air Tersumbat',
    lokasi: 'Perumahan Menteng Pratama',
    deskripsi: 'Saluran air telah tersumbat menyebabkan genangan air di area parkir',
    status: 'Selesai',
    createdAt: '2026-05-02T01:15:00Z',
    latitude: -6.1897,
    longitude: 106.8356,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQuWvvh9NcnbTXyn-Xy2EtRykzZzKAY2piIvMIbhLDbdYLb_dA99YTcMAynh6xfkX1vv81xKgoEgTDpZ5E0Mt6sfl3bOSS4i-e7_6mqKXq8xQpIFv_7BqkuWjvesCJXMSfmR0eoc-2x_QpgxAZ7UvSl2JXkLy7FE-5O3qRf_1__ySLdv2IfuprmYqDvcCnpGuAqW4NuEO1WLtbfTOTNn1TFjgKKAkBKHts-41u54xM3i8U5jMyeOSc73WxlshV1S0gyAs_MbtPBeYz'
  },
  {
    id: 'REP-8830',
    pelapor_nama: 'Maya Lestari',
    jenis_gangguan: 'Trotoar Rusak Berat',
    lokasi: 'Jl. Sudirman (Dekat MRT)',
    deskripsi: 'Trotoar hancur dan tidak aman untuk pejalan kaki',
    status: 'Pending',
    createdAt: '2026-05-05T07:30:00Z',
    latitude: -6.2088,
    longitude: 106.8250,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt-olRtsmDVwMlOa5sztPBr9tbKOyTidbwFIGYlmCFL_NXb1FHlR2gao5M8RhdJAEkh-9mpWi_jjgB-5m-CfmJG3IxMuDW7Ga_dH6dWPimtAxCsxJnFLDYg7hB5WwW0pex8NjUh5-YRcpqOHtvqfMqi9Tq_txePzflI4tvqWnDT19ayM-kyuGJX0UbWXQbQld2iw-B4dhgxjB6nXFYH7lgsU8c0rGtIENQldcrDuOxmmtF8X62BGAfcIfIPnqEYZi_yaL8imoH7wiR'
  },
  {
    id: 'REP-8815',
    pelapor_nama: 'Bayu Putra',
    jenis_gangguan: 'Pekerjaan Galian Pipa',
    lokasi: 'Jl. Rasuna Said, Kuningan',
    deskripsi: 'Pekerjaan galian pipa mengakibatkan gangguan lalu lintas',
    status: 'Diproses',
    createdAt: '2026-05-05T02:00:00Z',
    latitude: -6.2198,
    longitude: 106.8390,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGGITMoyxQcG26yxRgV_79NcMRLgIl8Imio9GPLHL6K_Q6JWrLzHr0psRdz1WqPJ4HeP3zNs4O78p41vPbCAVtlRzbHpdVxPRjfFn6AmVASpRQw5CBzyecXUvWawDxcGFHiOpiD7sWvEtWpdJDVQIODK3mc1dNyzoATrClqUxIPSM17_mdPRwCoDVgNBU9kwO-N7jB8uUhz_cKgpWWn1lLbn8S7j_BnDZ9AB8MqhqD0SudPanxSAETbKUVV58uRuHIfKKG889AGkc5'
  }
]

export default function MapView() {
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Semua')
  const [selectedReport, setSelectedReport] = useState(null)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      setLoading(true)
      const response = await getReports()
      const data = Array.isArray(response) ? response : response?.data || []
      setReports(data.length ? data : dummyReports)
    } catch (error) {
      setReports(dummyReports)
    } finally {
      setLoading(false)
    }
  }

  const filteredReports = reports.filter(report => 
    filter === 'Semua' || report.status === filter
  )

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'Pending').length,
    diproses: reports.filter(r => r.status === 'Diproses').length,
    selesai: reports.filter(r => r.status === 'Selesai').length,
  }

  const getStatusColor = (status) => {
    if (status === 'Pending') return '#FBBF24'
    if (status === 'Diproses') return '#3B82F6'
    return '#10B981'
  }

  const getStatusBgClass = (status) => {
    if (status === 'Pending') return 'bg-yellow-100'
    if (status === 'Diproses') return 'bg-blue-100'
    return 'bg-green-100'
  }

  const getStatusTextClass = (status) => {
    if (status === 'Pending') return 'text-yellow-700'
    if (status === 'Diproses') return 'text-blue-700'
    return 'text-green-700'
  }

  return (
    <div className="bg-infrastructure text-on-surface h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-8 h-16 glass border-b border-white/20">
        <div className="text-2xl font-black tracking-tight text-sigap-blue cursor-pointer" onClick={() => navigate('/')}>SIGAP</div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-slate-600 hover:text-sigap-blue font-medium text-sm transition-colors duration-200 cursor-pointer" onClick={() => navigate('/')}>Beranda</a>
          <a className="text-slate-600 hover:text-sigap-blue font-medium text-sm transition-colors duration-200 cursor-pointer" onClick={() => navigate('/laporkan')}>Laporkan</a>
          <a className="text-slate-600 hover:text-sigap-blue font-medium text-sm transition-colors duration-200 cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</a>
          <a className="text-sigap-blue border-b-2 border-sigap-blue pb-1 text-sm font-medium cursor-pointer">Peta</a>
        </nav>
        <button onClick={() => navigate('/login')} className="bg-sigap-blue text-on-primary px-5 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">
          Login Petugas
        </button>
      </header>

      {/* Main content */}
      <div className="flex flex-1 pt-16 gap-4 p-4 overflow-hidden">
        {/* Map */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-white/20 shadow-lg">
          <MapComponent reports={filteredReports} onMarkerClick={setSelectedReport} />
        </div>

        {/* Right sidebar */}
        <div className="w-80 flex flex-col gap-4 overflow-y-auto">
          {/* Stats */}
          <div className="glass rounded-2xl p-4 border border-white/20">
            <h2 className="font-bold text-h6 text-sigap-blue mb-3">Statistik</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-label-md text-on-surface-variant">Total Laporan</span>
                <span className="font-bold text-h6 text-sigap-blue">{stats.total}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-label-md text-on-surface-variant">Pending</span>
                <span className="font-bold text-h6" style={{ color: '#FBBF24' }}>{stats.pending}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-label-md text-on-surface-variant">Diproses</span>
                <span className="font-bold text-h6" style={{ color: '#3B82F6' }}>{stats.diproses}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-label-md text-on-surface-variant">Selesai</span>
                <span className="font-bold text-h6" style={{ color: '#10B981' }}>{stats.selesai}</span>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="glass rounded-2xl p-4 border border-white/20">
            <h2 className="font-bold text-h6 text-sigap-blue mb-3">Filter Status</h2>
            <div className="space-y-2">
              {['Semua', 'Pending', 'Diproses', 'Selesai'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-label-md text-label-md transition-all ${
                    filter === status
                      ? 'bg-sigap-blue text-on-primary border-2 border-sigap-blue'
                      : 'bg-white/20 text-on-surface hover:bg-white/30 border-2 border-white/30'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Report list */}
          <div className="glass rounded-2xl p-4 border border-white/20 flex-1 overflow-y-auto">
            <h2 className="font-bold text-h6 text-sigap-blue mb-3">Laporan ({filteredReports.length})</h2>
            <div className="space-y-2">
              {filteredReports.length === 0 ? (
                <p className="text-center text-on-surface-variant text-body-sm py-8">Tidak ada laporan</p>
              ) : (
                filteredReports.map(report => (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedReport?.id === report.id
                        ? 'bg-sigap-blue/20 border-sigap-blue'
                        : `${getStatusBgClass(report.status)} border-transparent hover:border-sigap-blue`
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <span className={`font-bold text-label-sm ${getStatusTextClass(report.status)}`}>
                        {report.status}
                      </span>
                      <span className="text-xs text-on-surface-variant">{report.id}</span>
                    </div>
                    <div className="font-semibold text-label-md text-on-surface mb-1">{report.jenis_gangguan}</div>
                    <div className="text-xs text-on-surface-variant mb-1">📍 {report.lokasi}</div>
                    <div className="text-xs text-on-surface-variant">👤 {report.pelapor_nama}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="glass rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20 p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-h5 font-bold text-sigap-blue">{selectedReport.jenis_gangguan}</h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-on-surface-variant hover:text-on-surface text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {selectedReport.image_url && (
                <img
                  src={selectedReport.image_url}
                  alt="Laporan"
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-label-sm text-on-surface-variant mb-1">Status</p>
                  <div className={`inline-block px-3 py-1 rounded-full font-label-md ${getStatusBgClass(selectedReport.status)} ${getStatusTextClass(selectedReport.status)}`}>
                    {selectedReport.status}
                  </div>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant mb-1">ID Laporan</p>
                  <p className="font-semibold text-label-md">{selectedReport.id}</p>
                </div>
              </div>

              <div>
                <p className="text-label-sm text-on-surface-variant mb-1">Pelapor</p>
                <p className="font-semibold text-label-md">{selectedReport.pelapor_nama}</p>
              </div>

              <div>
                <p className="text-label-sm text-on-surface-variant mb-1">Lokasi</p>
                <p className="font-semibold text-label-md">{selectedReport.lokasi}</p>
              </div>

              <div>
                <p className="text-label-sm text-on-surface-variant mb-1">Deskripsi</p>
                <p className="text-body-md">{selectedReport.deskripsi || 'Tidak ada deskripsi'}</p>
              </div>

              <div>
                <p className="text-label-sm text-on-surface-variant mb-1">Waktu Laporan</p>
                <p className="text-body-md">{new Date(selectedReport.createdAt).toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
