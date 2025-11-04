import { redirect } from 'next/navigation';
import { checkToken } from '@/lib/api';


export async function useAuth() {

    try {
        const userData = await checkToken();
        if (!userData) redirect('/login');
        const user = userData.user;
        return { user };
    } catch (err) {
        console.error('Auth check failed:', err);
        redirect('/login');
    } finally {

    }
}
