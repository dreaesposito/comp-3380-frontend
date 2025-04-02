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
      <main className="container mx-auto max-w-7xl sm:px-6 px-3 flex-grow pt-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
