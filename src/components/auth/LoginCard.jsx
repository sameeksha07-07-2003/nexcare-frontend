import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login as loginRequest } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

// Turns whatever went wrong into a sentence a user can read.
function getLoginErrorMessage(error) {
    if (!error.isAxiosError) return error.message;
    if (!error.response) return 'Cannot reach the server. Check your connection and try again.';
    if (error.response.status === 401) {
        return error.response.data?.message || 'Invalid email or password.';
    }
    return error.response.data?.message || 'Something went wrong. Please try again.';
}

function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ defaultValues: { email: '', password: '' } });

    const onSubmit = async (values) => {
        setServerError('');
        try {
            const { token } = await loginRequest(values);
            login(token); // saves the session; PublicOnlyRoute then redirects automatically
        } catch (error) {
            setServerError(getLoginErrorMessage(error));
        }
    };

    return (
        <div className="w-full max-w-md py-4">

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D5C]">Welcome Back</h2>
            <p className="mt-1 text-sm text-[#5B82AA]">
                Log in to your NexCare account to continue your healthcare journey.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit, () => setServerError(''))} noValidate className="mt-5 space-y-4">

                {/* Server error banner */}
                {serverError && (
                    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                        {serverError}
                    </div>
                )}

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
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email address"
                            aria-invalid={errors.email ? 'true' : undefined}
                            className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#10A9A5] focus:border-transparent transition ${errors.email ? 'border-red-400' : 'border-slate-200'}`}
                            {...register('email', {
                                required: 'Enter your email address.',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Enter a valid email address.',
                                },
                            })}
                        />
                    </div>
                    {errors.email && (
                        <p role="alert" className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                    )}
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
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            aria-invalid={errors.password ? 'true' : undefined}
                            className={`w-full pl-11 pr-11 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#10A9A5] focus:border-transparent transition ${errors.password ? 'border-red-400' : 'border-slate-200'}`}
                            {...register('password', { required: 'Enter your password.' })}
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
                    {errors.password && (
                        <p role="alert" className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#14B8B3] to-[#0E8C88] text-white font-semibold py-2.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Logging in…' : 'Log In'}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>

            </form>

            {/* Signup link */}
            <p className="mt-4 text-center text-sm text-[#5B82AA]">
                Don't have an account?{' '}
                <Link to="/signup" className="text-[#10A9A5] font-semibold hover:underline">
                    Create an account
                </Link>
            </p>

        </div>
    );
}

export default LoginCard;
