import { connect, connection } from 'mongoose'

const connectToDatabase = async () =>
  await connect(process.env.DB_CONNECTION_STRING || '', {
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

export { connectToDatabase, connection }