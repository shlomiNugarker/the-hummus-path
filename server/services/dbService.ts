import { Db, MongoClient } from 'mongodb'

import { Collection } from 'mongodb'

export default { getCollection }

const dbName = 'expense_tracker_db'

let dbConn: Db | null = null

async function getCollection(collectionName: string) {
  try {
    const db = await connect()
    const collection: Collection = db.collection(collectionName)
    return collection
  } catch (err) {
    throw err
  }
}

async function connect() {
  if (dbConn) return dbConn
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://shlomin1231:${process.env.DB_PASSWORD}@cluster0.ysm5t.mongodb.net/social_network_db?retryWrites=true&w=majority`
    )
    const db = client.db(dbName)
    dbConn = db
    return db
  } catch (err) {
    throw err
  }
}
