import '../styles/globals.css'
import {ThemeProvider} from 'theme-ui'
import theme from '../styles/theme'
import { loadProgressBar } from 'axios-progress-bar';
import './progress.css'
import { useEffect } from 'react';
import {ProvideAuth} from '../services/auth';
import Favicon from 'react-favicon';
import { NextSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    loadProgressBar();
},[])

  return <ThemeProvider theme={theme}>
    <ProvideAuth>
    <Favicon url={['https://label-engine.com/news/wp-content/uploads/2016/07/spotify-logo.png', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F38%2F9b%2F8a%2F389b8ac0be4eb622d98bbd4a6d5f2aaf.jpg&f=1&nofb=1']}/>
      <NextSeo
        title="Spotify Random - New Music Spotify Finder Tool"
        description="Want to find music that fits exactly what you want? This app uses Spotify API to recommend music based on what you want or if you want to try some new music, you can randomize it. Spotify Random - New Music Spotify Finder Tool"
        canonical="https://spotifymusicfinder.xyz"
        openGraph={{
          url: "https://spotifymusicfinder.xyz",
          title: "Spotify Random - New Music Spotify Finder Tool",
          description:
            "Want to find music that fits exactly what you want? This app uses Spotify API to recommend music based on what you want or if you want to try some new music, you can randomize it. Spotify Random - New Music Spotify Finder Tool",
          images: [
            {
              url: "https://pbs.twimg.com/media/EpX6galUUAEu-J5?format=jpg&name=4096x4096",
              width: 2698,
              height: 1414,
              alt: "Og Image Alt",
            },
            {
              url: "https://pbs.twimg.com/media/EpX6hEgVoAEhr05?format=jpg&name=large",
              width: 2688,
              height: 1312,
              alt: "Og Image Alt Second",
            },
            { url: "https://pbs.twimg.com/media/EpX6galUUAEu-J5?format=jpg&name=4096x4096" },
          ],
          site_name: "Spotify Random",
        }}
        twitter={{
          handle: "@raaahhh_sha",
          site: "@raaahhh_sha",
          cardType: "summary_large_image",
        }}
      />
    <Component {...pageProps} />
    </ProvideAuth>
  </ThemeProvider>
}

export default MyApp
