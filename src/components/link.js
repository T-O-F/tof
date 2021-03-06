/*-----------------------------------------------------------------------------*

FILE
/components/link.js

DESCRIPTION
<Link/> tag. Links can have an icon or no icon, and can have a level of importance such as 'primary' for which specific CSS classes are applied for specific appearances.

*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  IMPORTS
*-----------------------------------------------------------------------------*/
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
/*
import { faLinkedin, faWhatsappSquare, faGithub} from "@fortawesome/free-brands-svg-icons";
import { faClock, faBriefcase, faFileUser, faEnvelope, faCalendarPlus, faUserCircle} from "@fortawesome/pro-solid-svg-icons";
library.add( faLinkedin, faWhatsappSquare, faGithub, faClock, faBriefcase, faFileUser, faEnvelope, faCalendarPlus, faUserCircle );*/
/*-----------------------------------------------------------------------------*
  /IMPORTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  COMPONENTS
*-----------------------------------------------------------------------------*/
const Link = ({ level, icon, href, className, title, target, children }) => {
  var rel;
  if(href.includes('http')){
    rel = 'noreferrer'
  } else {
    rel = ''
  }
  /* If the link has an href... */
  if(href){
    /* If the link has href and icon... */
    if(icon){
      return (
        <a
          href={href}
          target={target}
          className={"link icon " + level + " " + className}
          title={title}
          rel={rel}
        >
          <FontAwesomeIcon icon={icon} />
          {children}
        </a>
      );
    } else{
      /* If the link has href but no icon... */
      return (
        <a
          href={href}
          target={target}
          className={"link " + level + " " + className}
          title={title}
          rel={rel}
        >
          {children}
        </a>
      );
    }
  }
  /* If the link has no href... */
  else {
    /* If the link has no href and icon... */
    if(icon){
      return (
        <span
          className={"link icon " + level + " " + className}
          title={title}
        >
          <FontAwesomeIcon icon={icon} />
          {children}
        </span>
      );
    } else{
      /* If the link has href but no icon... */
      return (
        <span
          className={"link " + level + " " + className}
          title={title}
        >
          {children}
        </span>
      );
    }
  }

};
/*-----------------------------------------------------------------------------*
  /COMPONENTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  PROPS
*-----------------------------------------------------------------------------*/
Link.propTypes = {
  level: PropTypes.string,
  icon: PropTypes.array,
  href: PropTypes.string,
  children: PropTypes.node.isRequired
};

Link.defaultProps = {
  level: "",
  href: "",
  icon: null
};
/*-----------------------------------------------------------------------------*
  /PROPS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  EXPORTS
*-----------------------------------------------------------------------------*/
export default Link;
/*-----------------------------------------------------------------------------*
  /EXPORTS
*-----------------------------------------------------------------------------*/
