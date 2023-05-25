import { createLocalVue, mount } from '@vue/test-utils'
import home from '@/views/home.vue'
import VueRouter from 'vue-router';


describe('Page Transition', () => {
  it('Go to Profile Page', async () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const mockVueRouter = new VueRouter();

    const wrapper = mount(home, {
      localVue,
      router: mockVueRouter,
      // stubs: ['router-link', 'router-view'], 
      mocks: {
        // $router: mockRouter,
        // $route: mockRoute
      },
      data() {
        return {
          id: '-N3hlfKxXwby0jSSDbxV'
        }
      }
    });

    // Assert that the button exists
    const routerLinks = wrapper.findAllComponents({name: 'router-link'});
    await wrapper.vm.$nextTick();
    expect(routerLinks).toHaveLength(2);

    // // Assert that the button exists
    expect(routerLinks.at(0)).toBeTruthy();
    // Assert the button's text
    expect(routerLinks.at(0).find('i').classes()).toContain('fa-user');

    // Simulate a click on the router-link component
    await routerLinks.at(0).trigger('click');
    await wrapper.vm.$nextTick();
    // Assert that the expected navigation occurred
    // console.log(wrapper.vm.$route.path)
    expect(wrapper.vm.$route.path).toBe('/home/' + wrapper.vm.id + '/profile');

  });

  it('Log out', async () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const mockVueRouter = new VueRouter();

    const wrapper = mount(home, {
      localVue,
      router: mockVueRouter,
      // stubs: ['router-link', 'router-view'], 
      mocks: {
        // $router: mockRouter,
        // $route: mockRoute
      },
      data() {
        return {
          id: '-N3hlfKxXwby0jSSDbxV'
        }
      }
    });

    // Assert that the button exists
    const routerLinks = wrapper.findAllComponents({name: 'router-link'});
    await wrapper.vm.$nextTick();
    expect(routerLinks).toHaveLength(2);

    // // Assert that the button exists
    expect(routerLinks.at(1)).toBeTruthy();
    // Assert the button's text
    expect(routerLinks.at(1).find('i').classes()).toContain('fa-right-from-bracket');

    // Simulate a click on the router-link component
    await routerLinks.at(1).trigger('click');
    await wrapper.vm.$nextTick();
    // Assert that the expected navigation occurred
    // console.log(wrapper.vm.$route.path)
    expect(wrapper.vm.$route.path).toBe('/');

  });
})
