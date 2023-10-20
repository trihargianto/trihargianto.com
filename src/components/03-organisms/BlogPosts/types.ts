export type FieldsTypes = {
  slug: string
  date: string
}

export type FrontMatterTypes = {
  title: string
  description: string
  category: string
}

export type BlogPostsPropTypes = {
  posts: Array<{
    fields: FieldsTypes
    frontmatter: FrontMatterTypes
  }>
}