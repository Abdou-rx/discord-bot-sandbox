import './globals.css'

export const metadata = {
  title: 'Discord Bot Sandbox',
  description: 'Get your Discord Active Developer Badge',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-900 text-gray-100">
        {children}
      </body>
    </html>
  )
}