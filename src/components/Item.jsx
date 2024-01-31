import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { Images } from '../components/ImageLibrary'
import { formatDate } from '../lib/formatDate'

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
    const [startYear, startMonth, startDay] = startDate.split('/');
    const [endYear, endMonth, endDay] = endDate.split('/');

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

export function Item({ item, children }) {
    // Check if the provided image path is valid or use the default image
    const selectedImage = Images.hasOwnProperty(item.image) ? Images[item.image] : Images.default;

    // Accessible text
    const altText = `${item.group} - ${item.title} - ${item.noun}`;

    // Calculate the number of months difference
    const numMonths = item.time.start !== null ? calculateTimeDifference(item.time.start, item.time.end) : null;


    return (
        item.show ? (
        <Card as="li">
            <div className="w-1/4 pr-6">
                <Card.Image src={selectedImage} alt={altText} />
            </div>
            <div className="w-3/4 flex flex-col">
                <Card.Title as="h3" href={item.link}>
                    {item.title}
                </Card.Title>
                <Card.Description>
                    {item.noun}
                </Card.Description>
                <Card.Description>
                    {item.time.start !== null ? `${formatDate(item.time.start)} — ` : ''}
                    {formatDate(item.time.end)}
                    {numMonths !== null ? ` • ${numMonths}` : ''}
                </Card.Description>
                <Card.Description>
                <div dangerouslySetInnerHTML={{ __html: children }} />
                </Card.Description>
                {item.link && item.link !== "" && (
                    <Card.Cta>
                        {item.cta}
                    </Card.Cta>
                )}
            </div>
        </Card>
        ) : null
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
            item={item}
            >
            {item.subtitle}
            </Item>
        ))}
        </ItemsSection>
    ))}
    </>
);


export function Article({ article, children }) {
    // Check if the provided image path is valid or use the default image
    const selectedImage = Images.hasOwnProperty(article.image) ? Images[article.image] : Images.default;

    // Accessible text
    const altText = `${article.group} - ${article.title} - ${article.noun}`;

    return (
        article.show ? (
        <Card as="li">
            <div className="w-1/4 pr-6">
                <Card.Image src={selectedImage} alt={altText} />
            </div>
            <div className="w-3/4 flex flex-col">
                <Card.Title as="h3" href={`/articles/${article.slug}`}>
                    {article.title}
                </Card.Title>
                <Card.Description>
                <div dangerouslySetInnerHTML={{ __html: children }} />
                </Card.Description>
                <Card.Description>
                    {article.noun}
                </Card.Description>
                <Card.Description>
                    {article.date}
                </Card.Description>
                <Card.Cta>
                    read article
                </Card.Cta>
            </div>
        </Card>
        ) : null
    );
}

export const RenderArticlesSection = ({ articles }) => {
    // console.log('Received articles:', articles);
  
    return (
      <ItemsSection title="articles">
        {articles.map(item => (
          <Article key={item.slug} article={item}>
            {item.subtitle}
          </Article>
        ))}
      </ItemsSection>
    );
  };