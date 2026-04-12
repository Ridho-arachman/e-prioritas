"use client";

import { AppSidebar } from "@/components/sections/app-sidebar-admin";
import { NavActions } from "@/components/sections/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { generateBreadcrumbSegments } from "@/utils/generateBreadcrumbSegments";
import { SlashIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = generateBreadcrumbSegments(pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            {/* 🔥 Breadcrumb Auto */}
            <Breadcrumb>
              <BreadcrumbList>
                {segments.map((segment, idx) => {
                  const isLast = idx === segments.length - 1;
                  return (
                    <Fragment key={idx}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{segment}</BreadcrumbPage>
                        ) : (
                          <span>{segment}</span>
                        )}
                      </BreadcrumbItem>
                      {idx < segments.length - 1 && (
                        <BreadcrumbSeparator>
                          <SlashIcon className="h-4 w-4" />
                        </BreadcrumbSeparator>
                      )}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 px-4 py-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
