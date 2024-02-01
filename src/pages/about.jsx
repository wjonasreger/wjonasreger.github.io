import { NextSeo } from 'next-seo';
import SiteConfigs from '../data/meta'
import { SimpleLayout } from '../components/SimpleLayout'
import { RenderItemsSection } from "../components/Item"
import { parseDate } from '@/lib/formatDate'
import cv from '../data/cv'

// Create a function to group items by their group name
const groupItemsByClassification = (classification) =>
cv.items
    .filter(item => item.classification === classification)
    .sort((a, b) => {
        // Parse the end dates in mm/yyyy format and compare them
        const dateA = parseDate(a.time.start);
        const dateB = parseDate(b.time.start);
        return dateB - dateA;
    })
    .sort((a, b) => {
        // Parse the end dates in mm/yyyy format and compare them
        const dateA = parseDate(a.time.end);
        const dateB = parseDate(b.time.end);
        return dateB - dateA;
    })
    .reduce((acc, item) => {
    if (!acc[item.group]) {
        acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
    }, {});

export default function Stack() {
  const heading = "hello! i'm jonas reger. i'm searching for opportunities to continue research and development in nlp." 
  const subheading = "thanks for dropping in. i've been working in data science for 5+ years in education and linguistics. read on below to learn more about me and my work."
  const pageName = "about"

  // Grouping items
  const workItemsByGroup = groupItemsByClassification('work');
  const educationItemsByGroup = groupItemsByClassification('education');

  return (
    <>
      <NextSeo
        title = {`${pageName} — ${SiteConfigs.title}`}
        description = {SiteConfigs.description}
        canonical = {`${SiteConfigs.url}/${pageName}`}
        openGraph = {{
          url: `${SiteConfigs.url}/${pageName}`,
          images: [
            {
              url: `${SiteConfigs.url}/jonas.jpeg`,
              width: 600,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            }
          ],
          siteName: SiteConfigs.name,
        }}
      />
      <SimpleLayout title = {heading} intro = {subheading}>
        <div className = "space-y-8">
            <h2 className="font-bold tracking-tight text-zinc-800 dark:text-zinc-100 text-xl sm:text-3xl">
                work experience
            </h2>
            <RenderItemsSection items={workItemsByGroup}/>

            <h2 className="font-bold tracking-tight text-zinc-800 dark:text-zinc-100 text-xl sm:text-3xl">
                education
            </h2>
            <RenderItemsSection items={educationItemsByGroup}/>
        </div>
      </SimpleLayout>
    </>
  )
}