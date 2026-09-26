import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactFormValues } from "@/lib/schemas";
import { dogProfile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success(`Thanks, ${values.name}! Your note about ${dogProfile.name} has been sent.`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Your name
        </label>
        <input
          id="name"
          {...register("name")}
          className={cn(
            "w-full rounded-md border bg-(--card) px-4 py-2.5 text-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-(--ring)",
            errors.name ? "border-red-400" : "border-(--border)"
          )}
          placeholder="Mitzu's Admirer"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={cn(
            "w-full rounded-md border bg-(--card) px-4 py-2.5 text-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-(--ring)",
            errors.email ? "border-red-400" : "border-(--border)"
          )}
          placeholder="mitzu@example.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className={cn(
            "w-full resize-none rounded-md border bg-(--card) px-4 py-2.5 text-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-(--ring)",
            errors.message ? "border-red-400" : "border-(--border)"
          )}
          placeholder={`Say hello to ${dogProfile.name}…`}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full gap-2 sm:w-auto">
        <Send className="size-4" />
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
