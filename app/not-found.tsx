import { Footer, Header } from "@/components/layout";
import { NotFoundContent } from "@/components/not-found-content";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
