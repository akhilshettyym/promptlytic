"use client"

import { useState, useEffect, useCallback } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Search states
  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/prompt?t=${timestamp}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`)
      }

      const data = await response.json()
      setAllPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()

    // Set up an interval to refresh posts every 10 seconds
    const intervalId = setInterval(fetchPosts, 10000)

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId)
  }, [fetchPosts])

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i") // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt),
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 500),
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    const searchResult = filterPrompts(tagName)
    setSearchedResults(searchResult)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          aria-label="Search prompts"
        />
      </form>

      {error && (
        <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          <p>Error: {error}</p>
          <button onClick={fetchPosts} className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded-md text-sm">
            Try Again
          </button>
        </div>
      )}

      {loading ? (
        <div className="mt-16 flex justify-center">
          <p>Loading prompts...</p>
        </div>
      ) : allPosts.length === 0 ? (
        <div className="mt-16 text-center">
          <p>No prompts found. Be the first to create a prompt!</p>
        </div>
      ) : searchText ? (
        searchedResults.length > 0 ? (
          <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
        ) : (
          <div className="mt-16 text-center">
            <p>No prompts found for "{searchText}"</p>
          </div>
        )
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
