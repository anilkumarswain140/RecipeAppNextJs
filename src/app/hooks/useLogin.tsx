import { useState } from "react";
import { login } from "../api/apiService";
import { useRouter } from "next/navigation";
import { useToast } from "../contexts/ToastContext";
import { setCookie } from "../../../utils/cookieUtils";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  const handleUserLogin = async (formData) => {
    setLoading(true); // Set loading to true at the start of the request
    try {
      const response = await login(formData);
      // Type narrowing to check if response has a 'data' property
      if ("token" in response) {
        showToast("Login successful:", "success");
        setLoading(false);
        const token = response.token;
        setCookie("authToken", token, 7);
        router.push("/recipe");
      } else {
        setLoading(false);
        setError(response.error || "Unable to login"); // Handle custom error object
        showToast(response.error || "Unable to login", "error");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError("Unable to login");
    }
  };

  return { handleUserLogin, loading, error };
};

export default useLogin;
