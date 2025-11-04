export async function loginUser(credentials: { email: string; password: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });

    if (response.status == 401) {
        throw { message: 'Invalid credentials', statusCode: 401 }
    }
    if (!response.ok) {
        throw { message: 'Internal error, please try later', statusCode: 500 }
    }
    return response.json();
}

export async function checkToken(token: string) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/check`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });
    console.log(`checkToken status: ${response.status}, ${token}`);
    if (!response.ok)
        return null;

    const data = await response.json();
    return data.user;
}

export async function fetchTodos(token: string, status?: string) {

    const response = status ?
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo-list?status=${status}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) :
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo-list`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
    if (!response.ok) {
        console.log(`response: ${response.status}`);
        switch(response.status){
            case 404:
                return null;
                break;
            default:
                throw new Error('Failed to fetch todo list');        
        }
        
    }
    return response.json();
}

export async function fetchTodoById(token: string, id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo-list/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        switch(response.status){
            case 404:
                return null;
                break;
            default:
                throw new Error('Failed to fetch todo item');        
        }
    }
    return response.json();
}

export async function addTodo(item: { title: string, description: string, status: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo-list`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        console.log(`add todo error response: ${response.statusText}`)
        throw new Error('Failed to add todo item');
    }
    return response.json();
}

export async function updateTodo(id: string, updates: Partial<{ title: string; description: string; status: string }>) {
    console.log(updates);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo-list/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(updates),
    });
    if (!response.ok) {
        throw new Error('Failed to update todo item');
    }
    return response.json();
}

export async function deleteTodo(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo-list/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo item');
    }
    return response.json();
}

export async function logout(){
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {
        method: 'POST',
        credentials: 'include'
    });

}