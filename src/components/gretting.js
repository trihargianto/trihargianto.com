import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import Button from "../components/button"
import profilePic from "../img/profile-pic.jpeg"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`

const Blabla = styled.div`
  margin-right: 24px;
`

const Photo = styled.div``

const Hello = styled.h1`
  font-size: 24px;
  margin: 0;
  margin-bottom: 24px;
`

const ShortDescription = styled.p``

const ProfilePic = styled.img`
  border-radius: 16px;
  width: 100%;
`

export default function Greeting() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          feedbackUrl
          description
        }
      }
    }
  `)

  function handleClickFeedback() {
    window.open(data.site.siteMetadata.feedbackUrl)
  }

  return (
    <Wrapper>
      <Blabla>
        <Hello>
          Halo, salam kenal! senang kamu datang ke sini{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </Hello>
        <ShortDescription>
          {data.site.siteMetadata.description}
        </ShortDescription>
        <Button onClick={handleClickFeedback}>
          <span role="img" aria-label="write feedback emoji">
            📝
          </span>{" "}
          &nbsp; Kasih Feedback
        </Button>
      </Blabla>

      <Photo>
        <ProfilePic src={profilePic} />
      </Photo>
    </Wrapper>
  )
}
