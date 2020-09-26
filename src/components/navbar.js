import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #eee;
`

const Logo = styled(Link)`
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
`

const Nav = styled.nav`
  width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`

const ListWrapper = styled.ul`
  padding: 0;
  margin: 0;
`

const List = styled.li`
  list-style: none;
  float: left;
  margin-left: 15px;
  margin-bottom: 0px;
`

const ListLink = styled(Link)`
  padding: 10px 15px;
  text-decoration: none;

  background-color: #edf2ff;
  color: #5c7cfa;
  border-radius: 4px;

  &:hover {
    background-color: #5c7cfa;
    color: white;
  }
`

export default function Navbar() {
  return (
    <Wrapper>
      <Nav>
        <Logo to="/">
          <span role="img" aria-label="floppy disk emoji">
            👨‍💻
          </span>{" "}
          &nbsp;Tri Hargianto
        </Logo>

        <ListWrapper>
          <List>
            <ListLink to="/about">About Me</ListLink>
          </List>
        </ListWrapper>
      </Nav>
    </Wrapper>
  )
}
