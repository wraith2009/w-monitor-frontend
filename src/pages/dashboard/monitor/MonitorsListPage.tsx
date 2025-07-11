import MonitorsList from "@/components/dashboard/monitors/MonitorList";
import { useAuthStore } from "@/stores/authStore";
import { EmailVerificationCard } from "@/components/dashboard/EmailVerificationCard";
const MonitorsListPage = () => {
  const { user } = useAuthStore();
  if (!user?.emailVerified) {
    return <EmailVerificationCard />;
  }
  return (
    <div className="space-y-6">
      <MonitorsList />
    </div>
  );
};

export default MonitorsListPage;
