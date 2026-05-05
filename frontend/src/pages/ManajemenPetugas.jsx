import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import MapComponent from '../components/MapComponent'

const dummyReports = [
  {
    id: 'SIG-00821',
    pelapor_nama: 'Andi Wijaya',
    jenis_gangguan: 'Lubang Jalan Dalam',
    lokasi: 'Jl. Sudirman KM 4.2',
    status: 'Pending',
    waktu: '12 Menit Lalu',
    latitude: -6.2175,
    longitude: 106.8305
  },
  {
    id: 'SIG-00819',
    pelapor_nama: 'Rina Safitri',
    jenis_gangguan: 'Tiang Listrik Miring',
    lokasi: 'Kec. Menteng Dalam',
    status: 'Diproses',
    waktu: '2 Jam Lalu',
    latitude: -6.2412,
    longitude: 106.8321
  },
  {
    id: 'SIG-00815',
    pelapor_nama: 'Budi Darsono',
    jenis_gangguan: 'Sampah Menumpuk',
    lokasi: 'Pasar Minggu',
    status: 'Selesai',
    waktu: '5 Jam Lalu',
    latitude: -6.2842,
    longitude: 106.8358
  },
  {
    id: 'SIG-00825',
    pelapor_nama: 'Maya Lestari',
    jenis_gangguan: 'Pohon Tumbang',
    lokasi: 'Jl. Gatot Subroto',
    status: 'Pending',
    waktu: 'Baru Saja',
    latitude: -6.2251,
    longitude: 106.8287
  }
]

const emptyReport = {
  id: '',
  pelapor_nama: '',
  jenis_gangguan: '',
  lokasi: '',
  status: 'Pending',
  waktu: 'Baru Saja'
}

