import { useMutation } from "@tanstack/react-query";
import "./App.css";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

const ApiResponseSchema = z.object({
  picture_url: z.string().optional(),
  summary_and_facts: z
    .object({
      summary: z.string(),
      facts: z.array(z.string()),
    })
    .optional(),
  interests: z
    .object({
      topics_of_interest: z.array(z.string()),
    })
    .optional(),
  ice_breakers: z
    .object({
      ice_breakers: z.array(z.string()),
    })
    .optional(),
});

type ApiResponse = z.infer<typeof ApiResponseSchema>;
const sendName = async (data: { name: string }): Promise<ApiResponse> => {
  const response = await fetch("http://localhost:5001/process", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to send name");
  }

  return ApiResponseSchema.parse(await response.json());
};

function App() {
  const mutation = useMutation({
    mutationFn: sendName,
    onSuccess: (data) => {
      console.log("Success:", data);
    },
  });

  return (
    <div className="flex flex-col gap-16">
      <UploadForm
        onSubmit={mutation.mutate}
        error={mutation.error}
        isPending={mutation.isPending}
      />
      {mutation.data && <IceBreakerContent profile={mutation.data} />}
    </div>
  );
}

function IceBreakerContent({ profile }: { profile: ApiResponse }) {
  return (
    <div className="flex flex-col gap-8 text-left">
      {profile.picture_url && (
        <img
          className="w-40 h-40 rounded-full mx-auto"
          src={profile.picture_url}
          alt="Profile"
        />
      )}
      {profile.summary_and_facts?.summary && (
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Summary</h1>
          <p>{profile.summary_and_facts?.summary}</p>
        </div>
      )}
      {profile.interests?.topics_of_interest && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Interests</h2>
          <ul className="list-disc pl-5">
            {profile.interests?.topics_of_interest.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </div>
      )}
      {profile.ice_breakers?.ice_breakers && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Ice Breakers</h2>
          <ul className="list-disc pl-5 space-y-3">
            {profile.ice_breakers?.ice_breakers.map((ice_breaker) => (
              <li key={ice_breaker}>{ice_breaker}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
function UploadForm({
  onSubmit,
  error,
  isPending,
}: {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  error?: Error | null;
  isPending: boolean;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="max-w-[600px] mx-auto">
        <CardHeader className="flex flex-col gap-4 text-left">
          <CardTitle className="text-4xl font-bold">Ice Breaker</CardTitle>
          <CardDescription>
            This is a simple ice breaker app that allows you to break the ice
            with a random person.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-left">
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter name"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    Use a public name, which will be used to find information
                    about the person.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>

          {error && (
            <div className="text-sm text-red-500">
              {error.message || "Something went wrong"}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                Sending...
              </span>
            ) : (
              "Break the Ice"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default App;
