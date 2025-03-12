import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer.tsx";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
