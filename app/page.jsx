import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center felx-col">
      <h1 className="head_text text-center">
        Discover and share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">
          Promptlytic is an open-source AI prompting tool for modern world to discover, create and share creative prompts.
          Explore a vast library of AI-generated prompts, curated by our community of creators and enthusiasts.
        </p>

         <Feed />

    </section>
  )
}

export default Home