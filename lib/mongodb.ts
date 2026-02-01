import { MongoClient, ServerApiVersion } from "mongodb"

let cachedClient: MongoClient | null = null
let cachedDb: ReturnType<MongoClient["db"]> | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { db: cachedDb, client: cachedClient }
  }

  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable")
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    maxPoolSize: 15,
  })

  await client.connect()

  const db = client.db("utsav")

  cachedClient = client
  cachedDb = db

  return { db, client }
}
