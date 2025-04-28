import { Toaster } from "sonner"

export default function ProductCreatorPage() {
  return (
    <div className="container py-10 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6">Product Configuration Creator</h1>
      <p className="text-center text-muted-foreground mb-8">
        Create a configurable product with custom options, sub-options, and variants
      </p>
      {/*<ProductConfigCreator />*/}
      <Toaster richColors position="top-right" />
    </div>
  )
}
