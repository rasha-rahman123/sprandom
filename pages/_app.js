import '../styles/globals.css'
import {ThemeProvider} from 'theme-ui'
import theme from '../styles/theme'
import { loadProgressBar } from 'axios-progress-bar';
import './progress.css'
import { useEffect } from 'react';
import {ProvideAuth} from '../services/auth';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    loadProgressBar();
},[])

  return <ThemeProvider theme={theme}>
    <ProvideAuth>
    <Component {...pageProps} />
    </ProvideAuth>
  </ThemeProvider>
}

export default MyApp
