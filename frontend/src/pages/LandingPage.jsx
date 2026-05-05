import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 glass-nav sticky top-0">
        <div className="text-2xl font-black tracking-tight text-sigap-blue drop-shadow-sm">SIGAP</div>
        <nav className="hidden md:flex items-center gap-8 font-inter antialiased text-sm font-medium">
          <a className="text-sigap-blue border-b-2 border-sigap-blue pb-1 cursor-pointer">Beranda</a>
          <a 
            className="text-slate-600 hover:text-sigap-blue transition-colors duration-200 cursor-pointer"
            onClick={() => navigate('/laporkan')}
          >
            Laporkan
          </a>
          <a 
            className="text-slate-600 hover:text-sigap-blue transition-colors duration-200 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </a>
        </nav>
        <button 
          onClick={() => navigate('/login')}
          className="px-5 py-2 bg-sigap-blue text-on-primary rounded-xl font-label-md transition-all active:scale-95 duration-150 ease-in-out shadow-lg shadow-sigap-blue/20"
        >
          Login Petugas
        </button>
      </header>

      <main className="pt-16 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative min-h-[800px] flex items-center overflow-hidden px-8 lg:px-32">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1e3a8a_0%,transparent_60%)]"></div>
          </div>
          <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed mb-6 glass-card">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span className="text-label-sm uppercase tracking-wider font-bold">Respon Cepat & Akurat</span>
              </div>
              <h1 className="text-h1 md:text-[56px] leading-[1.1] text-sigap-blue mb-6 font-extrabold tracking-tight text-shadow-sm">
                SIGAP: Sistem Informasi Gangguan & Pantauan Jalan
              </h1>
              <p className="text-body-lg text-secondary mb-10 leading-relaxed opacity-90">
                Platform pelaporan berbasis komunitas untuk mewujudkan infrastruktur jalan yang aman. Laporkan kemacetan, kecelakaan, hingga kerusakan jalan langsung dari genggaman Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/laporkan')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sigap-blue to-blue-700 text-on-primary rounded-2xl font-bold text-body-md shadow-xl shadow-sigap-blue/25 hover:brightness-110 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">campaign</span>
                  Laporkan Gangguan
                </button>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center justify-center gap-2 px-8 py-4 glass-card text-sigap-blue rounded-2xl font-bold text-body-md hover:bg-white/90 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">dashboard</span>
                  Pantau Dashboard
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-blue-200/30 rounded-[40px] blur-3xl -z-10"></div>
              <div className="rounded-[32px] overflow-hidden shadow-2xl border border-white/40">
                <img 
                  className="w-full h-[500px] object-cover" 
                  alt="Command Center Interface"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP0j-Zg6E3m7S_RwVlwUW8Pio5CO3z3fV_xVJRkwv2SUVZGKBwro8Vn13BcZTi0AXCMwFv46xFeKGlt88KIJjQYOzp5E8dCLdJ-AWBw5Aaha8lkROZMKpqYuiCn7AwiIYwJS-aflJqd7Dk6Z56z7hNHRaMsRkWQ1zfqBJM0U1DUOxCaAoRKDSickAoGRf23SoUF5FI_Uomt_DuaiVkgBzZm855b-q6J-TgIu9P2gXlFeMPV33uVpau-xu8zSgSIC9auu4qPwg1g00w"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 px-8 bg-surface-container-low/50">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-h2 text-sigap-blue mb-4 text-shadow-sm">Fitur Unggulan Monitor Jalan</h2>
              <p className="text-body-md text-secondary">Kami menyediakan ekosistem pelaporan yang terintegrasi untuk mempercepat penanganan gangguan publik secara transparan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Feature Card 1 */}
              <div className="md:col-span-2 glass-card p-10 rounded-[32px] flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
                <div>
                  <div className="w-14 h-14 bg-blue-50/50 rounded-2xl flex items-center justify-center text-sigap-blue mb-8 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">sensors</span>
                  </div>
                  <h3 className="text-h3 text-sigap-blue mb-4">Real-time Monitoring</h3>
                  <p className="text-body-md text-secondary leading-relaxed max-w-lg">
                    Pantau kondisi lalu lintas dan gangguan publik di seluruh wilayah secara langsung. Data diperbarui setiap detik melalui sensor IoT dan laporan warga di lapangan.
                  </p>
                </div>
                <div className="mt-12 rounded-2xl overflow-hidden border border-white/20">
                  <img 
                    className="w-full h-48 object-cover object-center" 
                    alt="Digital Heat Map"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzPmMIgw-QoND8sOTXe6e3RxE3YShQXfGT1usRtA3iu-53cZm4QAktLkiU4PDldHuROPPLI5DtvWneuF2sc1q2K1ltuZsnJCtTBDYKcigHb1cyH4sYBmBlwYq3armzq_qfGfomxu-1xhJaodZA-88EzWziM32XClnbuwEGE-Inag7vdyOZvieXSXc7FC-BDVnC6aRd0jnde5tw3z37t6nNG4xaX9f1wsOGtFYx8GAF1cqDfnub-uKN3EwvZbx7n5ESSbcY0TU_O2Fk"
                  />
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-sigap-blue p-10 rounded-[32px] text-on-primary flex flex-col justify-between hover:brightness-110 transition-all shadow-xl shadow-sigap-blue/20">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8">
                  <span className="material-symbols-outlined text-[32px]">quick_reference_all</span>
                </div>
                <div>
                  <h3 className="text-h3 mb-4 text-shadow-sm">Official Response</h3>
                  <p className="text-body-sm opacity-80 leading-relaxed mb-8">
                    Setiap laporan divalidasi dan diteruskan langsung ke instansi terkait. Lacak status penanganan dari 'Pending' hingga 'Selesai' secara transparan.
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/5">
                      <span className="material-symbols-outlined text-amber-400">pending</span>
                      <span className="text-label-sm">Divalidasi Petugas</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/5">
                      <span className="material-symbols-outlined text-blue-300">sync</span>
                      <span className="text-label-sm">Dalam Perbaikan</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="glass-card p-8 rounded-[32px] group hover:border-sigap-blue/20 transition-all">
                <div className="w-12 h-12 bg-slate-50/50 rounded-xl flex items-center justify-center text-slate-700 mb-6 group-hover:bg-sigap-blue group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
                <h3 className="text-label-md font-bold text-sigap-blue mb-2">Analitik Publik</h3>
                <p className="text-body-sm text-secondary">Akses data statistik bulanan untuk melihat area dengan tingkat gangguan tertinggi.</p>
              </div>

              {/* Feature Card 4 */}
              <div className="glass-card p-8 rounded-[32px] group hover:border-sigap-blue/20 transition-all">
                <div className="w-12 h-12 bg-slate-50/50 rounded-xl flex items-center justify-center text-slate-700 mb-6 group-hover:bg-sigap-blue group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <h3 className="text-label-md font-bold text-sigap-blue mb-2">Kolaborasi Warga</h3>
                <p className="text-body-sm text-secondary">Bergabunglah dengan ribuan warga lainnya untuk menciptakan lingkungan kota yang lebih baik.</p>
              </div>

              {/* Feature Card 5 */}
              <div className="glass-card p-8 rounded-[32px] group hover:border-sigap-blue/20 transition-all">
                <div className="w-12 h-12 bg-slate-50/50 rounded-xl flex items-center justify-center text-slate-700 mb-6 group-hover:bg-sigap-blue group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">map</span>
                </div>
                <h3 className="text-label-md font-bold text-sigap-blue mb-2">Peta Interaktif</h3>
                <p className="text-body-sm text-secondary">Visualisasi peta gangguan dengan filter kategori yang memudahkan navigasi perjalanan.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Content Section */}
        <section className="py-24 px-8">
          <div className="container mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img 
                className="rounded-[48px] w-full aspect-square object-cover shadow-2xl" 
                alt="Smart City Infrastructure"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3qxfzjw1cs3kZ0y1OspqHr2FkYooxC-Nv3GBGDaujhvxHFbl23WgkfqHviOyqJxAYyr4lVOlVVtoULp5TAZrZzBPGiLntqUk32YCqgHzv_CCJuSbSu1U5WEjH5no7tP9uzlXRDw3VCGhZQJDqlUd1YrSXNyCFaGFTAi_1DPeQxzrpm03cZQ0YcAKDvsIDjOJPFoduMLMPIrCFrnSfnKhvEbSbZmzB3cMNY2du7v48xIA0ucsl56CGsIKYmJF4ZH_U0I8-3GpdBmNk"
                />
              <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-3xl max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  </div>
                  <div>
                    <div className="text-label-md text-sigap-blue">Selesai Ditangani</div>
                    <div className="text-body-sm text-secondary">Jl. Sudirman KM 12</div>
                  </div>
                </div>
                <p className="text-body-sm text-on-secondary-container">Perbaikan lubang jalan telah selesai dilakukan oleh Dinas Bina Marga.</p>
              </div>
            </div>
            <div>
              <h2 className="text-h2 text-sigap-blue mb-8 text-shadow-sm">Wujudkan Jalanan Aman Bersama Kami</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-fixed glass-card rounded-2xl flex items-center justify-center text-sigap-blue font-bold text-h3">1</div>
                  <div>
                    <h4 className="text-label-md font-bold text-sigap-blue mb-2">Ambil Foto Gangguan</h4>
                    <p className="text-body-sm text-secondary">Temukan hambatan atau kerusakan jalan, ambil foto yang jelas sebagai bukti otentik di lapangan.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-fixed glass-card rounded-2xl flex items-center justify-center text-sigap-blue font-bold text-h3">2</div>
                  <div>
                    <h4 className="text-label-md font-bold text-sigap-blue mb-2">Unggah & Deskripsikan</h4>
                    <p className="text-body-sm text-secondary">Pilih kategori gangguan, tambahkan deskripsi singkat, dan sistem akan otomatis mendeteksi lokasi GPS Anda.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-fixed glass-card rounded-2xl flex items-center justify-center text-sigap-blue font-bold text-h3">3</div>
                  <div>
                    <h4 className="text-label-md font-bold text-sigap-blue mb-2">Pantau Proses Penanganan</h4>
                    <p className="text-body-sm text-secondary">Dapatkan notifikasi langsung saat laporan Anda diterima, diproses, hingga dinyatakan selesai oleh petugas.</p>
                  </div>
                </div>
              </div>
              <button className="mt-12 group flex items-center gap-3 text-sigap-blue font-bold hover:gap-5 transition-all text-shadow-sm cursor-pointer">
                Pelajari Selengkapnya 
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 md:hidden glass-nav shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <a className="flex flex-col items-center justify-center text-sigap-blue bg-blue-50/50 rounded-xl px-4 py-1 active:scale-90 transition-transform cursor-pointer">
          <span className="material-symbols-outlined">home</span>
          <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">Beranda</span>
        </a>
        <a 
          className="flex flex-col items-center justify-center text-slate-500 hover:text-sigap-blue active:scale-90 transition-transform cursor-pointer"
          onClick={() => navigate('/laporkan')}
        >
          <span className="material-symbols-outlined">campaign</span>
          <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">Laporkan</span>
        </a>
        <a 
          className="flex flex-col items-center justify-center text-slate-500 hover:text-sigap-blue active:scale-90 transition-transform cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">Dashboard</span>
        </a>
      </nav>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50 backdrop-blur-sm border-t border-white/20 mt-20">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="text-lg font-bold text-sigap-blue">SIGAP</div>
          <p className="font-inter text-sm text-slate-600">© 2024 SIGAP - Sistem Informasi Gangguan Publik & Jalan</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-slate-500 hover:text-sigap-blue hover:underline transition-all opacity-80 hover:opacity-100 font-inter text-sm cursor-pointer">Tentang Kami</a>
          <a className="text-slate-500 hover:text-sigap-blue hover:underline transition-all opacity-80 hover:opacity-100 font-inter text-sm cursor-pointer">Kebijakan Privasi</a>
          <a className="text-slate-500 hover:text-sigap-blue hover:underline transition-all opacity-80 hover:opacity-100 font-inter text-sm cursor-pointer">Bantuan</a>
          <a className="text-slate-500 hover:text-sigap-blue hover:underline transition-all opacity-80 hover:opacity-100 font-inter text-sm cursor-pointer">Kontak</a>
        </div>
      </footer>
    </div>
  )
}
