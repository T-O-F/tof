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
import {View, Grid, Container, Card} from "../components/grid";
import Title from "../components/title";
import Section from "../components/section";
import Link from "../components/link";
import "../styles/index.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core';
import {far} from "@fortawesome/pro-regular-svg-icons";
import {fal} from "@fortawesome/pro-light-svg-icons";
import {fas} from "@fortawesome/pro-solid-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
library.add(far, fal, fas, fab);
/*-----------------------------------------------------------------------------*
  /IMPORTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  FUNCTIONS
*-----------------------------------------------------------------------------*/

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
    headerEmblem:  contentfulAsset(title: {eq: "Emblem"}) {
      file {
        url
      }
    }
    headerDiamond:  contentfulAsset(title: {eq: "Diamond"}) {
      file {
        url
      }
    }
    headerIcons:  contentfulAsset(title: {eq: "Icons"}) {
      file {
        url
      }
    }
    hero: contentfulBlock(slug: {eq: "tours-on-food"}) {
      title
      content {
        json
      }
    }
    heroImage: contentfulImage(slug: {eq: "hero-image"}) {
      id
      asset {
        file {
          url
        }
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
          photo {
            file {
              url
            }
          }
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
          title
          icon {
            fontAwesomeName
            fontAwesomeStyle
          }
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
            text
            icon {
              fontAwesomeName
              fontAwesomeStyle
            }
          }
          languages {
            text
            icon {
              fontAwesomeName
              fontAwesomeStyle
            }
          }
          description {
            description
          }
          location {
            text
            icon {
              fontAwesomeName
              fontAwesomeStyle
            }
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
          icon {
            fontAwesomeName
            fontAwesomeStyle
          }
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
        slug
        method {
          text
          icon {
            fontAwesomeName
            fontAwesomeStyle
          }
        }
        url
      }
    }
  }
  }

  `)

  return (<> < SEO title = "Home" /> <Main>
    <View className='hero' style={{
        backgroundImage: "url(" + data.heroImage.asset.file.url + ")"
      }}>
      <Grid>
        <Container>
          <Section className='header'>
            <img className='emblem' src={data.headerEmblem.file.url}/>
            <div className='main-box'>
              <Title level='1'>{data.hero.title}</Title>
              <img className='diamond' src={data.headerDiamond.file.url}/>
              <Title level='2'>{documentToReactComponents(data.hero.content.json, options)}</Title>

            </div>
            <div className='band'
              style={{
                  backgroundImage: "url(" + data.headerIcons.file.url + ")"
                }}>
            </div>

          </Section>
        </Container>
      </Grid>
    </View>
    <View>
      <Grid>
        <Container>

          <Section id='tours'>
            <Title level='1'>{data.tours.title}</Title>

            {
              data.tours.blocks.forEach(block => {

                tours.push(<> < Card className = 'tour' > <div className='photo' style={{
                    backgroundImage: "url(" + block.photo.file.url + ")"
                  }}></div>

                <Title level='2'>{block.title}</Title>
                <div className='description'>{block.description.description}</div>
                <div className='characteristic'>
                  <FontAwesomeIcon icon={['far', 'clock']}/> {block.duration}
                </div>
                <div className='characteristic'><FontAwesomeIcon icon={['far', 'user-friends']}/> {block.minimumParticipants} to  {block.maximumParticipants} people</div>

                <div className='characteristic'><FontAwesomeIcon icon={['far', 'euro-sign']}/> {block.pricePerParticipant}/person</div>
                  {
                  block.gallery.forEach(gallery => {
                    const images = []
                    images.push(<div>
                      {gallery.file.url}
                    </div>)
                  })
                } < div > <button>Book this tour
                  </button>
              </div> < /Card>
              </ >);
              })
            }
            <div className='tours'>
            {tours}
            </div>
          </Section>

          <Section id='services'>
            <Title level='1'>{data.services.title}</Title>
            <Card className='services'>
              <div className='content'>
                {
                  data.services.blocks.forEach(block => {
                    services.push(<div className='service'>
                      <div className='icon'>
                        <FontAwesomeIcon icon={[block.icon.fontAwesomeStyle, block.icon.fontAwesomeName]}/>
                      </div>
                      <Title level='2'>{block.title}</Title>
                      {documentToReactComponents(block.content.json, options)}
                    </div>)
                  })
                }
                {services}
              </div>
            </Card>
          </Section>
          <Section id='guide-contact'>
            <Section class='guide'>
            <Title level='1'>{data.guide.title}</Title>
            <Card className='guide'>
              <div className='content'>

                <div className='photo' style={{
                    backgroundImage: "url(" + data.guide.blocks[0].photo.file.url + ")"
                  }}></div>
                <Title level='2'>{data.guide.blocks[0].name}</Title>

                <div className='characteristic'>
                  <div className='icon'>
                    <FontAwesomeIcon icon={[
                        data.guide.blocks[0].location.icon.fontAwesomeStyle,
                        data.guide.blocks[0].location.icon.fontAwesomeName
                      ]}/></div>

                  <div>{data.guide.blocks[0].location['text']}</div>
                </div>
                <div className='characteristic'>
                  <div className='icon'>
                    <FontAwesomeIcon icon={[
                        data.guide.blocks[0].languages.icon.fontAwesomeStyle,
                        data.guide.blocks[0].languages.icon.fontAwesomeName
                      ]}/>
                  </div>
                  <div>{data.guide.blocks[0].languages['text']}</div>
                </div>
                <div className='characteristic'>
                  <div className='icon'>
                    <FontAwesomeIcon icon={[
                        data.guide.blocks[0].passion.icon.fontAwesomeStyle,
                        data.guide.blocks[0].passion.icon.fontAwesomeName
                      ]}/>
                  </div>
                  <div>{data.guide.blocks[0].passion['text']}</div>
                </div>
                <div className="description">{data.guide.blocks[0].description.description}</div>
              </div>
            </Card>
            </Section>
            <Section class='contact'>
            <Title level='1'>{data.contactTitle.title}</Title>
            <Card className='contact'>
              <div className='icon'>
                <FontAwesomeIcon icon={[
                    data.contactTitle.blocks[0].icon.fontAwesomeStyle,
                    data.contactTitle.blocks[0].icon.fontAwesomeName
                  ]}/>
              </div>
              <div className='content'>
                <Title level='2'>{data.contactTitle.blocks[0].title}</Title>
                <div>{documentToReactComponents(data.contactTitle.blocks[0].content.json, options)}</div>
              </div>
              {
                data.contactMethods.blocks.filter(block => block.__typename == 'ContentfulContactMethod').forEach(block => {
                  contactMethods.push(<button className={'contactMethod ' + block.slug}>
                    <div>
                      <span>
                        <FontAwesomeIcon icon={[
                            block.method[0].icon.fontAwesomeStyle,
                            block.method[0].icon.fontAwesomeName
                          ]}/>
                      </span>
                      <span>{block.method[0].text}</span>
                    </div>
                  </button>);
                })
              }
              {contactMethods}
            </Card>
            </Section>
          </Section>
        </Container>
      </Grid>
    </View>

  </Main>

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
