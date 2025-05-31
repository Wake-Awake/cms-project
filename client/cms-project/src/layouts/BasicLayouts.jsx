import { Link, Outlet } from 'react-router';
import { FcNook } from 'react-icons/fc';

function BasicLayouts() {
	return (
		<>
			<header className="fixed w-screen z-20 bg-white text-black py-4 shadow-lg flex flex-col sm:flex-row items-center justify-between px-6">
				<div className="text-2xl font-semibold flex items-center gap-2 text-2xl font-bold text-blue-600">
					<span role="img" aria-label="notes">
						<Link to={'/Home'}>
							<FcNook />
						</Link>
					</span>{' '}
					   <Link to={'/Home'}> Schedule Tracker</Link>
				</div>
				<div className="mt-3 sm:mt-0 flex gap-3">
					<div className="px-5 py-2 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition cursor-pointer">
						<Link to={'/Signin'}>Sign-in</Link>
					</div>
					<div className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shadow-md cursor-pointer">
						<Link to={'/Signup'}>Sign-up</Link>
					</div>
				</div>
			</header>
			<main className="h-screen bg-white">
				<Outlet />
			</main>
	
		</>
	);
}

export default BasicLayouts;
