import type { Metadata } from 'next';
import "./styles/global.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Web Delivery',
  description: 'Sistema Delivery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body suppressHydrationWarning={true}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
