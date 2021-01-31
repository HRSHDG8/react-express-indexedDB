import express from 'express'
import cors from 'cors'
import { getUserDetails } from './src/service/user-detail.service'
import { getBlogComments, getBlogsByUser, getBlogsById } from './src/service/blog.service'
const app = express()
app.use(cors())
const PORT = 8080;

app.get('/', (req, res) => setTimeout(() => res.send('Im up vedu lali'), 1000));


app.get('/user', (req, res) => setTimeout(() => getUserDetails('xwq-p119b4-dbjfbwn').then(data => {
    res.send(data)
}), 3000));

app.get('/blog', (req, res) => setTimeout(() => getBlogsByUser('xwq-p119b4-dbjfbwn').then(data => {
    res.send(data)
}), 3000));

app.get('/blog/:blogId', (req, res) => setTimeout(() => getBlogsById(req.params.blogId as any).then(data => {
    res.send(data)
}), 1000));

app.get('/blog/:blogId/comment', (req, res) => setTimeout(() => getBlogComments(req.params.blogId as any).then(data => {
    res.send(data)
}), 2000));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});