export interface Todo {
    id: number;
    title: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface TodoListProps{
    todos: Todo[];
    status?: string;
}