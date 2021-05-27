import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #eee;
  background-color: white;
  /* position: fixed; */
  width: 100%;
  height: 58px;
  z-index: 2;
  box-shadow: 0 2px 2px -5px rgba(0, 0, 0, 0.1);
`

const Logo = styled(Link)`
  font-size: var(--fontSize-2);
  font-weight: var(--fontWeight-medium);
  text-decoration: none;
  padding: 2px 5px;
`

const LogoName = styled.span`
  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px;

  @media (min-width: 768px) {
    width: 768px;
  }
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
    <React.Fragment>
      <Wrapper>
        <Nav>
          <Logo to="/">
            <span role="img" aria-label="floppy disk emoji">
              👨‍💻
            </span>{" "}
            <LogoName>Tri Hargianto</LogoName>
          </Logo>

          <ListWrapper>
            <List>
              <ListLink to="/about">About Me</ListLink>
            </List>
          </ListWrapper>
        </Nav>
      </Wrapper>
    </React.Fragment>
  )
}
