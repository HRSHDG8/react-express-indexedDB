import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { db } from './service/app-db.service'
import Skeleton from '@material-ui/lab/Skeleton';

export const BlogComment = ({ blog, open }: any) => {
    //@ts-ignore
    const [blogComment, setBlogs] = useState<any[]>(null)

    useEffect(() => {
        if (open) {
            const dbInstance = db('appDb')
            dbInstance.then(idb => {
                idb.get('blogStore', 'comment.' + blog.id).then(data => {
                    if (data !== null) {
                        setBlogs(data)
                    }
                })
            })
            axios.get(`http://localhost:8080/blog/${blog.id}/comment`)
                .then(resp => {
                    setBlogs(resp.data.comments)
                    dbInstance.then(idb => {
                        idb.add('blogStore', resp.data.comments, 'comment.' + blog.id)
                    })
                })
        }
    }, [open])
    return open ? <div style={{ width: '100%' }}>
        {
            blogComment ? < div >
                {
                    blogComment.length === 0 ? <div style={{ fontSize: 10, marginLeft: 10 }} > No Comments on this blog</div> : blogComment.map((comment: any, index: number) => {
                        return <div key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: 10 }}>
                            <div style={{ fontSize: 12 }}> <i>{comment.by} says </i>: {comment.comment}</div>
                            <div style={{ fontSize: 10 }} > on {comment.on}</div>
                        </div>
                    })
                }
            </div>
                :
                <>
                    <Skeleton />
                    <Skeleton />
                </>
        }
    </div > : <></>

}