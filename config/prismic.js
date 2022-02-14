import * as prismic from '@prismicio/client'

const endpoint = prismic.getEndpoint(process.env.PRISMIC_REPO)
export const client = prismic.createClient(endpoint, {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
})

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.uid === 'homepage') {
    return `/`
  }
  if (doc.type === 'page') {
    return `/${doc.uid}`
  }
  return '/'
}

// Additional helper function for Next/Link components
export const hrefResolver = (doc) => {
  if (doc.type === 'page') {
    return '/[uid]'
  }
  return '/'
}

// export const Client = (req = null) =>
//   prismic.client(apiEndpoint, createClientOptions(req, accessToken))

// const createClientOptions = (req = null, prismicAccessToken = null) => {
//   const reqOption = req ? { req } : {}
//   const accessTokenOption = prismicAccessToken
//     ? { accessToken: prismicAccessToken }
//     : {}
//   return {
//     ...reqOption,
//     ...accessTokenOption,
//   }
// }
