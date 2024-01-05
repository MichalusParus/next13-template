import mongoose from 'mongoose'

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI!)
    const connection = mongoose.connection
    connection.on('connected', () => {
      console.log('Mongoose connected successfully!')
    })
    connection.on('error', (error) => {
      console.error('Mongoose connection error' + error)
      process.exit()
    })
  } catch (error) {
    console.error('Something went wrong!' + error)
    console.log(error)
  }
}
