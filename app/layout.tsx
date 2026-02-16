import "./globals.css";
import { ReactNode } from "react";
import { StoreProvider } from "@/core/store/provider";

export const metadata = {
  title: "Orçamento App",
  description: "Sistema de controle de orçamentos",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
