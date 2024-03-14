import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <section className="container flex-1 items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Welcome to MadBrackets
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Your one-stop shop for all tournament needs. Create, manage, and join
          tournaments with ease.
        </p>
      </div>
    </section>
  );
}
