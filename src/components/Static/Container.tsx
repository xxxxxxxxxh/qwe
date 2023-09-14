import { Ubuntu, Roboto_Mono } from '@next/font/google'

const ubuntu = Ubuntu({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ubuntu'
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const Container = ({ children }: { children: React.ReactNode }) => (
    <main className={`${ubuntu.variable} font-sans ${roboto_mono.variable}`}>
        {children}
    </main>
)