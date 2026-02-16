import StoreProvider from "@/core/store/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
