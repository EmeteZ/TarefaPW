import "./globals.css";
import { ContentProvider } from "./lib/content-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
