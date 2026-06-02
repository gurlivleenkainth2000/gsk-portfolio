import { title } from "@/components/primitives";

export default function BlogPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 px-6 max-w-3xl mx-auto text-center">
      <h1 className={title()}>Projects</h1>
    </section>
  );
}
