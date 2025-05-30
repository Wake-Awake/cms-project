import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

export default function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { register } = useContext(AuthContext);

	function handleSubmit(event) {
		event.preventDefault();
		register(email, password);
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 animate-fade-in">
			<form
				onSubmit={handleSubmit}
				className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200 animate-slide-up"
			>
				<h2 className="text-4xl font-extrabold mb-10 text-center text-indigo-700 tracking-tight drop-shadow">
					Join Us Today
				</h2>

				{/* Email Input */}
				<div className="mb-6">
					<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-300"
						placeholder="you@example.com"
					/>
				</div>

				{/* Password Input */}
				<div className="mb-8">
					<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
						Password
					</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-300"
						placeholder="••••••••"
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 font-bold shadow-md hover:shadow-lg"
				>
					Create Account
				</button>

				{/* Sign-in Link */}
				<div className="mt-6 text-center text-sm text-gray-600">
					Already have an account?{' '}
					<a href="/Sign-in" className="text-indigo-600 hover:underline font-medium">
						Sign in
					</a>
				</div>
			</form>
		</div>
	);
}
