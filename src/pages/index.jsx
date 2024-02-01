import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { Article, RenderSmallItemsSection } from "../components/Item"
import { getAllArticles } from '../lib/getAllArticles'
import { GitHubIcon, LinkedInIcon, InstagramIcon } from '../components/SocialIcons'
import cv from '../data/cv'
import { formatDate, parseDate } from '@/lib/formatDate'
import { RenderItemsSection } from "../components/Item"


import SiteConfigs from '../data/meta'
import { NextSeo } from 'next-seo';

import image1 from '../images/photos/red_panda_desk.png'
import image2 from '../images/photos/red_panda_coding.png'
import image3 from '../images/photos/red_panda_coffee.png'
import image4 from '../images/photos/red_panda_robot.png'
import image5 from '../images/photos/red_panda_station.png'

function MailIcon(props) {
  return (
    <svg viewBox = "0 0 24 24" aria-hidden = "true" {...props}>
      <path
        fillRule = "evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox = "0 0 24 24"
      fill = "none"
      strokeWidth = "1.5"
      strokeLinecap = "round"
      strokeLinejoin = "round"
      aria-hidden = "true"
      {...props}
    >
      <path
        d = "M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className = "fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d = "M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className = "stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox = "0 0 16 16" fill = "none" aria-hidden = "true" {...props}>
      <path
        d = "M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth = "1.5"
        strokeLinecap = "round"
        strokeLinejoin = "round"
      />
    </svg>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className = "group -m-1 p-1" {...props}>
      <Icon className = "h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Photos() {
  const magnitudes = [2, 3, 4, 5, 6];

  const getRandomRotation = () => {
    const direction = Math.random() < 0.5 ? '-' : '';
    const magnitude = magnitudes[Math.floor(Math.random() * magnitudes.length)];
    return `${direction}${magnitude}deg`;
  };

  const rotations = Array.from({ length: 5 }, () => getRandomRotation());

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            style={{ transform: 'rotate(' + rotations[imageIndex % rotations.length] + ')' }}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-64 sm:rounded-2xl'
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

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


function Resume() {
  const workItemsByGroup = groupItemsByClassification('work');

  return (
    <div className = "rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className = "flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className = "h-6 w-6 flex-none" />
        <span className = "ml-3">work</span>
      </h2>
      <div className = "mt-12">
        <RenderSmallItemsSection items={workItemsByGroup}/>
      </div>
      <Button href = "https://linkedin.com/in/wjonasreger" variant = "secondary" className = "group mt-6 w-full">
               more on linkedin 
        <ArrowDownIcon className = "h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

export default function Home({ articles }) {
  return (
    <>
      <NextSeo
        title = {`${SiteConfigs.title}`}
        description = {SiteConfigs.description}
        canonical = {`${SiteConfigs.url}`}
        openGraph = {{
          url: `${SiteConfigs.url}`,
          images: [
            {
              url: `./public/jonas.jpeg`,
              width: 600,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            }
          ],
          siteName: SiteConfigs.name,
        }}
      />
      <Container className = "mt-9">
        <div className = "max-w-2xl text-lg">
          <h1 className = "text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            data science educator, language enthusiast, <br></br>context puzzler.
          </h1>
          <p className = "mt-6 prose dark:prose-invert">
          🚧 <b><i style={{color: '#facc15'}}>this website is currently under construction. new updates coming soon.</i></b> 🚧
          </p>
          <p className = "mt-6 prose dark:prose-invert">
          <i style={{color: '#facc15'}}>last updated on: wed jan 31 2024</i>
          </p>
          <p className = "mt-6 prose dark:prose-invert">
            👋 hello, i&apos;m jonas! i&apos;m a recent alum of uiuc statistics, specializing in data science. i&apos;m passionate about natural language processing (nlp), machine learning (ml), teaching others about data science, and making a positive and constructive impact on others. my primary research interest is using nlp towards language acquistion.
          </p>
          <p className = "mt-6 prose dark:prose-invert">
            i&apos;ve worked in data science teaching roles at the university of illinois for equality, diversity, and inclusion. i&apos;ve also developed insights for linguistics in social media at sandia national labs, and created knowledge solutions for large language models (llm) at puzzle labs.
          </p>
          <p className = "mt-6 prose dark:prose-invert">
            feel free to have a looksie at my work here or on my github. i&apos;m always open to new opportunities, so feel free to reach out! also, if you&apos;re wondering why all lower case, check out this <Link href = {`/articles/why-lower-case`}>post</Link> to get the scoop.
          </p>
          <div className = "mt-6 flex gap-6">

            <SocialLink
              href = {SiteConfigs.author.github}
              aria-label = "follow on github"
              icon = {GitHubIcon}
            />
            <SocialLink
              href = {SiteConfigs.author.linkedin}
              aria-label = "follow on linkedin"
              icon = {LinkedInIcon}
            />
            <SocialLink
              href = {SiteConfigs.author.instagram}
              aria-label = "follow on instagram"
              icon = {InstagramIcon}
            />
            <SocialLink
              href = {`mailto:${SiteConfigs.author.email}`}
              aria-label = "email me"
              icon = {MailIcon}
            />

          </div>
        </div>
      </Container>

      <Photos />

      <Container className = "mt-24 md:mt-28">
        <div className = "mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div>
            <div className = "flex flex-col gap-16">
               {articles.map((article)  => (
                <Article key = {article.slug} article = {article} />
              ))}
            </div>
            <div className = "mt-8">
              <Button href = {`/articles/`} variant = "secondary" className = "group mt-6 w-full">
                      more in articles 
                <ArrowDownIcon className = "h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
              </Button>              
            </div>
          </div>
          <div className = "space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
          </div>
        </div>
      </Container>

    </>
  )
}

export async function getStaticProps() {
  // if (process.env.NODE_ENV === 'production') {
  //   await generateRssFeed()
  // }

  const allArticles = await getAllArticles();
  let sliceEnd = Math.floor(allArticles.length * 0.75);

  // Ensure the minimum value for sliceEnd is 4
  sliceEnd = Math.min(sliceEnd, 4);

  return {
    props: {
      articles: allArticles
      .slice(0, sliceEnd)
      .map(({ component, ...meta }) => meta),
    },
  }
}