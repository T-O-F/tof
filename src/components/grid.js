/*-----------------------------------------------------------------------------*

FILE
/components/grid.js

DESCRIPTION
Contains the View, Grid and Container tags that are used to build the grid system used throughout this portfolio.

*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  IMPORTS
*-----------------------------------------------------------------------------*/
import React from "react";
import PropTypes from "prop-types";
/*-----------------------------------------------------------------------------*
  /IMPORTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  COMPONENTS
*-----------------------------------------------------------------------------*/
const Container = ({ id, children, className, style }) => {
  return (
    <div className={"container "+className} id={id} style={style}>
      {children}
    </div>
  );
};
const View = ({ children, className, style }) => {
  return <div className={"view "+className} style={style}>{children}</div>;
};
const Grid = ({ children, className, style }) => {
  return <div className={"grid "+className} style={style}>{children}</div>;
};
const Card = ({ children, className, style }) => {
  return <div className={"card "+className} style={style}>{children}</div>;
};
/*-----------------------------------------------------------------------------*
  /COMPONENTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  PROPS
*-----------------------------------------------------------------------------*/
Container.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired
};

Container.defaultProps = {
  id: ""
};
/*-----------------------------------------------------------------------------*
  /PROPS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  EXPORTS
*-----------------------------------------------------------------------------*/
export { Grid, View, Container, Card };
/*-----------------------------------------------------------------------------*
  /EXPORTS
*-----------------------------------------------------------------------------*/
