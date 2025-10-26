"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Perangkat = {
  id: string;
  name: string;
  email: string;
  jabatan: string;
  isActive: boolean;
  createdAt: string;
};

export default function PerangkatListPage() {
  const [data, setData] = useState<Perangkat[]>([
    {
      id: "1",
      name: "Ridho",
      email: "ridho@mail.com",
      jabatan: "Kades",
      isActive: true,
      createdAt: "2025-10-20",
    },
    {
      id: "2",
      name: "Najil",
      email: "najil@mail.com",
      jabatan: "Sekdes",
      isActive: false,
      createdAt: "2025-10-21",
    },
  ]);
  const [search, setSearch] = useState("");

  const filtered = data.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      d.jabatan.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((x) => x.id !== id));
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>👥 Kelola Perangkat</CardTitle>
          <Link href="/admin/kelola-perangkat/add">
            <Button>Tambah Perangkat</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <Input
              placeholder="Cari nama / email / jabatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/3"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    Tidak ada data
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.email}</TableCell>
                    <TableCell>{p.jabatan}</TableCell>
                    <TableCell>
                      {p.isActive ? (
                        <Badge variant="default">Aktif</Badge>
                      ) : (
                        <Badge variant="destructive">Nonaktif</Badge>
                      )}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Link href={`/perangkat/edit/${p.id}`}>
                        <Button size="sm">Edit</Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(p.id)}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
