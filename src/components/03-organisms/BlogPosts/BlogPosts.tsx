import React from "react"

import ArticleCard from "../../02-molecules/ArticleCard"
import * as types from "./types"

const BlogPosts = ({ posts }: types.BlogPostsPropTypes) => {
  if (posts.length === 0) {
    return <p>No blog posts found.</p>
  }

  return (
    <>
      {posts.map(post => {
        const { fields, frontmatter } = post

        return (
          <ArticleCard
            date={fields.date}
            shortDescHTML={frontmatter.description}
            slug={fields.slug}
            title={frontmatter.title}
            key={fields.slug}
          />
        )
      })}
    </>
  )
}

export default BlogPosts
