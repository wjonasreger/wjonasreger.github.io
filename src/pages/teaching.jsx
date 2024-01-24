import { NextSeo } from 'next-seo';
import SiteConfigs from '../data/meta'
import { SimpleLayout } from '../components/SimpleLayout'
import { RenderItemsSection, reconstructDateFormat } from "../components/Item"

import cv from '../data/cv'

// Create a function to group items by their group name
const groupItemsByClassification = (classification) => {
  const customOrder = ['instructor', 'teaching assistant', 'course assistant'];

  const groupedItems = cv.items
      .filter(item => item.classification === classification)
      .sort((a, b) => {
          // Parse the end dates in mm/yyyy format and compare them
          const dateA = new Date(reconstructDateFormat(a.time.end));
          const dateB = new Date(reconstructDateFormat(b.time.end));
          return dateB - dateA;
      })
      .reduce((acc, item) => {
          if (!acc[item.group]) {
              acc[item.group] = [];
          }
          acc[item.group].push(item);
          return acc;
      }, {});

  // Convert the object into an array of key-value pairs
  const sortedGroups = Object.entries(groupedItems)
      // Sort the array based on custom order
      .sort(([groupA], [groupB]) => customOrder.indexOf(groupA) - customOrder.indexOf(groupB));

  // Convert the sorted array back to an object
  const result = sortedGroups.reduce((acc, [group, items]) => {
      acc[group] = items;
      return acc;
  }, {});

  return result;
};



export default function Stack() {
  const heading = "i've facilitated student learning in statistics and data science for over 12,000 students at illinois" 
  const subheading = "\"if you have knowledge, let others light their candles in it.\" — margaret fuller"
  const pageName = "teaching"

  // Grouping items
  const teachingItemsByGroup = groupItemsByClassification('teaching');

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
            <h2 className="font-bold tracking-tight text-zinc-800 dark:text-zinc-100 text-xl sm:text-3xl">
                teaching
            </h2>
            <RenderItemsSection items={teachingItemsByGroup}/>
        </div>
      </SimpleLayout>
    </>
  )
}