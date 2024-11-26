"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

// Mock submission data (replace with actual submissions fetched from your backend)
const mockSubmissions = [
  { id: "1", name: "John Doe", email: "john@example.com", status: "pending" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", status: "pending" },
]

export function SubmissionsManager() {
  const [submissions, setSubmissions] = useState(mockSubmissions)

  const handleApprove = (id: string) => {
    // TODO: Implement approval logic, including order creation in Shopify
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: "approved" } : sub))
    )
  }

  const handleReject = (id: string) => {
    // TODO: Implement rejection logic
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: "rejected" } : sub))
    )
  }

  return (
    <div>
      <ul className="space-y-4">
        {submissions.map((submission) => (
          <li key={submission.id} className="border p-4 rounded">
            <p>Name: {submission.name}</p>
            <p>Email: {submission.email}</p>
            <p>Status: {submission.status}</p>
            {submission.status === "pending" && (
              <div className="mt-2 space-x-2">
                <Button onClick={() => handleApprove(submission.id)} variant="default">
                  Approve
                </Button>
                <Button onClick={() => handleReject(submission.id)} variant="destructive">
                  Reject
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

