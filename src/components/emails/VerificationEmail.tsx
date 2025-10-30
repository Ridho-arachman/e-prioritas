import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Button,
  Img,
  Section,
} from "@react-email/components";

interface VerificationEmailProps {
  nama: string;
  verifyUrl: string;
}

export const VerificationEmail = ({
  nama,
  verifyUrl,
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Verifikasi Akun Anda di E - Prioritas</Preview>
    <Body
      style={{ backgroundColor: "#f6f9fc", fontFamily: "Arial, sans-serif" }}
    >
      <Container
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        {/* 🔹 LOGO / GAMBAR */}
        <Section style={{ marginBottom: "20px" }}>
          <Img
            alt="Ode Grinder"
            className="mx-auto"
            height={250}
            src="https://react.email/static/ode-grinder.jpg"
          />
        </Section>

        {/* 🔹 TEKS UTAMA */}
        <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
          Halo, {nama} 👋
        </Text>
        <Text>
          Terima kasih telah bergabung di platform <b>Desa Digital</b>.
        </Text>
        <Text>
          Klik tombol di bawah ini untuk memverifikasi akun perangkat desa Anda
          dan mulai menggunakan sistem:
        </Text>

        {/* 🔹 TOMBOL VERIFIKASI */}
        <Button
          href={verifyUrl}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "6px",
            textDecoration: "none",
            display: "inline-block",
            marginTop: "20px",
          }}
        >
          Verifikasi Akun
        </Button>

        <Text style={{ fontSize: "12px", color: "#6b7280", marginTop: "20px" }}>
          Jika tombol tidak berfungsi, salin dan tempel tautan berikut ke
          browser Anda:
        </Text>
        <Text
          style={{ fontSize: "12px", color: "#3b82f6", wordBreak: "break-all" }}
        >
          {verifyUrl}
        </Text>

        <Text style={{ marginTop: "30px", fontSize: "12px", color: "#9ca3af" }}>
          © {new Date().getFullYear()} Desa Digital — Semua Hak Dilindungi
        </Text>
      </Container>
    </Body>
  </Html>
);
