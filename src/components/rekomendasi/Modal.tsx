"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusSquare } from "lucide-react";
import { useCreateRekomendasi } from "@/hooks/api/useRekomendasi";
import { notifier } from "../ToastNotifier";

export default function ModalRekomendasi() {
  const [open, setOpen] = useState(false);
  const [tujuan, setTujuan] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { error, execute, loading } = useCreateRekomendasi();

  const handleClick = async () => {
    if (!tujuan.trim()) return;

    const { data, error } = await execute("/protected/rekomendasi", {
      judulLaporan: tujuan,
    });

    if (error) {
      notifier.error(error);
      return;
    }

    notifier.success(data?.message || "Berhasil menambahkan rekomendasi!");
    setTujuan("");
    setOpen(false);
  };

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <>
      {/* Tombol buka modal */}
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all cursor-pointer"
      >
        <PlusSquare className="w-5 h-5" />
        Rekomendasi AI
      </Button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md w-full bg-white rounded-xl shadow-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Tujuan Rekomendasi
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClick();
            }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="tujuan" className="text-gray-700 font-medium">
                Tujuan Rekomendasi
              </Label>
              <Input
                id="tujuan"
                ref={inputRef}
                value={tujuan}
                onChange={(e) => setTujuan(e.target.value)}
                placeholder="Masukkan tujuan rekomendasi"
                required
                disabled={loading}
                className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-md transition"
              />
            </div>

            <DialogFooter className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all cursor-pointer"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
