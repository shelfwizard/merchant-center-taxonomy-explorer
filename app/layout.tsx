import "@mantine/core/styles.css";

import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Google Merchant Center taxonomy explorer",
  description: "Explore the Google taxonomy with ease!",
};

const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: [
      "#FFD6E1",
      "#FFB5CB",
      "#E892AC",
      "#CB6E8B",
      "#B55474",
      "#9E355C",
      "#8F2D56",
      "#7D1E48",
      "#6C1442",
      "#5A0237",
    ],
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
