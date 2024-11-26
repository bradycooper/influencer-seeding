import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InstallationGuide } from "@/components/installation-guide"
import { ProductSelector } from "@/components/product-selector"
import { FormBuilder } from "@/components/form-builder"
import { SubmissionsManager } from "@/components/submissions-manager"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Influencer Outreach Manager</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Installation</CardTitle>
            <CardDescription>Set up your Shopify integration</CardDescription>
          </CardHeader>
          <CardContent>
            <InstallationGuide />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product Selection</CardTitle>
            <CardDescription>Choose products for influencer outreach</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductSelector />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Form Builder</CardTitle>
            <CardDescription>Customize your influencer application form</CardDescription>
          </CardHeader>
          <CardContent>
            <FormBuilder />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
            <CardDescription>Manage influencer applications</CardDescription>
          </CardHeader>
          <CardContent>
            <SubmissionsManager />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

