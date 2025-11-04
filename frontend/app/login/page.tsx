'use client';
import { useState, useEffect } from 'react';
import { loginUser } from '@/lib/api';
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const router = useRouter();

    useEffect(() => {
        // ensure the page has no default body margin and apply a fallback gradient
        const prevBodyBg = document.body.style.background;
        const prevBodyMargin = document.body.style.margin;
        document.body.style.margin = '0';
        document.body.style.background = 'linear-gradient(90deg, #0b2545, #1f6fbf)';
        return () => {
            document.body.style.background = prevBodyBg;
            document.body.style.margin = prevBodyMargin;
        };
    }, []);

    const [errors, setErrors] = useState({ username: '', password: '' });

    const validateForm = () => {
        const newErrors = {
            username: username.trim() === '' ? 'Username is required' : '',
            password: password.trim() === '' ? 'Password is required' : ''
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const data = await loginUser({ email: username, password });
            console.log(`access_token after login: ${data.access_token}`);
            setLoginError('');
            router.refresh();
            router.push('/');
        }
        catch (error: any) {
            setLoginError(error.message || 'Something went wrong');
        }
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(90deg, #0b2545, #1f6fbf)',

            }}
            className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-900 to-blue-700"
        >
            <div
                style={{ width: '100%', maxWidth: 500, padding: 32 }}
                className="w-full max-w-md p-8"
            >
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                    <p className="mt-2 text-white">Please sign in to your account</p>
                </div>
                <form onSubmit={handleLogin} className="bg-white rounded-lg shadow-2xl p-8">
                    <label className="w-full text-center text-red-500">
                        {
                            loginError != '' ? 'Invalid credentials' : ''
                        }
                    </label>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                        <label className="block text-sm font-semibold mb-2 text-red-500">
                            {
                                errors ? errors.username : ''
                            }
                        </label>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <label className="block text-sm font-semibold mb-2 text-red-500">
                            {
                                errors ? errors.password : ''
                            }
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}