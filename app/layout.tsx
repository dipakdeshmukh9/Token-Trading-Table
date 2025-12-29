import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import ReduxProvider from "./providers/ReduxProvider";
import ModalProvider from "./providers/ModalProvider";

export const metadata = {
  title: "Axiom Pulse - Token Discovery & Trading",
  description: "Real-time token discovery with advanced filtering, sorting, and trading features",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <QueryProvider>
            {children}
            <ModalProvider />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

