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
  
// Function to calculate the number of months difference between two dates
function calculateTimeDifference(startDate, endDate) {
    const [startMonth, startYear] = startDate.split('/');
    const [endMonth, endYear] = endDate.split('/');

    const yearDifference = endYear - startYear;
    const monthDifference = endMonth - startMonth;
    const numberMonths = yearDifference * 12 + monthDifference + 1;

    const years = Math.floor(numberMonths / 12);
    const months = numberMonths % 12;

    const yearsString = years > 0 ? `${years} ${years === 1 ? 'year' : 'years'}` : '';
    const monthsString = months > 0 ? `${months} ${months === 1 ? 'month' : 'months'}` : '';

    const result = `${yearsString}${yearsString && monthsString ? ', ' : ''}${monthsString}`;
    return result || '0 months';
}

export function Item({ image, group, title, href, noun, time, cta, children }) {
    // Check if the provided image path is valid or use the default image
    const selectedImage = Images.hasOwnProperty(image) ? Images[image] : Images.default;

    // Accessible text
    const altText = `${group} - ${title} - ${noun}`;

    // Calculate the number of months difference
    const numMonths = time.start !== null ? calculateTimeDifference(time.start, time.end) : null;


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
                    {noun}
                </Card.Description>
                <Card.Description>
                    {time.start !== null ? `${time.start}—` : ''}
                    {time.end}
                    {numMonths !== null ? ` • ${numMonths}` : ''}
                </Card.Description>
                <Card.Description>
                <div dangerouslySetInnerHTML={{ __html: children }} />
                </Card.Description>
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