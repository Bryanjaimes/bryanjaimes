import Link from "next/link";
import { Navigation } from "@/components";

const LOCAL_URL = process.env.NEXT_PUBLIC_OPENDEPLOY_LOCAL_URL ?? "http://localhost:3001";
const HOSTED_URL = process.env.NEXT_PUBLIC_OPENDEPLOY_URL ?? "http://localhost:3001/";

export default function OpenDeployPage() {
  return (
    <main className="relative min-h-screen bg-[#050506] text-white">
      <Navigation />
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-blue-500 to-cyan-500" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-blue-400">
              Platform Optimization
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">
            OpenDeploy
          </h1>
          <p className="mt-4 text-zinc-300 leading-relaxed max-w-2xl">
            Run your models with cost-aware deployment controls. Choose a local
            test instance or the hosted environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href={LOCAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            <div className="text-sm font-mono text-zinc-400">Local</div>
            <div className="mt-2 text-2xl font-semibold text-white">
              Launch Local OpenDeploy
            </div>
            <div className="mt-3 text-sm text-zinc-400 break-all">
              {LOCAL_URL}
            </div>
            <div className="mt-4 text-sm text-blue-400 group-hover:text-blue-300">
              Open in new tab →
            </div>
          </a>

          <a
            href={HOSTED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            <div className="text-sm font-mono text-zinc-400">Hosted</div>
            <div className="mt-2 text-2xl font-semibold text-white">
              Launch Hosted OpenDeploy
            </div>
            <div className="mt-3 text-sm text-zinc-400 break-all">
              {HOSTED_URL}
            </div>
            <div className="mt-4 text-sm text-blue-400 group-hover:text-blue-300">
              Open in new tab →
            </div>
          </a>
        </div>

        <div className="mt-10 text-sm text-zinc-500">
          Want these links to point somewhere else? Set
          <span className="text-zinc-300"> NEXT_PUBLIC_OPENDEPLOY_LOCAL_URL</span>
          and
          <span className="text-zinc-300"> NEXT_PUBLIC_OPENDEPLOY_URL</span>.
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
