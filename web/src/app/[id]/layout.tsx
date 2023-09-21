import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'FireLearning | products',
  description: 'keep track on all our best products.',
}

export default async function Layout({
  params: { id },
  children,
}: {
  children: React.ReactNode,
  params: { id: string}
}) {
  console.log('test: ', id)

  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}
