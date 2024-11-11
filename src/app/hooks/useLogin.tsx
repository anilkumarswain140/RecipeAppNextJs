import { useState } from "react";
import { login } from "../api/apiService";
import { useRouter } from "next/navigation";
import { useToast } from "../contexts/ToastContext";
const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { showToast } = useToast();

    const handleUserLogin = async (formData) => {
        setLoading(true); // Set loading to true at the start of the request
        try {
            const response = await login(formData);
            // Type narrowing to check if response has a 'data' property
            if ('token' in response) {
                showToast("Login successful:", 'success');
                setLoading(false);
                localStorage.setItem('authToken', response.token);
                router.push('/recipe');
            } else {
                setLoading(false);
                setError(response.error || 'Unable to login'); // Handle custom error object
                showToast(response.error || 'Unable to login', 'error');

            }
        } catch (error) {
            setLoading(false);
            setError('Unable to login');
        }
    };

    return { handleUserLogin, loading, error };
}


export default useLogin;