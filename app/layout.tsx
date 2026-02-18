import StoreProvider from "@/core/store/provider";
import GlobalAlert from "@/core/components/GlobalAlert";
import BackButton from "@/core/components/BackButton";

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
          <BackButton />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
