import "../globals.css";
import { Montserrat } from "next/font/google";
import SearchContextProvider from "@/contexts/searchContext";
import Nav from "./Nav";

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
      </head>
      <SearchContextProvider>
        <body className={montserrat.className}>
          <div className="text-light-black">
            <Nav />
            <div className="max-w-screen-lg m-auto max-lg:px-4">{children}</div>
          </div>
        </body>
      </SearchContextProvider>
    </html>
  );
}
