import { useState, useContext } from 'react';
import { Link } from 'react-router';
import AuthContext from '../context/AuthContext';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const { login } = useContext(AuthContext);

	function handleSubmit(event) {
		event.preventDefault();
		const result = login(email, password);
		if (!result) {
			setError('Invalid email or password');
			setTimeout(() => setError(''), 3000); // Hide after 3s
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
			<form
				onSubmit={handleSubmit}
				className="relative bg-white/90 dark:bg-gray-900/90 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 animate-slide-up"
			>
				{/* Error Toast */}
				{error && (
					<div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in">
						{error}
					</div>
				)}

				<div className="flex flex-col items-center mb-8">
					<div className="bg-indigo-500 rounded-full p-3 mb-3 shadow-md">
						<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0zM12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
						</svg>
					</div>
					<h2 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight drop-shadow">
						Welcome Back
					</h2>
					<p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">Log in to your account</p>
				</div>

				{/* Email */}
				<div className="mb-6">
					<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
						placeholder="you@example.com"
					/>
				</div>

				{/* Password + Toggle */}
				<div className="mb-8">
					<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Password
					</label>
					<div className="relative">
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
							placeholder="••••••••"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-indigo-600 hover:underline"
						>
							{showPassword ? 'Hide' : 'Show'}
						</button>
					</div>
				</div>

				{/* Submit */}
				<button
					type="submit"
					className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 font-bold shadow-md hover:shadow-lg"
				>
					Login
				</button>

				{/* Link */}
				<div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
					Don't have an account?{' '}
					<Link to="/Sign-up" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
						Sign up
					</Link>
				</div>
			</form>
		</div>
	);
}
