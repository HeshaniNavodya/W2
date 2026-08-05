import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, ChevronDown, ChevronUp, Volume2, VolumeX, Moon, Sun, ArrowUp,
  MapPin, Phone, Mail, MessageCircle, Send, X, Search, Sparkles,
  Calendar, Clock, Users, UtensilsCrossed, Gift, HelpCircle, Camera,
  ChevronLeft, ChevronRight, Check, Loader2
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Theme tokens                                                        */
/* ------------------------------------------------------------------ */
const THEMES = {
  light: {
    bg: "#FBF7EF",
    bgAlt: "#F3ECDD",
    surface: "#FFFFFF",
    surfaceGlass: "rgba(255,255,255,0.55)",
    text: "#2E2A24",
    textSoft: "#7A7264",
    gold: "#C6A468",
    goldDeep: "#A9843F",
    rose: "#C99098",
    roseDeep: "#A9636D",
    sage: "#8A9A7E",
    sageDeep: "#5E6E52",
    border: "rgba(46,42,36,0.12)",
    shadow: "0 20px 60px -25px rgba(90,70,40,0.35)",
  },
  dark: {
    bg: "#211D18",
    bgAlt: "#29241D",
    surface: "#2C2721",
    surfaceGlass: "rgba(44,39,33,0.55)",
    text: "#F3ECE0",
    textSoft: "#C2B7A3",
    gold: "#DDBD84",
    goldDeep: "#C6A468",
    rose: "#D8A7AE",
    roseDeep: "#C99098",
    sage: "#A7B69A",
    sageDeep: "#8A9A7E",
    border: "rgba(243,236,224,0.14)",
    shadow: "0 20px 60px -25px rgba(0,0,0,0.6)",
  },
};

const COUPLE = { bride: "Isabelle", brideFull: "Isabelle Moreau", groom: "Gabriel", groomFull: "Gabriel Hart" };
const WEDDING_DATE = new Date("2026-10-17T16:00:00");
const HASHTAG = "#HartMoreau2026";

/* ------------------------------------------------------------------ */
/* Sample data                                                         */
/* ------------------------------------------------------------------ */
const STORY = [
  { title: "First meeting", date: "June 2019", text: "A rain-soaked afternoon in a Brooklyn bookstore, both reaching for the same worn copy of a travel atlas.", img: "https://picsum.photos/seed/story-meet/600/450" },
  { title: "First date", date: "August 2019", text: "A rooftop dinner overlooking the East River that was supposed to last an hour and lasted five.", img: "https://picsum.photos/seed/story-date/600/450" },
  { title: "The proposal", date: "December 2024", text: "Beneath the string lights of Golden Gate Park, on the same bench from their second date.", img: "https://picsum.photos/seed/story-proposal/600/450" },
  { title: "The wedding", date: "October 17, 2026", text: "Under the old oaks at Hawthorne Estate, surrounded by everyone who watched this story unfold.", img: "https://picsum.photos/seed/story-wedding/600/450" },
];

const SCHEDULE = [
  { time: "3:00 PM", title: "Guest arrival", desc: "Welcome drinks on the terrace as guests take their seats.", icon: Users },
  { time: "4:00 PM", title: "Ceremony", desc: "Exchange of vows beneath the oak grove.", icon: Heart },
  { time: "4:30 PM", title: "Photography", desc: "Family and wedding party portraits by the vineyard.", icon: Camera },
  { time: "5:00 PM", title: "Cocktail hour", desc: "Estate wines, passed hors d'oeuvres, and live jazz.", icon: UtensilsCrossed },
  { time: "6:00 PM", title: "Reception", desc: "Guests are seated in the pavilion.", icon: Sparkles },
  { time: "6:30 PM", title: "Dinner", desc: "Plated dinner service begins.", icon: UtensilsCrossed },
  { time: "7:30 PM", title: "Cake cutting", desc: "A short toast from the maid of honor and best man.", icon: Gift },
  { time: "8:00 PM", title: "First dance", desc: "The dance floor opens.", icon: Heart },
  { time: "9:00 PM", title: "After party", desc: "Music continues in the barrel room until midnight.", icon: Sparkles },
];

const WEDDING_PARTY = [
  { role: "Bride", name: "Isabelle Moreau", img: "https://picsum.photos/seed/party-bride/300/300" },
  { role: "Groom", name: "Gabriel Hart", img: "https://picsum.photos/seed/party-groom/300/300" },
  { role: "Maid of honor", name: "Sophie Moreau", img: "https://picsum.photos/seed/party-moh/300/300" },
  { role: "Best man", name: "Theo Hart", img: "https://picsum.photos/seed/party-bm/300/300" },
  { role: "Bridesmaid", name: "Nadia Farouk", img: "https://picsum.photos/seed/party-bm1/300/300" },
  { role: "Bridesmaid", name: "Lily Chen", img: "https://picsum.photos/seed/party-bm2/300/300" },
  { role: "Groomsman", name: "Marcus Webb", img: "https://picsum.photos/seed/party-gm1/300/300" },
  { role: "Groomsman", name: "Owen Park", img: "https://picsum.photos/seed/party-gm2/300/300" },
  { role: "Parents of the bride", name: "Claire & Robert Moreau", img: "https://picsum.photos/seed/party-pob/300/300" },
  { role: "Parents of the groom", name: "Diane & James Hart", img: "https://picsum.photos/seed/party-pog/300/300" },
];

