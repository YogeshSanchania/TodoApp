
import { NavBar } from "@/components/NavBar";
import TodoList from "@/components/TodoList";
import { checkToken, fetchTodos, logout } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function HomePage({ searchParams }: any) {


    const cookie = await cookies();
    const token = cookie?.get('token')?.value || '';
    const user = await checkToken(token);

    if (!user) {
        redirect('/login');
    }

    const { status } = await searchParams;
    const todos = await fetchTodos(token, status);
    return (
        <div>
            <NavBar user={user} />
            <main className="container mx-auto p-4">
                <TodoList todos={todos} status={status} />
            </main>
        </div>
    );
}