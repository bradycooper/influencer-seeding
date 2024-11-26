"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FormField {
  id: string
  label: string
  type: string
  required: boolean
}

export default function InfluencerForm() {
  const { formId } = useParams()
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`/api/forms?id=${formId}`)
        if (!response.ok) throw new Error('Failed to fetch form')
        const data = await response.json()
        setFormFields(data.fields)
        setIsLoading(false)
      } catch (error) {
        setError('Error loading form. Please try again.')
        setIsLoading(false)
      }
    }
    fetchForm()
  }, [formId])

  const handleInputChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId, data: formData }),
      })
      if (!response.ok) throw new Error('Failed to submit form')
      setSubmitSuccess(true)
    } catch (error) {
      setError('Error submitting form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <p>Loading form...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (submitSuccess) return <p className="text-green-600">Thank you for your submission!</p>

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Influencer Application Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            {field.type === 'textarea' ? (
              <Textarea
                id={field.id}
                required={field.required}
                value={formData[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              />
            ) : (
              <Input
                id={field.id}
                type={field.type}
                required={field.required}
                value={formData[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              />
            )}
          </div>
        ))}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </form>
    </div>
  )
}

