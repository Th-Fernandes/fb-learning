export default function Layout(props : {
  children: React.ReactNode,
  clientDashBoard: React.ReactNode,
  adminDashBoard: React.ReactNode
}) {
  const { children, adminDashBoard, clientDashBoard } = props;
  
  return (
    <html lang="en">
      <body>
        {children}
        {/* {adminDashBoard} */}
        {/* {clientDashBoard} */}
      </body>
    </html>
  )
}
