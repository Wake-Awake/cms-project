import { Link } from "react-router-dom";


export default function Home() {
  return (
    <main
      className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 flex flex-col"
    >
      {/* Top navigation */}
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
      <section className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-10 max-w-3xl w-full shadow-2xl border border-white/30">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-white drop-shadow-lg text-center">
            Schedule Tracker
          </h1>
          <p className="text-lg text-white/90 mb-8 text-center">
            Organize your day, manage your tasks, and stay productive!
          </p>
          {/* Schedule Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white/80 rounded-xl shadow-lg">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left text-indigo-700 font-bold">Time</th>
                  <th className="py-3 px-4 text-left text-indigo-700 font-bold">Task</th>
                  <th className="py-3 px-4 text-left text-indigo-700 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-indigo-50/60 transition">
                  <td className="py-3 px-4">08:00 AM</td>
                  <td className="py-3 px-4">Morning Standup</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">Completed</span>
                  </td>
                </tr>
                <tr className="hover:bg-indigo-50/60 transition">
                  <td className="py-3 px-4">10:00 AM</td>
                  <td className="py-3 px-4">Project Work</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-semibold">In Progress</span>
                  </td>
                </tr>
                <tr className="hover:bg-indigo-50/60 transition">
                  <td className="py-3 px-4">01:00 PM</td>
                  <td className="py-3 px-4">Lunch Break</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Upcoming</span>
                  </td>
                </tr>
                <tr className="hover:bg-indigo-50/60 transition">
                  <td className="py-3 px-4">03:00 PM</td>
                  <td className="py-3 px-4">Client Meeting</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Upcoming</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-10">
            <Link
              to="/Sign-in"
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold px-10 py-4 rounded-full shadow-xl text-xl transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Get Started <span className="ml-2 animate-bounce">🚀</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
