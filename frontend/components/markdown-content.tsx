"use client"

import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"

type MarkdownContentProps = {
  content: string
  className?: string
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div
      className={cn(
        "markdown-content space-y-4",
        "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mt-8 [&_h1]:mb-4",
        "[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-3",
        "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-2",
        "[&_p]:text-muted-foreground [&_p]:leading-7 [&_p]:mb-4",
        "[&_ul]:list-disc [&_ul]:ml-6 [&_ul]:text-muted-foreground [&_ul]:space-y-2 [&_ul]:mb-4",
        "[&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:text-muted-foreground [&_ol]:space-y-2 [&_ol]:mb-4",
        "[&_li]:leading-7",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline",
        "[&_hr]:border-border [&_hr]:my-6",
        className
      )}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

