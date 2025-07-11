import { IncidentsScreen } from "@/components/dashboard/incidents/IncidentScreen";
import { useAuthStore } from "@/stores/authStore";
import { EmailVerificationCard } from "@/components/dashboard/EmailVerificationCard";
const IncidentPage = () => {
  console.log("IncidentPage rendered");
  const { user } = useAuthStore();
  if (!user?.emailVerified) {
    return <EmailVerificationCard />;
  }
  return (
    <div className="flex flex-col h-full">
      <IncidentsScreen />
    </div>
  );
};
export default IncidentPage;