const MENU = {
  "Welcome drinks": ["Sparkling elderflower spritz", "Sage-infused lemonade"],
  "Starters": ["Heirloom tomato & burrata", "Roasted beet salad, whipped goat cheese"],
  "Main course": ["Herb-crusted salmon", "Braised short rib", "Wild mushroom risotto (vegetarian)"],
  "Desserts": ["Champagne butter cake", "Lavender panna cotta"],
  "Beverages": ["Estate red & white wine", "Signature craft cocktails", "Coffee & tea bar"],
};

const GALLERY = [
  { cat: "Engagement", img: "https://picsum.photos/seed/gal-eng1/700/900" },
  { cat: "Engagement", img: "https://picsum.photos/seed/gal-eng2/900/700" },
  { cat: "Proposal", img: "https://picsum.photos/seed/gal-prop1/700/900" },
  { cat: "Proposal", img: "https://picsum.photos/seed/gal-prop2/900/700" },
  { cat: "Pre-shoot", img: "https://picsum.photos/seed/gal-pre1/700/900" },
  { cat: "Pre-shoot", img: "https://picsum.photos/seed/gal-pre2/900/700" },
  { cat: "Engagement", img: "https://picsum.photos/seed/gal-eng3/900/700" },
  { cat: "Pre-shoot", img: "https://picsum.photos/seed/gal-pre3/700/900" },
];

const GUESTS = [
  { name: "Emma Rodriguez", code: "EM4821", table: 3, seat: 5, meal: "Herb-crusted salmon" },
  { name: "James Whitmore", code: "JW7734", table: 3, seat: 6, meal: "Braised short rib" },
  { name: "Olivia Bennett", code: "OB1190", table: 7, seat: 2, meal: "Wild mushroom risotto" },
  { name: "Noah Patel", code: "NP5563", table: 1, seat: 1, meal: "Herb-crusted salmon" },
  { name: "Ava Thompson", code: "AT9012", table: 5, seat: 4, meal: "Braised short rib" },
  { name: "Liam Brooks", code: "LB3345", table: 9, seat: 3, meal: "Wild mushroom risotto" },
  { name: "Sofia Reyes", code: "SR6689", table: 2, seat: 7, meal: "Herb-crusted salmon" },
  { name: "Ethan Kim", code: "EK2201", table: 4, seat: 2, meal: "Braised short rib" },
];

const FAQS = [
  { q: "Can I bring a plus one?", a: "Your invitation and RSVP form will indicate if a plus one is included. If you're unsure, reach out to Isabelle or Gabriel directly." },
  { q: "Where can I park?", a: "Complimentary valet parking is available at the Hawthorne Estate main entrance. Self-parking is also available in the north lot." },
  { q: "Is accommodation available?", a: "We've reserved a block of rooms at the Napa Vine Hotel, ten minutes from the venue. Details are in your invitation card." },
  { q: "What time should I arrive?", a: "Please arrive by 3:30 PM so you're comfortably seated before the 4:00 PM ceremony." },
  { q: "Who should I contact with questions?", a: "Our wedding planner Maren Ellis is happy to help with any logistics questions." },
  { q: "Can children attend?", a: "We love your little ones, but we've planned an adults-only celebration so everyone can relax and enjoy the evening." },
];

const AI_RESPONSES = [
  { keys: ["seat", "table", "sit"], a: "I can look that up — head to the Seating section and enter your name or invitation code, and I'll show your table and seat number." },
  { keys: ["dress", "wear", "attire", "color"], a: "It's formal, garden-party attire. Think sage, dusty rose, champagne, and ivory tones — we just ask guests avoid stark white." },
  { keys: ["dinner", "food", "eat", "meal", "menu"], a: "Dinner service begins at 6:30 PM, right after cocktail hour. You can see the full menu in the Menu section." },
  { keys: ["park", "parking", "car"], a: "Complimentary valet is available at the main entrance, and there's self-parking in the north lot if you'd rather drive yourself." },
  { keys: ["rsvp", "update", "change"], a: "Of course — scroll to the RSVP section and submit the form again with your invitation code. The latest submission is the one we'll use." },
  { keys: ["time", "start", "arrive", "when"], a: "Guest arrival is at 3:00 PM and the ceremony begins at 4:00 PM sharp." },
  { keys: ["venue", "where", "address", "location"], a: "We're at the Hawthorne Estate, 4820 Silverado Trail, Napa Valley. You'll find directions in the Venue section." },
  { keys: ["plus one", "guest", "bring"], a: "Check your invitation — it'll note whether a plus one is included. Feel free to reach out if you're not sure." },
  { keys: ["child", "kid", "baby"], a: "We've planned an adults-only evening, though we adore your little ones." },
  { keys: ["gift", "registry"], a: "You'll find registry links and gift details in the Registry section — your presence is truly the only gift we need." },
];

