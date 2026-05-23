export default function Features() {
    return (
        <section id="features" className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
            {/* Main philosophy card */}
            <div className="relative overflow-hidden border border-foreground/8 bg-background px-6 py-8 sm:px-8 sm:py-10 rounded-2xl group hover:border-foreground/15 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 animate-[fade-in-up_0.6s_ease-out_0.1s_both]">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-emerald-500/5" />
                </div>
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" aria-hidden="true" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/50">Philosophy</p>
                  <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-foreground">Shurikens are the unit of service.</h2>
                  <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70 sm:text-lg sm:leading-8">
                      Instead of juggling scattered tools and configuration formats, Ninja packages each service as a self-contained Shuriken with its own start, stop, log, and config behavior.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="border border-foreground/8 bg-background/50 p-4 rounded-lg group/card hover:bg-foreground/5 transition-all duration-200">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50 group-hover/card:text-foreground/70">Portable</p>
                          <p className="mt-2 text-sm text-foreground/75">Services travel as packages</p>
                      </div>
                      <div className="border border-foreground/8 bg-background/50 p-4 rounded-lg group/card hover:bg-foreground/5 transition-all duration-200">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50 group-hover/card:text-foreground/70">Deterministic</p>
                          <p className="mt-2 text-sm text-foreground/75">Same inputs, same service state</p>
                      </div>
                  </div>
                </div>
            </div>

            {/* Feature cards grid */}
            <div className="grid gap-4 sm:grid-cols-2">
                {[
                    {
                        label: 'What you get',
                        title: 'CLI, GUI, and APIs',
                        description: 'A command-line workflow, a Next.js + Tauri desktop app, and HTTP access for automation.',
                        color: 'from-emerald-500/10 to-transparent',
                        delay: 0.15
                    },
                    {
                        label: 'Scriptable',
                        title: 'Lua and DSL support',
                        description: 'Embed Lua logic in shurikens and extend behavior with a dedicated service DSL.',
                        color: 'from-blue-500/10 to-transparent',
                        delay: 0.25
                    },
                    {
                        label: 'Reliable',
                        title: 'Rust core',
                        description: 'The engine is written in Rust for performance, process safety, and service state tracking.',
                        color: 'from-purple-500/10 to-transparent',
                        delay: 0.35
                    },
                    {
                        label: 'Extensible',
                        title: 'MCP, FFI, backup',
                        description: 'Integrate with agents, C/C++ code, snapshot service state, and plug into CI/CD workflows.',
                        color: 'from-pink-500/10 to-transparent',
                        delay: 0.45
                    }
                ].map((feature, index) => (
                    <article 
                        key={index} 
                        className="group border border-foreground/8 bg-background/50 p-5 rounded-xl transition-all duration-300 hover:bg-background hover:border-foreground/15 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-1 cursor-pointer animate-[fade-in-up_0.6s_ease-out_forwards]"
                        style={{
                          animationDelay: `${0.15 + index * 0.1}s`
                        }}
                    >
                        <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} aria-hidden="true" />
                        <div className="relative">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50 group-hover:text-foreground/70 transition-colors">{feature.label}</p>
                          <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground group-hover:text-foreground transition-colors">{feature.title}</h3>
                          <p className="mt-3 text-sm leading-6 text-foreground/70 group-hover:text-foreground/80 transition-colors">{feature.description}</p>
                        </div>
                    </article>
                ))}
                
                {/* Full-width quick start card */}
                <article 
                    className="border border-foreground/8 bg-background/50 p-5 rounded-xl sm:col-span-2 hover:bg-background hover:border-foreground/15 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 hover:-translate-y-0.5 cursor-pointer group animate-[fade-in-up_0.6s_ease-out_0.55s_forwards]"
                >
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" aria-hidden="true" />
                    <div className="relative">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50 group-hover:text-foreground/70 transition-colors">Quick start</p>
                      <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground group-hover:text-foreground transition-colors">Install, configure, start.</h3>
                      <p className="mt-3 text-sm leading-6 text-foreground/70 group-hover:text-foreground/80 transition-colors">Install Ninja, add a .shuriken package, render templates, and start the service from the CLI or desktop UI.</p>
                    </div>
                </article>
            </div>
        </section>
    )
}