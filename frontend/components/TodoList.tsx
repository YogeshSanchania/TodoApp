"use client";
import { useRouter } from "next/navigation";
import { deleteTodo } from "@/lib/api";
import { TodoListProps } from "@/types/todo";
import { useEffect, useState } from "react";

export default function TodoList({ todos, status }: TodoListProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [screenWidth, setScreenWidth] = useState<number | null>(null);


    const handleTodoView = (id: number) => {
        setLoading(true);
        router.push(`/todo/${id}`)
    }
    const renderMobileList = () => {
        if (!todos) return <p>No todo found</p>;

        return (
            <div className="space-y-4">
                {todos.map((todo) => (
                    <div key={todo.id} className="p-4 border rounded-md focus:bg-gray-50" onClick={() => { handleTodoView(todo.id) }}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold">{todo.title}</h3>
                                <p className="text-sm dark:text-gray-100 text-gray-600">{todo.description.length > 20 ? todo.description.slice(0, 40) + "..." : todo.description}</p>
                                <p className="text-xs mt-2 font-bold">{todo.status}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    className="text-white bg-blue-500 py-1 px-3 rounded"
                                    onClick={() => {
                                        setLoading(true);
                                        router.push(`/todo/${todo.id}`);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-white bg-red-500 py-1 px-3 rounded"
                                    onClick={() => handleDelete(todo.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderList = () => {
        if (!todos) return <p>No todo found</p>;
        return (
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
                                <button className="text-white cursor-pointer bg-blue-500 py-2 rounded-md px-4 mr-3" onClick={() => {
                                    setLoading(true);
                                    router.push(`/todo/${todo.id}`);
                                }}>
                                    Edit
                                </button>
                                <button className="text-white cursor-pointer bg-red-500 py-2 rounded-md px-4 mr-3" onClick={() => handleDelete(todo.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

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

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    }

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    if (screenWidth === null) {
        return <div className="flex justify-center items-center h-40 text-gray-500">Loading...</div>;
    }
    const isMobile = screenWidth <= 700;
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
                    <button className="text-white cursor-pointer bg-green-500 rounded-md px-3 py-2 sm:px-4 lg:px-5" onClick={() => {
                        setLoading(true);
                        router.push('/todo/add')
                    }}>
                        Add New Todo
                    </button>
                </div>
                {
                    isMobile ? renderMobileList() : renderList()
                }
            </div>
        </>
    )
}