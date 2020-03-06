/*-----------------------------------------------------------------------------*

FILE
pages/index.js

DESCRIPTION
Page template for the Index page.

*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  IMPORTS
*-----------------------------------------------------------------------------*/
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Emoji from "a11y-react-emoji";
import SEO from "../components/seo";
import Header from "../blocks/header";
import Main from "../blocks/main";
import Footer from "../blocks/footer";
import { Container } from "../components/grid";
import Title from "../components/title";
import Section from "../components/section";
import Link from "../components/link";
import "../styles/index.scss";
/*-----------------------------------------------------------------------------*
  /IMPORTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  FUNCTIONS
*-----------------------------------------------------------------------------*/

/* If 'window' object exists, add smooth scrolling to links in the main navigation menu 'nav#main' */
if (typeof window !== "undefined") {
  // Make scroll behavior of internal links smooth
  // eslint-disable-next-line global-require
  require("smooth-scroll")('nav#main a[href*="#"]', {
    header: "[data-scroll-header]",
    offset: 80,
    speed: 500,
    speedAsDuration: true,
    easing: "easeInOutQuad",
    updateURL: true,
    popstate: true,
    clip: true
  });
}
/*-----------------------------------------------------------------------------*
  /FUNCTIONS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  COMPONENTS
*-----------------------------------------------------------------------------*/
const IndexPage = () => {

  return(

  <>
    <SEO title="Home" />
    <Header />
    <Main>
      <Container>
        <Section>
        </Section>
      </Container>
    </Main>

    <Footer>
      <Container>
      <Section>
      </Section>
      </Container>
    </Footer>
  </>)
};
/*-----------------------------------------------------------------------------*
  /COMPONENTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  EXPORTS
*-----------------------------------------------------------------------------*/
export default IndexPage;
/*-----------------------------------------------------------------------------*
  /EXPORTS
*-----------------------------------------------------------------------------*/
