"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

function Counter({ value }: { value?: string }) {
  const safeValue = value || "0"
  const ref = useRef<HTMLSpanElement>(null)

  // 1. SMART PARSING: Splits "RM1.9M" into ["RM", "1.9", "M"]
  // regex breakdown:
  // ^([^0-9.]*)  -> Captures PREfix (anything not a number/dot at start)
  // ([0-9.,]+)   -> Captures NUMBER (digits, dots, commas)
  // (.*)$        -> Captures SUFfix (anything left over)
  const match = safeValue.match(/^([^0-9.]*)([0-9.,]+)(.*)$/)

  const prefix = match ? match[1] : ""
  const numberString = match ? match[2] : "0"
  const suffix = match ? match[3] : ""

  // Clean the number string (remove commas) so parseFloat can read it
  const numericValue = parseFloat(numberString.replace(/,/g, "")) || 0
  
  // Detect decimal places (e.g. if input is "1.9", we want 1 decimal. If "100", 0 decimals)
  const decimalMatch = numberString.match(/\.([0-9]+)/)
  const decimals = decimalMatch ? decimalMatch[1].length : 0

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: 2000 
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue)
    }
  }, [isInView, motionValue, numericValue])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // 2. RECONSTRUCT: Prefix + Formatted Number + Suffix
        ref.current.textContent = 
          prefix + 
          latest.toLocaleString('en-US', { 
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals 
          }) + 
          suffix
      }
    })
  }, [springValue, prefix, suffix, decimals])

  return <span ref={ref} className="tabular-nums" />
}

export function ImpactStats({ data }: { data: any }) {
  if (!data?.stats || !Array.isArray(data.stats)) return null;

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.stats.map((stat: any, i: number) => (
            <div key={i} className="text-center p-4">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 flex justify-center">
                <Counter value={stat.value} />
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">
                {stat.label || "Label"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}