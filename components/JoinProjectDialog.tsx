"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function JoinProjectDialog({ projectTitle }: { projectTitle: string }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send data to your API/CMS
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setOpen(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold">
          Join Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join {projectTitle}</DialogTitle>
        </DialogHeader>
        
        {submitted ? (
          <div className="py-8 text-center text-green-600">
            <h3 className="text-lg font-bold">Thank you!</h3>
            <p>We've received your interest and will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Jane Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="jane@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Why do you want to join?</Label>
              <Textarea id="message" placeholder="Briefly describe your skills or interest..." />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Submit Application
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}