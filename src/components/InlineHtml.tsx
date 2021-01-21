import { createGlobalStyle } from "@xstyled/styled-components";
import React from "react";

import { ApiSafeHtml } from "../api/codecs";

interface Props {
  html: ApiSafeHtml;
}

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 20px;
  }
  
  .InlineHtml {
    font-family: welcome-font,sans-serif;
    font-size: 1rem;
    line-height: 1.2;
    display: block;
    
    p, ul, ol, h1, h2, h3, h4, h5, h6 {
      &:not(:first-child) {
        margin-top: 1rem;
      }
    }
    
    ol, ul {
      li {
        margin-left: 2rem;
        padding-left: 1rem;
        
        &:not(:first-child) {
          margin-top: 0.5rem 
        }
      }
    }
    ul {
      li {
        &::marker {
          content: '—';
          margin-right: -3rem;
        }
      }
    }
  }
  
`;

export default function InlineHtml(props: Props): JSX.Element {
  const { html } = props;
  return (
    <>
      <GlobalStyle />
      <div
        className="InlineHtml"
        dangerouslySetInnerHTML={{ __html: html.safe }}
      />
    </>
  );
}
