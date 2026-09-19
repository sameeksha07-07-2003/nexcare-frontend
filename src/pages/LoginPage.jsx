import LoginCard from '../components/auth/LoginCard';
import LoginHero from '../components/auth/LoginHero';

function LoginPage() {
    return (
        <div className="h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-[1.5fr_0.95fr]">

            <div className="min-h-0">
                <LoginHero />
            </div>

            <div className="min-h-0 bg-white flex flex-col overflow-hidden">

                <div className="hidden lg:flex justify-end items-center gap-6 px-8 py-4 text-sm font-medium text-[#0B2D5C] shrink-0">
                    <span className="flex items-center gap-2 cursor-pointer hover:text-[#10A9A5] transition-colors">
                        🎧 Need help?
                    </span>
                    <span className="h-4 w-px bg-slate-300" />
                    <span className="flex items-center gap-2 cursor-pointer hover:text-[#10A9A5] transition-colors">
                        🔄 Contact Support
                    </span>
                </div>

                <div className="flex-1 min-h-0 flex items-center justify-center overflow-y-auto px-6 sm:px-12 lg:px-16 pb-6">
                    <LoginCard />
                </div>

            </div>

        </div>
    );
}

export default LoginPage;