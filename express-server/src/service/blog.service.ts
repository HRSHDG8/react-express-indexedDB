const blogs = [
    {
        id: 1,
        title: "React",
        description: "React JS blog",
    },
    {
        id: 2,
        title: "Express",
        description: "Express Blog",
    },
    {
        id: 3,
        title: "Indexed DB",
        description: "Indexed DB Blog",
    },
    {
        id: 4,
        title: "TypeScript",
        description: "Its much better than JS",
    },
    {
        id: 5,
        title: "WebStorage",
        description: "All about local and session storage",
    },
    {
        id: 6,
        title: "Common React JS mistake",
        description: "How to write better code with react JS",
    },
    {
        id: 7,
        title: "React Scritps",
        description: "Should you externalize your build scripts",
    },
    {
        id: 8,
        title: "Node vs deno",
        description: "A war of run times",
    }
]
const comments = [
    {
        blogId: 1,
        comments: [
            {
                id: '123-abc-1xy',
                by: 'Beautiful User',
                on: '07-12-2020',
                comment: 'This blog is awesome'
            },
            {
                id: '123-abc-1e',
                by: 'Average User',
                on: '17-01-2021',
                comment: 'This blog is useful'
            }
        ]
    },
    {
        blogId: 2,
        comments: [
            {
                id: '123-agc-1xy',
                by: 'Beautiful User',
                on: '07-12-2020',
                comment: 'Can you describe how to use indexed DB'
            }
        ]
    }
]

export const getBlogsById = (id: number) => {
    return Promise.resolve(blogs.find(e => e.id == id) || {})
}

export const getBlogsByUser = (userID: string) => {
    return Promise.resolve(blogs);
}

export const getBlogComments = (blogId: number) => {
    return Promise.resolve(comments.find(e => e.blogId == blogId) || { blogId, comments: [] })
} 