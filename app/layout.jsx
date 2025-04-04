import "@styles/global.css"
import Nav from "@components/Nav"
import Provider from "@components/Provider"

export const metadata = {
  title: "Promptlytic",
  description: "Discover & share AI Prompts",
  icons: {
    icon: "/assets/images/logo.svg",
    shortcut: "/assets/images/logo.svg",
    apple: "/assets/images/logo.svg",
  },
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout