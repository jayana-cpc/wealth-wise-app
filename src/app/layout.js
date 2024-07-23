import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { UserProvider } from '@/context/UserContext';
import { NavbarProvider } from "@/context/NavBarContext";
export const metadata = {
  title: "Wealth Wise",
  description: "Build Financial Literacy NOW",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <UserProvider>
          <NavbarProvider>
            <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
          </NavbarProvider>
        </UserProvider>
      </body>
    </html>
  );
}