export default function Home() {
  return (
    <main className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://source.unsplash.com/featured/?technology)' }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <section className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 max-w-xl text-center text-white shadow-2xl border border-white/20">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow">
            Welcome to My Application
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Build, connect, and grow with seamless tech solutions tailored for you.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg text-lg transition duration-300 transform hover:scale-105">
            Get Started 🚀
          </button>
        </div>
      </section>
    </main>
  );
}
