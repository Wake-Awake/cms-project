import { Link } from "react-router-dom";


export default function Home() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'linear-gradient(120deg, #1e293b 0%,rgb(127, 99, 241) 100%), url(https://source.unsplash.com/featured/?technology)',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>
      {/* Top navigation for Sign In and Sign Up */}
      <nav className="absolute top-0 left-0 w-full flex justify-end items-center p-6 z-20">
        <Link
          to="/Sign-in"
          className="text-white font-semibold px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition mr-4 shadow-lg"
        >
          Sign In
        </Link>
        <Link
          to="/Sign-up"
          className="text-indigo-600 font-semibold px-5 py-2 rounded-full bg-white hover:bg-gray-100 transition shadow-lg"
        >
          Sign Up
        </Link>
      </nav>
      <section className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-12 max-w-2xl text-center text-white shadow-2xl border border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-3xl">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight">
            Welcome to My Application
          </h1>
          
          <p className="text-xl text-white/90 mb-10 font-medium">
            Build, connect, and grow with seamless tech solutions tailored for you.
          </p>
          <p></p>
          <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold px-10 py-4 rounded-full shadow-xl text-xl transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-300">
            <Link to="/Sign-in">
            Get Started <span className="ml-2 animate-bounce">🚀</span>
            </Link>
          </button>
        </div>
      </section>
    </main>
  );
}
