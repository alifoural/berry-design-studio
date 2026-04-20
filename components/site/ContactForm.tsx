"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

function Field({
  label,
  name,
  type = "text",
  required = true,
  placeholder = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-berry"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required = true,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-berry"
      >
        <option value="" disabled />
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      setSent(true);
    } else {
      setError(t("errorMsg"));
    }
  }

  const schoolTypes = [
    { value: "nursery", label: t("typeNursery") },
    { value: "kindergarten", label: t("typeKindergarten") },
    { value: "school", label: t("typeSchool") },
    { value: "other", label: t("typeOther") },
  ];

  const services = [
    { value: "new-website", label: t("serviceNew") },
    { value: "redesign", label: t("serviceRedesign") },
    { value: "seo", label: t("serviceSeo") },
    { value: "other", label: t("serviceOther") },
  ];

  return (
    <form
      onSubmit={handleSubmit}
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
            <Field label={t("formName")} name="name" placeholder={t("formNamePlaceholder")} />
            <Field label={t("formEmail")} name="email" type="email" placeholder="you@school.qa" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t("formWhatsapp")} name="whatsapp" type="tel" required={false} placeholder="+974 5000 0000" />
            <Field label={t("formSchoolName")} name="schoolName" placeholder={t("formSchoolNamePlaceholder")} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Select label={t("formSchoolType")} name="schoolType" options={schoolTypes} />
            <Select label={t("formService")} name="service" options={services} />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
              {t("formDetails")}
            </label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-berry"
              placeholder={t("formPlaceholder")}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-berry px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? t("sending") : t("submit")}
            {!loading && <span className="transition-transform group-hover:rotate-45">↗</span>}
          </button>
        </div>
      )}
    </form>
  );
}
