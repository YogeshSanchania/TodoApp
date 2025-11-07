import { NavBar } from "@/components/NavBar";
import TodoForm from "@/components/TodoForm";
import { checkToken } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AddTodoPage() {

    const cookie = await cookies();
    const token = cookie?.get('token')?.value || '';
    const user = await checkToken(token);

    if (!user) {
        redirect('/login');
    }

    return (
        <div>
            <NavBar user={user} />
            <main className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Add New Todo</h1>
                <TodoForm />
            </main>
        </div>
    );
}