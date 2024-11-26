"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// Mock product data (replace with actual Shopify Products API call)
const mockProducts = [
  { id: "1", title: "T-Shirt" },
  { id: "2", title: "Jeans" },
  { id: "3", title: "Sneakers" },
]

export function ProductSelector() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const handleProductToggle = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const handleSave = () => {
    // TODO: Implement saving selected products to app storage
    console.log("Selected products:", selectedProducts)
  }

  return (
    <div>
      <ul className="space-y-2">
        {mockProducts.map((product) => (
          <li key={product.id} className="flex items-center space-x-2">
            <Checkbox
              id={`product-${product.id}`}
              checked={selectedProducts.includes(product.id)}
              onCheckedChange={() => handleProductToggle(product.id)}
            />
            <label htmlFor={`product-${product.id}`}>{product.title}</label>
          </li>
        ))}
      </ul>
      <Button onClick={handleSave} className="mt-4">Save Selection</Button>
    </div>
  )
}

