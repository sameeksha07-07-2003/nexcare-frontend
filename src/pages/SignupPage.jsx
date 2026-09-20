import LoginCard from '../components/auth/LoginCard';
import LoginForm from '../components/auth/LoginForm';
import LoginHero from '../components/auth/LoginHero';
import SignupForm from '../components/auth/SignupForm';
const SignupPage = () => {
   return (
        // Added responsive grid columns to ensure form never squishes on small laptops
        <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-[1.1fr_1fr] xl:grid-cols-[1.3fr_1fr] 2xl:grid-cols-[1.45fr_1fr] bg-white overflow-hidden">
            
            {/* Left Side - Hero Section */}
            <div className="hidden lg:block min-h-0 h-screen">
                <LoginHero />
            </div>

            {/* Right Side - Login Form */}
            <SignupForm/>
        </div>
    );
}

export default SignupPage
