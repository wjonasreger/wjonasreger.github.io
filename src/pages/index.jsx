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
    </>
  )
}
