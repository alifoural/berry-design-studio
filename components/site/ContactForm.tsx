"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("contact");
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
          <h2 className="font-display text-3xl font-bold">{t("sentHeading")}</h2>
          <p className="mt-3 max-w-xs text-muted-foreground">{t("sentPara")}</p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t("formName")} name="name" />
            <Field label={t("formEmail")} name="email" type="email" />
          </div>
          <Field label={t("formCompany")} name="company" required={false} />
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
              {t("formDetails")}
            </label>
            <textarea
              required
              rows={6}
              className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-berry"
              placeholder={t("formPlaceholder")}
            />
          </div>
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-berry px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            {t("submit")}
            <span className="transition-transform group-hover:rotate-45">↗</span>
          </button>
        </div>
      )}
    </form>
  );
}
