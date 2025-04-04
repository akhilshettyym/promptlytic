import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id).populate("creator")
    if (!prompt) return new Response("Prompt Not Found", { status: 404 })

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json()

  try {
    await connectToDB()

    const existingPrompt = await Prompt.findById(params.id)

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 })
    }

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response("Successfully updated the Prompts", { status: 200 })
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    console.log("Attempting to delete prompt with ID:", params.id)

    const deletedPrompt = await Prompt.findOneAndDelete({ _id: params.id })

    if (!deletedPrompt) {
      console.log("Prompt not found for deletion")
      return NextResponse.json({ success: false, message: "Prompt not found" }, { status: 404 })
    }

    console.log("Prompt deleted successfully:", deletedPrompt._id)

    return NextResponse.json({ success: true, message: "Prompt deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting prompt:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}