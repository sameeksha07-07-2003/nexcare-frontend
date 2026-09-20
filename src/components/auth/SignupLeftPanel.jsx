import { Link } from "react-router-dom";
import { ShieldCheck, Clock, Heart } from "lucide-react";
import nexcareLogo from '../../assets/logo/nexcare-logo.svg';

const BENEFITS = [
    {
        icon: ShieldCheck,
        title: "Verified doctors",
        subtitle: "Trusted & qualified healthcare professionals",
    },
    {
        icon: Clock,
        title: "Book in minutes",
        subtitle: "Quick & hassle-free appointments",
    },
    {
        icon: Heart,
        title: "Your wellness, our mission",
        subtitle: "Better care for a healthier you",
    },
];

// Custom Medical Heart SVG to match target UI exactly
const MedicalHeartLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 xl:w-6 xl:h-6">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" />
        <path d="M11 7h2v3h3v2h-3v3h-2v-3H8v-2h3V7z" fill="#10A9A5" />
    </svg>
);

export default function SignupLeftPanel() {
    return (
        // Added pl-4 lg:pl-8 to fix the edge hugging issue
        <div className="hidden lg:flex flex-col justify-between h-full w-full max-w-[250px] xl:max-w-[270px] shrink-0 self-stretch py-4 pl-4 lg:pl-6">

            <div className="flex flex-col gap-9 xl:gap-8 [@media(max-height:780px)]:gap-4">
                {/* Logo */}
                <div className="relative z-10">
                    <img
                        src={nexcareLogo}
                        alt="NexCare"
                        className="h-12 xl:h-16 [@media(max-height:780px)]:h-12 w-auto"
                    />
                </div>

                {/* Headline and Description */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-[#0B2D5C] font-extrabold text-[34px] xl:text-4xl [@media(max-height:780px)]:text-[28px] leading-[1.1]">
                        Join a <br /> healthier <br /> <span className="text-[#10A9A5]">tomorrow</span>
                    </h1>
                    <p className="text-[#5B82AA] text-sm xl:text-[15px] leading-relaxed max-w-[230px] xl:max-w-[250px]">
                        Create your account to book appointments and manage your profile in one place.
                    </p>
                </div>

                {/* Benefits Section */}
                <div className="flex flex-col gap-6 xl:gap-7 [@media(max-height:780px)]:gap-4">
                    {BENEFITS.map(({ icon: Icon, title, subtitle }) => (
                        <div key={title} className="flex items-start gap-4">
                            <div className="w-10 h-10  xl:w-11 xl:h-11 rounded-full bg-[#E8F7F6] flex items-center justify-center shrink-0 mt-0.5">
                                <Icon className="w-5 h-5 text-[#10A9A5]" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col  max-w-[100px] xl:max-w-[130px] pb-2 [@media(max-height:780px)]:pb-1 justify-center">
                                <p className="text-[#0B2D5C] font-bold text-[13px] xl:text-sm">{title}</p>
                                <p className="text-[#5B82AA] text-[11px] xl:text-xs mt-0.5 leading-tight">{subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sign In Link */}
            {/* Gradient aur Blur effect background ko fade karne ke liye */}
            <div className="mt-auto p-4 -ml-4 rounded-xl bg-gradient-to-r from-white/90 via-white/50 to-transparent backdrop-blur-[3px] w-[95%] xl:w-[100%]">
                <div className="pt-2 border-t border-gray-300/80 w-[90%]">
                    <p className="text-[#0B2D5C] font-medium text-xs xl:text-sm mb-1">
                        Already have an account?
                    </p>
                    <Link to="/login" className="text-[#10A9A5] font-extrabold text-sm xl:text-base flex items-center gap-1 hover:underline w-fit">
                        Sign in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>

        </div>
    );
}