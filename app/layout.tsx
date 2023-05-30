import "./globals.css";
import { Inter } from "next/font/google";

import Nav from "./Nav";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <div className="text-light-black">
          <Nav />
          <div className="max-w-screen-lg m-auto max-lg:px-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
