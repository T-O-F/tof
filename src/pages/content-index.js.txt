/* -----------------------------------------------------------------------------*

FILE
pages/index.js

DESCRIPTION
Page template for the Index page.

*----------------------------------------------------------------------------- */

/*-----------------------------------------------------------------------------*
  IMPORTS
*-----------------------------------------------------------------------------*/
import React from "react";
import {useStaticQuery, graphql} from "gatsby";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {BLOCKS} from "@contentful/rich-text-types";
import Conf from "../data/conf.yaml"

import Emoji from "a11y-react-emoji";
import SEO from "../components/seo";
import Header from "../blocks/header";
import Main from "../blocks/main";
import Footer from "../blocks/footer";
import {Container} from "../components/grid";
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
  OPTIONS
*-----------------------------------------------------------------------------*/

/* 'options' contains rendering directives for Rich Text content received from Contentful, including embedded assets, paragraphs and headers. */
const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      let {description, file} = node.data.target.fields
      return (<figure>
        <img src={file[Conf.ContentfulDefaultLocale].url + '?fm=jpg&fl=progressive&q=80'} alt={description[Conf.ContentfulDefaultLocale]}/>
      </figure>);
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p>{children}</p>;
    },
    [BLOCKS.HEADING_1]: (node, children) => {
      return <h1>{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <h2>{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (node, children) => {
      return <h3>{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      return <h4>{children}</h4>;
    },
    [BLOCKS.HEADING_5]: (node, children) => {
      return <h5>{children}</h5>;
    },
    [BLOCKS.HEADING_6]: (node, children) => {
      return <h6>{children}</h6>;
    }
  }
}
/*-----------------------------------------------------------------------------*
  /OPTIONS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  COMPONENTS
*-----------------------------------------------------------------------------*/
const IndexPage = () => {

  const contactMethods = [];

  const services = [];

  const tours = [];

  const data = useStaticQuery(graphql `
    {
    hero: contentfulBlock(slug: {eq: "tours-on-food"}) {
      title
      content {
        json
      }
    }
    tours: contentfulSection(slug: {eq: "tours"}) {
      title
      blocks {
        ... on ContentfulTour {
          id
          maximumParticipants
          minimumParticipants
          pricePerParticipant
          title
          duration
          description {
            description
          }
          gallery {
            file {
              url
            }
          }
        }
      }
    }
    services: contentfulSection(slug: {eq: "services"}) {
      title
      blocks {
        ... on ContentfulBlock {
          id
          content {
            json
          }
          fontAwesomeIconName
          title
        }
      }
    }
    guide: contentfulSection(slug: {eq: "guide"}) {
      title
      blocks {
        ... on ContentfulPerson {
          id
          name
          function
          photo {
            file {
              url
            }
          }
          passion {
            fontAwesomeIcon
            text
          }
          languages {
            fontAwesomeIcon
            text
          }
          description {
            description
          }
          location {
            fontAwesomeIcon
            text
          }
        }
      }
    }
    contactTitle: contentfulSection(slug: {eq: "contact"}) {
      title
      blocks {
        ... on ContentfulBlock {
          id
          title
          fontAwesomeIconName
          slug
          content {
            json
          }
        }
      }
    }
    contactMethods: contentfulSection(slug: {eq: "contact"}) {
      blocks {
        ... on ContentfulContactMethod {
          id
          name
          method {
            fontAwesomeIcon
            text
          }
          url
        }
      }
    }
  }

  `)

  return (<> < SEO title = "Home" /> <Header/>
  <Main>

    <Container>

      HEADER
      <Section>
        {data.hero.title}
        {documentToReactComponents(data.hero.content.json, options)}
      </Section>

      TOURS
      <Section>
        {data.tours.title}
        {data.tours.blocks.forEach(block => {
          const images = [];
          tours.push(<>
            <div>{block.title}</div>
            <div>{block.description.description}</div>
            <div>{block.duration}</div>
            <div>{block.minimumParticipants}</div>
            <div>{block.maximumParticipants}</div>
            <div>{"€"+block.pricePerParticipant}</div>
            {block.gallery.forEach(gallery => {
              images.push(
                <div>
                {gallery.file.url}
                </div>
              )
            })}
            <div><button>Book this tour</button></div>
            {images}
          </>);
        })}
      {tours}

        {documentToReactComponents(data.hero.content.json, options)}
      </Section>

      SERVICES
      <Section>
        {data.services.title}

        {
          data.services.blocks.forEach(block => {
            services.push(<> < div > {
              block.fontAwesomeIconName
            }</div> < div > {
              block.title
            }</div> {
              documentToReactComponents(block.content.json, options)
            } < />
          )})}
        {services}

      </Section>

      GUIDE
      <Section>
        <div>{data.guide.title}</div>
      </Section>
      <Section>
        <div>{data.guide.blocks[0].name}</div>
      </Section>
      <Section>
        <div>{data.guide.blocks[0].photo.file.url}</div>
      </Section>
      <Section>
        <div>{data.guide.blocks[0].location['fontAwesomeIcon']}</div>
        <div>{data.guide.blocks[0].location['text']}</div>
      </Section>
      <Section>
        <div>{data.guide.blocks[0].languages['fontAwesomeIcon']}</div>
        <div>{data.guide.blocks[0].languages['text']}</div>
      </Section>
      <Section>
        <div>{data.guide.blocks[0].passion['fontAwesomeIcon']}</div>
        <div>{data.guide.blocks[0].passion['text']}</div>
      </Section>

      CONTACT
      <Section>
        <div>{data.contactTitle.title}</div>
        <div>{data.contactTitle.blocks[0].fontAwesomeIconName}</div>
        <div>{data.contactTitle.blocks[0].title}</div>
        <div>{documentToReactComponents(data.contactTitle.blocks[0].content.json, options)}</div>
      </Section>
      <Section>
        {
          data.contactMethods.blocks.filter(block => block.__typename == 'ContentfulContactMethod').forEach(block => {
            contactMethods.push(<a href={block.url}><div> <span>{JSON.stringify(block.method[0].fontAwesomeIcon)}</span>
            <span>{JSON.stringify(block.method[0].text)}</span>
          </div></a>
            );
          })
        }
        {contactMethods}
      </Section>

    </Container>
  </Main>

  <Footer>
    <Container>
      <Section></Section>
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
