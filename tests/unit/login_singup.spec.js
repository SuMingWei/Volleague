import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import login from '@/views/login.vue'
import signup from '@/views/signup.vue'
import home from '@/views/home.vue';
import VueRouter from 'vue-router';

// Mock the DatePicker component
jest.mock('vue2-datepicker', () => ({
    // Create a functional component as the mock implementation
    functional: true,
    // render(h, { slots }) {
    //   return slots.default();
    // },
    render(h) {
      return h('div', 'Mocked DatePicker');
    },
  }));
  
  
  // Mock the CSS import
  jest.mock('vue2-datepicker/index.css', () => ({}));
  
  // mock the Router
  const mockRouter = {
    push: jest.fn()
  }
  
  // mock the Route
  const mockRoute = {
    params: {
      teamid: '-NTd4gODlBQPL9Na1VYr',
    }
  }
  
  // mock the uid
  const mockUid = '-N3hlfKxXwby0jSSDbxV'
  

describe('login.vue', () => {
    
    // login btn
    it('test on login btn', async () => {

        // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
        jest.spyOn(login, 'created').mockImplementation(() => {})
        const loginMethod = jest.spyOn(login.methods, 'loginRequest').mockImplementation(() => {})
                
  
        const wrapper = mount(login, {
            propsData: {
              uid: mockUid
            },
            stubs: ['router-link', 'router-view'], 
            mocks: {
              $router: mockRouter,
              $route: mockRoute
            },
            data() {
                return {
                  user: {
                    account: '',
                    password: '',
                  },
                  errorMessage: '',
                  allUser: [],
                  db: 'https://volleague-default-rtdb.firebaseio.com/',
                }
            }
          });
    
    
    // Get user account
    const accountName= wrapper.find('#account')
    // Modify the account
    await accountName.setValue('testUser');

     // Get user account
     const password= wrapper.find('#password')
     // Modify the account
     await password.setValue('testPassword');

    // Assert that the button exists
    expect(wrapper.find('button')).toBeTruthy();

    // Assert the button's text
    expect(wrapper.find('button').text()).toContain('登入');

    // Simulate a button click
    await wrapper.find('button').trigger('click');

    
    // Assert that the correct router push is called
    expect(loginMethod).toHaveBeenCalled();
    });

    it('cannot login if user account is empty', async () => {
        // mock the Router
        const mockRouter = {
        push: jest.fn()
        }

        // mock the Route
        const mockRoute = {
        params: {
            teamid: '-NTd4gODlBQPL9Na1VYr',
            contestid: '-NTdKbOPAh9F89udkTNB'
        }
        }

        // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
        jest.spyOn(login, 'created').mockImplementation(() => {})
        jest.spyOn(login.methods, 'loginRequest').mockImplementation(() => {})
        const wrapper = mount(login, {
        stubs: ['router-link', 'router-view'], 
        mocks: {
            $router: mockRouter,
            $route: mockRoute
        },
        data() {
            return {
              user: {
                account: '',
                password: '',
              },
              errorMessage: '',
              allUser: [],
              db: 'https://volleague-default-rtdb.firebaseio.com/',
            }
        }
        })

        // Get user account
        const accountName= wrapper.find('#account')
        // Modify the account
        await accountName.setValue('');

        // Find the button in the modal-footer
        const button = wrapper.find('button');
        // Assert that the button is disabled
        expect(button.attributes('disabled')).toBe('disabled');

        
    });

    it('cannot login if user password is empty', async () => {
        // mock the Router
        const mockRouter = {
        push: jest.fn()
        }

        // mock the Route
        const mockRoute = {
        params: {
            teamid: '-NTd4gODlBQPL9Na1VYr',
            contestid: '-NTdKbOPAh9F89udkTNB'
        }
        }

        // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
        jest.spyOn(login, 'created').mockImplementation(() => {})
        jest.spyOn(login.methods, 'loginRequest').mockImplementation(() => {})
        const wrapper = mount(login, {
        stubs: ['router-link', 'router-view'], 
        mocks: {
            $router: mockRouter,
            $route: mockRoute
        },
        data() {
            return {
              user: {
                account: '',
                password: '',
              },
              errorMessage: '',
              allUser: [],
              db: 'https://volleague-default-rtdb.firebaseio.com/',
            }
        }
        })

        // Get user password
        const passwordName= wrapper.find('#password')
        // Modify the password
        await passwordName.setValue('');

        // Find the button in the modal-footer
        const button = wrapper.find('button');
        // Assert that the button is disabled
        expect(button.attributes('disabled')).toBe('disabled');

        
    });

    it('login btn is enabled if account and password are filled', async () => {
        // mock the Router
        const mockRouter = {
        push: jest.fn()
        }

        // mock the Route
        const mockRoute = {
        params: {
            teamid: '-NTd4gODlBQPL9Na1VYr',
            contestid: '-NTdKbOPAh9F89udkTNB'
        }
        }

        // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
        jest.spyOn(login, 'created').mockImplementation(() => {})
        jest.spyOn(login.methods, 'loginRequest').mockImplementation(() => {})
        const wrapper = mount(login, {
        stubs: ['router-link', 'router-view'], 
        mocks: {
            $router: mockRouter,
            $route: mockRoute
        },
        data() {
            return {
              user: {
                account: '',
                password: '',
              },
              errorMessage: '',
              allUser: [],
              db: 'https://volleague-default-rtdb.firebaseio.com/',
            }
        }
        })

        // Get user account
        const accountName= wrapper.find('#account')
        // Modify the account
        await accountName.setValue('test');

        // Get user account
        const password= wrapper.find('#password')
        // Modify the account
        await password.setValue('123');

        // Find the button in the modal-footer
        const button = wrapper.find('button');
        // Assert that the button is enabled
        expect(button.attributes('disabled')).toBeUndefined();
        
    });

    it('test error message', async () => {
        // mock the Router
        const mockRouter = {
        push: jest.fn()
        }

        // mock the Route
        const mockRoute = {
        params: {
            teamid: '-NTd4gODlBQPL9Na1VYr',
            contestid: '-NTdKbOPAh9F89udkTNB'
        }
        }

        // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
        jest.spyOn(login, 'created').mockImplementation(() => {})
        jest.spyOn(login.methods, 'loginRequest').mockImplementation(() => {})
        const wrapper = mount(login, {
        stubs: ['router-link', 'router-view'], 
        mocks: {
            $router: mockRouter,
            $route: mockRoute
        },
        data() {
            return {
              user: {
                account: '',
                password: '',
              },
              errorMessage: '沒有這個使用者!',
              allUser: [],
              db: 'https://volleague-default-rtdb.firebaseio.com/',
            }
        }
        })

        expect(wrapper.find('.alert-danger span').text()).toBe('沒有這個使用者!');
        
    });

    it('can link to signup', async () => {

        // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
        jest.spyOn(login, 'created').mockImplementation(() => {})
        jest.spyOn(login.methods, 'loginRequest').mockImplementation(() => {})
      
        const localVue = createLocalVue();
        localVue.use(VueRouter);
    
        const mockVueRouter = new VueRouter();
        // mock the uid
        const mockUid = '-N3hlfKxXwby0jSSDbxV'

        const wrapper = mount(login, {
            localVue,
            propsData: {
              uid: mockUid
            },
            router: mockVueRouter,
            // stubs: ['router-link', 'router-view'], 
            mocks: {
              // $router: mockRouter2,
              // $route: {value: mockRoute}
            },
            data() {
                return {
                  user: {
                    account: '',
                    password: '',
                  },
                  errorMessage: '',
                  allUser: [],
                  db: 'https://volleague-default-rtdb.firebaseio.com/',
                }
            }
          });
       
        const routerLinkComponent = wrapper.findComponent({ name: 'router-link' });
        await routerLinkComponent.trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.$route.path).toBe('/signup');
    });

      
    
  })

  describe('signup.vue', () => {
    // go signup btn
    it('test on signup btn', async () => {
        // mock the Router
        const mockRouter = {
            push: jest.fn()
            }
    
            // mock the Route
            const mockRoute = {
            params: {
                teamid: '-NTd4gODlBQPL9Na1VYr',
                contestid: '-NTdKbOPAh9F89udkTNB'
            }
            }
    
            // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
            jest.spyOn(signup, 'created').mockImplementation(() => {})
            const signupMethod = jest.spyOn(signup.methods, 'signupRequest').mockImplementation(() => {})
            const wrapper = mount(signup, {
            stubs: ['router-link', 'router-view'], 
            mocks: {
                $router: mockRouter,
                $route: mockRoute
            },
            data() {
                return {
                  user: {
                    account: '',
                    password: '',
                  },
                  errorMessage: '',
                  successMessage: '',
                  allUser: [],
                  db: 'https://volleague-default-rtdb.firebaseio.com/',
                  SingleProfile: {
                    authid: '',
                    name: 'User',
                    birthday: {
                      year: 'yyyy',
                      month: 'mm',
                      day: 'dd',
                    },
                    position: ['OH'],
                    teamList: [''],
                    StatisticsList: [''],
                  }
                }
            }
            })
        // Get user account
        const accountName= wrapper.find('#account')
        // Modify the account
        await accountName.setValue('testUser');

        // Get user account
        const password= wrapper.find('#password')
        // Modify the account
        await password.setValue('testPassword');    

        // Assert that the button exists
        expect(wrapper.find('button')).toBeTruthy();

        // Assert the button's text
        expect(wrapper.find('button').text()).toContain('註冊');

        // Simulate a button click
        await wrapper.find('button').trigger('click');

        // Assert that the correct router push is called
        expect(signupMethod).toHaveBeenCalled();

    });
    
    it('cannot signup if user account is empty', async () => {
        // mock the Router
        const mockRouter = {
        push: jest.fn()
        }

        // mock the Route
        const mockRoute = {
        params: {
            teamid: '-NTd4gODlBQPL9Na1VYr',
            contestid: '-NTdKbOPAh9F89udkTNB'
        }
        }

        // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
        jest.spyOn(signup, 'created').mockImplementation(() => {})
        jest.spyOn(signup.methods, 'signupRequest').mockImplementation(() => {})
        const wrapper = mount(signup, {
        stubs: ['router-link', 'router-view'], 
        mocks: {
            $router: mockRouter,
            $route: mockRoute
        },
        data() {
            return {
              user: {
                account: '',
                password: '',
              },
              errorMessage: '',
              successMessage: '',
              allUser: [],
              db: 'https://volleague-default-rtdb.firebaseio.com/',
              SingleProfile: {
                authid: '',
                name: 'User',
                birthday: {
                  year: 'yyyy',
                  month: 'mm',
                  day: 'dd',
                },
                position: ['OH'],
                teamList: [''],
                StatisticsList: [''],
              }
            }
        }
        })

         // Get user account
         const accountName= wrapper.find('#account')
         // Modify the account
         await accountName.setValue('');
 
         // Find the button in the modal-footer
         const button = wrapper.find('button');
         // Assert that the button is disabled
         expect(button.attributes('disabled')).toBe('disabled');
 
        
    });

    it('cannot signup if user password is empty', async () => {
        // mock the Router
        const mockRouter = {
        push: jest.fn()
        }

        // mock the Route
        const mockRoute = {
        params: {
            teamid: '-NTd4gODlBQPL9Na1VYr',
            contestid: '-NTdKbOPAh9F89udkTNB'
        }
        }

        // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
        jest.spyOn(signup, 'created').mockImplementation(() => {})
        jest.spyOn(signup.methods, 'signupRequest').mockImplementation(() => {})
        const wrapper = mount(signup, {
        stubs: ['router-link', 'router-view'], 
        mocks: {
            $router: mockRouter,
            $route: mockRoute
        },
        data() {
            return {
              user: {
                account: '',
                password: '',
              },
              errorMessage: '',
              successMessage: '',
              allUser: [],
              db: 'https://volleague-default-rtdb.firebaseio.com/',
              SingleProfile: {
                authid: '',
                name: 'User',
                birthday: {
                  year: 'yyyy',
                  month: 'mm',
                  day: 'dd',
                },
                position: ['OH'],
                teamList: [''],
                StatisticsList: [''],
              }
            }
        }
        })

         // Get user password
         const passwordName= wrapper.find('#password')
         // Modify the password
         await passwordName.setValue('');
 
         // Find the button in the modal-footer
         const button = wrapper.find('button');
         // Assert that the button is disabled
         expect(button.attributes('disabled')).toBe('disabled');
 
        
    });

    it('test error message', async () => {
        // mock the Router
        const mockRouter = {
            push: jest.fn()
            }
    
            // mock the Route
            const mockRoute = {
            params: {
                teamid: '-NTd4gODlBQPL9Na1VYr',
                contestid: '-NTdKbOPAh9F89udkTNB'
            }
            }
    
            // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
            jest.spyOn(signup, 'created').mockImplementation(() => {})
            jest.spyOn(signup.methods, 'signupRequest').mockImplementation(() => {})
            const wrapper = mount(signup, {
            stubs: ['router-link', 'router-view'], 
            mocks: {
                $router: mockRouter,
                $route: mockRoute
            },
            data() {
                return {
                  user: {
                    account: '',
                    password: '',
                  },
                  errorMessage: '這個帳號已被使用!',
                  successMessage: '',
                  allUser: [],
                  db: 'https://volleague-default-rtdb.firebaseio.com/',
                  SingleProfile: {
                    authid: '',
                    name: 'User',
                    birthday: {
                      year: 'yyyy',
                      month: 'mm',
                      day: 'dd',
                    },
                    position: ['OH'],
                    teamList: [''],
                    StatisticsList: [''],
                  }
                }
            }
            })

        expect(wrapper.find('.alert-danger span').text()).toBe('這個帳號已被使用!');
        
    });

    it('test success message', async () => {
        // mock the Router
        const mockRouter = {
            push: jest.fn()
            }
    
            // mock the Route
            const mockRoute = {
            params: {
                teamid: '-NTd4gODlBQPL9Na1VYr',
                contestid: '-NTdKbOPAh9F89udkTNB'
            }
            }
    
            // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
            jest.spyOn(signup, 'created').mockImplementation(() => {})
            jest.spyOn(signup.methods, 'signupRequest').mockImplementation(() => {})
            const wrapper = mount(signup, {
            stubs: ['router-link', 'router-view'], 
            mocks: {
                $router: mockRouter,
                $route: mockRoute
            },
            data() {
                return {
                  user: {
                    account: '',
                    password: '',
                  },
                  errorMessage: '',
                  successMessage: '註冊成功!',
                  allUser: [],
                  db: 'https://volleague-default-rtdb.firebaseio.com/',
                  SingleProfile: {
                    authid: '',
                    name: 'User',
                    birthday: {
                      year: 'yyyy',
                      month: 'mm',
                      day: 'dd',
                    },
                    position: ['OH'],
                    teamList: [''],
                    StatisticsList: [''],
                  }
                }
            }
            })

        expect(wrapper.find('.alert-success').text()).toContain('註冊成功!');
        
    });

    it('signup btn is enabled if account and password are filled', async () => {
        // mock the Router
        const mockRouter = {
            push: jest.fn()
            }
    
            // mock the Route
            const mockRoute = {
            params: {
                teamid: '-NTd4gODlBQPL9Na1VYr',
                contestid: '-NTdKbOPAh9F89udkTNB'
            }
            }
    
            // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
            jest.spyOn(signup, 'created').mockImplementation(() => {})
            jest.spyOn(signup.methods, 'signupRequest').mockImplementation(() => {})
            const wrapper = mount(signup, {
            stubs: ['router-link', 'router-view'], 
            mocks: {
                $router: mockRouter,
                $route: mockRoute
            },
            data() {
                return {
                  user: {
                    account: '',
                    password: '',
                  },
                  errorMessage: '',
                  successMessage: '',
                  allUser: [],
                  db: 'https://volleague-default-rtdb.firebaseio.com/',
                  SingleProfile: {
                    authid: '',
                    name: 'User',
                    birthday: {
                      year: 'yyyy',
                      month: 'mm',
                      day: 'dd',
                    },
                    position: ['OH'],
                    teamList: [''],
                    StatisticsList: [''],
                  }
                }
            }
            })

        // Get user account
        const accountName= wrapper.find('#account')
        // Modify the account
        await accountName.setValue('test');

        // Get user account
        const password= wrapper.find('#password')
        // Modify the account
        await password.setValue('123');

        // Find the button in the modal-footer
        const button = wrapper.find('button');
        // Assert that the button is enabled
        expect(button.attributes('disabled')).toBeUndefined();
        
    });

    it('can link to login', async () => {

        // 用 spyOn 來避免 this.$http.get() Undefined 的錯誤
        jest.spyOn(signup, 'created').mockImplementation(() => {})
        jest.spyOn(signup.methods, 'signupRequest').mockImplementation(() => {})
      
        const localVue = createLocalVue();
        localVue.use(VueRouter);
    
        const mockVueRouter = new VueRouter();
        // mock the uid
        const mockUid = '-N3hlfKxXwby0jSSDbxV'

        const wrapper = mount(signup, {
            localVue,
            propsData: {
              uid: mockUid
            },
            router: mockVueRouter,
            // stubs: ['router-link', 'router-view'], 
            mocks: {
              // $router: mockRouter2,
              // $route: {value: mockRoute}
            },
            ddata() {
                return {
                  user: {
                    account: '',
                    password: '',
                  },
                  errorMessage: '',
                  successMessage: '',
                  allUser: [],
                  db: 'https://volleague-default-rtdb.firebaseio.com/',
                  SingleProfile: {
                    authid: '',
                    name: 'User',
                    birthday: {
                      year: 'yyyy',
                      month: 'mm',
                      day: 'dd',
                    },
                    position: ['OH'],
                    teamList: [''],
                    StatisticsList: [''],
                  }
                }
            }
          });
       
        const routerLinkComponent = wrapper.findComponent({ name: 'router-link' });
        await routerLinkComponent.trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.$route.path).toBe('/');
    });
    
  })


