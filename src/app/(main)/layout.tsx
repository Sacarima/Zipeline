import React from "react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar";
import InfoBar from "@/components/infobar";
import MobileNav from "@/components/sidebar/mobile-nav";
import { createClient } from "@/lib/supabase/server";

type Props = { children: React.ReactNode };

const Layout = async ({ children }: Props) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <InfoBar />
        <main>{children}</main>
      </div>
      <MobileNav />
    </div>
  );
};

export default Layout;