# w. jonas reger's portfolio website

## how to configure a next.js site for github pages

### configure next.js

next.js is a site generator tool that has many nice features in the serverless and edge applications. while not intended for static site generation, it is still possible to host a static site with some limited expectations on performance.

to configure a next.js site to support static export and hosting, you need to do the following:

- set the output type to `export`.
- set the base path.
- disable automatic image optimization.

so, create or modify your `ext.config.js` file and add the following code:

```
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
  basePath: "/",

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
```

after saving your config file, add a `.nojekyll` file in the `/public` directory. this prevents github pages from creating a jekyll site, which is their default action when creating a static site.

```
.
├── app/
├── public/
│   └── .nojekyll
├── next.config.js
```

### make things appear for next.js

you will need to add the same base path to your `page.tsx` file to enable images on github pages.

- open `app/page.tsx`.
- open `Image` component.
- add `/` to the `src` parameter.

```
   <Image
     src="/vercel.svg"
     alt="vercel logo"
     className={styles.vercelLogo}
     width={100}
     height={24}
     priority
   />
```

### configure github repository

finally, you need to configure your repository on github to enable automatic deployments via github actions when you push updates.

first, you need to enable github pages like any other github pages project via the github actions workflow, which is convenient as you will not need to use ssh keys or personal access tokens this way. navigate to **settings > pages > build and deployment > source**, and select github actions as your source.

next, you will set up your github actions workflow file to automatically build and deploy your next.js site when pushing updates to the `main` branch.

- create a `.github/workflows/deploy.yml` file.
- add the following code:

```
# sample workflow for building and deploying a next.js site to github pages
#
# to get started with next.js see: https://nextjs.org/docs/getting-started
#
name: deploy next.js site to pages

on:
  # runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # allows you to run this workflow manually from the actions tab
  workflow_dispatch:

# sets permissions of the GITHUB_TOKEN to allow deployment to github pages
permissions:
  contents: read
  pages: write
  id-token: write

# allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# however, do not cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v3
      - name: detect package manager
        id: detect-package-manager
        run: |
          if [ -f "${{ github.workspace }}/yarn.lock" ]; then
            echo "manager=yarn" >> $GITHUB_OUTPUT
            echo "command=install" >> $GITHUB_OUTPUT
            echo "runner=yarn" >> $GITHUB_OUTPUT
            exit 0
          elif [ -f "${{ github.workspace }}/package.json" ]; then
            echo "manager=npm" >> $GITHUB_OUTPUT
            echo "command=ci" >> $GITHUB_OUTPUT
            echo "runner=npx --no-install" >> $GITHUB_OUTPUT
            exit 0
          else
            echo "unable to determine package manager"
            exit 1
          fi
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "lts/*"
          cache: ${{ steps.detect-package-manager.outputs.manager }}
      - name: setup pages
        uses: actions/configure-pages@v3
      - name: restore cache
        uses: actions/cache@v3
        with:
          path: |
            .next/cache
          # generate a new cache whenever packages or source files change.
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
          # if source files changed but packages didn't, rebuild from a prior cache.
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock') }}-
      - name: install dependencies
        run: ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}
      - name: build with next.js
        run: ${{ steps.detect-package-manager.outputs.runner }} next build
      - name: upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./out

  # deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: deploy to github pages
        id: deployment
        uses: actions/deploy-pages@v2
```

ensure all modifications have been saved, then push these configurations to github. the github actions workflow will be triggered upon pushing and the site will be deployed at the indicated url link in a few minutes.
