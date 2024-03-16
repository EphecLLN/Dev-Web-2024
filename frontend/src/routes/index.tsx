import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div className="container max-w-screen-2xl flex-1 py-4">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Welcome to MadBrackets
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Your one-stop shop for all tournament needs. Create, manage, and join
          tournaments with ease.
        </p>
      </div>
    </div>
  );
}
