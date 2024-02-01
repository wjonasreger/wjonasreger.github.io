import { NextSeo } from 'next-seo';
import SiteConfigs from '../data/meta'
import { SimpleLayout } from '../components/SimpleLayout'
import { RenderItemsSection } from "../components/Item"

import cv from '../data/cv'

// Create a function to group items by their group name
const groupItemsByClassification = (classification) => {
  const customOrder = ['quantitative skills', 'technical skills', 'developer tools', 'ai tools', 'design tools', 'productivity tools', 'workstation'];

  const groupedItems = cv.items
      .filter(item => item.classification === classification)
      // .sort((a, b) => {
      //     // Parse the end dates in mm/yyyy format and compare them
      //     const dateA = parseDate(a.time.end);
      //     const dateB = parseDate(b.time.end);
      //     return dateB - dateA;
      // })
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
  const heading = "the things i use everyday to prolong my inevitable carpal tunnel." 
  const subheading = "a running list of skills and tools i use for coding, productivity, and tbh be honest, procrastination and sanity... or insanity :')"
  const pageName = "stack"

  // Grouping items
  const stackItemsByGroup = groupItemsByClassification('stack');

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
            <RenderItemsSection items={stackItemsByGroup}/>
        </div>
      </SimpleLayout>
    </>
  )
}