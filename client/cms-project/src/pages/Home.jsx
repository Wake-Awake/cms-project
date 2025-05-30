import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50">
      {/* Navigation */}
      <nav className="w-full flex justify-between items-center p-6 bg-white shadow-sm">
        <span className="text-2xl font-bold text-blue-600">
          Schedule Tracker
        </span>
        <div className="flex gap-4">
          <Link
            to="/Sign-in"
            className="px-5 py-2 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
          >
            Sign In
          </Link>
          <Link
            to="/Sign-up"
            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shadow-md"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Organize Your Day <br />
            <span className="text-blue-500">Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, intuitive scheduling to keep you productive and stress-free
          </p>
        </div>

        {/* Demo Card */}
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              {/* Task Item */}
              <div className="flex items-center p-4 hover:bg-blue-50 rounded-lg transition cursor-pointer">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Morning Standup</h3>
                  <p className="text-sm text-gray-500">08:00 AM - 08:30 AM</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Completed
                </span>
              </div>

              {/* Task Item */}
              <div className="flex items-center p-4 hover:bg-blue-50 rounded-lg transition cursor-pointer">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Project Work</h3>
                  <p className="text-sm text-gray-500">09:00 AM - 12:00 PM</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                  In Progress
                </span>
              </div>

              {/* Task Item */}
              <div className="flex items-center p-4 hover:bg-blue-50 rounded-lg transition cursor-pointer">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Lunch Break</h3>
                  <p className="text-sm text-gray-500">12:00 PM - 01:00 PM</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Upcoming
                </span>
              </div>

              {/* Task Item */}
              <div className="flex items-center p-4 hover:bg-blue-50 rounded-lg transition cursor-pointer">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Client Meeting</h3>
                  <p className="text-sm text-gray-500">02:00 PM - 03:00 PM</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Upcoming
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/Sign-in"
          className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shadow-lg hover:shadow-xl"
        >
          Get Started - It's Free
        </Link>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 w-full">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Time Management</h3>
            <p className="text-gray-600">Efficiently organize your daily schedule with intuitive time blocks.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Task Tracking</h3>
            <p className="text-gray-600">Easily track your tasks and monitor your progress throughout the day.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Access</h3>
            <p className="text-gray-600">Fast and responsive interface that saves you time and effort.</p>
          </div>
        </div>
      </section>
    </main>
  );
}