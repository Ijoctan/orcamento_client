import StoreProvider from "@/core/store/provider";
import GlobalAlert from "@/core/components/GlobalAlert";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StoreProvider>
          <GlobalAlert />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
