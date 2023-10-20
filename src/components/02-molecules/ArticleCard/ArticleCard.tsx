import React from "react"

import Link from "../../01-atoms/Link"
import Typography from "../../01-atoms/Typography"
import * as types from "./types"
import * as styled from "./styled"

const ArticleCard = (props: types.ArticleCardPropTypes) => {
  const { slug, title, date, shortDescHTML } = props

  return (
    <styled.Article key={slug}>
      <header>
        <Link href={slug} variant="primary-ghost">
          <Typography size="heading3" tag="h2" weight="bold">
            {title}
          </Typography>
        </Link>
        <Typography size="body1">{date}</Typography>
      </header>
      <section>
        <Typography
          dangerouslySetInnerHTML={{
            __html: shortDescHTML,
          }}
          tag="p"
        />
      </section>
    </styled.Article>
  )
}

export default ArticleCard
