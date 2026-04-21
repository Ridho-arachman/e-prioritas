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
        url: "/lurah",
        icon: LayoutDashboard,
      },
      {
        title: "Melihat Masukan Warga",
        url: "/lurah/kelola-masukan",
        icon: MessageCircleMore,
      },
      {
        title: "Melihat Data Master",
        url: "/lurah/kelola-data",
        icon: Database,
      },
      {
        title: "Melihat Program Kelurahan",
        url: "/lurah/program-kelurahan",
        icon: ClipboardList,
      },
      {
        title: "Persetujuan Jadwal Program Mendatang",
        url: "/lurah/jadwal-program",
        icon: Calendar,
      },
    ],
    navSecondary: [
      {
        title: "Setting Profile lurah",
        url: `/lurah/setting`,
        icon: Settings2,
      },
      {
        title: "Help",
        url: "/lurah/help",
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
