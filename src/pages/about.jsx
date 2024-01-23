import { NextSeo } from 'next-seo';
import SiteConfigs from '../data/meta'
import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { SimpleLayout } from '../components/SimpleLayout'

import cv from '../data/cv'

import image2 from '../images/photos/floral.jpg'

function ItemsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role = "list" className = "space-y-6">
        {children}
      </ul>
    </Section>
  )
}


function Item({ image, group, title, href, noun, time, cta, children }) {
    // Set default image path
    const defaultImagePath = {image2};
  
    // Check if the provided image path is valid or use the default image
    // const imagePath = (image && image.trim() !== '') ? image : defaultImagePath;
    const imagePath = image2

    // accessible text
    const altText = `${group} - ${title} - ${noun}`;
  
    return (
      <Card as="li">
        <div className="w-1/4 pr-6">
          {/* Use the determined image path */}
          <Card.Image src={imagePath} alt={altText} width={200} />
        </div>
        <div className="w-3/4 flex flex-col">
          <Card.Title as="h3" href={href}>
            {title}
          </Card.Title>
          <Card.Description>
            {noun} &nbsp;&nbsp;&nbsp;&nbsp; 
            {time.start !== null ? `${time.start}—` : ''}
            {time.end}
          </Card.Description>
          <Card.Description>{children}</Card.Description>
          <Card.Cta>
            {cta}
          </Card.Cta>
        </div>
      </Card>
    );
  }
  

export default function Stack() {
  const heading = "hello! i'm jonas reger. i'm searching for opportunities to continue research and development in nlp."
  const subheading = "thanks for dropping in. i've been working in data science for 5+ years in education and linguistics. read on below to learn more about me and my work."
  const pageName = "about"

  // Grouping items by their group name
  const workItemsByGroup = cv.items
    .filter(item => item.classification === 'work')
    .reduce((acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = [];
      }
      acc[item.group].push(item);
      return acc;
    }, {});

  // Grouping items by their group name
  const educationItemsByGroup = cv.items
    .filter(item => item.classification === 'education')
    .reduce((acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = [];
      }
      acc[item.group].push(item);
      return acc;
    }, {});

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
      <SimpleLayout
        title = {heading}
        intro = {subheading}
      >
        <div className = "space-y-8">

        <h2 className="font-bold tracking-tight text-zinc-800 dark:text-zinc-100 text-xl sm:text-3xl">
          work experience
        </h2>

        {Object.entries(workItemsByGroup).map(([groupName, groupItems], groupIndex) => (
            <ItemsSection title={groupName} key={groupIndex}>
              {groupItems.map((item, itemIndex) => (
                <Item
                  key={itemIndex}
                  image={item.image}
                  group={item.group}
                  title={item.title}
                  href={item.link}
                  noun={item.noun}
                  time={item.time}
                  cta={item.cta}
                >
                  {item.subtitle}
                </Item>
              ))}
            </ItemsSection>
          ))}

        <h2 className="font-bold tracking-tight text-zinc-800 dark:text-zinc-100 text-xl sm:text-3xl">
          education
        </h2>

        {Object.entries(educationItemsByGroup).map(([groupName, groupItems], groupIndex) => (
            <ItemsSection title={groupName} key={groupIndex}>
              {groupItems.map((item, itemIndex) => (
                <Item
                  key={itemIndex}
                  title={item.title}
                  href={item.link}
                  noun={item.noun}
                  time={item.time}
                  cta={item.cta}
                >
                  {item.subtitle}
                </Item>
              ))}
            </ItemsSection>
          ))}

        </div>
      </SimpleLayout>
    </>
  )
}