"use client";

import {
  Calendar,
  ClipboardList,
  Database,
  LayoutDashboard,
  MessageCircleMore,
  MessageCircleQuestion,
  Settings2,
  Tags,
  User2Icon,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/sections/nav-main";
import { NavSecondary } from "@/components/sections/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Kelola Perangkat",
        url: "/admin/kelola-perangkat",
        icon: User2Icon,
      },
      {
        title: "Kelola Kategori",
        url: "/admin/kelola-kategori",
        icon: Tags,
      },
      {
        title: "Kelola Masukan Warga",
        url: "/admin/kelola-masukan",
        icon: MessageCircleMore,
      },
      {
        title: "Kelola Data Master",
        url: "/admin/kelola-data",
        icon: Database,
      },
      {
        title: "Program Kelurahan",
        url: "/admin/program-kelurahan",
        icon: ClipboardList,
      },
      {
        title: "Atur Jadwal Program Mendatang",
        url: "/admin/jadwal-program",
        icon: Calendar,
      },
    ],
    navSecondary: [
      {
        title: "Setting Profile Admin",
        url: `/admin/setting`,
        icon: Settings2,
      },
      {
        title: "Help",
        url: "/admin/help",
        icon: MessageCircleQuestion,
      },
    ],
  };
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <span className="flex  items-center justify-center p-2">
          <h1 className="text-2xl font-semibold flex items-center justify-center">
            <Image src="/logo.svg" width={50} height={50} alt="logo" />E -
            Prioritas
          </h1>
        </span>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavFavorites /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
