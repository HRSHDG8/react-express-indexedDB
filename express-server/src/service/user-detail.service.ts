const sampleUser = {
    name: 'Harsh Maheshwari',
    userID: 'xwq-p119b4-dbjfbwn',
    starredBlogs: [1, 8, 9],

}
export const getUserDetails = (userID: string) => {
    return Promise.resolve(sampleUser)
}