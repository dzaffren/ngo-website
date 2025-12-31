import React from 'react'

export const RichText = ({ className, content }: { className?: string; content: any }) => {
  if (!content) {
    return null
  }

  return (
    <div className={[className].filter(Boolean).join(' ')}>
      {serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}

function serializeLexical({ nodes }: { nodes: any[] }) {
  if (!nodes || !Array.isArray(nodes)) return null

  return (
    <>
      {nodes.map((node, index) => {
        if (!node) return null

        if (node.type === 'text') {
          let text = <span key={index}>{node.text}</span>
          if (node.format & 1) text = <strong key={index}>{text}</strong>
          if (node.format & 2) text = <em key={index}>{text}</em>
          if (node.format & 8) text = <u key={index}>{text}</u>
          if (node.format & 16) text = <code key={index}>{text}</code>
          return text
        }

        const children = node.children ? serializeLexical({ nodes: node.children }) : null

        switch (node.type) {
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
          
          case 'heading':
            const Tag = (node.tag as any) || 'h2'
            return <Tag key={index} className="font-bold mb-4 mt-8 text-2xl text-foreground">{children}</Tag>

          case 'paragraph':
            // Paragraphs use <div> here to be safe against nested block-level issues 
            // OR we keep it as <p> but ensure children are span/text only.
            // Using <div> with paragraph styling is the safest "cheat" for hydration.
            return <div key={index} className="mb-4 leading-relaxed text-slate-700">{children}</div>
          
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
            // CHANGED: Use span instead of div for unknown nodes to prevent hydration errors
            return <span key={index}>{children}</span>
        }
      })}
    </>
  )
}