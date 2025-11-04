import TodoForm from "@/components/TodoForm";

export default function AddTodoPage() {
    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Add New Todo</h1>
            <TodoForm />
        </main>
    );
}