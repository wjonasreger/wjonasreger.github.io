import { NextSeo } from 'next-seo';
import SiteConfigs from '../data/meta'
import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { SimpleLayout } from '../components/SimpleLayout'

import cv from '../data/cv'

function ItemsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role = "list" className = "space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Item({ title, href, noun, time, cta, children }) {
  return (
    <Card as = "li">
      <Card.Title as = "h3" href = {href}>
        {title}
      </Card.Title>
      <Card.Cta>
        {cta}
      </Card.Cta>
      <Card.Noun>{time.start}—{time.end}</Card.Noun>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Stack() {
  const heading = "heading"
  const subheading = "subheading"
  const pageName = "stack"

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
              url: `../images/pfp-avatar.jpeg`,
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
        <div className = "space-y-20">

        {cv.items.map((item, itemIndex) => (
            <ItemsSection title={item.group} key={itemIndex}>
              <Item
                title={item.title}
                href={item.link}
                noun={item.noun}
                time={item.time}
                cta={item.cta}
              >
                {item.subtitle}
              </Item>
            </ItemsSection>
          ))}

        </div>
      </SimpleLayout>
    </>
  )
}