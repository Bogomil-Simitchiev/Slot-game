import express, { Application } from 'express'
import slotRoues from './routes/SlotRoutes'

const app: Application = express();

app.use(express.json())

app.use('/api/slot', slotRoues)

app.listen(3000, () => console.log('Server is running on port 3000!'))