import "./globals.css";

export const metadata = {
  title: "Moby Spy",
  description: "Monitoramento Discreto",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
