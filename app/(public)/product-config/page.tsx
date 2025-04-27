import { ProductConfigForm } from "@/components/custom/ProductConfigForm"
import { Toaster } from "sonner"

export default function ProductConfigPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Product Configurator</h1>
      <ProductConfigForm />
      <Toaster richColors position="top-right" />
    </div>
  )
}
