import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { Images } from '../components/ImageLibrary'

export function ItemsSection({ children, ...props }) {
    return (
      <Section {...props}>
        <ul role = "list" className = "space-y-6">
          {children}
        </ul>
      </Section>
    )
  }
  
  
export function Item({ image, group, title, href, noun, time, cta, children }) {
    // Check if the provided image path is valid or use the default image
    const selectedImage = Images.hasOwnProperty(image) ? Images[image] : Images.default;

    // accessible text
    const altText = `${group} - ${title} - ${noun}`;

    return (
    <Card as="li">
        <div className="w-1/4 pr-6">
        <Card.Image src={selectedImage} alt={altText} />
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
  

// Reusable component for rendering items section
export const RenderItemsSection = ({ items }) => (
    <>
    {Object.entries(items).map(([groupName, groupItems], groupIndex) => (
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
    </>
);