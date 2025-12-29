"use client"

export function DynamicTheme({ color }: { color: string }) {
  return (
    <style id="theme-overrides" dangerouslySetInnerHTML={{ __html: `
      :root {
        /* Force Hex onto these variables */
        --primary: ${color} !important;
        --ring: ${color} !important;
        --accent: ${color} !important;
        
        /* Kill any global mix-blend-modes that might be causing the tint */
        --tw-bg-blend-mode: normal !important;
      }

      /* Force images to be natural globally if they are inside a hero */
      .absolute.inset-0.object-cover {
        mix-blend-mode: normal !important;
        opacity: 1 !important;
      }
    `}} />
  )
}