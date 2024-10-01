import NavBar from "@/components/common/navbar/NavBar";
import KakaoScript from "@/provider/KakaoScriptProvider";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function DetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="scroll-contents">
      <KakaoScript />
      {children}
    </div>
  );
}
