import '@styles/globals.css';

export const metadata = {
  title: 'Promptopia'
}
const Layout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <div className="app">
          {children}
        </div>
      </body>
    </html>
  );
}

export default Layout;