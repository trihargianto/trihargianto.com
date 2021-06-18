import React from "react"
import styled, {  keyframes } from "styled-components"

import { getPostIdBySlug, insertNewPost } from "../api/services/posts"
import { getIpAddress } from "../api/services/ip"
import { insertPostLikes } from "../api/services/likes"
import Share from "./share"

/**
 * ====================
 * Styled-component
 * ====================
 */

const Wrapper = styled.div`
  position: ${props => (props.sticky ? "fixed" : "absolute")};
  width: 230px;
  z-index: 99;
  margin-left: -330px;
	transition: 0.5s;
  transform: translateY(${props => (props.sticky ? "140px" : "300px")});
  opacity: ${props => props.sticky ? "1" : "0"};
`

export default function FloatingBlogPostExtras() {
  const [isStickied, setIsStickied] = React.useState(false)

  function handleSticky() {
    if (window.scrollY > 155) {
      setIsStickied(true)
    } else {
      setIsStickied(false)
    }
  }

  async function handleLikeBtnClick(slug) {
    try {
      let postId = await getPostIdBySlug(slug)
      const isPostNotExist = postId === null

      if (isPostNotExist) {
        const result = await insertNewPost(slug)
        postId = result[0].id
      }

      const userIpAddress = await getIpAddress()
      await insertPostLikes(postId, userIpAddress)
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleSticky, false)

    return () => {
      window.removeEventListener("scroll", handleSticky, false)
    }
  }, [])

  return (
    <>
      <Wrapper sticky={isStickied}>
        <button type="button" onClick={handleLikeBtnClick}>
          ❤️
        </button>

        <Share
          socialConfig={{
            twitter: "trihargianto",
            config: {
              url:
                "https://www.trihargianto.com/cerita-proses-membangun-design-system-di-mamikos/",
              title: "Cerita Proses Membangun Design System di Mamikos",
              description:
                "Proses bagaimana saya beserta teman-teman di Mamikos membangun Design System.",
            },
          }}
        />
      </Wrapper>
    </>
  )
}
