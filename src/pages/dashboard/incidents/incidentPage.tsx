import { IncidentsScreen } from "@/components/dashboard/incidents/IncidentScreen";
const IncidentPage = () => {
  console.log("IncidentPage rendered");
  return (
    <div className="flex flex-col h-full">
      <IncidentsScreen />
    </div>
  );
};
export default IncidentPage;
