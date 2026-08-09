"use client";

import { FormEvent, useState } from "react";
import { trackContactLead } from "@/lib/analytics";

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(form));
    if (String(data.company_website ?? "").trim()) { setState("success"); setMessage("Thank you. Your message has been received."); return; }
    if (!endpoint) { setState("error"); setMessage("For the fastest response, please call or email Revival directly."); return; }
    try {
      setState("sending");
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("Request failed");
      trackContactLead();
      setState("success"); setMessage("Thank you. Your message has been sent."); form.reset();
    } catch {
      setState("error"); setMessage("We could not send your message. Please call or email Revival Transportation Group.");
    }
  }

  return <form className="contact-form" onSubmit={submit} noValidate><div className="form-grid"><label>Full name<input name="name" autoComplete="name" required maxLength={120} /></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label><label>Phone <span className="optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label><label>How can we help?<select name="inquiry_type" defaultValue=""><option value="" disabled>Select one</option><option>Airport transportation</option><option>Corporate travel</option><option>Group or event travel</option><option>General inquiry</option></select></label></div><label>Trip or inquiry details<textarea name="message" required maxLength={3000} rows={5} /></label><input className="honeypot" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" /><label className="check-row"><input name="consent" type="checkbox" required /> <span>I agree that Revival may use these details to respond to this inquiry.</span></label><button className="button button-dark" disabled={state === "sending"} type="submit">{state === "sending" ? "Sending…" : "Send inquiry"}</button>{message && <p className={`form-message ${state}`} role="status">{message}</p>}</form>;
}
