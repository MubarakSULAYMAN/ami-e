import AppHeader from '@/components/AppHeader'
import { mount } from '@vue/test-utils'

describe('AppHeader', () => {
    test('Dont show button', () => {
        const wrapper = mount(AppHeader)
        expect(wrapper.find('button').isVisible()).toBe(false)
    })

    test('Show button', () => {
        const wrapper = mount(AppHeader)
        wrapper.setData({ loggedIn: true })
        expect(wrapper.find('button').isVisible()).toBe(true)
    })
})