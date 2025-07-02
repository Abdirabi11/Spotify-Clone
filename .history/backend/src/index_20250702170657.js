import express from 'express'
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import adminRoutes from './routes/admin.route.js'
import songRoutes from './routes/song.route.js'
import albumRoutes from './routes/album.route.js'
import statRoutes from './routes/stat.route.js'
import { connectDb } from './lib/db.js'
import { createServer } from 'http';
import { initializeSocket } from './lib/socket.js';


dotenv.config()

const __dirname= path.resolve()
const app= express()
const PORT=process.env.PORT || 4003

const httpServer= createServer(app)

initializeSocket(httpServer)

app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://spotify-clone-front-gilt.vercel.app',
    credentials: true,
  }))

app.use(express.json() )// to parse req.body
app.use(clerkMiddleware({
    debug: true
  }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParantPath: true,
    limits:{
        fileSize: 10 * 1024 * 1024 // 10mb
    }
}))

app.use('/api/users', userRoutes) 
app.use('/api/admin', adminRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/albums', albumRoutes)
app.use('/api/stats', statRoutes)

// error handler
app.use((err, res, next)=>{
    res.status(500).json({message: process.env.NODE_ENV === 'production' ? 'internal server error' : err.message})
})

httpServer.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
    connectDb()
})