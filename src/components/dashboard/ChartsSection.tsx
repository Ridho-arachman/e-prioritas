"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export default function ChartsSection() {
  const monthlyData = [
    { month: "Jan", waiting: 4, accepted: 6, rejected: 2 },
    { month: "Feb", waiting: 3, accepted: 8, rejected: 1 },
    { month: "Mar", waiting: 5, accepted: 10, rejected: 3 },
    { month: "Apr", waiting: 4, accepted: 12, rejected: 1 },
    { month: "May", waiting: 6, accepted: 9, rejected: 2 },
    { month: "Jun", waiting: 3, accepted: 11, rejected: 2 },
    { month: "Jul", waiting: 5, accepted: 14, rejected: 3 },
    { month: "Aug", waiting: 7, accepted: 13, rejected: 2 },
    { month: "Sep", waiting: 6, accepted: 10, rejected: 1 },
    { month: "Oct", waiting: 4, accepted: 8, rejected: 1 },
    { month: "Nov", waiting: 3, accepted: 9, rejected: 0 },
    { month: "Dec", waiting: 5, accepted: 11, rejected: 2 },
  ];

  const dataMasterCategory = [
    { name: "Kependudukan", value: 12 },
    { name: "Pendidikan", value: 8 },
    { name: "Kesehatan", value: 6 },
    { name: "Infrastruktur", value: 4 },
    { name: "Lainnya", value: 2 },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Line Chart */}
      <Card className="border border-gray-200 hover:shadow-md transition-all">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Tren Masukan Warga (12 Bulan)
          </CardTitle>
          <CardDescription>
            Visualisasi data masukan diterima, menunggu, dan ditolak per bulan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accepted"
                  stroke="#16a34a"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="waiting"
                  stroke="#facc15"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="rejected"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="border border-gray-200 hover:shadow-md transition-all">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Distribusi Data Master
          </CardTitle>
          <CardDescription>
            Jumlah data master berdasarkan kategori.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataMasterCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
