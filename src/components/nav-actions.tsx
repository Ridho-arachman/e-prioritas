"use client";

import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  GalleryVerticalEnd,
  LineChart,
  Link,
  Settings2,
  Trash,
  Trash2,
} from "lucide-react";

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
import { useLogout } from "@/hooks/api/useAuth";
import { notifier } from "./ToastNotifier";
import { useState } from "react";

import { useAuthUser } from "@/hooks/useAuthUser"; // 🔥 Import Hook

export function NavActions() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { execute, loading } = useLogout();
  const { user } = useAuthUser(); // 🔥 Ambil user login
  console.log(user);

  // 📌 Tanggal sekarang
  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Ambil inisial user
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "USR";

  const data = [
    [
      { label: "Customize Page", icon: Settings2 },
      { label: "Turn into wiki", icon: FileText },
    ],
    [
      { label: "Copy Link", icon: Link },
      { label: "Duplicate", icon: Copy },
      { label: "Move to", icon: CornerUpRight },
      { label: "Move to Trash", icon: Trash2 },
    ],
    [
      { label: "Undo", icon: CornerUpLeft },
      { label: "View analytics", icon: LineChart },
      { label: "Version History", icon: GalleryVerticalEnd },
      { label: "Show delete pages", icon: Trash },
      { label: "Notifications", icon: Bell },
    ],
    [
      { label: "Import", icon: ArrowUp },
      { label: "Export", icon: ArrowDown },
      {
        label: "Logout",
        icon: CornerUpLeft,
        fn: async () => {
          const { data: res, error } = await execute(
            "/auth/logout",
            {},
            "/login"
          );

          if (error) {
            notifier.error(error);
            return;
          }

          notifier.success(res?.message || "Berhasil logout");
          router.push("/admin");
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
            <Avatar className="h-8 w-8">
              {/* Gambar user (jika ada) */}
              {user?.avatar ? (
                <AvatarImage src={user.nama} alt={user.name} />
              ) : (
                <AvatarImage src="/avatar.png" alt="User default" />
              )}

              {/* Inisial user */}
              <AvatarFallback className="bg-amber-300 text-amber-900">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
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
