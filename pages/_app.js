import React from 'react';
import App from 'next/app';
import { getDataFromTree } from '@apollo/react-ssr';
import '../components/modal.css'
import withApollo from '../lib/apollo-client';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    console.log(Component)
    return (
        <Component {...pageProps} />
    );
  }
}

// Wraps all components in the tree with the data provider
export default withApollo(MyApp, { getDataFromTree });