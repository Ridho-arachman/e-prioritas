"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React, { useState } from "react";

const Textarea = ({ value, onChange, placeholder, id }: any) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={5}
    className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
  />
);

interface ScheduleForm {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const initialSchedule: ScheduleForm = {
  title: "",
  date: "",
  time: "",
  location: "Kelurahan Panggungjati",
  description: "",
};

const UpcomingProgramScheduler: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleForm>(initialSchedule);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSchedule({ ...schedule, [e.target.id]: e.target.value });
  };

  const handleScheduleEvent = () => {
    if (!schedule.title || !schedule.date || !schedule.time) {
      alert("Judul, Tanggal, dan Waktu wajib diisi.");
      return;
    }

    console.log("Menjadwalkan Acara Baru:", schedule);
    alert(
      `Program "${schedule.title}" berhasil dijadwalkan pada ${schedule.date} ${schedule.time}.`
    );
    setSchedule(initialSchedule);
  };

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div className="max-w-3xl w-full">
        {/* BLOG HEADER */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            📅 Penjadwalan Program Mendatang
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Formulir berikut digunakan untuk menjadwalkan program yang sudah
            disetujui menjadi event resmi Kelurahan. Data yang Anda masukkan
            akan otomatis terhubung dengan sistem kalender internal.
          </p>
        </header>

        {/* BLOG CONTENT / CARD */}
        <Card className="shadow-sm border rounded-xl">
          <CardContent className="space-y-6 py-8">
            {/* Nama Program */}
            <div className="space-y-2">
              <Label htmlFor="title" className="font-semibold">
                Nama Program / Acara *
              </Label>
              <Input
                id="title"
                value={schedule.title}
                onChange={handleInputChange}
                placeholder="Contoh: Pelatihan Digitalisasi UMKM Tahap 1"
                className="py-3"
              />
            </div>

            {/* GRID INPUT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="font-semibold">
                  Tanggal *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={schedule.date}
                  onChange={handleInputChange}
                  className="py-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="font-semibold">
                  Waktu Mulai *
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={schedule.time}
                  onChange={handleInputChange}
                  className="py-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="font-semibold">
                  Lokasi
                </Label>
                <Input
                  id="location"
                  value={schedule.location}
                  onChange={handleInputChange}
                  placeholder="Cth: Aula Kelurahan"
                  className="py-3"
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-2">
              <Label htmlFor="description" className="font-semibold">
                Deskripsi Acara
              </Label>
              <Textarea
                id="description"
                value={schedule.description}
                onChange={handleInputChange}
                placeholder="Jelaskan detail acara serta pihak-pihak yang terlibat."
              />
            </div>

            {/* Button */}
            <div className="pt-4">
              <Button
                onClick={handleScheduleEvent}
                disabled={!schedule.title || !schedule.date || !schedule.time}
                className="w-full py-4 text-md font-semibold"
              >
                Jadwalkan ke Kalender
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpcomingProgramScheduler;
