"use client"
import React, { useEffect, useRef } from "react"
import { useXTerm } from "react-xtermjs"
import { FitAddon } from "@xterm/addon-fit"

/**
 * Props:
 * - height?: number | string (defaults to 300px). You can also pass "100%" but
 *   if you do make sure the parent has an explicit height.
 */
export default function TerminalComponent({ height = 309 }: { height?: number | string }) {
  const { instance, ref } = useXTerm()
  const fit = useRef(new FitAddon())
  const containerRef = ref as React.RefObject<HTMLElement | null>

  // helper that always uses CRLF for newlines
  const safeWrite = (term: ReturnType<typeof useXTerm>["instance"], text: string) => {
    term?.write(text.replace(/\n/g, "\r\n"))
  }

  useEffect(() => {
    const term = instance
    if (!term) return

    // load fit addon once
    if (!term.hasOwnProperty("__fit_loaded")) {
      term.loadAddon(fit.current)
      // mark to avoid double loading in case of re-renders
      // @ts-ignore
      term.__fit_loaded = true
    }

    // initial fit (may be no-op until container has layout)
    fit.current.fit()

    // Intro
    safeWrite(term, "Welcome to noPowershell\n")
    safeWrite(term, "Type 'help' to get started.\n\r$ ")

    let input = ""
    term.onData((data) => {
      switch (data) {
        case "\r": // Enter
          const cmd = input.trim()
          safeWrite(term, "\n")
          if (cmd === "clear") {
            term.clear()
          } else if (cmd === "help") {
            safeWrite(term, [
              "Available commands:",
              "  help      Show this help message",
              "  about     Info about Ninja",
              "  clear     Clear the screen",
              "  version   Show Ninja version",
              "  contact   Contact the team",
            ].join("\n") + "\n")
          } else if (cmd === "about") {
            safeWrite(term, "Ninja — a fast, open-source automation and service manager.\n")
          } else if (cmd === "version") {
            safeWrite(term, "Ninja v1.0.0\n")
          } else if (cmd === "contact") {
            safeWrite(term, "Visit: https://ninja.armory.dev\n")
          } else if (cmd.length > 0) {
            safeWrite(term, `Unknown command: ${cmd}\n`)
          }
          input = ""
          safeWrite(term, "\r\n$ ")
          break

        case "\u007F": // Backspace
          if (input.length > 0) {
            input = input.slice(0, -1)
            // remove one character visually
            term.write("\b \b")
          }
          break

        default:
          input += data
          term.write(data)
      }
    })

    // Observe container size and re-fit when it changes.
    const el = containerRef?.current
    let ro: ResizeObserver | undefined
    if (el) {
      ro = new ResizeObserver(() => {
        // ensure fit runs after layout change
        try { fit.current.fit() } catch (e) { /* ignore */ }
      })
      ro.observe(el)
    }

    // cleanup
    return () => {
      ro?.disconnect()
      // note: react-xtermjs handles term disposal; we only remove handlers
      // there is no stored reference to the onData disposable here so this is simple
    }
  }, [instance, containerRef])

  // Inline styles + xterm overflow overrides.
  // If you want tailwind, translate these classes accordingly.
  return (
    <>
      <style>
        {`
          /* Force xterm internal scroll areas to hide overflow so nothing drifts */
          .xterm .xterm-viewport {
            overflow: hidden !important;
          }
          .xterm .xterm-scroll-area {
            overflow: hidden !important;
          }
          .xterm .xterm-rows {
            overflow: hidden !important;
          }

          /* Optional: remove margins/padding that could affect layout */
          .ninja-term-root {
            box-sizing: border-box;
            height: 100vh;
          }
        `}
      </style>

      <div
        className="ninja-term-root"
        style={{
          height: typeof height === "number" ? `${height}px` : height,
          width: "100%",
          overflow: "hidden",        // clip any overflow from xterm
          background: "#0b0f14",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* the element returned by useXTerm should live inside the clipped container */}
        <div ref={containerRef as any} style={{ flex: 1, minHeight: 100 }} />
      </div>
    </>
  )
}
