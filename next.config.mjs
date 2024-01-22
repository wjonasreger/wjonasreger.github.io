import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkCodeTitles from './src/lib/remark-code-title.mjs'
import rehypePresetMinify from 'rehype-preset-minify'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  }
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkCodeTitles],
    rehypePlugins: [rehypePrismPlus, rehypePresetMinify],
    providerImportSource: '@mdx-js/react',
  },
})

export default withMDX(nextConfig)



// // @ts-check

// /**
//  * @type {import('next').NextConfig}
//  **/
// const nextConfig = {
//   /**
//    * enable static exports for the app router.
//    *
//    * @see https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
//    */
//   output: "export",

//   /**
//    * set base path. this is usually the slug of your repository.
//    *
//    * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
//    */
//   basePath: "wjonasreger.github.io",

//   /**
//    * disable server-based image optimization. next.js does not support
//    * dynamic features with static exports.
//    *
//    * @see https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
//    */
//   images: {
//     unoptimized: true,
//   },
// };

// module.exports = nextConfig;