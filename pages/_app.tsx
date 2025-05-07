import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
    
  return(
    <div>
    <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>M.A.R.C.(LE) - Word Guessing Game</title>
        <meta name="description" content="A strategic word guessing game with ratings" />
        <link rel="icon" type="image/png" href="/Marcle.png" />   
    </Head>
     <Component {...pageProps} />

     </div>
  )}

export default MyApp
