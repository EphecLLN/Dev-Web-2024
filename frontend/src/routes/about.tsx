import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="container max-w-screen-2xl flex-1 py-4">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          What's MadBrackets ?
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime ex,
          impedit laborum distinctio repudiandae deserunt accusamus. Dolore,
          velit mollitia eligendi rem dolores, repudiandae expedita, assumenda
          laboriosam dolorum alias aut beatae?
        </p>
      </div>
    </div>
  );
}
