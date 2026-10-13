type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{description}</p>
      <section
        aria-label={`${title} preview`}
        className="mt-10 rounded-xl border border-border bg-surface p-8 sm:p-12"
      >
        <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
          Coming soon
        </span>
        <h2 className="mt-5 text-lg font-medium">Your workspace is taking shape</h2>
        <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
          This area is ready for the next stage of RESERVA.
        </p>
      </section>
    </div>
  );
}
