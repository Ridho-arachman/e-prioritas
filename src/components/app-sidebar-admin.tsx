"use client";

import * as React from "react";
import {
  Blocks,
  Calendar,
  Database,
  LayoutDashboard,
  MessageCircleMore,
  MessageCircleQuestion,
  Settings2,
  Tags,
  Trash2,
  User2Icon,
} from "lucide-react";
import { NavFavorites } from "@/components/nav-favorites";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Modal from "./rekomendasi/Modal";

// This is sample data.
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
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <Modal />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
