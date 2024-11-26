"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FormBuilder() {
  const [formFields, setFormFields] = useState([
    { id: "name", label: "Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "instagram", label: "Instagram Handle", type: "text" },
    { id: "address", label: "Shipping Address", type: "textarea" },
  ])

  const [formLink, setFormLink] = useState("")

  const handleGenerateForm = () => {
    // TODO: Implement form generation and hosting logic
    const mockFormLink = `https://your-app-domain.com/influencer-form/${Date.now()}`
    setFormLink(mockFormLink)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {formFields.map((field) => (
          <div key={field.id} className="flex items-center space-x-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input id={field.id} type={field.type} placeholder={field.label} disabled />
          </div>
        ))}
      </div>
      <Button onClick={handleGenerateForm}>Generate Form</Button>
      {formLink && (
        <div className="mt-4">
          <p>Share this link with influencers:</p>
          <Input value={formLink} readOnly />
        </div>
      )}
    </div>
  )
}

