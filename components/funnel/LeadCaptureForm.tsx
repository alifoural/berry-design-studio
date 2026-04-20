"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  schoolName: string;
  yourName: string;
  role: string;
  phone: string;
  websiteUrl?: string;
  studentCount: string;
};

export default function LeadCaptureForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      role: "Owner",
      studentCount: "Under 50",
    },
  });

  const onSubmit = (data: FormValues) => {
    const message =
      `Hi Berry Design Studio, I'd like a free website audit for ${data.schoolName} (${data.role}). WhatsApp: ${data.phone}`;

    const waUrl = `https://wa.me/97431490766?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const inputClass =
    "rounded-xl border border-border bg-background px-4 py-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-berry/50";

  const labelClass = "block text-sm font-medium mb-1.5";

  return (
    <section id="audit-form" className="px-4 py-24">
      <div className="mx-auto max-w-2xl">

        {/* Section label */}
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Get Started
        </p>

        {/* Headline */}
        <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-4">
          Get Your{" "}
          <span className="text-gradient-berry">Free Website Audit</span>
        </h2>

        {/* Subtext */}
        <p className="text-muted-foreground text-base leading-relaxed mb-10">
          We review your site, benchmark against 3 competitors, and send a written
          report within 48 hours. No commitment. No sales call unless you want one.
        </p>

        {/* Form card */}
        <div className="rounded-3xl border border-berry/30 bg-card p-8 shadow-glow">
          {submitted ? (
            /* Success state */
            <div className="flex flex-col items-center text-center gap-6 py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-3xl">
                ✅
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-bold">Request Received!</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  We&apos;ve received your request! We&apos;ll WhatsApp you within 2
                  hours with next steps. Check your WhatsApp now.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">

              {/* School / Nursery Name */}
              <div>
                <label htmlFor="schoolName" className={labelClass}>
                  School / Nursery Name
                </label>
                <input
                  id="schoolName"
                  type="text"
                  className={inputClass}
                  placeholder="e.g. Bright Futures Academy"
                  {...register("schoolName", { required: "School name is required" })}
                />
                {errors.schoolName && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.schoolName.message}</p>
                )}
              </div>

              {/* Your Name */}
              <div>
                <label htmlFor="yourName" className={labelClass}>
                  Your Name
                </label>
                <input
                  id="yourName"
                  type="text"
                  className={inputClass}
                  placeholder="e.g. Sarah Al-Mansouri"
                  {...register("yourName", { required: "Your name is required" })}
                />
                {errors.yourName && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.yourName.message}</p>
                )}
              </div>

              {/* Your Role */}
              <div>
                <label htmlFor="role" className={labelClass}>
                  Your Role
                </label>
                <select
                  id="role"
                  className={inputClass}
                  {...register("role")}
                >
                  <option value="Owner">Owner</option>
                  <option value="Manager">Manager</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label htmlFor="phone" className={labelClass}>
                  WhatsApp Number{" "}
                  <span className="text-muted-foreground font-normal">(we reply here)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={inputClass}
                  placeholder="+974 3000 0000"
                  {...register("phone", { required: "WhatsApp number is required" })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>
                )}
              </div>

              {/* Current Website URL */}
              <div>
                <label htmlFor="websiteUrl" className={labelClass}>
                  Current Website URL
                </label>
                <input
                  id="websiteUrl"
                  type="url"
                  className={inputClass}
                  placeholder="https://yourschool.com (leave blank if none)"
                  {...register("websiteUrl")}
                />
                {errors.websiteUrl && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.websiteUrl.message}</p>
                )}
              </div>

              {/* Number of Students */}
              <div>
                <label htmlFor="studentCount" className={labelClass}>
                  Number of Students
                </label>
                <select
                  id="studentCount"
                  className={inputClass}
                  {...register("studentCount")}
                >
                  <option value="Under 50">Under 50</option>
                  <option value="50–150">50–150</option>
                  <option value="150–400">150–400</option>
                  <option value="400+">400+</option>
                </select>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-gradient-berry text-white font-bold rounded-full py-4 text-lg hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-glow mt-2"
              >
                Send Me the Free Audit →
              </button>

              {/* Trust note */}
              <p className="text-center text-sm text-muted-foreground">
                🔒 No spam. No cold calls. WhatsApp only. We reply within 2 hours.
              </p>

              {/* Small print */}
              <p className="text-center text-xs text-muted-foreground/60">
                By submitting you agree we may contact you about your website audit via
                WhatsApp.
              </p>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
