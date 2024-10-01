import KakaoScript from "@/provider/KakaoScriptProvider";
import Script from "next/script";
import React from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function layout({ children }: { children: React.ReactNode }) {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`;
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <KakaoScript />
      {children}
    </>
  );
}
