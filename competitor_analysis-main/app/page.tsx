"use client"

import React, { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [clientName, setClientName] = useState("")
  const [clientType, setClientType] = useState("individual")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/client-info")
      .then((res) => res.json())
      .then((data) => {
        if (data?.name) {
          setClientName(data.name)
          setClientType(data.type)
          setDescription(data.description)
          setSubmitted(true)
        }
      })
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const clientData = { name: clientName, type: clientType, description }

    try {
      const res = await fetch("http://127.0.0.1:8000/client-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientData),
      })
      await res.json()
      setSubmitted(true)
    } catch (err) {
      console.error("Failed to save client info", err)
    }
  }

  return (
    <main className="mt-20 w-full flex justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>🎯 Client Details</CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="space-y-4">
              <p><strong>Name:</strong> {clientName}</p>
              <p><strong>Type:</strong> {clientType}</p>
              <div>
                <p className="mb-1 font-medium">Description:</p>
                <div className="prose prose-sm max-w-none text-muted-foreground border rounded-md p-3 bg-gray-600 bg-opacity-10">
                  <ReactMarkdown className="markdown">{description}</ReactMarkdown>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">✅ Information submitted.</p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>Edit</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Client Name</label>
                <Input
                  placeholder="e.g. John Doe or Acme Corp"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Client Type</label>
                <select
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background border-input"
                >
                  <option value="individual">Individual</option>
                  <option value="company">Company</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Brief Description</label>
                <Textarea
                  className="min-h-[150px]"
                  placeholder="Tell us about your goals, brand voice, audience, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">Save & Continue</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
