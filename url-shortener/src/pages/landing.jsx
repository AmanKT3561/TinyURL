import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Zap, BarChart2, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: <Zap size={18} className="text-indigo-400" />,
    title: "Instant shortening",
    desc: "Get a short link in milliseconds, ready to share anywhere.",
  },
  {
    icon: <BarChart2 size={18} className="text-indigo-400" />,
    title: "Click analytics",
    desc: "Track clicks, devices, and locations in real time.",
  },
  {
    icon: <Globe size={18} className="text-indigo-400" />,
    title: "Custom aliases",
    desc: "Create branded links that people actually remember.",
  },
];

const FAQ = [
  {
    value: "item-1",
    q: "How does the Trimrr URL shortener work?",
    a: "When you enter a long URL, our system generates a shorter version that redirects to the original when accessed.",
  },
  {
    value: "item-2",
    q: "Do I need an account to use the app?",
    a: "Yes. An account lets you manage your URLs, view analytics, and customize your short links.",
  },
  {
    value: "item-3",
    q: "What analytics are available?",
    a: "You can view total clicks, geolocation data, and device types (mobile/desktop) for each shortened URL.",
  },
];

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <div className="w-full flex flex-col items-center text-center pt-16 pb-20">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium tracking-wide mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Free · No credit card required
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight max-w-3xl">
          The last URL shortener{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            you'll ever need
          </span>
        </h1>

        <p className="mt-6 text-white/40 text-base sm:text-lg max-w-xl leading-relaxed">
          Shorten, brand, and track your links. Get detailed analytics on every click — all in one place.
        </p>

        {/* Input form */}
        <form
          onSubmit={handleShorten}
          className="mt-10 flex flex-col sm:flex-row gap-2 w-full max-w-xl"
        >
          <Input
            type="url"
            placeholder="Paste your long URL here…"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="h-12 flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/25 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 rounded-xl"
          />
          <Button
            type="submit"
            className="h-12 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 shrink-0"
          >
            Shorten
            <ArrowRight size={16} />
          </Button>
        </form>
      </div>

      {/* Feature cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 flex flex-col gap-3 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center">
              {f.icon}
            </div>
            <p className="text-white font-semibold text-sm">{f.title}</p>
            <p className="text-white/35 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Banner image */}
      <div className="w-full rounded-2xl overflow-hidden border border-white/[0.06] mb-16 shadow-2xl shadow-indigo-950/40">
        <img
          src="/banner.jpeg"
          className="w-full object-cover"
          alt="Trimrr dashboard preview"
        />
      </div>

      {/* FAQ */}
      <div className="w-full mb-8">
        <h2 className="text-white/60 uppercase text-xs font-semibold tracking-widest mb-6 text-center">
          Frequently asked questions
        </h2>
        <Accordion type="multiple" className="w-full space-y-2">
          {FAQ.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="border border-white/[0.07] rounded-xl bg-white/[0.02] px-5 data-[state=open]:border-indigo-500/25 data-[state=open]:bg-indigo-500/5 transition-all"
            >
              <AccordionTrigger className="text-white/80 hover:text-white text-sm font-medium py-4 hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/40 text-sm leading-relaxed pb-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;
