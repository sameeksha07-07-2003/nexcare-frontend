import { useState } from 'react';
import nexcareLogo from '../../assets/logo/nexcare-logo.svg';

function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-md py-4">

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D5C]">Welcome Back</h2>
            <p className="mt-1 text-sm text-[#5B82AA]">
                Log in to your NexCare account to continue your healthcare journey.
            </p>

            {/* Form */}
            <form className="mt-5 space-y-4">

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#0B2D5C] mb-1.5">
                        Email Address
                    </label>
                    <div className="relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8CA9C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email address"
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#10A9A5] focus:border-transparent transition"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-[#0B2D5C] mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8CA9C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#10A9A5] focus:border-transparent transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8CA9C4] hover:text-[#10A9A5] transition-colors"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Remember me / Forgot password */}
                <div className="flex items-center justify-between text-sm">
                    <label htmlFor="remember" className="flex items-center gap-2 text-[#0B2D5C] cursor-pointer">
                        <input id="remember" name="remember" type="checkbox" defaultChecked className="w-4 h-4 accent-[#10A9A5]" />
                        Remember me
                    </label>
                    <button type="button" className="text-[#10A9A5] font-medium hover:underline">
                        Forgot Password?
                    </button>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#14B8B3] to-[#0E8C88] text-white font-semibold py-2.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition"
                >
                    Log In
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-4">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Google button */}
            <button className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-[#0B2D5C] hover:bg-slate-50 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
            </button>

            {/* Signup link */}
            <p className="mt-4 text-center text-sm text-[#5B82AA]">
                Don't have an account?{' '}
                <button className="text-[#10A9A5] font-semibold hover:underline">
                    Create an account
                </button>
            </p>

        </div>
    );
}

export default LoginCard;