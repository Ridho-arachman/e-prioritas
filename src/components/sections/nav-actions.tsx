"use client";

import { cn } from "@/lib/utils";
import { CornerUpLeft, User, Mail, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { motion, AnimatePresence } from "framer-motion";

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
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { notifier } from "@/lib/ToastNotifier";
import { ApiError } from "@/types/ApiError";
import { usePost } from "@/hooks/useApi";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/stores/userStore";

// Komponen Avatar dengan Next/Image untuk optimasi cache
const NextAvatarImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="32px"
        className="rounded-full object-cover"
        priority={false}
        quality={75}
      />
    </div>
  );
};

export function NavActions() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { user, isLoading } = useUser();
  const { post, loading } = usePost("/auth/logout");
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    setIsMounted(true);
    setToday(
      new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    );
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "USR";

  const handleLogout = async () => {
    try {
      await post({});
      clearUser();
      notifier.success("Berhasil Logout", "Selamat Tinggal !!!..");
      router.refresh();
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      notifier.error("Logout Gagal", err.response?.data?.message);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-4 text-sm">
      {/* Tanggal dengan desain lebih menarik */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full text-muted-foreground font-medium border border-border/50">
        <span className="text-xs">📅</span>
        <span>{today}</span>
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="cursor-pointer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full border-2 border-transparent hover:border-primary/20 transition-all duration-300"
            >
              <Avatar className="h-8 w-8 ring-2 ring-background">
                {isLoading ? (
                  <Skeleton className="h-8 w-8 rounded-full" />
                ) : user?.image ? (
                  <NextAvatarImage src={user.image} alt={user.name} />
                ) : (
                  <AvatarFallback className="bg-linear-to-br from-amber-400 to-amber-600 text-white">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </motion.div>
        </PopoverTrigger>

        <AnimatePresence>
          {isOpen && (
            <PopoverContent
              className="w-72 overflow-hidden rounded-xl p-0 shadow-xl border-border/50"
              align="end"
              sideOffset={8}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header dengan info user */}
                <div className="p-4 bg-linear-to-br from-primary/5 to-transparent">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                      {user?.image ? (
                        <NextAvatarImage src={user.image} alt={user.name} />
                      ) : (
                        <AvatarFallback className="bg-linear-to-br from-amber-400 to-amber-600 text-white">
                          {initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-semibold text-sm truncate">
                        {user?.name || "Pengguna"}
                      </span>
                      <span className="text-xs text-muted-foreground truncate flex items-center gap-1">
                        <Mail className="h-3 w-3 shrink-0" />
                        {user?.email || "email@example.com"}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Menu */}
                <div className="p-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    onClick={handleLogout}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-destructive border-t-transparent" />
                        <span>Logout...</span>
                      </div>
                    ) : (
                      <>
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            </PopoverContent>
          )}
        </AnimatePresence>
      </Popover>
    </div>
  );
}
