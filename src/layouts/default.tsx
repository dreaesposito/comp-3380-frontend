import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      {location.pathname !== "/aege" && <Navbar />}
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-8">
        {children}
      </main>
    </div>
  );
}
