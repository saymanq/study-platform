"use client"

import { toast } from "@/hooks/use-toast"
import { ReactNode } from "react"

interface NotificationButtonProps {
  className?: string
  children: ReactNode
}

export function NotificationButton({ className, children }: NotificationButtonProps) {
  const handleClick = () => {
    toast({
      title: "Under Development",
      description: "The website is currently under development. Please check back later. Thanks.",
      variant: "default",
    })
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}