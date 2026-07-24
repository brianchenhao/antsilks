import BackgroundFX from "@/components/BackgroundFX";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LiveFeed from "@/components/LiveFeed";
import Install from "@/components/Install";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getRecentEvents, getStats } from "@/lib/data";

// Re-pull the ledger snapshot from Supabase at most once a minute.
export const revalidate = 60;

function fmt(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

export default async function Home() {
  const [events, stats] = await Promise.all([
    getRecentEvents(40),
    getStats(),
  ]);

  return (
    <>
      <BackgroundFX />
      <Nav />
      <main>
        <Hero stats={stats} />

        <section id="live" className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  Live ledger
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Watch it block attacks in real time.
                </h2>
                <p className="mt-3 max-w-2xl text-mute">
                  A live tail of antsilk&apos;s SQLite ledger, streamed from
                  Supabase. Every row is a request that never reached a route
                  handler.
                </p>
              </div>
              <p className="mono shrink-0 text-xs text-faint">
                window: {fmt(stats.firstSeen)} – {fmt(stats.lastSeen)}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-8">
            <LiveFeed initialEvents={events} stats={stats} />
          </Reveal>
        </section>

        <Install />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
