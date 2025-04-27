export default function SubHeaderBanner() {
  return (
    <div className="w-full">
      {/* Services Banner */}
      <div className="w-full bg-[#f5f0e8] py-4 overflow-x-auto">
        <div className="container mx-auto px-4 flex items-center justify-between min-w-max lg:min-w-0">
          <div className="flex items-center gap-2 mr-8">
            <div className="bg-purple-600 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <span className="font-medium">SEO & PPC</span>
          </div>

          <div className="flex items-center gap-2 mr-8">
            <div className="bg-blue-400 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-layers"
              >
                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
                <path d="m22 12.5-8.58 3.91a2 2 0 0 1-1.66 0L2.6 12.5" />
                <path d="m22 17.5-8.58 3.91a2 2 0 0 1-1.66 0L2.6 17.5" />
              </svg>
            </div>
            <span className="font-medium">UI/UX Design</span>
          </div>

          <div className="flex items-center gap-2 mr-8">
            <div className="bg-amber-700 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-palette"
              >
                <circle cx="13.5" cy="6.5" r=".5" />
                <circle cx="17.5" cy="10.5" r=".5" />
                <circle cx="8.5" cy="7.5" r=".5" />
                <circle cx="6.5" cy="12.5" r=".5" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
              </svg>
            </div>
            <span className="font-medium">Graphics Design</span>
          </div>

          <div className="flex items-center gap-2 mr-8">
            <div className="bg-blue-500 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-globe"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <span className="font-medium">Webflow Development</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-bag"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span className="font-medium">Shopify Development</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border-r md:border-r border-gray-200 px-4">
              <h2 className="text-4xl font-bold mb-2">233+</h2>
              <p className="text-gray-700">Websites Developed</p>
            </div>

            <div className="md:border-r border-gray-200 px-4">
              <h2 className="text-4xl font-bold mb-2">35+</h2>
              <p className="text-gray-700">Satisfied Clients</p>
            </div>

            <div className="border-r md:border-r border-gray-200 px-4">
              <h2 className="text-4xl font-bold mb-2">50+</h2>
              <p className="text-gray-700">SEO Strategies Delivered</p>
            </div>

            <div className="px-4">
              <h2 className="text-4xl font-bold mb-2">100+</h2>
              <p className="text-gray-700">PPC Campaigns Managed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
