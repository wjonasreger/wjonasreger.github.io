// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  /**
   * enable static exports for the app router.
   *
   * @see https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
   */
  output: "export",

  /**
   * set base path. this is usually the slug of your repository.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  basePath: "",

  /**
   * disable server-based image optimization. next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
