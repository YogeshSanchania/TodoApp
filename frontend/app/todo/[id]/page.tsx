import { NavBar } from "@/components/NavBar";
import TodoForm from "@/components/TodoForm";
import { checkToken, fetchTodoById, fetchTodos } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UpdateTodoPage({ params }: any) {

    const cookie = await cookies();
    const token = cookie?.get('token')?.value || '';
    const user = await checkToken(token);

    if (!user) {
        redirect('/login');
    }

    const { id } = await params;
    const todo = await fetchTodoById(token, +id);
    //const todo = todos.find((t: { id: number }) => t.id === parseInt(id));


    return (
        <div>
            <NavBar user={user} />
            <main className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Update Todo</h1>
                {todo ?
                    <TodoForm todo={todo} />
                    : <p>Todo item not found with id: {id}</p>}
            </main>
        </div>
    )
}