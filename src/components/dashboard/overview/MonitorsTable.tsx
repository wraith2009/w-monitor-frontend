import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Button } from "@/component/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

const monitors = [
  {
    id: 1,
    name: "API Gateway",
    url: "api.example.com",
    status: "up",
    uptime: 99.9,
    responseTime: 120,
  },
  {
    id: 2,
    name: "Database",
    url: "db.example.com",
    status: "down",
    uptime: 98.5,
    responseTime: 0,
  },
  {
    id: 3,
    name: "CDN",
    url: "cdn.example.com",
    status: "up",
    uptime: 99.8,
    responseTime: 85,
  },
  {
    id: 4,
    name: "Auth Service",
    url: "auth.example.com",
    status: "up",
    uptime: 99.7,
    responseTime: 95,
  },
  {
    id: 5,
    name: "Payment API",
    url: "pay.example.com",
    status: "up",
    uptime: 99.6,
    responseTime: 140,
  },
];

const MonitorsTable = () => (
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
            <TableHead className="text-gray-400 font-medium">Service</TableHead>
            <TableHead className="text-gray-400 font-medium">URL</TableHead>
            <TableHead className="text-gray-400 font-medium">Status</TableHead>
            <TableHead className="text-gray-400 font-medium">Uptime</TableHead>
            <TableHead className="text-gray-400 font-medium">
              Response Time
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monitors.map((monitor) => (
            <TableRow
              key={monitor.id}
              className="border-gray-800/20 hover:bg-gray-800/20 transition-colors duration-200"
            >
              <TableCell className="text-white font-medium">
                {monitor.name}
              </TableCell>
              <TableCell className="text-gray-400 font-mono text-sm">
                {monitor.url}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={
                    monitor.status === "up"
                      ? "bg-gray-700/50 text-gray-300"
                      : "bg-gray-600/50 text-gray-200"
                  }
                >
                  {monitor.status === "up" ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <XCircle className="w-3 h-3 mr-1" />
                  )}
                  {monitor.status}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-300">{monitor.uptime}%</TableCell>
              <TableCell className="text-gray-300 font-mono text-sm">
                {monitor.responseTime > 0 ? `${monitor.responseTime}ms` : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
export default MonitorsTable;
