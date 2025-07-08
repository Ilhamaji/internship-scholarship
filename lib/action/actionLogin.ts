import axios from "axios";
import { createSession } from "@/lib/sessions";

export default async function actionLogin(formData: FormData) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });
      setAccessToken(response.data.accessToken);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
}
