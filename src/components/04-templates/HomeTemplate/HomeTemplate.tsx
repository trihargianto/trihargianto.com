import React from "react"

import Typography from "../../01-atoms/Typography"
import GreetingCard from "../../02-molecules/GreetingCard"
import NavBar from "../../03-organisms/NavBar"
import Footer from "../../03-organisms/Footer"
import BlogPosts from "../../03-organisms/BlogPosts/BlogPosts"

import * as styled from "./styled"
import * as types from "./types"

const HomeTemplate = ({ location, posts }: types.HomeTemplateTypes) => {
  return (
    <>
      <NavBar location={location} />

      <styled.Wrapper>
        <GreetingCard />

        <styled.SectionTitle>
          <Typography tag="h3" size="heading4" weight="bold">
            Artikel
          </Typography>
        </styled.SectionTitle>

        <BlogPosts posts={posts} />
        <Footer />
      </styled.Wrapper>
    </>
  )
}

export default HomeTemplate
