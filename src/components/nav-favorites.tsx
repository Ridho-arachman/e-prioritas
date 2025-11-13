"use client";

import {
  ArrowUpRight,
  Link,
  MoreHorizontal,
  Search,
  StarOff,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useGetAllJudulRekomendasi } from "@/hooks/api/useRekomendasi";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

type Item = {
  id: string;
  judul: string;
};

export function NavFavorites() {
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const {
    data: judul,
    error,
    isLoading,
    refresh,
  } = useGetAllJudulRekomendasi();

  // STATE untuk jumlah yang ditampilkan
  const [visibleCount, setVisibleCount] = useState(5);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    refresh();
  }, [judul]);

  const filtered = useMemo(() => {
    if (!judul) return [];
    return judul.filter((item: Item) =>
      item.judul.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, judul]);

  if (error) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>List Rekomendasi AI</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-600 font-semibold">
              Terjadi error saat memuat data.
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  if (isLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>List Rekomendasi AI</SidebarGroupLabel>
        <SidebarMenu>
          {Array.from({ length: 5 }).map((_, idx) => (
            <SidebarMenuItem key={idx}>
              <SidebarMenuButton className="animate-pulse flex space-x-2">
                <div className="w-5 h-5 bg-gray-300 rounded" />
                <div className="h-4 w-24 bg-gray-300 rounded" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  // Potong list sesuai jumlah visibleCount
  const visibleItems = judul?.slice(0, visibleCount) || [];

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <div className="flex items-center justify-between">
          <SidebarGroupLabel>List Rekomendasi AI</SidebarGroupLabel>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen(true)}
            className="h-6 w-6"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <SidebarMenu>
          {visibleItems.map((item: Item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                isActive={pathname === `/admin/rekomendasi/${item.id}`}
              >
                <a href={`/admin/rekomendasi/${item.id}`} title={item.judul}>
                  <span>🤖</span>
                  <span className="truncate">{item.judul}</span>
                </a>
              </SidebarMenuButton>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <StarOff className="text-muted-foreground" />
                    <span>Remove from Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link className="text-muted-foreground" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ArrowUpRight className="text-muted-foreground" />
                    <span>Open in New Tab</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}

          {/* Tombol More */}
          {judul && visibleCount < judul.length && (
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
                onClick={() => setVisibleCount((prev) => prev + 5)}
              >
                <MoreHorizontal />
                <span>Lihat lebih banyak...</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroup>

      {/* ===== DIALOG SEARCH ===== */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cari Rekomendasi</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              placeholder="Ketik judul rekomendasi..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />

            <div className="max-h-64 overflow-y-auto border rounded-md p-2">
              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Tidak ada hasil ditemukan
                </p>
              )}
              {filtered.map((item: Item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    window.location.href = `/admin/rekomendasi/${item.id}`;
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-muted"
                >
                  🤖 {item.judul}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
