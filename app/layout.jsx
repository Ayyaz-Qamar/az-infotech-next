import './globals.css';
import { Sora, Inter } from 'next/font/google';
const sora = Sora({ subsets: ['latin'], variable: '--f-head' });
const inter = Inter({ subsets: ['latin'], variable: '--f-body' });
export const metadata = {
  title: 'AZ Info Tech Solutions',
  description: 'Turning Ideas into Smart Digital Solutions — Muzaffarabad, Azad Kashmir',
  icons: { icon: '/logo.jpeg' },
};
export default function RootLayout({ children }) {
  return (<html lang="en" className={`${sora.variable} ${inter.variable}`}><body>{children}</body></html>);
}
