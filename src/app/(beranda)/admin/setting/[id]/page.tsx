"use client";

import React, { useState } from "react";

// Mock Components (gantilah dengan import asli shadcn/ui jika sudah siap)
const Card = ({ children, className }: any) => (
  <div className={`border rounded-xl p-8 shadow-sm bg-white ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ children }: any) => (
  <div className="mb-6 space-y-1">{children}</div>
);
const CardContent = ({ children }: any) => (
  <div className="space-y-4">{children}</div>
);

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  id,
  disabled = false,
}: any) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 transition"
  />
);

const Label = ({ children, htmlFor }: any) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-semibold text-gray-700"
  >
    {children}
  </label>
);

const Button = ({
  children,
  onClick,
  variant = "default",
  disabled = false,
}: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-5 py-3 rounded-lg font-semibold transition w-full md:w-auto ${
      variant === "secondary"
        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
        : "bg-blue-600 text-white hover:bg-blue-700"
    } disabled:opacity-50`}
  >
    {children}
  </button>
);

const Separator = () => <div className="border-t my-12"></div>;

// Profile Interface
interface UserProfile {
  name: string;
  email: string;
  jabatan: string;
}

const initialProfile: UserProfile = {
  name: "Bambang Sutrisno",
  email: "bambang.admin@panggungjati.go.id",
  jabatan: "Staf Seksi Pembangunan",
};

const ProfileSettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const handleSaveProfile = () => {
    console.log("Menyimpan Profil:", profile);
    alert("Profil berhasil diperbarui!");
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Kata sandi baru dan konfirmasi tidak cocok!");
      return;
    }
    console.log("Mengubah Kata Sandi baru:", newPassword);
    alert("Kata sandi berhasil diubah!");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div className="max-w-3xl w-full">
        {/* HEADER BLOG */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-3 leading-tight">
            ⚙️ Pengaturan Profil Pengguna
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Kelola informasi dasar akun dan amankan akses Anda dengan
            memperbarui kata sandi secara berkala.
          </p>
        </header>

        {/* PROFILE CARD */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Informasi Dasar Akun</h2>
            <p className="text-gray-500 text-sm">
              Perbarui data nama dan jabatan Anda.
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                />
              </div>

              <div>
                <Label htmlFor="jabatan">Jabatan</Label>
                <Input
                  id="jabatan"
                  value={profile.jabatan}
                  onChange={handleProfileChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email (Tidak Dapat Diubah)</Label>
              <Input id="email" value={profile.email} disabled />
            </div>

            <div className="pt-4">
              <Button onClick={handleSaveProfile}>
                Simpan Perubahan Profil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SEPARATOR BLOG */}
        <Separator />

        {/* PASSWORD CARD */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Ubah Kata Sandi</h2>
            <p className="text-gray-500 text-sm">
              Gunakan kata sandi yang kuat untuk menjaga keamanan akun.
            </p>
          </CardHeader>

          <CardContent>
            <div>
              <Label htmlFor="newPassword">Kata Sandi Baru</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e: any) => setNewPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">
                Konfirmasi Kata Sandi Baru
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi baru"
              />
            </div>

            <div className="pt-4">
              <Button onClick={handleChangePassword}>Ubah Kata Sandi</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
