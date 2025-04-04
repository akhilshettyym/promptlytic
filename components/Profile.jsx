import PromptCard from "./PromptCard"

const Profile = ({ name, desc, data, handleEdit, handleDelete, isLoading, error }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {error && (
        <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          <p>Error: {error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="mt-10 flex justify-center">
          <p>Loading prompts...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="mt-10 text-center">
          <p>No prompts found. Create your first prompt!</p>
        </div>
      ) : (
        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Profile