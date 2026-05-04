import "../admin.css";

import { Montserrat } from "next/font/google";
import AdminHeader from "./AdminHeader";
import AdminNav from "./AdminNav";
import AuthContextProvider from "@/contexts/AuthContext";
import AuthGuard from "./AuthGuard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "./ToastProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  icons: {
    icon: "/_next/static/media/metadata/larFraternoIconBlack.png",
  },
  title: "Lar Fraterno de Cambinda",
  description: "Plataforma de Conteúdo do Lar Fraterno de Cambinda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.bubble.css"
        />
      </head>
      <AuthContextProvider>
        <body
          className={`${montserrat.className} flex items-start justify-start bg-gray-50`}
        >
          <ToastProvider>
            <AdminNav />
            <div className="flex-1 h-screen md:ml-64 flex flex-col overflow-hidden">
              <AdminHeader />
              <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto px-6 py-6 pb-24 md:pb-6">
                  <AuthGuard>{children}</AuthGuard>
                </div>
              </main>
            </div>
          </ToastProvider>
        </body>
      </AuthContextProvider>
    </html>
  );
}
