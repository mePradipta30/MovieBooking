import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from './configs/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express()
const port = 7000

await connectDB(); // Connect to the database 

//83KU7taQuO1r2Zf3

//Middleware
app.use(clerkMiddleware())
app.use(express.json())
app.use(cors())

//API Routes
app.get('/', (req, res) => res.send('Server is running'))
app.use('/api/inngest', serve({ client: inngest, functions }))

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));   
  