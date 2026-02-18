import { MantineProvider } from "@mantine/core";
import StoreProvider from "@/core/store/provider";
import GlobalAlert from "@/core/components/GlobalAlert";
import BackButton from "@/core/components/BackButton";
import "@mantine/core/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0 }}>
        <MantineProvider>
          <StoreProvider>
            <GlobalAlert />
            <BackButton />
            {children}
          </StoreProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
