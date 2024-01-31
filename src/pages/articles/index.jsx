import { NextSeo } from 'next-seo';
import SiteConfigs from '../../data/meta'
import { SimpleLayout } from '../../components/SimpleLayout'
import { RenderArticlesSection } from "../../components/Item"
import { getAllArticles } from '../../lib/getAllArticles'
// import { formatDate } from '../../lib/formatDate'


export default function Stack({ articles }) {
  const heading = "sometimes i write things up. most of the time, i do not." 
  const subheading = "this is where my ideas and discoveries go to live when immortalized on the internet. potential material for digital necromancy."
  const pageName = "articles"

  return (
    <>
      <NextSeo
        title = {`${pageName} — ${SiteConfigs.title}`}
        description = {SiteConfigs.description}
        canonical = {`${SiteConfigs.siteUrl}/${pageName}`}
        openGraph = {{
          url: `${SiteConfigs.siteUrl}/${pageName}`,
          images: [
            {
              url: `../images/jonas.jpeg`,
              width: 600,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            }
          ],
          siteName: SiteConfigs.siteName,
        }}
      />
      <SimpleLayout title = {heading} intro = {subheading}>
        <div className = "space-y-8">
            <RenderArticlesSection articles={articles}/>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}