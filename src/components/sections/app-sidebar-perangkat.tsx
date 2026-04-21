"use client";

import {
  Calendar,
  ClipboardList,
  Database,
  LayoutDashboard,
  MessageCircleMore,
  MessageCircleQuestion,
  Settings2,
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
        url: "/perangkat",
        icon: LayoutDashboard,
      },
      {
        title: "Kelola Masukan Warga",
        url: "/perangkat/kelola-masukan",
        icon: MessageCircleMore,
      },
      {
        title: "Kelola Data Master",
        url: "/perangkat/kelola-data",
        icon: Database,
      },
      {
        title: "Program Kelurahan",
        url: "/perangkat/program-kelurahan",
        icon: ClipboardList,
      },
      {
        title: "Atur Jadwal Program Mendatang",
        url: "/perangkat/jadwal-program",
        icon: Calendar,
      },
    ],
    navSecondary: [
      {
        title: "Setting Profile perangkat",
        url: `/perangkat/setting`,
        icon: Settings2,
      },
      {
        title: "Help",
        url: "/perangkat/help",
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
