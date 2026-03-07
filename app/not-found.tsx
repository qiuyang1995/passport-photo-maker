import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-start justify-center gap-6 px-6 py-16 sm:px-8 lg:px-10">
      <p className="text-muted text-sm tracking-[0.24em] uppercase">404</p>
      <h1 className="font-display text-foreground text-5xl leading-[0.96] sm:text-6xl">
        This page is not available.
      </h1>
      <p className="text-muted max-w-2xl text-lg leading-8">
        Use the main navigation to return to the tool, FAQ, or one of the
        localized guidance pages.
      </p>
      <Link
        href="/"
        className="bg-foreground text-background hover:bg-accent inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
      >
        Back to home
      </Link>
    </div>
  );
}
