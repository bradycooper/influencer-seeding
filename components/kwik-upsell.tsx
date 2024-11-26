"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function KwikUpsell({ onUpgrade }: { onUpgrade: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement actual Kwik app integration
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
      onUpgrade()
      toast({
        title: "Upgrade successful",
        description: "You now have access to premium Kwik features.",
      })
    } catch (error) {
      console.error('Error upgrading to Kwik:', error)
      toast({
        title: "Error upgrading",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Upgrade to Kwik Premium</h3>
      <p className="mb-4">Get access to custom links, promo codes, and more advanced features!</p>
      <Button onClick={handleUpgrade} disabled={isLoading}>
        {isLoading ? "Upgrading..." : "Upgrade Now"}
      </Button>
    </div>
  )
}

