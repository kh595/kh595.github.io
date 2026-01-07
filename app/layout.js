import './globals.css'

export const metadata = {
  title: '오교의 홈',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