/* ------------------------------------------------------------------ */
/* Small decorative components                                         */
/* ------------------------------------------------------------------ */
function Sprig({ color, className = "", flip = false }) {
  return (
    <svg viewBox="0 0 120 40" className={className} style={{ transform: flip ? "scaleX(-1)" : "none" }} aria-hidden="true">
      <path d="M2 20 C 30 5, 60 35, 118 18" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M20 15 C 24 8, 30 8, 32 14" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M46 27 C 48 19, 55 18, 58 24" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M74 13 C 78 6, 85 7, 86 14" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M98 24 C 101 17, 108 17, 110 23" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <circle cx="118" cy="18" r="2" fill={color} />
    </svg>
  );
}

function SectionDivider({ theme }) {
  return (
    <div className="flex items-center justify-center gap-4 py-2" aria-hidden="true">
      <Sprig color={theme.sage} className="w-20 h-6" />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: theme.gold }} />
      <Sprig color={theme.sage} className="w-20 h-6" flip />
    </div>
  );
}

function Eyebrow({ children, theme }) {
  return (
    <p
      className="text-xs md:text-sm tracking-[0.3em] uppercase text-center mb-3"
      style={{ color: theme.roseDeep, fontFamily: "'Jost', sans-serif", letterSpacing: "0.3em" }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, theme, light }) {
  return (
    <div className="text-center mb-12">
      <Eyebrow theme={theme}>{eyebrow}</Eyebrow>
      <h2
        className="text-4xl md:text-5xl"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: light ? "#fff" : theme.text, fontWeight: 500 }}
      >
        {title}
      </h2>
    </div>
  );
}

function FloatingPetals({ theme }) {
  const petals = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
        size: 10 + Math.random() * 10,
        rose: i % 2 === 0,
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {petals.map((p) => (
        <motion.svg
          key={p.id}
          viewBox="0 0 20 20"
          width={p.size}
          height={p.size}
          style={{ position: "absolute", left: `${p.left}%`, top: "-5%" }}
          initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 0.7, 0.7, 0], rotate: 200 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          <ellipse cx="10" cy="10" rx="9" ry="6" fill={p.rose ? theme.rose : theme.sage} opacity="0.55" />
        </motion.svg>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Loading screen                                                       */
/* ------------------------------------------------------------------ */
function LoadingScreen({ theme, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: theme.bg }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex items-center justify-center"
      >
        <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
          <motion.circle
            cx="60" cy="60" r="52" fill="none" stroke={theme.gold} strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <motion.path
            d="M60 34 L60 86 M34 60 L86 60" stroke={theme.rose} strokeWidth="1"
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.2, duration: 0.6 }}
          />
        </svg>
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", color: theme.text }}
        >
          I &amp; G
        </motion.span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-6 text-sm tracking-[0.35em] uppercase"
        style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}
      >
        the invitation is opening
      </motion.p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                           */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { id: "story", label: "Our story" },
  { id: "schedule", label: "Schedule" },
  { id: "venue", label: "Venue" },
  { id: "seating", label: "Seating" },
  { id: "rsvp", label: "RSVP" },
  { id: "gallery", label: "Gallery" },
  { id: "registry", label: "Registry" },
  { id: "faq", label: "FAQ" },
];

