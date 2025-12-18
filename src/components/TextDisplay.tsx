import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import "katex/dist/katex.min.css"

export default function TextDisplay({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code({ className, children }) {
          const match = /language-(\w+)/.exec(className || "")
          return match ? (
            <SyntaxHighlighter language={match[1]}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className}>{children}</code>
          )
        }
      }}
    >
      {text}
    </ReactMarkdown>
  )
}