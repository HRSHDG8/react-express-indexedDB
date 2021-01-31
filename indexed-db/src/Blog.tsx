import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { db } from './service/app-db.service'
import Grow from '@material-ui/core/Grow'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { BlogComment } from './BlogComments'
const useStyles = makeStyles({
    root: {
        minWidth: 575,
        paddingBottom: 0
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 2,
    },
});

const ShowComment = ({ blog }: any) => {
    const [open, setOpen] = useState(false)

    return <div>
        <div>
            <Button onClick={() => { setOpen(!open) }}>{open ? 'Hide ' : 'Show '}Comments</Button>
        </div>
        <BlogComment blog={blog} open={open} />
    </div>
}
export const Blog = ({ user }: any) => {
    const classes = useStyles();
    const [blogs, setBlogs] = useState<any[]>([])

    useEffect(() => {
        const dbInstance = db('appDb')
        dbInstance.then(idb => {
            idb.get('blogStore', 'blogData').then(data => {
                if (data !== null) {
                    setBlogs(data)
                }
            })
        })
        axios.get('http://localhost:8080/blog')
            .then(resp => {
                setBlogs(resp.data)
                dbInstance.then(idb => {
                    idb.add('blogStore', resp.data, 'blogData')
                })
            })
    }, [])

    return <div>
        {blogs ? blogs.map((blog, index) => {
            return <Grow key={index} in={true} timeout={250 * (index + 1)} style={{ margin: 10 }}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {blog.title}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {blog.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <ShowComment blog={blog} />
                    </CardActions>
                </Card>
            </Grow>
        }) :
            < div style={{ width: '60vw' }}><Skeleton height={100} /><Skeleton /><br /><Skeleton height={100} /><Skeleton /></div>}
    </div>

}