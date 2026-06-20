export const metadata = {
  title: 'Anvay Dating App',
  description: 'Find your perfect connection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

