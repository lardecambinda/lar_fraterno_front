import "../admin.css";

import { Montserrat } from "next/font/google";
import AdminHeader from "./AdminHeader";
import AdminNav from "./AdminNav";
import AuthContextProvider from "@/contexts/AuthContext";

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
          className={`${montserrat.className} flex items-start justify-start`}
        >
          <AdminNav />
          <div className="flex-1 h-full px-4 md:ml-[132px]">
            <AdminHeader />
            <div className="text-light-black">
              <div className="max-lg:px-4">{children}</div>
            </div>
          </div>
        </body>
      </AuthContextProvider>
    </html>
  );
}
