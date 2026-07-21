import "../globals.css";

export const metadata = {
  title: "Lar Fraterno - Redefinir Senha",
  description: "Redefinição de senha do Lar Fraterno de Cambinda",
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
