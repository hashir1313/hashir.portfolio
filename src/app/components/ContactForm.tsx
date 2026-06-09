"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div>
        <div>
          <span className="uppercase text-sm text-base-content/80 font-bold">
            Full Name
          </span>
          <input
            className="w-full mt-1 p-3 rounded-lg focus:outline-none border border-base-content text-base-content/80 focus:shadow-outline"
            type="text"
            name="name"
            required
          />
        </div>
        <div className="mt-3">
          <span className="uppercase text-sm text-base-content/80 font-bold">
            Email
          </span>
          <input
            className="w-full mt-1 p-3 rounded-lg focus:outline-none border border-base-content text-base-content/80 focus:shadow-outline"
            type="email"
            name="email"
            required
          />
        </div>
        <div className="mt-3">
          <span className="uppercase text-sm text-base-content/80 font-bold">
            Message
          </span>
          <textarea
            className="w-full mt-1 p-3 rounded-lg focus:outline-none border border-base-content text-base-content/80 focus:shadow-outline"
            name="message"
            required
          ></textarea>
        </div>
        <div className="mt-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="uppercase text-sm font-bold tracking-wide bg-base-content text-base-100 p-3 cursor-pointer hover:bg-base-content/95 rounded-lg w-full focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </div>
        {status === "success" && (
          <p className="text-green-500 text-sm mt-2">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
}
