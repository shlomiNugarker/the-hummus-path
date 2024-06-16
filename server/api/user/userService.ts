import dbService from '../../services/dbService'
const ObjectId = require('mongodb').ObjectId

export default {
  getByEmail,
  update,
  add,
}

const COLLECTION_NAME = 'user'

async function getByEmail(email: string) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)

    const user = await collection.findOne({ email })

    return user
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function update(user: any) {
  try {
    const userToSave = {
      ...user,
      _id: ObjectId(user._id),
    }
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
    return userToSave
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function add(user: any) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.insertOne(user)
    return user
  } catch (err) {
    console.error(err)
    throw err
  }
}
