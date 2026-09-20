import React from 'react'
import LoginCard from './LoginCard'
const LoginForm = () => {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                
                {/* Top Nav (Support Links) */}
                <div className="hidden sm:flex justify-end items-center gap-4 px-6 lg:px-10 py-5 text-sm font-medium text-[#0B2D5C] shrink-0">
                    <span className="flex items-center gap-2 cursor-pointer hover:text-[#10A9A5] transition-colors">
                        🎧 Need help?
                    </span>
                    <span className="h-4 w-px bg-slate-300" />
                    <span className="flex items-center gap-2 cursor-pointer hover:text-[#10A9A5] transition-colors">
                        🔄 Contact Support
                    </span>
                </div>

                {/* Form Container */}
                <div className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-12 xl:px-16 pb-10 pt-4">
                    <LoginCard />
                </div>
                
    </div>
  )
}

export default LoginForm
