import Home from '@/views/Home'
import { mount } from '@vue/test-utils'

describe('Home', () => {
    test('Show if still searching for result.', () => {
        const wrapper = mount(Home)
        expect(wrapper.find('.spinner').isVisible()).toBe('searching')
    })

    test('Hide if results are showing.', () => {
        const wrapper = mount(Home)
        wrapper.setData({ searchStatus: 'notSearching' })
        expect(wrapper.find('.spinner').isVisible()).toBe('notSearching')
    })
})
