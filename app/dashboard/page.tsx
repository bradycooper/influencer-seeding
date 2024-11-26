import { ProductSelector } from "@/components/product-selector"
import { FormBuilder } from "@/components/form-builder"
import { SubmissionsManager } from "@/components/submissions-manager"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Influencer Outreach Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Product Selection</h2>
          <ProductSelector />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Form Builder</h2>
          <FormBuilder />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Submissions</h2>
          <SubmissionsManager />
        </div>
      </div>
    </div>
  )
}

