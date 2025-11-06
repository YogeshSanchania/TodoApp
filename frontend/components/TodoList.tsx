"use client";
import { useRouter } from "next/navigation";
import { deleteTodo } from "@/lib/api";
import { TodoListProps } from "@/types/todo";
import { useEffect, useState } from "react";

export default function TodoList({ todos, status }: TodoListProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleDelete = async (id: number) => {
        setLoading(true);
        try {
            await deleteTodo(id);
            router.refresh();
        } catch (error) {
            console.error('Error deleting todo item:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 bg-gray-500 flex items-center justify-center z-50">
                    <div className="loader"></div>
                </div>
            )}
            <div>
                <div className="flex justify-between items-center mb-4">

                    <form method="get" className="flex items-center">
                        <label htmlFor="status" className="mr-2 font-bold">Filter by Status:</label>
                        <select id="status" name="status" className="border border-gray-300 rounded-md p-2" defaultValue={status} onChange={(e) => { e.target.form?.submit(); }}>
                            <option value="">All</option>
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </form>
                    <button className="text-white cursor-pointer bg-green-500 py-2 rounded-md px-4 mb-4" onClick={() => router.push('/todo/add')}>
                        Add New Todo
                    </button>
                </div>
                {todos ?
                    <table className="table-responsive w-full mb-4">
                        <thead>
                            <tr className="bg-gray-200 dark:text-black">
                                <th className="text-left p-2 border-b">Title</th>
                                <th className="text-left p-2 border-b">Description</th>
                                <th className="text-left p-2 border-b">Status</th>
                                <th className="text-left p-2 border-b w-50">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((todo) => (
                                <tr key={todo.id}>
                                    <td className="p-2 border-b">{todo.title}</td>
                                    <td className="p-2 border-b">{todo.description}</td>
                                    <td className="p-2 border-b">{todo.status}</td>
                                    <td className="p-2 border-b">
                                        <button className="text-white cursor-pointer bg-blue-500 py-2 rounded-md px-4 mr-3" onClick={() => router.push(`/todo/${todo.id}`)}>
                                            Edit
                                        </button>
                                        <button className="text-white cursor-pointer bg-red-500 py-2 rounded-md px-4 mr-3" onClick={() => handleDelete(todo.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : <p>No todo found</p>}
            </div>
        </>
    )
}