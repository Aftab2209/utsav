import { MongoClient, ServerApiVersion } from "mongodb"

let cachedClient: MongoClient | null = null
let cachedDb: ReturnType<MongoClient["db"]> | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { db: cachedDb, client: cachedClient }
  }

  const uri = "mongodb+srv://Aftab:ronaldo@cluster0.wnavt.mongodb.net/utsav?retryWrites=true&w=majority&appName=Cluster0";

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
