import { connectToDatabase } from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

interface QuestionAnswer {
  question: string
  answer: "Yes" | "No"
}

interface RequestBody {
  valentineAnswer: string
  questionAnswers: QuestionAnswer[]
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json()
    const { db } = await connectToDatabase()
    const collection = db.collection("utsav")

    const response = {
      valentineAnswer: body.valentineAnswer,
      questionAnswers: body.questionAnswers,
      respondedAt: new Date(),
    }

    await collection.insertOne(response)

    return NextResponse.json({ success: true, message: "Response saved!" })
  } catch (error) {
    console.error("Error saving response:", error)
    return NextResponse.json(
      { success: false, message: "Failed to save response" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection("utsav")

    const responses = await collection
      .find({})
      .sort({ respondedAt: -1 })
      .toArray()

    if (responses.length === 0) {
      return NextResponse.json({ 
        hasResponse: false, 
        message: "No response yet" 
      })
    }

    return NextResponse.json({
      hasResponse: true,
      responses: responses.map((r) => ({
        valentineAnswer: r.valentineAnswer,
        questionAnswers: r.questionAnswers,
        respondedAt: r.respondedAt,
      })),
    })
  } catch (error) {
    console.error("Error fetching responses:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch responses" },
      { status: 500 }
    )
  }
}
