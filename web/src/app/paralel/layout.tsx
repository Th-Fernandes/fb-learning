export default function RootLayout({
  children,
  clientDashBoard,
  adminDashBoard
}: {
  children: React.ReactNode,
  clientDashBoard: React.ReactNode,
  adminDashBoard: React.ReactNode
}) {
  const isUserAdmin = () => {
    return true;
  }
  console.log(adminDashBoard)


  return (
    <html lang="en">
      <body>
        {children}
        {
          isUserAdmin() 
            ? adminDashBoard
            : clientDashBoard
        }
      </body>
    </html>
  )
}
