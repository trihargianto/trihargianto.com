import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import DarkModeToggle from "react-dark-mode-toggle"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-navbar);
  position: fixed;
  width: 100%;
  height: 58px;
  z-index: 2;
  box-shadow: 0 2px 2px -5px rgba(0, 0, 0, 0.1);
`

const WrapperHeightHelper = styled.div`
  height: 48px;
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
  font-weight: var(--fontWeight-semibold);

  color: #5c7cfa;
  border-radius: 4px;

  &:hover {
    background-color: var(--border-color);
  }
`

export default function Navbar() {
  return (
    <React.Fragment>
      <Wrapper>
        <Nav>
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <DarkModeToggle
                onChange={checked => toggleTheme(checked ? "dark" : "light")}
                checked={theme === "dark"}
                size={60}
              />
            )}
          </ThemeToggler>

          <ListWrapper>
            <List>
              <ListLink to="/">Home</ListLink>
              <ListLink to="/about">About</ListLink>
            </List>
          </ListWrapper>
        </Nav>
      </Wrapper>
      <WrapperHeightHelper />
    </React.Fragment>
  )
}
