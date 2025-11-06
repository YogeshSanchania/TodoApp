"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTodo, updateTodo } from "@/lib/api";

export default function TodoForm({ todo }: { todo?: { id: number; title: string; description: string; status: string } }) {
    const [title, setTitle] = useState(todo ? todo.title : "");
    const [description, setDescription] = useState(todo ? todo.description : "");
    const [status, setStatus] = useState(todo ? todo.status : "PENDING");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (todo) {
                await updateTodo(todo.id.toString(), { title, description, status });
            } else {
                await addTodo({ title, description, status });
            }
            router.push("/");
        } catch (err) {
            console.error(`Error processing request`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="loader"></div>
                </div>
            )}
            <a href="/" className="decoration-0 font-bold">Back To List</a>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
                <div className="mb-4">
                    <label className="block dark:text-gray-100 text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 dark:text-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required />
                </div>
                <div className="mb-4">
                    <label className="block dark:text-gray-100 text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 dark:text-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required />
                </div>
                <div className="mb-4">
                    <label className="block dark:text-gray-100 text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 dark:text-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        {todo ? "Update Todo" : "Add Todo"}
                    </button>
                </div>
            </form>
        </>
    );
}