export default function ManajemenPetugas() {
  const navigate = useNavigate()
  const [reports, setReports] = useState(dummyReports)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [currentPage, setCurrentPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [activeReport, setActiveReport] = useState(emptyReport)

  const filteredReports = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return reports.filter((report) => {
      const matchSearch = report.pelapor_nama.toLowerCase().includes(query) ||
        report.lokasi.toLowerCase().includes(query) ||
        report.jenis_gangguan.toLowerCase().includes(query) ||
        report.id.toLowerCase().includes(query)
      const matchStatus = statusFilter === 'Semua' || report.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [reports, searchQuery, statusFilter])

  const itemsPerPage = 6
  const totalPages = Math.max(1, Math.ceil(filteredReports.length / itemsPerPage))
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const stats = {
    total: reports.length,
    menunggu: reports.filter(r => r.status === 'Pending').length,
    diproses: reports.filter(r => r.status === 'Diproses').length,
    selesai: reports.filter(r => r.status === 'Selesai').length
  }

  const openModal = (mode, report) => {
    setModalMode(mode)
    setActiveReport(report || emptyReport)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setActiveReport(emptyReport)
  }

  const handleSave = () => {
    if (modalMode === 'create') {
      const newReport = {
        ...activeReport,
        id: activeReport.id || `SIG-${Math.floor(10000 + Math.random() * 90000)}`
      }
      setReports((prev) => [newReport, ...prev])
    } else if (modalMode === 'edit') {
      setReports((prev) => prev.map((item) => (item.id === activeReport.id ? activeReport : item)))
    }
    closeModal()
  }

  const handleDelete = () => {
    setReports((prev) => prev.filter((item) => item.id !== activeReport.id))
    closeModal()
  }

  const getStatusBadge = (status) => {
    if (status === 'Pending') return 'bg-amber-400/20 text-amber-700 border-amber-400/30'
    if (status === 'Diproses') return 'bg-blue-400/20 text-blue-700 border-blue-400/30'
    return 'bg-emerald-400/20 text-emerald-700 border-emerald-400/30'
  }

  const getStatusIcon = (status) => {
    if (status === 'Pending') return 'schedule'
    if (status === 'Diproses') return 'refresh'
    return 'verified'
  }

  return (
    <div className="bg-infrastructure text-on-surface min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 glass border-b border-white/20">
        <div className="text-2xl font-black tracking-tight text-sigap-blue uppercase cursor-pointer" onClick={() => navigate('/')}>SIGAP</div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-slate-600 hover:text-sigap-blue font-medium text-sm transition-colors duration-200 cursor-pointer" onClick={() => navigate('/')}>Beranda</a>
          <a className="text-slate-600 hover:text-sigap-blue font-medium text-sm transition-colors duration-200 cursor-pointer" onClick={() => navigate('/laporkan')}>Laporkan</a>
          <a className="text-sigap-blue border-b-2 border-sigap-blue pb-1 text-sm font-medium cursor-pointer">Dashboard</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary px-2 py-0.5 bg-primary-fixed/50 rounded">Officer View</span>
            <span className="text-[12px] font-medium text-on-surface-variant">Bripda Pratama</span>
          </div>
          <button onClick={() => navigate('/login')} className="bg-white text-sigap-blue border border-sigap-blue/30 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sigap-blue hover:text-white active:scale-95 transition-all shadow-lg shadow-sigap-blue/10">
            Logout
          </button>
        </div>
      </header>

      <main className="pt-24 pb-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-sigap-blue mb-2">Manajemen Gangguan</h1>
            <p className="text-lg text-on-surface-variant">Antrean laporan masuk yang memerlukan tindakan segera.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/80 transition-colors" onClick={() => openModal('create')}>
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tambah Laporan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass p-6 rounded-2xl flex flex-col gap-2 group hover:translate-y-[-4px] transition-transform duration-300">
            <span className="material-symbols-outlined text-sigap-blue text-3xl">assignment</span>
            <span className="text-[11px] uppercase text-on-surface-variant font-bold tracking-wider">Total Laporan</span>
            <span className="text-3xl font-bold text-on-surface">{stats.total}</span>
          </div>
          <div className="glass p-6 rounded-2xl flex flex-col gap-2 group hover:translate-y-[-4px] transition-transform duration-300">
            <span className="material-symbols-outlined text-amber-500 text-3xl">pending_actions</span>
            <span className="text-[11px] uppercase text-on-surface-variant font-bold tracking-wider">Menunggu</span>
            <span className="text-3xl font-bold text-on-surface">{stats.menunggu}</span>
          </div>
          <div className="glass p-6 rounded-2xl flex flex-col gap-2 group hover:translate-y-[-4px] transition-transform duration-300">
            <span className="material-symbols-outlined text-blue-500 text-3xl">sync_alt</span>
            <span className="text-[11px] uppercase text-on-surface-variant font-bold tracking-wider">Diproses</span>
            <span className="text-3xl font-bold text-on-surface">{stats.diproses}</span>
          </div>
          <div className="glass p-6 rounded-2xl flex flex-col gap-2 border-l-4 border-l-emerald-500/50 group hover:translate-y-[-4px] transition-transform duration-300">
            <span className="material-symbols-outlined text-emerald-500 text-3xl">task_alt</span>
            <span className="text-[11px] uppercase text-on-surface-variant font-bold tracking-wider">Selesai (24j)</span>
            <span className="text-3xl font-bold text-on-surface">{stats.selesai}</span>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap gap-3">
            {['Semua', 'Pending', 'Diproses', 'Selesai'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status)
                  setCurrentPage(1)
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  statusFilter === status
                    ? 'bg-sigap-blue text-white shadow-lg shadow-sigap-blue/30'
                    : 'bg-white/60 border border-white/40 text-slate-600 hover:text-sigap-blue'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl overflow-hidden border border-white/40 shadow-xl mb-10">
          <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between bg-white/30">
            <h3 className="text-xl font-bold text-sigap-blue">Peta Laporan</h3>
            <span className="text-xs text-on-surface-variant">{filteredReports.length} laporan tampil</span>
          </div>
          <div className="h-[520px]">
            <MapComponent reports={filteredReports} />
          </div>
        </div>

        <div className="glass rounded-3xl overflow-hidden shadow-xl border border-white/40">
          <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between bg-white/30">
            <h3 className="text-xl font-bold text-sigap-blue">Daftar Antrean</h3>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input
                className="pl-10 pr-4 py-2 bg-white/50 border border-white/40 rounded-full text-sm w-64 focus:ring-2 focus:ring-sigap-blue focus:bg-white focus:border-transparent transition-all"
                placeholder="Cari ID Laporan atau Lokasi..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/40">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Pelapor / ID</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Kategori & Lokasi</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Waktu</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider text-right">Aksi Manajemen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {paginatedReports.map((report) => (
                  <tr key={report.id} className="hover:bg-white/40 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-on-surface">{report.pelapor_nama}</span>
                        <span className="text-[11px] font-medium text-on-surface-variant/70">#{report.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex items-center justify-center w-8 h-8 bg-blue-500/10 text-blue-700 rounded-lg">
                          <span className="material-symbols-outlined text-[18px]">construction</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">{report.jenis_gangguan}</span>
                          <span className="text-[12px] text-on-surface-variant">{report.lokasi}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(report.status)}`}>
                        <span className="material-symbols-outlined text-[14px]">{getStatusIcon(report.status)}</span>
                        {report.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-on-surface-variant">{report.waktu}</td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button className="px-3 py-1.5 bg-sigap-blue/10 text-sigap-blue rounded-lg text-xs font-bold hover:bg-sigap-blue hover:text-white transition-all" onClick={() => openModal('edit', report)}>
                          Ubah Status
                        </button>
                        <button className="p-1.5 text-on-surface-variant hover:bg-white/60 rounded-lg transition-all" onClick={() => openModal('delete', report)}>
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-white/20 flex items-center justify-between text-xs font-medium text-on-surface-variant">
            <span>Menampilkan {paginatedReports.length} dari {filteredReports.length} antrean</span>
            <div className="flex gap-1">
              <button className="p-2 glass rounded hover:bg-white/80 transition-all" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`p-2 text-[12px] w-8 h-8 ${page === currentPage ? 'bg-sigap-blue text-white rounded font-bold' : 'glass hover:bg-white/80 rounded'}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button className="p-2 glass rounded hover:bg-white/80 transition-all" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-sigap-blue">
                {modalMode === 'create' ? 'Tambah Laporan' : modalMode === 'edit' ? 'Ubah Laporan' : 'Hapus Laporan'}
              </h3>
              <button className="text-slate-500 hover:text-slate-800" onClick={closeModal}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {modalMode === 'delete' ? (
              <div>
                <p className="text-slate-600">Yakin ingin menghapus laporan <span className="font-bold">#{activeReport.id}</span>?</p>
                <div className="flex gap-3 justify-end mt-6">
                  <button className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700" onClick={closeModal}>Batal</button>
                  <button className="px-4 py-2 rounded-lg bg-red-600 text-white" onClick={handleDelete}>Hapus</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700">ID Laporan</label>
                  <input
                    value={activeReport.id}
                    onChange={(e) => setActiveReport((prev) => ({ ...prev, id: e.target.value }))}
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sigap-blue/20 outline-none"
                    placeholder="SIG-00000"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Nama Pelapor</label>
                  <input
                    value={activeReport.pelapor_nama}
                    onChange={(e) => setActiveReport((prev) => ({ ...prev, pelapor_nama: e.target.value }))}
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sigap-blue/20 outline-none"
                    placeholder="Nama pelapor"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Kategori Gangguan</label>
                  <input
                    value={activeReport.jenis_gangguan}
                    onChange={(e) => setActiveReport((prev) => ({ ...prev, jenis_gangguan: e.target.value }))}
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sigap-blue/20 outline-none"
                    placeholder="Jenis gangguan"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Lokasi</label>
                  <input
                    value={activeReport.lokasi}
                    onChange={(e) => setActiveReport((prev) => ({ ...prev, lokasi: e.target.value }))}
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sigap-blue/20 outline-none"
                    placeholder="Lokasi kejadian"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Status</label>
                  <select
                    value={activeReport.status}
                    onChange={(e) => setActiveReport((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sigap-blue/20 outline-none"
                  >
                    <option>Pending</option>
                    <option>Diproses</option>
                    <option>Selesai</option>
                  </select>
                </div>
                <div className="flex gap-3 justify-end mt-6">
                  <button className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700" onClick={closeModal}>Batal</button>
                  <button className="px-4 py-2 rounded-lg bg-sigap-blue text-white" onClick={handleSave}>
                    {modalMode === 'create' ? 'Simpan' : 'Perbarui'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
