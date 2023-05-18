import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
import Vue from 'vue'
import App from '../../src/App.vue'


describe('App', () => {
  test('renders the app container', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.find('#app').exists()).toBe(true)
  })
})

// This is jack!