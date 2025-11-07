'use client';
import { logout } from "@/lib/api";
import { useRouter } from "next/navigation";

export function NavBar({ user }: any) {

    const router = useRouter();
    const handleLogout = async (e:any) => {
        e.target.text = 'Logging out';
        await logout();
        router.refresh();
        window.location.href = "/login";
    }

    return (
        <nav style={{
            background: 'linear-gradient(90deg, #0b2545, #1f6fbf)'
        }} className="relative px-2 text-white">
            <div className="relative flex h-16 items-center justify-between">
                <h1 className="text-3xl font-bold">Todo App</h1>
                <form onSubmit={handleLogout} className="flex flex-col items-end">
                    <label className="mx-2">Welcome, {user.name}!</label>
                    <button className="button cursor-pointer decoration-underline mx-2">Logout</button>
                </form>
            </div>
        </nav>
    )
}