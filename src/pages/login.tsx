import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const loginInfo = await signInWithPopup(auth, googleProvider);
    console.log(loginInfo);
    navigate("/");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};
