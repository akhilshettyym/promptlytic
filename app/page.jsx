import Feed from "@components/Feed"

export const generateMetadata = () => {
  return {
    title: "Promptlytic | Discover & Share AI Prompts",
    description:
      "Promptlytic is an open-source AI prompting tool for modern world to discover, create and share creative prompts",
  }
}

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptlytic is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </p>

      <Feed />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Promptlytic",
            url: "https://promptlytic.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://promptlytic.com/?search={search_term_string}",
              "query-input": "required name=search_term_string",
            },
            description:
              "Discover & share AI prompts for modern world to create, inspire and explore creative prompts for various AI platforms.",
          }),
        }}
      />
    </section>
  )
}

export default Home