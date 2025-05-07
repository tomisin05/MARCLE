import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  // Add accessibility features
  useEffect(() => {
    // Add accessibility meta tags
    const metaTags = [
      { name: 'description', content: 'M.A.R.C.(LE) - A word guessing game inspired by Wordle' },
      { name: 'keywords', content: 'word game, wordle, puzzle, accessibility' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes' },
    ];

    metaTags.forEach(tag => {
      const metaTag = document.createElement('meta');
      metaTag.name = tag.name;
      metaTag.content = tag.content;
      document.head.appendChild(metaTag);
    });

    // Add skip to content link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    document.body.prepend(skipLink);

    // Add main content id
    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';
    mainContent.tabIndex = -1;
    
    // Insert it as the first child of the body
    if (document.body.firstChild) {
      document.body.insertBefore(mainContent, document.body.firstChild);
    } else {
      document.body.appendChild(mainContent);
    }

    // Move all existing body content into the main content div
    Array.from(document.body.children).forEach(child => {
      if (child !== mainContent && child !== skipLink) {
        mainContent.appendChild(child);
      }
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <>
      <Head>
        <title>M.A.R.C.(LE) - Word Guessing Game</title>
        <link rel="icon" href="/favicon.ico" />
        {/* Add preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Add accessibility features */}
        <meta name="theme-color" content="#1f2937" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp