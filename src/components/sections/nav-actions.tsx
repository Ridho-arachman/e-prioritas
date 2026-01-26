"use client";

import { cn } from "@/lib/utils";
import { CornerUpLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

import { notifier } from "../../lib/ToastNotifier";
import { useState } from "react";
import { AxiosError } from "axios";
import { ApiError } from "@/types/ApiError";
import { usePost } from "@/hooks/useApi";

export function NavActions() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { post, loading } = usePost("/auth/logout");

  // 📌 Tanggal sekarang
  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Ambil inisial user
  // const initials = user?.name
  //   ? user.name
  //       .split(" ")
  //       .map((n: string) => n[0])
  //       .join("")
  //       .toUpperCase()
  //   : "USR";

  const data = [
    [
      {
        label: "Logout",
        icon: CornerUpLeft,
        fn: async () => {
          try {
            await post({});
            notifier.success("Berhasil Logout", "Selamat Tinggal !!!..");
            router.refresh();
          } catch (error) {
            const err = error as AxiosError<ApiError>;
            notifier.error("Logout Gagal", err.response?.data?.message);
          }
        },
        style: "bg-red-500 text-white",
      },
    ],
  ];

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="text-muted-foreground hidden font-medium md:inline-block">
        Tanggal : {today}
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild className="cursor-pointer">
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-accent h-8 w-8 rounded-full justify-center"
          >
            {/* <Avatar className="h-8 w-8">
              {user?.avatar ? (
                <AvatarImage src={user.nama} alt={user.name} />
              ) : (
                <AvatarImage src="/avatar.png" alt="User default" />
              )}

              <AvatarFallback className="bg-amber-300 text-amber-900">
                {initials}
              </AvatarFallback>
            </Avatar> */}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-64 overflow-hidden rounded-lg p-0"
          align="end"
        >
          {/* <div className="p-4 border-b flex items-center gap-3">
            <Avatar className="h-12 w-12">
              {user?.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarImage src="/avatar.png" alt="User default" />
              )}
              <AvatarFallback className="bg-amber-300 text-amber-900">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="font-semibold text-sm">
                {user?.name || "User"}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div> */}

          {/* MENU YANG SUDAH ADA */}
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, i) => (
                <SidebarGroup key={i} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, idx) => (
                        <SidebarMenuItem key={idx}>
                          <SidebarMenuButton
                            className={cn("cursor-pointer", item.style)}
                            onClick={item.fn}
                            disabled={loading}
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  );
}
