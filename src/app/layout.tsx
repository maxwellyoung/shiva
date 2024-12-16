import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import Header from "../components/Header";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "Shiva Mizani | Art Director & Fashion Stylist",
  description:
    "Portfolio of Shiva Mizani, Art Director and Fashion Stylist based in Los Angeles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
