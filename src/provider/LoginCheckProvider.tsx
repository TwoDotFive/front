"use client";
import { useUserStore } from "@/store/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export const LoginCheckProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { fetchUserProfile } = useUserStore();
  useEffect(() => {
    if (pathname.startsWith("/fanpool-log/log/")) {
      setIsLoading(false);
      setIsAuthenticated(true);
      return;
    }

    const getUserToken = async () => {
      if (!localStorage.getItem("token")) {
        alert("로그인이 필요한 서비스입니다.");
        router.push("/");
      } else {
        fetchUserProfile(localStorage.getItem("userId")!);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    getUserToken();
  }, [router]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
