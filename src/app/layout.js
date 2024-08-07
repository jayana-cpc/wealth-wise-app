import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { UserProvider } from "@/context/UserContext";
import { NavbarProvider } from "@/context/NavBarContext";
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
        {/* <link rel="stylesheet" href="/styles/globals.css" /> */}
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
