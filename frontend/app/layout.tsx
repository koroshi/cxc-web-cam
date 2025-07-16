import "./globals.css";
import { Inter } from "next/font/google";
import { ImageProvider } from './context/ImageContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "cxc 自拍检测",
  description: "使用前置摄像头进行自拍并检测",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <ImageProvider>
        {children}
        </ImageProvider>
        </body>
    </html>
  );
}