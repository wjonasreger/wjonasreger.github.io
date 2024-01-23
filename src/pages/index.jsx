import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { GitHubIcon, LinkedInIcon, InstagramIcon } from '../components/SocialIcons'


import SiteConfigs from '../data/meta'
import { NextSeo } from 'next-seo';

import image1 from '../images/photos/ferns.jpg'
import image2 from '../images/photos/floral.jpg'
import image3 from '../images/photos/forest.jpg'
import image4 from '../images/photos/plants.jpg'
import image5 from '../images/photos/wood.jpg'

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
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className = "mt-16 sm:mt-20">
      <div className = "-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex)  => (
          <div
            key = {image.src}
            className = {clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src = {image}
              alt = ""
              sizes = "(min-width: 640px) 18rem, 11rem"
              className = "absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function Resume() {

  return (
    <div className = "rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className = "flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className = "h-6 w-6 flex-none" />
        <span className = "ml-3">work</span>
      </h2>
      <ol className = "mt-6 space-y-4">
        {/* {resume.map((role, roleIndex)  => (
          <li key = {roleIndex} className = "flex gap-4">
            <div className = "relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src = {role.logo} alt = "" className = "h-7 w-7" unoptimized />
            </div>
            <dl className = "flex flex-auto flex-wrap gap-x-2">
              <dt className = "sr-only">company</dt>
              <dd className = "w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className = "sr-only">role</dt>
              <dd className = "text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className = "sr-only">date</dt>
              <dd
                className = "ml-auto text-xs text-zinc-500 dark:text-zinc-500"
                aria-label = {`${role.start.label ?? role.start} until ${
                  role.end.label ?? role.end
                }`}
              >
                <time dateTime = {role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{' '}
                <span aria-hidden = "true">—</span>{' '}
                <time dateTime = {role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))} */}
      </ol>
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
      title = {SiteConfigs.title}
      description = {SiteConfigs.description}
      canonical = {SiteConfigs.siteUrl}
      openGraph = {{
        url: SiteConfigs.siteUrl,
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
      <Container className = "mt-9">
        <div className = "max-w-2xl text-lg">
          <h1 className = "text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            data science educator, language enthusiast, <br></br>context puzzler.
          </h1>
          <p className = "mt-6 prose dark:prose-invert">
            <i>this website is currently under construction. new updates coming soon.</i>
          </p>
          <p className = "mt-6 prose dark:prose-invert">
            👋 hello, i&apos;m jonas! i&apos;m a recent alum of uiuc statistics, specializing in data science. i&apos;m passionate about natural language processing (nlp), machine learning (ml), teaching others about data science, and making a positive and constructive impact on others. my primary research interest is using nlp towards language acquistion.
          </p>
          <p className = "mt-6 prose dark:prose-invert">
            i&apos;ve worked in data science teaching roles at the university of illinois for equality, diversity, and inclusion. i&apos;ve also developed insights for linguistics in social media at sandia national labs, and created knwoledge solutions for ai at puzzle labs.
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
              {/* {articles.map((article)  => (
                <Article key = {article.slug} article = {article} />
              ))} */}
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
