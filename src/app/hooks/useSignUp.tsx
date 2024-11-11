import { useState } from "react"
import * as api from '../api/apiService';
import { useRouter } from "next/navigation";
import { useToast } from "../contexts/ToastContext";
export const useSignUp = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const { showToast } = useToast();

    const handleSignUp = async (formData: any) => {
        setLoading(true);
        try {
            const response = await api.signUp(formData);

            if (response && response.status === 200) {
                showToast("Registration successful", 'success');
                setLoading(false);
                navigate.push('/login'); // Navigate to login after successful registration
                return response;
            } else {
                // Handle cases where the response is not 200 OK (e.g., 400 Bad Request)
                setError(`Registration failed: ${response?.error || 'Unknown error'}`);
                setLoading(false);
                showToast(`Registration failed. ${response?.error}` || 'Please try again later.', 'error');
            }
        } catch (error) {
            // Catch network or other errors
            setError(`Something went wrong, please try again later: ${error}`);
            setLoading(false);
            showToast('Something went wrong. Please try again later.', 'error');
        }
    };

    return { handleSignUp, error, loading };
}