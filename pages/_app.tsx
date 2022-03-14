import '../styles/globals.css';
import type { AppProps } from 'next/app';
import theme from '../src/utils/themes';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/utils/createEmotionCache';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Layout from '../src/components/Layout';
import { Provider } from 'react-redux';
import store from '../src/redux';

const clientSideEmotionCache = createEmotionCache();

interface RootProps extends AppProps {
  emotionCache?: EmotionCache;
}

function Root({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: RootProps) {
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default Root;
