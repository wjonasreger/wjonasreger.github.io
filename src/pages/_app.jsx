import { useEffect, useRef } from 'react'
import { MDXProvider } from '@mdx-js/react'
import Layout from '../components/Layout';
// import '../styles/globals.css';

import { Header } from '../components/Header'

import '../styles/tailwind.css'
import 'focus-visible'

const components = {}

function usePrevious(value) {
    let ref = useRef()
    useEffect(() => {
        ref.current = value
    }, [value])
    return ref.current
}

export default function App({ Component, pageProps, router }) {
    let prevPath = usePrevious(router.pathname)

    return (
     <>
        <MDXProvider components={components}>
            <Layout>
                <div className="fixed inset-0 flex justify-center sm:px-8">
                    <div className="flex w-full max-w-7xl lg:px-8">
                        <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
                    </div>
                </div>
                <div className="relative">
                    <Header />
                    <main>
                        <Component previousPathname={prevPath} {...pageProps} />
                    </main>
                </div>
            </Layout>
        </MDXProvider>
     </>
    )
  }