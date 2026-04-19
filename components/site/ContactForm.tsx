"use client";

import { useState } from "react";
import { Send } from "lucide-react";

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-berry"
      />
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-3xl border border-border bg-card p-8"
    >
      {sent ? (
        <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-berry text-primary-foreground shadow-glow">
            <Send className="h-6 w-6" />
          </div>
          <h2 className="font-display text-3xl font-bold">Message sent</h2>
          <p className="mt-3 max-w-xs text-muted-foreground">
            Thanks — we got it. Expect a reply within 24 hours.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
          </div>
          <Field label="Company" name="company" required={false} />
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
              Project details
            </label>
            <textarea
              required
              rows={6}
              className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-berry"
              placeholder="What are you building, and when do you need it?"
            />
          </div>
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-berry px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Send message
            <span className="transition-transform group-hover:rotate-45">↗</span>
          </button>
        </div>
      )}
    </form>
  );
}
