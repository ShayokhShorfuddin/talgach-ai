import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import './globals.css';
import { NavbarSidebar } from './_components/navbar-sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Talgach AI',
  description: 'AI-powered Career & Learning Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen={false}>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
          >
            <TooltipProvider>
              <SidebarInset>{children}</SidebarInset>
              <NavbarSidebar />
            </TooltipProvider>
          </body>
        </html>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
