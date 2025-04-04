"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const [copied, setCopied] = useState("")

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile")
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <article className="prompt_card">
      <header className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
          role="button"
          tabIndex={0}
          aria-label={`View ${post.creator.username}'s profile`}
          onKeyDown={(e) => e.key === "Enter" && handleProfileClick()}
        >
          <Image
            src={post.creator.image || "/assets/images/user-placeholder.png"}
            alt={`${post.creator.username}'s profile picture`}
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>

        <button
          className="copy_btn"
          onClick={handleCopy}
          aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          <Image
            src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt={copied === post.prompt ? "Copied" : "Copy"}
            width={12}
            height={12}
          />
        </button>
      </header>

      <div className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</div>

      <button
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        aria-label={`Search for tag ${post.tag}`}
      >
        #{post.tag}
      </button>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <footer className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <button
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
            aria-label="Edit prompt"
          >
            Edit
          </button>
          <button
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
            aria-label="Delete prompt"
          >
            Delete
          </button>
        </footer>
      )}
    </article>
  )
}

export default PromptCard