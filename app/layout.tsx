export const metadata = { title: 'Anvay App' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body style={{ margin: 0, backgroundColor: '#1c0d0d' }}>{children}</body>
    </html>
  )
}


