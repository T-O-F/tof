/*-----------------------------------------------------------------------------*

FILE
blocks/header.js

DESCRIPTION
Contains the base setup for setting the <header/> tag and its contents within the general grid system.

*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  IMPORTS
*-----------------------------------------------------------------------------*/
import React from "react";
import { ViewportProvider, connectViewport } from "react-viewport-utils";
import { View, Grid, Container } from "../components/grid";
/*-----------------------------------------------------------------------------*
  /IMPORTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  COMPONENTS
*-----------------------------------------------------------------------------*/

/* HeaderContent is the general container for the <header/> section */
const HeaderContent = ({scroll}) => (

  /* Once the user has scrolled past the value 'scroll', the header will get the 'scrolled' class which triggers appearance changes based on CSS rules */
  <header className={scroll.y > 0 ? "scrolled" : ""} data-scroll-header>
    <View>
      <Grid>
        <Container>

        </Container>
      </Grid>
    </View>
  </header>
);

/* HeaderAnimated is a wrapper used to connect HeaderContent to the viewport's state */
const HeaderAnimated = connectViewport()(HeaderContent);

/* Header is the component exported and imported to display the header in other files. */
const Header = () => (
  <ViewportProvider>
    <HeaderAnimated />
  </ViewportProvider>
);
/*-----------------------------------------------------------------------------*
  /COMPONENTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  EXPORTS
*-----------------------------------------------------------------------------*/
export default Header;
/*-----------------------------------------------------------------------------*
  /EXPORTS
*-----------------------------------------------------------------------------*/
