import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { useMonitors } from "@/hooks/useMonitors";
import LoadingSpinner from "@/components/shared/LoadingSpinner"; // Replace with your spinner component
import { useAuthStore } from "@/stores/authStore";

const MonitorsTable = () => {
  const { user } = useAuthStore();
  if (user?.emailVerified !== true) {
    return;
  }
  const { data: monitors, isLoading, error } = useMonitors();
  if (isLoading) return <LoadingSpinner />;
  const filteredMonitors = monitors?.filter(
    (monitor) => monitor.isDeleted !== true
  );
  if (error) {
    return (
      <Card className="bg-[#1f1f1f] border-gray-800/50">
        <CardContent className="p-6 text-center">
          <p className="text-red-400">Failed to load monitors.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1f1f1f] border-gray-800/50">
      <CardHeader className="border-b border-gray-800/30 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Monitor Status
            </CardTitle>
            <p className="text-gray-500 text-sm mt-1">
              Current status of all monitored services
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-400 hover:bg-gray-800/40 hover:text-white"
          >
            Add Monitor
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800/30 hover:bg-transparent">
              <TableHead className="text-gray-400 font-medium">
                Service
              </TableHead>
              <TableHead className="text-gray-400 font-medium">URL</TableHead>
              <TableHead className="text-gray-400 font-medium">
                Status
              </TableHead>
              <TableHead className="text-gray-400 font-medium">
                Uptime
              </TableHead>
              <TableHead className="text-gray-400 font-medium">
                Response Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMonitors?.map((monitor) => (
              <TableRow
                key={monitor.id}
                className="border-gray-800/20 hover:bg-gray-800/20 transition-colors duration-200"
              >
                <TableCell className="text-white font-medium">
                  {monitor.websiteName}
                </TableCell>
                <TableCell
                  className="text-gray-400 font-mono text-sm cursor-pointer"
                  onClick={() => window.open(monitor.url, "_blank")}
                >
                  {monitor.url}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      monitor.status === "UP"
                        ? "bg-gray-700/50 text-gray-300"
                        : "bg-gray-600/50 text-gray-200"
                    }
                  >
                    {monitor.status === "UP" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {monitor.status ?? "unknown"}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-300">
                  {monitor.uptimePercentage !== undefined
                    ? `${monitor.uptimePercentage}%`
                    : "—"}
                </TableCell>
                <TableCell className="text-gray-300 font-mono text-sm">
                  {monitor.averageResponseTime
                    ? `${monitor.averageResponseTime}ms`
                    : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MonitorsTable;
