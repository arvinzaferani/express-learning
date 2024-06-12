import {Request, Response} from "express";
import express from "express"
import {promises as fs} from 'fs'
import * as path from "path";
import cors from "cors"

const app = express()
const port = 3001;
const uiPort =
app.listen(port, () => {
    console.log(`U are listening to port ${port}`)
})
const getDataFile = () => path.join(__dirname, '../json/example.json')

app.use(express.json())
app.use(cors({
origin: "http://localhost:" + port,
}))

app.get('/api/items', async (req: Request, res: Response) => {
    try {
        const data = await fs.readFile(getDataFile(), "utf8")
        res.json(JSON.parse(data))
    } catch (err) {
        console.error(err)
        res.status(500).send('internal server error')
    }
})

app.get('/api/items/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
    try {
        const data = await fs.readFile(getDataFile(), "utf8")
        const items = JSON.parse(data) as Array<{ id: number, name: string }>
        const item = items.find(i => i.id === id)
        if (item) {
            res.json(item)
        } else {
            res.status(404).send('item not found')
        }

        res.status(200).send(item)
    } catch (err) {
        console.error(err)
        res.status(500).send('internal server error')
    }
})

app.get('/', (req: Request, res: Response) => {
    res.send('salam binamoos')
})
