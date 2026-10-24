import './globals.css'

export const metadata = {
  title: 'Olaide Bhadmus | AI-Assisted Software Developer',
  description: 'Full-stack developer building production applications with React, Next.js, and AI APIs. Solo builder of estate management, agritech, and AI-powered tools.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}