function NavBar({ theme, darkMode, setDarkMode, musicOn, setMusicOn }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? theme.surfaceGlass : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${theme.border}` : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 md:px-8 py-3">
        <button
          onClick={() => scrollTo("home")}
          className="text-lg md:text-xl"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text }}
        >
          I &amp; G
        </button>
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-70"
              style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label={musicOn ? "Pause music" : "Play music"}
            onClick={() => setMusicOn((m) => !m)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ border: `1px solid ${theme.border}`, color: theme.textSoft }}
          >
            {musicOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
          <button
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDarkMode((d) => !d)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ border: `1px solid ${theme.border}`, color: theme.textSoft }}
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center"
            style={{ border: `1px solid ${theme.border}`, color: theme.textSoft }}
          >
            {open ? <X size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden px-5 pb-4 flex flex-col gap-3"
            style={{ background: theme.surfaceGlass, backdropFilter: "blur(14px)" }}
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm tracking-[0.1em] uppercase text-left py-1"
                style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero + Countdown                                                     */
/* ------------------------------------------------------------------ */
function Hero({ theme, scrollToInvite }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${theme.bgAlt} 0%, ${theme.bg} 60%)`,
      }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="absolute inset-0" style={{
        backgroundImage: "url('https://picsum.photos/seed/hero-wedding/1600/1000')",
        backgroundSize: "cover", backgroundPosition: "center", opacity: 0.22,
      }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${theme.bg}55 0%, ${theme.bg}CC 100%)` }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }} className="relative z-10">
        <Sprig color={theme.sage} className="w-28 h-10 mx-auto mb-6" />
        <p className="text-xs md:text-sm tracking-[0.4em] uppercase mb-5" style={{ fontFamily: "'Jost', sans-serif", color: theme.roseDeep }}>
          together with their families
        </p>
        <h1
          className="text-5xl sm:text-6xl md:text-8xl leading-[1.05] mb-5"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text, fontWeight: 500 }}
        >
          {COUPLE.bride}
          <span className="block text-3xl sm:text-4xl md:text-5xl my-2" style={{ color: theme.gold, fontStyle: "italic" }}>&amp;</span>
          {COUPLE.groom}
        </h1>
        <p className="text-sm md:text-base tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>
          Saturday, October 17, 2026 &nbsp;·&nbsp; 4:00 PM
        </p>
        <p className="text-sm md:text-base mb-10" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>
          Hawthorne Estate, Napa Valley
        </p>
        <button
          onClick={scrollToInvite}
          className="px-8 py-3 rounded-full text-sm tracking-[0.15em] uppercase transition-transform hover:scale-105"
          style={{ fontFamily: "'Jost', sans-serif", background: theme.gold, color: "#fff", boxShadow: theme.shadow }}
        >
          View invitation
        </button>
      </motion.div>

      <motion.button
        onClick={scrollToInvite}
        aria-label="Scroll to invitation"
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ color: theme.textSoft }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>scroll</span>
        <ChevronDown size={16} />
      </motion.button>
    </section>
  );
}

function useCountdown(target) {
  const [left, setLeft] = useState(() => Math.max(0, target - new Date()));
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, target - new Date())), 1000);
    return () => clearInterval(t);
  }, [target]);
  const s = Math.floor(left / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Countdown({ theme }) {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
  return (
    <section className="py-16 px-6" style={{ background: theme.bgAlt }}>
      <SectionDivider theme={theme} />
      <p className="text-center text-sm tracking-[0.25em] uppercase mb-8" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>
        counting down to forever
      </p>
      <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
        {units.map((u) => (
          <div
            key={u.label}
            className="w-20 md:w-28 py-5 rounded-2xl text-center"
            style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}
          >
            <div className="text-3xl md:text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.goldDeep, fontWeight: 600 }}>
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Our story                                                            */
/* ------------------------------------------------------------------ */
function OurStory({ theme }) {
  return (
    <section id="story" className="py-24 px-6" style={{ background: theme.bg }}>
      <SectionHeading eyebrow="How it began" title="Our story" theme={theme} />
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {STORY.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}
          >
            <img src={s.img} alt="" className="w-full h-56 object-cover" />
            <div className="p-6">
              <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "'Jost', sans-serif", color: theme.roseDeep }}>{s.date}</p>
              <h3 className="text-2xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>{s.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Wedding party                                                        */
/* ------------------------------------------------------------------ */
function WeddingParty({ theme }) {
  return (
    <section className="py-24 px-6" style={{ background: theme.bgAlt }}>
      <SectionHeading eyebrow="With love and gratitude" title="Wedding party" theme={theme} />
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {WEDDING_PARTY.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 5) * 0.06 }}
            className="text-center"
          >
            <img src={p.img} alt="" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto mb-3" style={{ border: `2px solid ${theme.gold}` }} />
            <p className="text-base" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text }}>{p.name}</p>
            <p className="text-[11px] tracking-[0.15em] uppercase mt-1" style={{ fontFamily: "'Jost', sans-serif", color: theme.roseDeep }}>{p.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Event schedule                                                       */
/* ------------------------------------------------------------------ */
function Schedule({ theme }) {
  return (
    <section id="schedule" className="py-24 px-6" style={{ background: theme.bg }}>
      <SectionHeading eyebrow="Saturday, October 17" title="Event schedule" theme={theme} />
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute left-[27px] top-2 bottom-2 w-px" style={{ background: theme.border }} />
        {SCHEDULE.map((e, i) => {
          const Icon = e.icon;
          return (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative flex gap-5 pb-9 last:pb-0"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 z-10"
                style={{ background: theme.surface, border: `1px solid ${theme.gold}`, color: theme.goldDeep }}
              >
                <Icon size={18} />
              </div>
              <div className="pt-1">
                <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "'Jost', sans-serif", color: theme.roseDeep }}>{e.time}</p>
                <h3 className="text-xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text }}>{e.title}</h3>
                <p className="text-sm" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>{e.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Venue                                                                 */
/* ------------------------------------------------------------------ */
function Venue({ theme }) {
  const address = "4820 Silverado Trail, Napa Valley, CA 94558";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Hawthorne Estate " + address)}`;
  return (
    <section id="venue" className="py-24 px-6" style={{ background: theme.bgAlt }}>
      <SectionHeading eyebrow="Where we say I do" title="The venue" theme={theme} />
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div
          className="rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative"
          style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
        >
          <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
            <rect width="400" height="300" fill={theme.bg} />
            <path d="M0 220 Q100 190 200 215 T400 210 V300 H0 Z" fill={theme.sage} opacity="0.25" />
            <path d="M0 250 Q120 225 240 245 T400 240 V300 H0 Z" fill={theme.sage} opacity="0.4" />
            <circle cx="200" cy="150" r="6" fill={theme.roseDeep} />
            <path d="M200 150 v-24" stroke={theme.roseDeep} strokeWidth="2" />
            <path d="M170 118 Q200 90 230 118 Q200 108 170 118 Z" fill={theme.roseDeep} opacity="0.85" />
            {Array.from({ length: 6 }).map((_, i) => (
              <ellipse key={i} cx={60 + i * 55} cy={200 + (i % 2) * 12} rx="16" ry="26" fill={theme.gold} opacity="0.35" />
            ))}
          </svg>
          <div className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-3 text-sm" style={{ background: theme.surfaceGlass, backdropFilter: "blur(8px)", color: theme.text, fontFamily: "'Jost', sans-serif" }}>
            Illustrated overview — open in Google Maps for turn-by-turn directions.
          </div>
        </div>
        <div>
          <h3 className="text-3xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text }}>Hawthorne Estate</h3>
          <p className="flex items-start gap-2 text-sm mb-4" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>
            <MapPin size={16} className="mt-0.5 shrink-0" /> {address}
          </p>
          <div className="space-y-3 mb-6 text-sm" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>
            <p><span style={{ color: theme.text, fontWeight: 500 }}>Parking:</span> complimentary valet at the main entrance, self-parking in the north lot.</p>
            <p><span style={{ color: theme.text, fontWeight: 500 }}>Dress code:</span> formal, garden-party attire.</p>
            <p className="flex items-center gap-2"><Phone size={14} /> (707) 555-0148</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-full text-sm tracking-wide" style={{ fontFamily: "'Jost', sans-serif", background: theme.gold, color: "#fff" }}>
              Open in Google Maps
            </a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-full text-sm tracking-wide" style={{ fontFamily: "'Jost', sans-serif", border: `1px solid ${theme.border}`, color: theme.text }}>
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Seating lookup                                                       */
/* ------------------------------------------------------------------ */
function SeatingLookup({ theme }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const search = () => {
    const q = query.trim().toLowerCase();
    setSearched(true);
    if (!q) { setResult(null); return; }
    const found = GUESTS.find(
      (g) => g.name.toLowerCase() === q || g.code.toLowerCase() === q || g.name.toLowerCase().includes(q)
    );
    setResult(found || null);
  };

  return (
    <section id="seating" className="py-24 px-6" style={{ background: theme.bg }}>
      <SectionHeading eyebrow="Find your place" title="Seating" theme={theme} />
      <div className="max-w-xl mx-auto">
        <div className="flex gap-2 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="Enter your name or invitation code"
            className="flex-1 px-4 py-3 rounded-full text-sm outline-none"
            style={{ background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text, fontFamily: "'Jost', sans-serif" }}
          />
          <button
            onClick={search}
            aria-label="Search"
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: theme.gold, color: "#fff" }}
          >
            <Search size={16} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {searched && (
            <motion.div key={result ? result.name : "none"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {result ? (
                <div className="rounded-2xl p-6 text-center" style={{ background: theme.surface, border: `1px solid ${theme.gold}`, boxShadow: theme.shadow }}>
                  <p className="text-2xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text }}>{result.name}</p>
                  <p className="text-sm mb-4" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>{result.meal}</p>
                  <div className="flex justify-center gap-8">
                    <div>
                      <p className="text-3xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.goldDeep }}>{result.table}</p>
                      <p className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>Table</p>
                    </div>
                    <div>
                      <p className="text-3xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.goldDeep }}>{result.seat}</p>
                      <p className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>Seat</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-sm" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>
                  We couldn't find that name or code. Try again, or contact Maren at the number below.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs mt-6" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>
          Try: <span style={{ color: theme.text }}>Emma Rodriguez</span> or code <span style={{ color: theme.text }}>EM4821</span>
        </p>

        <div className="mt-12">
          <p className="text-center text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>Seating chart</p>
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 15 }).map((_, i) => {
              const num = i + 1;
              const highlighted = result && result.table === num;
              return (
                <div
                  key={num}
                  className="aspect-square rounded-full flex items-center justify-center text-xs transition-all"
                  style={{
                    background: highlighted ? theme.gold : theme.surface,
                    border: `1px solid ${highlighted ? theme.gold : theme.border}`,
                    color: highlighted ? "#fff" : theme.textSoft,
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: highlighted ? 600 : 400,
                    transform: highlighted ? "scale(1.12)" : "scale(1)",
                  }}
                >
                  {num}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* RSVP                                                                  */
/* ------------------------------------------------------------------ */
function RSVP({ theme }) {
  const [step, setStep] = useState("form");
  const [data, setData] = useState({
    name: "", code: "", attending: "yes", guests: "1", meal: "Herb-crusted salmon",
    dietary: "", requests: "", phone: "", email: "",
  });
  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const submit = () => {
    if (!data.name.trim()) return;
    setStep("success");
  };

  const field = "w-full px-4 py-3 rounded-xl text-sm outline-none";
  const fieldStyle = { background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text, fontFamily: "'Jost', sans-serif" };
  const label = "text-xs tracking-[0.15em] uppercase mb-2 block";
  const labelStyle = { fontFamily: "'Jost', sans-serif", color: theme.textSoft };

  return (
    <section id="rsvp" className="py-24 px-6" style={{ background: theme.bgAlt }}>
      <SectionHeading eyebrow="Kindly respond by September 1" title="RSVP" theme={theme} />
      <div className="max-w-xl mx-auto rounded-2xl p-6 md:p-8" style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}>
        <AnimatePresence mode="wait">
          {step === "form" ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
              <div>
                <label className={label} style={labelStyle}>Full name</label>
                <input className={field} style={fieldStyle} value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" />
              </div>
              <div>
                <label className={label} style={labelStyle}>Invitation code</label>
                <input className={field} style={fieldStyle} value={data.code} onChange={(e) => update("code", e.target.value)} placeholder="e.g. EM4821" />
              </div>
              <div>
                <label className={label} style={labelStyle}>Attending?</label>
                <div className="flex gap-3">
                  {["yes", "no"].map((v) => (
                    <button
                      key={v}
                      onClick={() => update("attending", v)}
                      className="flex-1 py-2.5 rounded-xl text-sm capitalize transition-colors"
                      style={{
                        background: data.attending === v ? theme.gold : "transparent",
                        border: `1px solid ${data.attending === v ? theme.gold : theme.border}`,
                        color: data.attending === v ? "#fff" : theme.text,
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      {v === "yes" ? "Joyfully accepts" : "Regretfully declines"}
                    </button>
                  ))}
                </div>
              </div>
              {data.attending === "yes" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={label} style={labelStyle}>Number of guests</label>
                      <select className={field} style={fieldStyle} value={data.guests} onChange={(e) => update("guests", e.target.value)}>
                        {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={label} style={labelStyle}>Meal preference</label>
                      <select className={field} style={fieldStyle} value={data.meal} onChange={(e) => update("meal", e.target.value)}>
                        {MENU["Main course"].map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={label} style={labelStyle}>Dietary restrictions</label>
                    <input className={field} style={fieldStyle} value={data.dietary} onChange={(e) => update("dietary", e.target.value)} placeholder="Optional" />
                  </div>
                </>
              )}
              <div>
                <label className={label} style={labelStyle}>Special requests</label>
                <textarea rows={3} className={field} style={fieldStyle} value={data.requests} onChange={(e) => update("requests", e.target.value)} placeholder="Optional" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={label} style={labelStyle}>Phone</label>
                  <input className={field} style={fieldStyle} value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Optional" />
                </div>
                <div>
                  <label className={label} style={labelStyle}>Email</label>
                  <input className={field} style={fieldStyle} value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="Optional" />
                </div>
              </div>
              <button
                onClick={submit}
                disabled={!data.name.trim()}
                className="w-full py-3.5 rounded-full text-sm tracking-[0.15em] uppercase mt-2"
                style={{ background: data.name.trim() ? theme.gold : theme.border, color: "#fff", fontFamily: "'Jost', sans-serif" }}
              >
                Send RSVP
              </button>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: theme.sage }}
              >
                <Check size={26} color="#fff" />
              </motion.div>
              <h3 className="text-3xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text }}>Thank you, {data.name.split(" ")[0]}</h3>
              <p className="text-sm mb-6" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>
                {data.attending === "yes" ? "We can't wait to celebrate with you." : "You'll be missed — thank you for letting us know."}
              </p>
              <button onClick={() => setStep("form")} className="text-xs tracking-[0.15em] uppercase underline" style={{ fontFamily: "'Jost', sans-serif", color: theme.roseDeep }}>
                Edit response
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Menu + Dress code                                                    */
/* ------------------------------------------------------------------ */
function MenuSection({ theme }) {
  return (
    <section className="py-24 px-6" style={{ background: theme.bg }}>
      <SectionHeading eyebrow="An evening to savor" title="Menu" theme={theme} />
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
        {Object.entries(MENU).map(([cat, items]) => (
          <div key={cat} className="rounded-2xl p-6" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <h3 className="text-xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.goldDeep }}>{cat}</h3>
            <ul className="space-y-2">
              {items.map((it) => (
                <li key={it} className="text-sm flex items-start gap-2" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: theme.sage }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function DressCode({ theme }) {
  const palette = [
    { name: "Champagne", hex: theme.gold },
    { name: "Dusty rose", hex: theme.rose },
    { name: "Sage", hex: theme.sage },
    { name: "Ivory", hex: "#F3ECDD" },
  ];
  const cards = [
    { title: "Formal wear", desc: "Suits, cocktail dresses, or evening gowns." },
    { title: "Black tie optional", desc: "Tuxedos welcome, not required." },
    { title: "What to avoid", desc: "Please avoid stark white and denim." },
  ];
  return (
    <section className="py-24 px-6" style={{ background: theme.bgAlt }}>
      <SectionHeading eyebrow="Garden-party elegant" title="Dress code" theme={theme} />
      <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 mb-10">
        {cards.map((c) => (
          <div key={c.title} className="rounded-2xl p-6 text-center" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <h3 className="text-lg mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text }}>{c.title}</h3>
            <p className="text-sm" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 flex-wrap">
        {palette.map((p) => (
          <div key={p.name} className="text-center">
            <div className="w-14 h-14 rounded-full mx-auto mb-2" style={{ background: p.hex, border: `1px solid ${theme.border}` }} />
            <p className="text-xs" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>{p.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery + Lightbox                                                    */
/* ------------------------------------------------------------------ */
function Gallery({ theme }) {
  const [active, setActive] = useState(null);
  return (
    <section id="gallery" className="py-24 px-6" style={{ background: theme.bg }}>
      <SectionHeading eyebrow="Moments so far" title="Gallery" theme={theme} />
      <div className="max-w-5xl mx-auto columns-2 md:columns-3 gap-4 space-y-4">
        {GALLERY.map((g, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.05 }}
            className="block w-full break-inside-avoid rounded-xl overflow-hidden relative group"
          >
            <img src={g.img} alt="" className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5))" }}>
              <span className="text-xs text-white tracking-wide" style={{ fontFamily: "'Jost', sans-serif" }}>{g.cat}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-6"
            style={{ background: "rgba(20,16,12,0.85)" }}
            onClick={() => setActive(null)}
          >
            <button aria-label="Close" className="absolute top-6 right-6 text-white" onClick={() => setActive(null)}><X size={26} /></button>
            <button
              aria-label="Previous"
              className="absolute left-4 md:left-10 text-white"
              onClick={(e) => { e.stopPropagation(); setActive((a) => (a - 1 + GALLERY.length) % GALLERY.length); }}
            ><ChevronLeft size={30} /></button>
            <motion.img
              key={active}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={GALLERY[active].img} alt="" className="max-h-[80vh] max-w-[85vw] rounded-lg" onClick={(e) => e.stopPropagation()}
            />
            <button
              aria-label="Next"
              className="absolute right-4 md:right-10 text-white"
              onClick={(e) => { e.stopPropagation(); setActive((a) => (a + 1) % GALLERY.length); }}
            ><ChevronRight size={30} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Gift registry                                                        */
/* ------------------------------------------------------------------ */
function Registry({ theme }) {
  return (
    <section id="registry" className="py-24 px-6" style={{ background: theme.bgAlt }}>
      <SectionHeading eyebrow="Your presence is the gift" title="Gift registry" theme={theme} />
      <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
          <Gift size={20} style={{ color: theme.goldDeep }} className="mb-3" />
          <h3 className="text-lg mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text }}>Registry links</h3>
          <p className="text-sm mb-3" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>
            We're registered at a few of our favorite home shops.
          </p>
          <ul className="space-y-1 text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
            <li><a href="https://www.crateandbarrel.com" target="_blank" rel="noopener noreferrer" style={{ color: theme.roseDeep }}>Crate &amp; Barrel</a></li>
            <li><a href="https://www.crateandbarrel.com" target="_blank" rel="noopener noreferrer" style={{ color: theme.roseDeep }}>Williams Sonoma</a></li>
          </ul>
        </div>
        <div className="rounded-2xl p-6" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
          <Heart size={20} style={{ color: theme.roseDeep }} className="mb-3" />
          <h3 className="text-lg mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text }}>A note from us</h3>
          <p className="text-sm" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>
            If you'd rather contribute to our first home together, a QR code for our honeymoon fund will be at the welcome table.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Guest wishes                                                         */
/* ------------------------------------------------------------------ */
function GuestWishes({ theme }) {
  const [wishes, setWishes] = useState([
    { name: "Priya S.", msg: "So happy for you two — can't wait to dance the night away!" },
    { name: "The Chen family", msg: "Watching your story unfold has been such a joy. Congratulations." },
  ]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const add = () => {
    if (!name.trim() || !msg.trim()) return;
    setWishes((w) => [{ name, msg }, ...w]);
    setName(""); setMsg("");
  };
  return (
    <section className="py-24 px-6" style={{ background: theme.bg }}>
      <SectionHeading eyebrow="Words for the couple" title="Guest wishes" theme={theme} />
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2 mb-8">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none" style={{ background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text, fontFamily: "'Jost', sans-serif" }} />
          <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Leave a wish" className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none" style={{ background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text, fontFamily: "'Jost', sans-serif" }} />
          <button onClick={add} className="px-5 py-2.5 rounded-full text-sm shrink-0" style={{ background: theme.gold, color: "#fff", fontFamily: "'Jost', sans-serif" }}>Send</button>
        </div>
        <div className="space-y-4">
          {wishes.map((w, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl p-4" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
              <p className="text-sm mb-1" style={{ fontFamily: "'Jost', sans-serif", color: theme.text }}>{w.msg}</p>
              <p className="text-xs" style={{ fontFamily: "'Jost', sans-serif", color: theme.roseDeep }}>— {w.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                   */
/* ------------------------------------------------------------------ */
function FAQ({ theme }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24 px-6" style={{ background: theme.bgAlt }}>
      <SectionHeading eyebrow="Good to know" title="Frequently asked" theme={theme} />
      <div className="max-w-2xl mx-auto space-y-3">
        {FAQS.map((f, i) => (
          <div key={f.q} className="rounded-xl overflow-hidden" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm md:text-base" style={{ fontFamily: "'Jost', sans-serif", color: theme.text, fontWeight: 500 }}>{f.q}</span>
              {open === i ? <ChevronUp size={16} style={{ color: theme.textSoft }} /> : <ChevronDown size={16} style={{ color: theme.textSoft }} />}
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                               */
/* ------------------------------------------------------------------ */
function Contact({ theme }) {
  const contacts = [
    { role: "Wedding planner", name: "Maren Ellis", phone: "(707) 555-0199" },
    { role: "Bride", name: "Isabelle Moreau", phone: "(415) 555-0122" },
    { role: "Groom", name: "Gabriel Hart", phone: "(415) 555-0187" },
    { role: "Emergency day-of contact", name: "Sophie Moreau", phone: "(415) 555-0165" },
  ];
  return (
    <section className="py-24 px-6" style={{ background: theme.bg }}>
      <SectionHeading eyebrow="We're here to help" title="Contact" theme={theme} />
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {contacts.map((c) => (
          <div key={c.role} className="rounded-2xl p-5 text-center" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <p className="text-[11px] tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", color: theme.roseDeep }}>{c.role}</p>
            <p className="text-lg mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text }}>{c.name}</p>
            <p className="text-sm mb-3" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>{c.phone}</p>
            <div className="flex justify-center gap-2">
              <a href={`https://wa.me/${c.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: `1px solid ${theme.border}`, color: theme.sageDeep }}><MessageCircle size={14} /></a>
              <a href="mailto:hello@hartmoreau2026.com" aria-label="Email" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: `1px solid ${theme.border}`, color: theme.roseDeep }}><Mail size={14} /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                                */
/* ------------------------------------------------------------------ */
function Footer({ theme }) {
  return (
    <footer className="py-16 px-6 text-center" style={{ background: theme.bgAlt, borderTop: `1px solid ${theme.border}` }}>
      <Sprig color={theme.sage} className="w-24 h-8 mx-auto mb-5" />
      <h3 className="text-3xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text }}>Thank you</h3>
      <p className="text-sm mb-6" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>We can't wait to see you at our wedding</p>
      <p className="text-sm tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "'Jost', sans-serif", color: theme.goldDeep }}>{HASHTAG}</p>
      <div className="flex justify-center gap-4 mb-6">
        {["Instagram", "Facebook"].map((s) => (
          <a key={s} href="#" onClick={(e) => e.preventDefault()} className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>{s}</a>
        ))}
      </div>
      <p className="text-xs" style={{ fontFamily: "'Jost', sans-serif", color: theme.textSoft }}>&copy; 2026 Isabelle &amp; Gabriel</p>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* AI wedding assistant                                                 */
/* ------------------------------------------------------------------ */
function AIAssistant({ theme }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi, I'm the Hart–Moreau wedding assistant. Ask me about seating, timing, dress code, parking, or your RSVP." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const respond = (text) => {
    const q = text.toLowerCase();
    const match = AI_RESPONSES.find((r) => r.keys.some((k) => q.includes(k)));
    return match ? match.a : "I'm not certain about that one — please reach out to Maren, our wedding planner, and she'll help directly.";
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: respond(input) };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open wedding assistant"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: theme.gold, color: "#fff", boxShadow: theme.shadow }}
        whileHover={{ scale: 1.06 }}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-[90vw] max-w-sm rounded-2xl overflow-hidden flex flex-col"
            style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: theme.shadow, height: 420 }}
          >
            <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${theme.border}` }}>
              <Sparkles size={15} style={{ color: theme.goldDeep }} />
              <p className="text-sm" style={{ fontFamily: "'Jost', sans-serif", color: theme.text, fontWeight: 500 }}>Wedding assistant</p>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm"
                    style={{
                      background: m.from === "user" ? theme.gold : theme.bgAlt,
                      color: m.from === "user" ? "#fff" : theme.text,
                      fontFamily: "'Jost', sans-serif",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <div className="p-3 flex gap-2" style={{ borderTop: `1px solid ${theme.border}` }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 rounded-full text-sm outline-none"
                style={{ background: theme.bgAlt, border: `1px solid ${theme.border}`, color: theme.text, fontFamily: "'Jost', sans-serif" }}
              />
              <button onClick={send} aria-label="Send" className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: theme.gold, color: "#fff" }}>
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll to top                                                        */
/* ------------------------------------------------------------------ */
function ScrollToTop({ theme }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full flex items-center justify-center"
      style={{ background: theme.surface, border: `1px solid ${theme.border}`, color: theme.textSoft, boxShadow: theme.shadow }}
    >
      <ArrowUp size={16} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                   */
/* ------------------------------------------------------------------ */
export default function WeddingInvitation() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const theme = darkMode ? THEMES.dark : THEMES.light;

  const scrollToInvite = useCallback(() => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", transition: "background 0.5s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        ::selection { background: ${theme.gold}; color: #fff; }
      `}</style>

      <AnimatePresence>
        {loading && <LoadingScreen theme={theme} onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <FloatingPetals theme={theme} />
          <NavBar theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} musicOn={musicOn} setMusicOn={setMusicOn} />
          <main className="relative z-10">
            <Hero theme={theme} scrollToInvite={scrollToInvite} />
            <Countdown theme={theme} />
            <OurStory theme={theme} />
            <WeddingParty theme={theme} />
            <Schedule theme={theme} />
            <Venue theme={theme} />
            <SeatingLookup theme={theme} />
            <RSVP theme={theme} />
            <MenuSection theme={theme} />
            <DressCode theme={theme} />
            <Gallery theme={theme} />
            <Registry theme={theme} />
            <GuestWishes theme={theme} />
            <FAQ theme={theme} />
            <Contact theme={theme} />
          </main>
          <Footer theme={theme} />
          <AIAssistant theme={theme} />
          <ScrollToTop theme={theme} />
        </>
      )}
    </div>
  );
}
