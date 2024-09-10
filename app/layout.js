import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Voice Generator",
  description: "Created by AIVIDOO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
