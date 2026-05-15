import { Outlet } from "react-router-dom"
import Header from "../components/header"

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Radial glow top-left */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        <main className="flex-1 px-6 sm:px-12 lg:px-24">
          <Header />
          <Outlet />
        </main>

        <footer className="relative mt-16 border-t border-white/5 bg-[#0d0d14]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 font-bold tracking-tight text-lg">
                trimrr
              </span>
              <span className="text-white/20 text-sm">·</span>
              <span className="text-white/30 text-sm">URL Shortener</span>
            </div>
            <p className="text-white/25 text-sm">
              Made with{" "}
              <span className="text-rose-400">♥</span>{" "}
              by Bob
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default AppLayout
