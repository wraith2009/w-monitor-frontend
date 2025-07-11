import SignInForm from "../../components/auth/SignInForm";
import AuthLayout from "./AuthLayout";
import { useLocation } from "react-router-dom";
const SignIn = () => {
  const location = useLocation();
  const { email, password } = location.state || {};
  console.log("SignIn location state:", { email, password });
  return (
    <AuthLayout>
      <SignInForm prefill={{ email, password }} />
    </AuthLayout>
  );
};

export default SignIn;
