import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { GitHubIcon } from '../components/SocialIcons'


import SiteConfigs from '../data/meta'
import { NextSeo } from 'next-seo';


function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className = "group -m-1 p-1" {...props}>
      <Icon className = "h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
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

          </div>
        </div>
      </Container>
    </>
  )
}
