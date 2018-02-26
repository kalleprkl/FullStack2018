let token = null

const blogs = [
    { 
        _id: 1,
        title: 'title1',
        author: 'author1',
        url: 'url1',
        likes: 0,
        user: {
            _id: 1,
            username: 'user1',
            name: 'one'
        }
    },
    { 
        _id: 2,
        title: 'title2',
        author: 'author2',
        url: 'url2',
        likes: 1,
        user: {
            _id: 2,
            username: 'user2',
            name: 'two'
        }
    },
    { 
        _id: 3,
        title: 'title3',
        author: 'author3',
        url: 'url3',
        likes: 2,
        user: {
            _id: 3,
            username: 'user3',
            name: 'three'
        }
    }
]

const setToken = (newToken) => {
    token = 'bearer ' + newToken
  }

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs, setToken }