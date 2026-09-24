"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send, CheckCircle2, LoaderCircle } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maenjrwq";

export default function ContactForm({
  title = "Let's Build Something Together",
  subtitle = "Have a product initiative, operational challenge, or collaboration in mind? Reach out and let's discuss how I can contribute.",
}) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success("Message sent successfully!", {
          description:
            "Thank you for reaching out. Peace will get back to you soon.",
        });
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again or send a direct email.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white/5 border border-white/10 p-6 sm:p-10 lg:p-12">
      {/* Optional Title & Subtitle - Renders conditionally if not empty */}
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white mb-2">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base text-coffee-cream font-light max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-coffee-dark/40 border border-coffee-medium/30 rounded-xl p-6">
          <CheckCircle2 className="w-12 h-12 text-coffee-tan mb-3" />
          <h4 className="font-serif font-bold text-xl text-coffee-cream mb-1">
            Message Received
          </h4>
          <p className="text-xs sm:text-sm text-white max-w-md font-mono">
            Thank you for reaching out. I will get back to you as soon as
            possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          {/* Top Row: Responsive Grid spread across full width on large screens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-wider text-white font-medium">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-base text-coffee-cream placeholder:text-coffee-cream/30 focus:outline-none focus:border-coffee-tan transition-colors"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-wider text-white font-medium">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="alex@company.com"
                className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-base text-coffee-cream placeholder:text-coffee-cream/30 focus:outline-none focus:border-coffee-tan transition-colors"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-wider text-white font-medium">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="Product Inquiry / Role Opportunity"
                className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-base text-coffee-cream placeholder:text-coffee-cream/30 focus:outline-none focus:border-coffee-tan transition-colors"
              />
            </div>
          </div>

          {/* Bottom Row: Full-width Message Area */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-mono text-xs uppercase tracking-wider text-white font-medium">
              Message
            </label>
            <textarea
              rows={9}
              required
              placeholder="Tell me about your product requirements, timeline, or objectives..."
              className="w-full bg-white/10 border border-white/30 rounded-lg p-4 text-base text-coffee-cream placeholder:text-coffee-cream/30 focus:outline-none focus:border-coffee-tan transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-coffee-tan hover:bg-coffee-cream text-coffee-dark font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition-all shadow-md group cursor-pointer"
            >
              <span>Send Message</span>
              {loading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
