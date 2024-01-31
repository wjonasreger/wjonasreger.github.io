import glob from 'fast-glob'
import * as path from 'path'

const currentDate = new Date()
const publishDate = currentDate.setDate(currentDate.getDate() + 0);

async function importArticle(articleFilename) {
  let { meta, default: component } = await import(
    `../pages/articles/${articleFilename}`
  )
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  });

  let articles = await Promise.all(articleFilenames.map(importArticle));

  // Filter out future articles
  articles = articles.filter(article => new Date(article.date) <= publishDate);

  // Sort the remaining articles
  articles.sort((a, z) => new Date(z.date) - new Date(a.date));

  return articles;
}

