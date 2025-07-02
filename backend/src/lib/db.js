import mongoose from 'mongoose'


export const connectDb= async()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to mongodb ${conn.connection.host}`)
    } catch (error) {
        console.log('Failed to connect Mongodb')
        process.exit(1); //1 is failure and 0 is success
    }
}