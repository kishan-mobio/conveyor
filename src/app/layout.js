import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Conveyor Belt - Internal Tool",
  description: "Modern internal tool for user management and authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <div className="h-screen flex flex-col justify-start">
          {children}
        </div>
      </body>
    </html>
  );
}
