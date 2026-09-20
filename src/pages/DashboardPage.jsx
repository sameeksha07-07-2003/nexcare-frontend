import { useAuth } from '../context/AuthContext'

function DashboardPage() {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
            <div className="w-full max-w-md text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D5C]">
                    You're logged in
                </h1>
                <p className="mt-2 text-sm text-[#5B82AA]">Signed in as {user?.email}</p>
                <p className="mt-1 text-sm text-[#5B82AA]">Role: {user?.role}</p>

                <button
                    type="button"
                    onClick={logout}
                    className="mt-6 px-8 bg-gradient-to-r from-[#14B8B3] to-[#0E8C88] text-white font-semibold py-2.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition"
                >
                    Log out
                </button>
            </div>
        </div>
    )
}

export default DashboardPage