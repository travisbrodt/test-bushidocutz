import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-7xl flex-col items-start justify-center px-5 pt-32 pb-20 md:px-8">
      <p className="font-display text-8xl text-ink/10">迷</p>
      <h1 className="mt-6 font-display text-5xl">This path doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-md text-stone">Even the most disciplined warrior takes a wrong turn. Let&apos;s get you back.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/" variant="ink" arrow>
          Home
        </Button>
        <Button href="/services" variant="outline">
          Services & pricing
        </Button>
      </div>
    </section>
  );
}
