import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import Login from './components/Login'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    
    let app
    
    describe('not logged in', () => {
        beforeEach(() => {
            app = mount(<App />)
        })

        it('doesn\'t render blogs if not logged in', () => {
            app.update()
            
            const blogComponents = app.find(Blog)
            const loginComponents = app.find(Login)
            
            expect(loginComponents.length).toBe(1)
            expect(blogComponents.length).toEqual(0)
        })
    })

    describe('logged in', () => {
        beforeEach(() => {
            const user = {
                username: 'user1',
                token: '21321354341532546',
                name: 'one'
            }
            localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('renders blogs if logged in', async () => {

            app.update()
            
            const blogComponents = app.find(Blog)
            
            expect(blogComponents.length).toEqual(blogService.blogs.length)
        })
    })
})