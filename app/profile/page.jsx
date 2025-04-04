"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [myPosts, setMyPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteError, setDeleteError] = useState(null)

  const fetchPosts = async () => {
    if (!session?.user.id) return

    try {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`)
      }
      const data = await response.json()
      setMyPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (session?.user.id) {
      fetchPosts()
    }
  }, [session?.user.id])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

    if (hasConfirmed) {
      setIsLoading(true)
      setDeleteError(null)

      try {
        setMyPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id))

        const response = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to delete prompt")
        }

        router.refresh()

        await fetchPosts()
      } catch (error) {
        console.error("Error deleting post:", error)
        setDeleteError(error.message)

        await fetchPosts()
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      isLoading={isLoading}
      error={deleteError}
    />
  )
}

export default MyProfile