import '@styles/global.css';

export const metadata = {
    title: 'Promptlytic',
    description: 'Discover & share AI Prompts'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
                {children}
            </main>

        </body>
    </html>
  )
}

export default RootLayout;
