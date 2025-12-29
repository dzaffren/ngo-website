import React from 'react'

export const RichText = ({ className, content }: { className?: string; content: any }) => {
  if (!content) {
    return null
  }

  return (
    <div className={[className].filter(Boolean).join(' ')}>
      {/* We use our local function below instead of the missing import */}
      {serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}

// Custom serializer to handle rendering and fix Type errors
function serializeLexical({ nodes }: { nodes: any[] }) {
  if (!nodes || !Array.isArray(nodes)) return null

  return (
    <>
      {nodes.map((node, index) => {
        if (!node) return null

        // 1. HANDLE TEXT NODES
        if (node.type === 'text') {
          let text = <span key={index}>{node.text}</span>
          // Apply formatting bitmasks (1=bold, 2=italic, etc.)
          if (node.format & 1) text = <strong key={index}>{text}</strong>
          if (node.format & 2) text = <em key={index}>{text}</em>
          if (node.format & 8) text = <u key={index}>{text}</u>
          if (node.format & 16) text = <code key={index}>{text}</code>
          return text
        }

        const children = node.children ? serializeLexical({ nodes: node.children }) : null

        // 2. HANDLE BLOCKS
        switch (node.type) {
          // Headings
          case 'h1':
            return <h1 key={index} className="text-4xl font-bold mb-4 mt-8">{children}</h1>
          case 'h2':
            return <h2 key={index} className="text-3xl font-bold mb-4 mt-8">{children}</h2>
          case 'h3':
            return <h3 key={index} className="text-2xl font-bold mb-4 mt-6">{children}</h3>
          case 'h4':
            return <h4 key={index} className="text-xl font-bold mb-4 mt-6">{children}</h4>
          case 'h5':
            return <h5 key={index} className="text-lg font-bold mb-4 mt-6">{children}</h5>
          case 'h6':
            return <h6 key={index} className="text-base font-bold mb-4 mt-6">{children}</h6>
          
          // Generic 'heading' node from Payload
          case 'heading':
            // Cast to 'any' to bypass the JSX.IntrinsicElements namespace error
            const Tag = (node.tag as any) || 'h2'
            return <Tag key={index} className="font-bold mb-4 mt-8 text-2xl text-foreground">{children}</Tag>

          // Standard Blocks
          case 'paragraph':
            return <p key={index} className="mb-4 leading-relaxed text-slate-700">{children}</p>
          
          case 'ul':
          case 'list': 
            return node.listType === 'number' ? (
              <ol key={index} className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
            ) : (
              <ul key={index} className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
            )
          
          case 'li':
          case 'listitem':
            return <li key={index}>{children}</li>
          
          case 'quote':
            return <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
          
          case 'link':
            return (
              <a 
                key={index} 
                href={node.fields?.url || node.url} 
                target={node.fields?.newTab ? '_blank' : '_self'} 
                rel="noopener noreferrer" 
                className="text-primary hover:underline underline-offset-4"
              >
                {children}
              </a>
            )
            
          default:
            return <div key={index}>{children}</div>
        }
      })}
    </>
  )
}