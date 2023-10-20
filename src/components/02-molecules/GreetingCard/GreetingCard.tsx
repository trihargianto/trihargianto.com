import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Image from "../../01-atoms/Image"
import * as styled from "./styled"

// @ts-ignore
import profilePic from "../../../img/profile-pic-v2.jpg"

const GreetingCard = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)

  return (
    <styled.Wrapper>
      <styled.LeftContent>
        <styled.TextHeading size="heading3" weight="bold">
          Halo, salam kenal! senang kamu datang ke sini{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </styled.TextHeading>
        <styled.TextBody size="body2" tag="p">
          {data.site.siteMetadata.description}
        </styled.TextBody>
      </styled.LeftContent>

      <styled.RightContent>
        <Image
          src={profilePic}
          alt="Tri Hargianto"
          ratio="1:1"
          variant="rounded"
        />
      </styled.RightContent>
    </styled.Wrapper>
  )
}

export default GreetingCard
