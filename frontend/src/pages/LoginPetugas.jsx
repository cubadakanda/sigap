import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPetugas() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    identity: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulasi login
    setTimeout(() => {
      navigate('/manajemen')
    }, 1500)
  }

  return (
    <div className="bg-white text-on-background min-h-screen flex flex-col" style={{
      backgroundImage: 'linear-gradient(rgba(250, 248, 255, 0.85), rgba(250, 248, 255, 0.85)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuBBOuAJqxl3MVVOvGJTx_LjLv2jm3nzGlzxemu94wloZ53JCw1ZmmopMq28TIzvU6RR2xzXaMw00erOYx0X5YgNerdpUi3MCXijklyJKgYfKiTYiWfuyMF_FJ90n8lhP_nvW3tCWyLhg6P_G9gaMByWgaN5kTJ_9XvsuygL6AZxfkSOY4Drc7PM0IwZPS6iEAYBsZp9Il41EWpabr8U2OH22LBbxofGF0-dAS96SomcNjSLsUa8fNI2XCk9BZ3YYTzKHm-6tdgRPiEl)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* TopAppBar */}
      <header className="sticky top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div 
          className="text-2xl font-black tracking-tight text-blue-900 cursor-pointer"
          onClick={() => navigate('/')}
        >
          SIGAP
        </div>
        <nav className="hidden md:flex items-center gap-8 antialiased text-sm font-medium">
          <a 
            className="text-slate-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Beranda
          </a>
          <a 
            className="text-slate-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate('/laporkan')}
          >
            Laporkan
          </a>
          <a 
            className="text-slate-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </a>
        </nav>
        <button className="bg-blue-900 text-white px-5 py-2 rounded-lg font-medium text-sm active:scale-95 duration-150 transition-all">
          Login Petugas
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6">
        <div className="w-full max-w-md">
          {/* Branding Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-900/20">
              <span className="material-symbols-outlined text-4xl text-white" style={{fontVariationSettings: "'FILL' 1"}}>
                shield_with_heart
              </span>
            </div>
            <h1 className="font-bold text-3xl text-blue-900 mb-1">SIGAP</h1>
            <p className="font-normal text-sm text-slate-600 text-center">Sistem Informasi Gangguan Publik & Jalan</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="font-bold text-2xl text-on-surface mb-2">Login Petugas</h2>
              <p className="font-normal text-sm text-slate-600">Silakan masuk untuk mengelola laporan gangguan infrastruktur.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email/Username Field */}
              <div className="space-y-2">
                <label className="font-bold text-sm text-on-surface" htmlFor="identity">
                  Email atau Username
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                    person
                  </span>
                  <input
                    id="identity"
                    name="identity"
                    type="text"
                    value={formData.identity}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300/50 bg-white/50 focus:bg-white focus:border-2 focus:border-blue-900 focus:ring-0 font-normal text-base transition-all outline-none"
                    placeholder="Masukkan email atau username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-sm text-on-surface" htmlFor="password">
                    Kata Sandi
                  </label>
                  <a 
                    className="font-bold text-xs text-blue-900 hover:underline cursor-pointer"
                    onClick={() => alert('Fitur belum tersedia')}
                  >
                    Lupa Sandi?
                  </a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                    lock
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300/50 bg-white/50 focus:bg-white focus:border-2 focus:border-blue-900 focus:ring-0 font-normal text-base transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? 'Masuk...' : 'Masuk sebagai Petugas'}</span>
                {!loading && <span className="material-symbols-outlined text-[20px]">login</span>}
              </button>
            </form>

            {/* Helpful Info */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-start gap-3 bg-white/40 p-4 rounded-lg">
              <span className="material-symbols-outlined text-blue-900 text-[20px] flex-shrink-0">info</span>
              <p className="font-normal text-sm text-slate-600">
                Hanya petugas berwenang yang dapat mengakses dashboard pemantauan ini. Laporan publik dapat dibuat tanpa login.
              </p>
            </div>
          </div>

          {/* Illustration Background */}
          <div className="mt-12 flex justify-center opacity-40 grayscale">
            <img
              className="max-w-xs rounded-xl shadow-xl border border-white/20"
              alt="Smart City Grid"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1KYAwCNxbs80mdMxI1hnuZcDQPFBErCKk_EzY9tzK03NpCkLPZ5TbK5wZ2u9QpHSnwe6YPJA6QxqhuY17i9fF4A1yTBuvWY0PZDWlQrjX6ZIM-9v7mmeaWTEB4obSj1SRKoREfz60SS16SKS1FVU_2LfIedecx1jPL7Sx-GrhZO_zX52HsWCUzpOJdP_kEV3_P2Y_YttQClwIIdpBsP4Ben9yPfJ91o1CGWjems5R961ghlYZVE5nNzGwCLJ8M5Sa57BYxIFv2K97"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/50 backdrop-blur-sm border-t border-white/20">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold text-blue-900">SIGAP</div>
          <p className="text-sm text-slate-600">© 2024 SIGAP - Sistem Informasi Gangguan Publik & Jalan</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600">
          <a className="text-slate-500 hover:text-blue-800 hover:underline transition-all opacity-80 hover:opacity-100 cursor-pointer">
            Tentang Kami
          </a>
          <a className="text-slate-500 hover:text-blue-800 hover:underline transition-all opacity-80 hover:opacity-100 cursor-pointer">
            Kebijakan Privasi
          </a>
          <a className="text-slate-500 hover:text-blue-800 hover:underline transition-all opacity-80 hover:opacity-100 cursor-pointer">
            Bantuan
          </a>
          <a className="text-slate-500 hover:text-blue-800 hover:underline transition-all opacity-80 hover:opacity-100 cursor-pointer">
            Kontak
          </a>
        </div>
      </footer>
    </div>
  )
}
