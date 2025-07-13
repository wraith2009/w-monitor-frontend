import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import AuthLayout from "./AuthLayout";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return (
    <AuthLayout>
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
};

export default ResetPassword;
