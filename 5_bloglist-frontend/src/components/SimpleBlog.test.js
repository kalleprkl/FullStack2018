import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    it('renders title and author', () => {
        const blog = {
            title: 'taas testaillaan',
            author: 'kissamies',
            likes: '100'
        }

        const simpleBlogComponent = shallow(
            <SimpleBlog
                blog={blog}
            />
        )

        const contentDiv = simpleBlogComponent.find('.blog')
        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
    })

    it('renders likes', () => {
        const blog = {
            title: 'taas testaillaan',
            author: 'kissamies',
            likes: '100'
        }

        const simpleBlogComponent = shallow(
            <SimpleBlog
                blog={blog}
            />
        )

        const contentDiv = simpleBlogComponent.find('.likes')
        expect(contentDiv.text()).toContain(blog.likes)
    })

    it('handler catches clicks', () => {
        const blog = {
            title: 'taas testaillaan',
            author: 'kissamies',
            likes: '100'
        }

        const mockHandler = jest.fn()

        const simpleBlogComponent = shallow(
            <SimpleBlog
                blog={blog}
                onClick={mockHandler}
            />
        )

        const button = simpleBlogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})