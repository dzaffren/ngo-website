import React, { Fragment } from 'react'
import escapeHTML from 'escape-html'

// --- HELPER: Fixes Relative Image Paths ---
// We add this here so images inside the text editor render correctly
const getImageUrl = (url?: string | null) => {
  if (!url) return ""
  if (url.startsWith('http')) return url
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`
}

export const RichText = ({ content }: { content: any }) => {
  if (!content) return null

  // 1. Handle simple string
  if (typeof content === 'string') {
    return <p className="mb-4">{content}</p>
  }

  // 2. Handle Payload Lexical JSON
  const nodes = content?.root?.children || []

  return (
    <div className="rich-text">
      {nodes.map((node: any, index: number) => (
        <SerializeLexicalNode key={index} node={node} />
      ))}
    </div>
  )
}

const SerializeLexicalNode = ({ node }: { node: any }) => {
  if (!node) return null

  // --- HANDLE TEXT NODES ---
  if (node.type === 'text') {
    let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
    if (node.format & 1) text = <strong>{text}</strong>
    if (node.format & 2) text = <em>{text}</em>
    if (node.format & 8) text = <u>{text}</u>
    return text
  }

  // --- HANDLE UPLOAD NODES (IMAGES) ---
  if (node.type === 'upload') {
    const media = node.value
    if (!media?.url) return null

    return (
      <div className="my-8">
        <img 
          src={getImageUrl(media.url)} 
          alt={media.alt || 'Image'} 
          className="rounded-lg shadow-md max-w-full h-auto mx-auto border border-border/10" 
        />
        {/* Optional: Render caption if you add one in Payload */}
        {node.fields?.caption && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            {node.fields.caption}
          </p>
        )}
      </div>
    )
  }

  // --- HANDLE OTHER BLOCKS ---
  const children = node.children?.map((child: any, i: number) => (
    <SerializeLexicalNode key={i} node={child} />
  ))

  switch (node.type) {
    case 'heading':
      const Tag = node.tag as keyof JSX.IntrinsicElements || 'h2'
      return <Tag className="font-bold mb-4 mt-8 text-2xl text-foreground">{children}</Tag>
    
    case 'list':
      const ListTag = node.tag === 'ol' ? 'ol' : 'ul'
      return <ListTag className="list-disc pl-5 mb-4 space-y-2">{children}</ListTag>
    
    case 'listitem':
      return <li>{children}</li>
      
    case 'quote':
      return <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground bg-muted/30 py-2 pr-2 rounded-r">{children}</blockquote>

    case 'paragraph':
      // Only render paragraph if it has content to prevent empty gaps
      if (!children || children.length === 0) return null
      return <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
      
    case 'link':
      return (
        <a 
          href={escapeHTML(node.fields?.url || '#')}
          target={node.fields?.newTab ? '_blank' : undefined}
          rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      )

    default:
      return <Fragment>{children}</Fragment>
  }
}