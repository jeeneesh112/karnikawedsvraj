import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
    title: "Karnika 💖 Vraj || Wedding Invitation ",
    description:
      "✨ With the blessings of our families, we joyfully invite you to witness and celebrate the sacred union of Karnika and Vraj on the 21st and 22nd of February, 2026. ✨",
  metadataBase: new URL("https://karnikavrajwedding.vercel.app"),
  openGraph: {
    title: "Karnika & Vraj | Wedding Invitation",
    description:
      "You are cordially invited to celebrate with Karnika & Vraj on February 21-22, 2026.",
    url: "https://karnikavrajwedding.vercel.app",
    siteName: "Karnika weds Vraj",
    images: [
      {
        url: "/images/karnika_weeding_logo.png",
        width: 1200,
        height: 630,
        alt: "Karnika & Vraj wedding invite poster",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karnika 💖 Vraj || Wedding Invitation ",
    description:
      "✨ With the blessings of our families, we joyfully invite you to witness and celebrate the sacred union of Karnika and Vraj on the 21st and 22nd of February, 2026. ✨",
    images: ["/images/karnika_weeding_logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/karnika_weeding_logo.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
