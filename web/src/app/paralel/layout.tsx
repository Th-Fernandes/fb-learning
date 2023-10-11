export default function Layout(props : {
  children: React.ReactNode,
  clientDashBoard: React.ReactNode,
  adminDashBoard: React.ReactNode
}) {
  const { children, adminDashBoard, clientDashBoard } = props;
  
  const isUserAdmin = () => {
    return true;
  }

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
