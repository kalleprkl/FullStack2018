import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('before click, renders title and author', () => {
        const blog = {
            title: 'taas testaillaan',
            author: 'kissamies',
            url: 'webz',
            likes: '100'
        }

        const blogComponent = shallow(<Blog blog={blog} />)

        const div = blogComponent.find('div')

        expect(div.length).toBe(2)
        expect(div.at(1).text()).toContain('taas testaillaan')
        expect(div.at(1).text()).toContain('kissamies')
    })

    it('before click, does not render other stuff', () => {
        const blog = {
            title: 'taas testaillaan',
            author: 'kissamies',
            url: 'webz',
            likes: '100'
        }

        const blogComponent = shallow(<Blog blog={blog} />)

        const div = blogComponent.find('div')

        expect(div.length).toBe(2)
        expect(div.at(1).text()).not.toContain('webz')
    })

    it('after click, renders other stuff', () => {
        const blog = {
            title: 'taas testaillaan',
            author: 'kissamies',
            url: 'webz',
            likes: '100'
        }

        const blogComponent = shallow(<Blog blog={blog} />)

        const mockEvent = {
            target: { name: '' }
        }
        
        blogComponent.simulate('click', mockEvent)
        
        const div = blogComponent.find('div')

        expect(div.length).toBe(2)
        expect(div.at(1).text()).toContain('webz')
    })
})