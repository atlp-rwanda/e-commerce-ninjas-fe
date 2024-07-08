/* eslint-disable */
import React from 'react'
import {Helmet} from 'react-helmet'

interface MetaProps {
    title: string;
  }
  
  export const Meta: React.FC<MetaProps> = (props) => {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </Helmet>
    );
  };