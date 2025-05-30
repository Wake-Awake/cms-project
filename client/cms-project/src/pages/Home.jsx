import { Link } from "react-router-dom";


export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-fuchsia-900 via-violet-800 to-fuchsia-700 flex flex-col">
      {/* Top navigation */}
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-20 bg-fuchsia-900/20 backdrop-blur-md shadow-md">
          <span className="text-2xl font-bold text-fuchsia-300 tracking-wide drop-shadow-sm">
            Schedule Tracker
          </span>
          <div>
            <Link
          to="/Sign-in"
          className="text-white font-semibold px-5 py-2 rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 transition mr-4 shadow-lg cursor-pointer duration-200"
            >
          Sign In
            </Link>
            <Link
          to="/Sign-up"
          className="text-fuchsia-700 font-semibold px-5 py-2 rounded-full bg-white hover:bg-fuchsia-50 transition shadow-lg cursor-pointer duration-200"
            >
          Sign Up
            </Link>
          </div>
        </nav>
        <section className="flex flex-1 items-center justify-center px-4 py-24">
          <div className="bg-fuchsia-100/20 backdrop-blur-xl rounded-3xl p-10 max-w-3xl w-full shadow-2xl border border-fuchsia-200/30">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x">
          Schedule Tracker
            </h1>
            <p className="text-lg text-fuchsia-100/90 mb-8 text-center">
          Organize your day, manage your tasks, and stay productive! 🎯
            </p>
            <div className="overflow-x-auto">
          <table className="min-w-full bg-fuchsia-50/80 rounded-xl shadow-lg">
            <thead>
              <tr>
            <th className="py-3 px-4 text-left text-fuchsia-700 font-bold cursor-pointer ">Time</th>
            <th className="py-3 px-4 text-left text-fuchsia-700 font-bold cursor-pointer">Task</th>
            <th className="py-3 px-4 text-left text-fuchsia-700 font-bold cursor-pointer">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-fuchsia-100/60 transition cursor-pointer">
            <td className="py-3 px-4">08:00 AM</td>
            <td className="py-3 px-4">Morning Standup</td>
            <td className="py-3 px-4">
              <span className="inline-block px-3 py-1 bg-emerald-200 text-emerald-800 rounded-full text-xs font-semibold cursor-pointer">Completed</span>
            </td>
              </tr>
              <tr className="hover:bg-fuchsia-100/60 transition cursor-pointer">
            <td className="py-3 px-4">10:00 AM</td>
            <td className="py-3 px-4">Project Work</td>
            <td className="py-3 px-4">
              <span className="inline-block px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-xs font-semibold cursor-pointer">In Progress</span>
            </td>
              </tr>
              <tr className="hover:bg-fuchsia-100/60 transition cursor-pointer">
            <td className="py-3 px-4">01:00 PM</td>
            <td className="py-3 px-4">Lunch Break</td>
            <td className="py-3 px-4">
              <span className="inline-block px-3 py-1 bg-sky-200 text-sky-800 rounded-full text-xs font-semibold">Upcoming</span>
            </td>
              </tr>
              <tr className="hover:bg-fuchsia-100/60 transition cursor-pointer">
            <td className="py-3 px-4">03:00 PM</td>
            <td className="py-3 px-4">Client Meeting</td>
            <td className="py-3 px-4">
              <span className="inline-block px-3 py-1 bg-sky-200 text-sky-800 rounded-full text-xs font-semibold">Upcoming</span>
            </td>
              </tr>
            </tbody>
          </table>
            </div>
            <div className="flex justify-center mt-10">
          <Link
            to="/Sign-in"
            className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white font-bold px-10 py-4 rounded-full shadow-xl text-xl transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 cursor-pointer"
          >
            Get Started <span className="ml-2 animate-bounce">🚀</span>
          </Link>
            </div>
          </div>
        </section>
      
      <style>
        {`
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s linear infinite;
          }
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}
      </style>
    </main>
  );
}
