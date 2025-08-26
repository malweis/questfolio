import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, provide any other Next.js config options
  experimental: {
    mdxRs: true,
  },

}

const withMDX = createMDX({
  // Add markdown plugins here, if needed
  // mdxOptions: {},
  // If you use `MDXProvider`, uncomment the following line.
  // providerImportSource: "@mdx-js/react",
})

// Merge MDX config into Next.js config
export default withMDX(nextConfig)
