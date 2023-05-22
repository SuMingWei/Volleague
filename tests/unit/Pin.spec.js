import { shallowMount } from '@vue/test-utils';
import LoginComponent from '@/components/LoginComponent.vue';

describe('LoginComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(LoginComponent);
  });

  it('should have empty user account and password on initialization', () => {
    expect(wrapper.vm.user.account).toBe('');
    expect(wrapper.vm.user.password).toBe('');
  });

  it('should display error message when errorMessage is not empty', async () => {
    wrapper.setData({ errorMessage: 'Invalid credentials' });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.alert-danger').exists()).toBe(true);
    expect(wrapper.find('.alert-danger').text()).toContain('Invalid credentials');
  });

  it('should call loginRequest method when login button is clicked', async () => {
    const loginRequestMock = jest.fn();
    wrapper.setMethods({ loginRequest: loginRequestMock });

    const loginButton = wrapper.find('.btn-primary');
    await loginButton.trigger('click');

    expect(loginRequestMock).toHaveBeenCalled();
  });
  
  // Add more test cases as needed

});
