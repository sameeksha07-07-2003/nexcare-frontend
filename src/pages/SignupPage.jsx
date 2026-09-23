import { useEffect } from "react";
import signupBg from "../assets/images/signup_bg.png";
import SignupLeftPanel from "../components/auth/SignupLeftPanel";
import SignupRightPanel from "../components/auth/SignupRightPanel";
import SignupForm from "../components/auth/SignupForm";

export default function SignupPage() {
  // Lock the browser scrollbar on this page; restored when leaving the page.
  useEffect(() => {
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-x-hidden overflow-y-auto bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${signupBg})`, scrollbarWidth: "none" }}
    >
      <div className="flex min-h-full w-full items-center justify-center gap-6 px-4 py-2 sm:px-6 lg:justify-start lg:gap-8 lg:pl-8 lg:pr-4 xl:gap-4">
        <SignupLeftPanel />
        <SignupForm />
        <SignupRightPanel/>
      </div>
    </div>
  );
}