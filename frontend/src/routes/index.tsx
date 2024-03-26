import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { createFileRoute } from "@tanstack/react-router";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  const { getAccessTokenSilently, isLoading } = useAuth0();
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently().catch(() => null);
      const response = await axios.get("/api/authorized", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setData("You are not authorized...");
      } else {
        console.error(error);
      }
    }
    setLoading(false);
  };

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
        <div>
          <Button onClick={fetchData} disabled={isLoading || loading}>
            {loading ? "Loading..." : "Test Secure API Call"}
          </Button>
          <p>
            <strong>Response:</strong> {data}
          </p>
        </div>
      </div>
    </div>
  );
}
