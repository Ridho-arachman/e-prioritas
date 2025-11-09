"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

export default function ActivityStats() {
  const stats = {
    masukanAccepted: 45,
    masukanRejected: 12,
    masukanWaiting: 8,
  };

  const chartData = [
    { name: "Diterima", value: stats.masukanAccepted },
    { name: "Ditolak", value: stats.masukanRejected },
    { name: "Menunggu", value: stats.masukanWaiting },
  ];

  const COLORS = ["#16a34a", "#ef4444", "#facc15"]; // hijau, merah, kuning

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-all">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-green-500" />
          Statistik Aktivitas
        </CardTitle>
        <CardDescription>Perbandingan jumlah masukan warga</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-64 flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
