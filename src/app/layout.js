import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { UserProvider } from "@/context/UserContext";
import { NavbarProvider } from "@/context/NavBarContext";
import Script from 'next/script';

import "public/styles/globals.css"; // Import global styles

export const metadata = {
  title: "Wealth Wise",
  description: "Build Financial Literacy NOW",
  icons: {
    icon: "./icon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          id="gtag-script"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>
        <UserProvider>
          <NavbarProvider>
            <MantineProvider defaultColorScheme="dark">
              {children}
            </MantineProvider>
          </NavbarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
