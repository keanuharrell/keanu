"use client";

import {
  Briefcase01Icon,
  DashboardSpeed01Icon,
  Home01Icon,
  Note01Icon,
  Settings01Icon,
  StackStarIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { NavMain } from "@/components/studio/nav-main";
import { NavUser } from "@/components/studio/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth/auth-client";

interface AppSidebarProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

const navItems = [
  { href: "/studio", label: "Dashboard", icon: DashboardSpeed01Icon },
  { href: "/studio/profile", label: "Profile", icon: UserIcon },
  { href: "/studio/posts", label: "Posts", icon: Note01Icon },
  { href: "/studio/projects", label: "Projects", icon: StackStarIcon },
  { href: "/studio/experiences", label: "Experiences", icon: Briefcase01Icon },
  { href: "/studio/skills", label: "Skills", icon: Settings01Icon },
];

export function AppSidebar({ user }: AppSidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton size="lg">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <HugeiconsIcon icon={Home01Icon} className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Studio</span>
                  <span className="truncate text-xs">Portfolio Admin</span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} onLogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  );
}
