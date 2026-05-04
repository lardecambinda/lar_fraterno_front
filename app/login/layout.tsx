import "../globals.css";
import AuthContextProvider from "@/contexts/AuthContext";

export const metadata = {
  title: "Lar Fraterno - Login",
  description: "Área Administrativa",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <AuthContextProvider>
        <body>{children}</body>
      </AuthContextProvider>
    </html>
  );
}
