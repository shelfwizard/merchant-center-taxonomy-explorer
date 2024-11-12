import "@mantine/core/styles.css";

import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { JsonLd } from "./components/JsonLd";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Shelf Wizard | Google Merchant Center Taxonomy Explorer",
  description: "Explore the Google taxonomy with ease!",
  icons: [
    {
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
      rel: "apple-touch-icon",
    },
    {
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
      rel: "icon",
    },
    {
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
      rel: "icon",
    },
  ],
};

const theme = createTheme({
  primaryColor: "primary",
  fontFamily: "Roboto, sans-serif",

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
        <link rel="home" href="https://google-taxonomy.shelfwizard.com" key="home" />
        <link rel="canonical" href="https://google-taxonomy.shelfwizard.com" key={"en"} />
        <meta name="publisher" content="Shelf Wizard" />
        <ColorSchemeScript />
        <JsonLd />
      </head>
      <body className={roboto.className}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
