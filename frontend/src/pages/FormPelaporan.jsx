import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createReport } from '../services/api'
import MapComponent from '../components/MapComponent'

export default function FormPelaporan() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    pelapor_nama: '',
    jenis_gangguan: 'Jalan Rusak',
    lokasi: '',
    deskripsi: '',
    image: null,
    latitude: null,
    longitude: null
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const mapReports = [
    {
      id: 'FORM-PREVIEW',
      pelapor_nama: formData.pelapor_nama || 'Pelapor',
      jenis_gangguan: formData.jenis_gangguan || 'Laporan',
      lokasi: formData.lokasi || 'Lokasi belum dipilih',
      deskripsi: formData.deskripsi || 'Belum ada deskripsi',
      status: 'Pending',
      latitude: formData.latitude || -6.2088,
      longitude: formData.longitude || 106.8456,
      image_url: imagePreview
    }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
    setFormData(prev => ({
      ...prev,
      image: file
    }))
  }

  const handleMapClick = (latlng, map) => {
    const lat = Number(latlng.lat.toFixed(6))
    const lng = Number(latlng.lng.toFixed(6))
    setFormData(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      lokasi: `Koordinat: ${lat}, ${lng}`
    }))
    if (map) {
      map.setView([lat, lng], 15)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Kita bungkus semua data ke dalam kotak khas untuk dihantar
      const formDataToSend = new FormData()
      formDataToSend.append('pelapor_nama', formData.pelapor_nama)
      formDataToSend.append('jenis_gangguan', formData.jenis_gangguan)
      formDataToSend.append('lokasi', formData.lokasi)
      formDataToSend.append('deskripsi', formData.deskripsi)
      
      // Pastikan label ini adalah 'image' (sama dengan upload.single di Backend)
      if (formData.image) {
        formDataToSend.append('image', formData.image)
      }

      await createReport(formDataToSend)
      setSuccess(true)
      
      // Kosongkan form selepas berjaya
      setFormData({
        pelapor_nama: '',
        jenis_gangguan: 'Jalan Rusak',
        lokasi: '',
        deskripsi: '',
        image: null,
        latitude: null,
        longitude: null
      })
      setImagePreview('')

      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      alert('Gagal menghantar laporan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-50 text-on-background antialiased overflow-x-hidden min-h-screen relative">
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-pattern opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 glass shadow-sm border-b border-white/20">
        <div className="text-2xl font-black tracking-tight text-sigap-blue cursor-pointer" onClick={() => navigate('/')}>SIGAP</div>
        <nav className="hidden md:flex items-center gap-8 font-inter antialiased text-sm font-medium">
          <a className="text-slate-600 hover:text-sigap-blue transition-colors duration-200 cursor-pointer" onClick={() => navigate('/')}>Beranda</a>
          <a className="text-sigap-blue border-b-2 border-sigap-blue pb-1 cursor-pointer">Laporkan</a>
          <a className="text-slate-600 hover:text-sigap-blue transition-colors duration-200 cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</a>
        </nav>
        <button
          onClick={() => navigate('/login')}
          className="px-5 py-2 rounded-lg bg-sigap-blue text-on-primary font-label-md text-label-md hover:brightness-110 active:scale-95 transition-all shadow-md shadow-sigap-blue/10"
        >
          Login Petugas
        </button>
      </header>

      <main className="min-h-screen pt-24 pb-16 px-4 md:px-margin max-w-4xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <h1 className="font-h1 text-h1 text-sigap-blue mb-4">Laporkan Gangguan Publik</h1>
          <p className="font-body-md text-body-md text-slate-600 max-w-2xl mx-auto">
            Sampaikan kendala infrastruktur atau gangguan jalan di wilayah Anda. Laporan Anda membantu kami bertindak lebih cepat demi keamanan bersama.
          </p>
        </div>

        <div className="flex items-center justify-between mb-12 px-4 max-w-md mx-auto">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-sigap-blue text-white flex items-center justify-center font-bold shadow-lg shadow-sigap-blue/30">1</div>
            <span className="text-label-sm font-label-sm text-sigap-blue">Informasi</span>
          </div>
          <div className="h-px flex-1 bg-sigap-blue/20 mx-4 mb-6"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold bg-white/50">2</div>
            <span className="text-label-sm font-label-sm text-slate-500">Media & Lokasi</span>
          </div>
          <div className="h-px flex-1 bg-slate-200 mx-4 mb-6"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold bg-white/50">3</div>
            <span className="text-label-sm font-label-sm text-slate-500">Konfirmasi</span>
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 glass border border-green-200 text-green-700 rounded-2xl font-medium">
            ✅ Laporan Anda berhasil dikirim! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-8 md:p-12 space-y-gutter">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-slate-700">Nama Pelapor</label>
                <input
                  className="w-full h-12 px-4 rounded-xl border border-white/40 bg-white/50 focus:bg-white focus:ring-2 focus:ring-sigap-blue/20 outline-none transition-all font-body-md text-body-md"
                  placeholder="Masukkan nama lengkap"
                  type="text"
                  name="pelapor_nama"
                  value={formData.pelapor_nama}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-slate-700">Jenis Gangguan</label>
                <select
                  className="w-full h-12 px-4 rounded-xl border border-white/40 bg-white/50 focus:bg-white focus:ring-2 focus:ring-sigap-blue/20 outline-none transition-all font-body-md text-body-md"
                  name="jenis_gangguan"
                  value={formData.jenis_gangguan}
                  onChange={handleChange}
                >
                  <option value="">Pilih jenis gangguan</option>
                  <option>Jalan Rusak</option>
                  <option>Kemacetan</option>
                  <option>Kecelakaan</option>
                  <option>Lainnya</option>
                </select>
              </div>
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-slate-700">Lokasi Kejadian</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-3 text-slate-400">location_on</span>
                <input
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-white/40 bg-white/50 focus:bg-white focus:ring-2 focus:ring-sigap-blue/20 outline-none transition-all font-body-md text-body-md"
                  placeholder="Cari atau pilih lokasi di peta"
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full h-64 rounded-2xl overflow-hidden relative border border-white/40 mt-xs shadow-inner">
                <MapComponent reports={mapReports} onMapClick={handleMapClick} />
              </div>
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-slate-700">Deskripsi Laporan</label>
              <textarea
                className="w-full p-4 rounded-xl border border-white/40 bg-white/50 focus:bg-white focus:ring-2 focus:ring-sigap-blue/20 outline-none transition-all font-body-md text-body-md resize-none"
                placeholder="Ceritakan detail gangguan yang Anda temukan..."
                rows="4"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-slate-700">Upload Foto Bukti</label>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-white/30 p-10 flex flex-col items-center justify-center text-center hover:border-sigap-blue hover:bg-white/50 transition-all cursor-pointer group" onClick={() => document.getElementById('fileInput')?.click()}>
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <span className="material-symbols-outlined text-sigap-blue text-3xl">cloud_upload</span>
                </div>
                <h4 className="font-h3 text-h3 text-slate-800 mb-1">Tarik dan lepaskan foto di sini</h4>
                <p className="font-body-sm text-body-sm text-slate-500 mb-6">Mendukung format JPG, PNG hingga 10MB per file. Langsung terhubung ke sistem penyimpanan aman kami.</p>
                <button type="button" className="px-6 py-2 bg-white/80 border border-slate-200 text-sigap-blue font-label-md rounded-lg hover:bg-white transition-colors shadow-sm">Pilih File</button>
                <input id="fileInput" type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                {formData.image && (
                  <p className="text-sm text-emerald-600 mt-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    {formData.image.name}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-white/30 flex flex-col md:flex-row gap-4 justify-between items-center">
              <p className="font-body-sm text-body-sm text-slate-500 flex items-center gap-2">
                <span className="material-symbols-outlined text-sigap-blue text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                Data Anda aman dan hanya digunakan untuk kepentingan tindak lanjut laporan.
              </p>
              <div className="flex gap-4 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsDraft(true)
                    setFormData({
                      pelapor_nama: '',
                      jenis_gangguan: 'Jalan Rusak',
                      lokasi: '',
                      deskripsi: '',
                      image: null,
                      latitude: null,
                      longitude: null
                    })
                    setImagePreview('')
                  }}
                  className="flex-1 md:flex-none px-8 py-3 rounded-xl bg-slate-200/50 text-slate-700 font-label-md text-label-md hover:bg-slate-200 transition-colors backdrop-blur-sm"
                >
                  Draft
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 md:flex-none px-12 py-3 rounded-xl btn-gradient text-white font-label-md text-label-md shadow-xl shadow-sigap-blue/20 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  {loading ? 'Mengirim...' : 'Kirim Laporan'}
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="mt-8 p-4 glass border border-blue-100 rounded-2xl flex items-start gap-4">
          <span className="material-symbols-outlined text-sigap-blue">info</span>
          <div className="flex-1">
            <p className="font-label-md text-label-md text-sigap-blue">Layanan SIGAP Beroperasi 24/7</p>
            <p className="font-body-sm text-body-sm text-slate-600">Setiap laporan akan diverifikasi dalam waktu maksimal 2 jam oleh petugas di lapangan.</p>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/50 backdrop-blur-sm border-t border-white/20">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold text-sigap-blue">SIGAP</div>
          <p className="font-inter text-sm text-slate-500">© 2024 SIGAP - Sistem Informasi Gangguan Publik & Jalan</p>
        </div>
        <div className="flex gap-8">
          <a className="font-inter text-sm text-slate-500 hover:text-sigap-blue hover:underline transition-all cursor-pointer">Tentang Kami</a>
          <a className="font-inter text-sm text-slate-500 hover:text-sigap-blue hover:underline transition-all cursor-pointer">Kebijakan Privasi</a>
          <a className="font-inter text-sm text-slate-500 hover:text-sigap-blue hover:underline transition-all cursor-pointer">Bantuan</a>
          <a className="font-inter text-sm text-slate-500 hover:text-sigap-blue hover:underline transition-all cursor-pointer">Kontak</a>
        </div>
      </footer>

      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 md:hidden glass border-t border-white/20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center justify-center text-slate-400 hover:text-sigap-blue cursor-pointer" onClick={() => navigate('/')}
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">Beranda</span>
        </div>
        <div className="flex flex-col items-center justify-center text-sigap-blue bg-sigap-blue/5 rounded-xl px-4 py-1">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
          <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">Laporkan</span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400 hover:text-sigap-blue cursor-pointer" onClick={() => navigate('/dashboard')}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">Dashboard</span>
        </div>
      </nav>
    </div>
  )
}
