// app/layout.tsx
import { DM_Sans, Barlow } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dmSans",
  subsets: ["latin"],
  weight: ["100", "200", "300","400","500","600","700","800","900"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["100", "200", "300","400","500","600","700","800","900"],
});

export const metadata = { 
  title: "EsferaNR6", 
  description: "Gestão de NR6 e NR7" 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${dmSans.variable} ${barlow.variable}`}>
             {children}
     
      </body>
    </html>
  );
}
