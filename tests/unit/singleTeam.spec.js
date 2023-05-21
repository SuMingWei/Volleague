import { shallowMount, mount, RouterLinkStub, createLocalVue} from '@vue/test-utils'
import VueRouter from 'vue-router';
import singleTeam from '@/views/singleTeam'

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

describe('singleTeam', () => {
  // go back btn
  it('test on back btn', async () => {
    // 用 spyOn 的方式 intercept "beforeMount" 
		// 來避免 this.$http.get() Undefined 的錯誤
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('test on back btn - jest.spyOn()')
    })

    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      }
    });

    // Assert that the button exists
    expect(wrapper.find('button')).toBeTruthy();
    
    // Assert the button's text
    expect(wrapper.find('button').text()).toContain('返回');
    
    // Simulate a button click
    await wrapper.find('button').trigger('click');
    
    // Assert that the correct router push is called
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/home/' + wrapper.vm.uid + '/profile');

  });

  // setting modal 
  it('test on open setting btn', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('test on setting btn - jest.spyOn()')
    })

    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      }
    });

    const settingBtn = wrapper.find('button.btn .fa-gear');
    // Assert that the button exists
    expect(settingBtn).toBeTruthy();
    // console.log(settingBtn)
    
    // Simulate a button click
    await settingBtn.trigger('click');
    
    // Assert that the modifyPersonalModal property is set to true
    expect(wrapper.vm.modifyPersonalModal).toBe(true);
  });

  it('test on close setting btn', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('test on close setting btn - jest.spyOn()')
    })

    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          modifyPersonalModal: true
        }
      }
    });

    const closeSettingBtn = wrapper.find('button.btn-close');
    // Assert that the button exists
    expect(closeSettingBtn).toBeTruthy();
    
    // Simulate a button click
    await closeSettingBtn.trigger('click');
    
    // Assert that the modifyPersonalModal property is set to false
    expect(wrapper.vm.modifyPersonalModal).toBe(false);
  });

  it('test on modify number (integer) in setting modal', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('test on close setting btn - jest.spyOn()')
    })

    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          modifyPersonalModal: true,
          myInfo:{
            number: '1',
            position: 'OH',
            name: 'test1',
            uid: '-N3hlfKxXwby0jSSDbxV',
          },
        }
      }
    });

    // get number input
    const modifyNumber = wrapper.find('input.form-control');
    // modify the number
    await modifyNumber.setValue('10');
    // assert that the number has been updated correctly
    expect(wrapper.vm.myInfo.number).toBe('10');

  });

  it('test on modify position in setting modal', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('test on close setting btn - jest.spyOn()')
    })

    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          modifyPersonalModal: true,
          myInfo:{
            number: '1',
            position: 'OH',
            name: 'test1',
            uid: '-N3hlfKxXwby0jSSDbxV',
          },
        }
      }
    });

    // get number input
    const modifyNumber = wrapper.find('select.form-select');
    // modify the number
    await modifyNumber.setValue('MB');
    // assert that the position has been updated correctly
    expect(wrapper.vm.myInfo.position).toBe('MB');

  });

  it('test on modify button in setting modal', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('test on modify button in setting modal - jest.spyOn()')
    })

    // mock the modifyPersonal function
    // singleTeam.methods.modifyPersonal = jest.fn();
    const modifyPersonalSpy = jest.spyOn(singleTeam.methods, 'modifyPersonal').mockImplementation(() => {
      console.log('spy on modifyPersonal');
    })
  
    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamid: this.$route.params.teamid,
          db: 'https://volleague-default-rtdb.firebaseio.com/',
          modifyPersonalModal: true,
          teamInfo:{
            teamName: 'NYCU CS',
            members: [
              {
                number: '1',
                position: 'OH',
                name: 'test1',
                uid: '-N3hlfKxXwby0jSSDbxV',
              }
            ]
          },
          myInfo:{
            number: '1',
            position: 'OH',
            name: 'test1',
            uid: '-N3hlfKxXwby0jSSDbxV',
          },
        }
      }
    });

    // Find the button in the modal-footer
    const button = wrapper.find('div.modal-footer button.btn.teambtn');

    // Simulate a button click
    await button.trigger('click');

    // Assert that the modifyPersonal method has been called
    // expect(singleTeam.methods.modifyPersonal).toHaveBeenCalled();
    expect(modifyPersonalSpy).toHaveBeenCalled();

  });

  // show teams 
  it('show the team name correctly', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('show the team name correctly - jest.spyOn()')
    })

    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            members: [
              {
                number: '1',
                position: 'OH',
                name: 'test1',
                uid: '-N3hlfKxXwby0jSSDbxV',
              },
              {
                number: '2',
                position: 'S',
                name: 'test2',
                uid: '-N3hlhMMtjy-u_QrqVL8',
              },
            ],
          }
        }
      }
    });

    const teamNameSpan = wrapper.find('span.fs-2.fw-bolder.d-flex.align-items-center');

    // Assert the name is equal to the teamName
    expect(teamNameSpan.text()).toEqual('NYCU CS');
  });

  it('show all the members in the team correctly', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('test on setting btn - jest.spyOn()')
    })

    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            members: [
              {
                number: '1',
                position: 'OH',
                name: 'test1',
                uid: '-N3hlfKxXwby0jSSDbxV',
              },
              {
                number: '2',
                position: 'S',
                name: 'test2',
                uid: '-N3hlhMMtjy-u_QrqVL8',
              },
            ],
          }
        }
      }
    });

    const divElements = wrapper.findAll('div.col-auto.mx-1.my-1.px-0.d-flex.align-items-center');

    // Wait for the next tick to ensure all updates are applied
    await wrapper.vm.$nextTick();

    // Assert the number of items
    expect(divElements).toHaveLength(2);

    // test member1
    // Assert that the badge with class 'bg-danger' is rendered for the 'OH' position
    expect(divElements.at(0).find('.badge.bg-danger').exists()).toBe(true);

    // Assert that the member number is correctly displayed within the badge
    expect(divElements.at(0).find('.badge.bg-danger').text()).toBe('1');

    // Assert that the member name is displayed within the <span> with class 'text-nowrap'
    expect(divElements.at(0).find('.text-nowrap').text()).toBe('test1');

    // test member2
    // Assert that the badge with class 'bg-danger' is rendered for the 'S' position
    expect(divElements.at(1).find('.badge.bg-success').exists()).toBe(true);

    // Assert that the member number is correctly displayed within the badge
    expect(divElements.at(1).find('.badge.bg-success').text()).toBe('2');

    // Assert that the member name is displayed within the <span> with class 'text-nowrap'
    expect(divElements.at(1).find('.text-nowrap').text()).toBe('test2');
  });

  // show contests
  it('there is no contest', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('show the team name correctly - jest.spyOn()')
    })

    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            members: [
              {
                number: '1',
                position: 'OH',
                name: 'test1',
                uid: '-N3hlfKxXwby0jSSDbxV',
              },
              {
                number: '2',
                position: 'S',
                name: 'test2',
                uid: '-N3hlhMMtjy-u_QrqVL8',
              },
            ],
            contestRecords: [''],
          }
        }
      }
    });

    const noContestP = wrapper.find('p.my-2.text-secondary');
    // Assert the name is equal to the teamName
    expect(noContestP).toBeTruthy();
    // Assert the message is correct
    expect(noContestP.text()).toBe('現在還沒有比賽');

  });

  it('show the contest correctly', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('show the contest correctly - jest.spyOn()')
    })

    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            contestRecords: [
              {
                opponent: '交大電機',
                contest: '系際盃',
                date:'2023-04-20',
                gameScore: '1:0',
                gamesNum: 3,
                key: 'NTdKbOPAh9F89udkTNB'
              },
            ],
          }
        }
      }
    });

    const divElements = wrapper.findAll('div.list-group-item.d-flex.justify-content-between.list-group-item-action');
    // Wait for the next tick to ensure all updates are applied
    await wrapper.vm.$nextTick();
    // Assert the number of items
    expect(divElements).toHaveLength(1);

    // test contest1
    // Assert that the contest is 系際盃
    expect(divElements.at(0).find('div.text-center p.mb-0.fs-5').text()).toBe('系際盃');
    // Assert that the opponent is 交大電機
    expect(divElements.at(0).find('div.text-center span.badge.bg-main').text()).toBe('交大電機');
    // Assert that the date is 2023-04-20
    expect(divElements.at(0).find('div.text-center p.mb-0.opacity-75').text()).toBe('2023-04-20');
    // Assert that the score is 1:0
    expect(divElements.at(0).find('div.d-flex.align-items-center p.mb-0.fs-4').text()).toBe('1:0');

  });

  it('can link to the record', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('can link to the record - jest.spyOn()')
    })

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const mockVueRouter = new VueRouter();

    const wrapper = mount(singleTeam, {
      localVue,
      props: {
        uid: mockUid
      },
      router: mockVueRouter,
      // stubs: ['router-link', 'router-view'], 
      mocks: {
        // $router: mockRouter2,
        $route: {value: mockRoute}
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            contestRecords: [
              {
                opponent: '交大電機',
                contest: '系際盃',
                date:'2023-04-20',
                gameScore: '1:0',
                gamesNum: 3,
                key: 'NTdKbOPAh9F89udkTNB'
              },
            ],
          }
        }
      }
    });

    const divElements = wrapper.findAll('div.list-group-item.d-flex.justify-content-between.list-group-item-action');
    // Wait for the next tick to ensure all updates are applied
    await wrapper.vm.$nextTick();
    // Assert the number of items
    expect(divElements).toHaveLength(1);

    const routerLinkComponents = divElements.at(0).findAllComponents({name: 'router-link'});
    // Wait for the next tick to ensure all updates are applied
    await wrapper.vm.$nextTick();
    // Assert the number of items
    expect(routerLinkComponents).toHaveLength(2);

    // button 1
    // Assert that the button exists
    expect(routerLinkComponents.at(0)).toBeTruthy();
    // Assert the button's text
    expect(routerLinkComponents.at(0).text()).toContain('計分');

    // Simulate a click on the router-link component
    await routerLinkComponents.at(0).trigger('click');
    await wrapper.vm.$nextTick();
    // Assert that the expected navigation occurred
    expect(wrapper.vm.$route.path).toBe('/home/' + wrapper.vm.uid + '/team/' + wrapper.vm.$route.params.teamid + '/scoring/' + wrapper.vm.teamInfo.contestRecords[0].key);

  });

  it('can link to the scoring', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('can link to the scoring - jest.spyOn()')
    })

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const mockVueRouter = new VueRouter();

    const wrapper = mount(singleTeam, {
      localVue,
      props: {
        uid: mockUid
      },
      router: mockVueRouter,
      // stubs: ['router-link', 'router-view'], 
      mocks: {
        // $router: mockRouter2,
        $route: {value: mockRoute}
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            contestRecords: [
              {
                opponent: '交大電機',
                contest: '系際盃',
                date:'2023-04-20',
                gameScore: '1:0',
                gamesNum: 3,
                key: 'NTdKbOPAh9F89udkTNB'
              },
            ],
          }
        }
      }
    });

    const divElements = wrapper.findAll('div.list-group-item.d-flex.justify-content-between.list-group-item-action');
    // Wait for the next tick to ensure all updates are applied
    await wrapper.vm.$nextTick();
    // Assert the number of items
    expect(divElements).toHaveLength(1);

    const routerLinkComponents = divElements.at(0).findAllComponents({name: 'router-link'});
    // Wait for the next tick to ensure all updates are applied
    await wrapper.vm.$nextTick();
    // Assert the number of items
    expect(routerLinkComponents).toHaveLength(2);

    // button 2
    // Assert that the button exists
    expect(routerLinkComponents.at(1)).toBeTruthy();
    // Assert the button's text
    expect(routerLinkComponents.at(1).text()).toContain('紀錄');

    // Simulate a click on the router-link component
    await routerLinkComponents.at(1).trigger('click');
    await wrapper.vm.$nextTick();
    // Assert that the expected navigation occurred
    expect(wrapper.vm.$route.path).toBe('/home/' + wrapper.vm.uid + '/team/' + wrapper.vm.$route.params.teamid + '/record/' + wrapper.vm.teamInfo.contestRecords[0].key);

  });

  it('show the fin if contest is finish', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('show the contest correctly - jest.spyOn()')
    })

    jest.spyOn(singleTeam.methods, 'checkEnd').mockImplementation(() => {
      return true;
    })

    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            contestRecords: [
              {
                opponent: '交大電機',
                contest: '系際盃',
                date:'2023-04-20',
                gameScore: '2:0',
                gamesNum: 3,
                key: 'NTdKbOPAh9F89udkTNB'
              },
            ],
          }
        }
      }
    });

    const divElements = wrapper.findAll('div.list-group-item.d-flex.justify-content-between.list-group-item-action');
    // Wait for the next tick to ensure all updates are applied
    await wrapper.vm.$nextTick();
    // Assert the number of items
    expect(divElements).toHaveLength(1);

    // test contest1
    // Assert that the fin badge is exist
    expect(divElements.at(0).find('div.text-center p.badge.mb-0').exists()).toBe(true);
    // Assert that the text of badge is fin
    expect(divElements.at(0).find('div.text-center p.badge.mb-0').text()).toBe('Fin');
  });

  // add contest button
  it('test on open contest modal', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('test on setting btn - jest.spyOn()')
    })

    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      }
    });

    const contestBtn = wrapper.find('button.btn .fa-plus');
    // Assert that the button exists
    expect(contestBtn).toBeTruthy();
    
    // Simulate a button click
    await contestBtn.trigger('click');
    
    // Assert that the addContestModal property is set to true
    expect(wrapper.vm.addContestModal).toBe(true);
  });

  it('test on close contest modal', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('test on close setting btn - jest.spyOn()')
    })

    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          addContestModal: true
        }
      }
    });

    const closeContestBtn = wrapper.find('button.btn-close');
    // Assert that the button exists
    expect(closeContestBtn).toBeTruthy();
    
    // Simulate a button click
    await closeContestBtn.trigger('click');
    
    // Assert that the addContestModal property is set to false
    expect(wrapper.vm.addContestModal).toBe(false);
  });

  it('test on add button in contest modal', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('test on modify button in setting modal - jest.spyOn()')
    })

    // mock the modifyPersonal function
    // singleTeam.methods.modifyPersonal = jest.fn();
    const addContestSpy = jest.spyOn(singleTeam.methods, 'addContest').mockImplementation(() => {
      console.log('spy on addContest');
    })
  
    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          addContestModal: true,
          newContest: {
            opponent: '交大土木',
            contest: '系際盃',
            date:'2023-04-21',
            gameScore: '1:0',
            gamesNum: 3,
          },
        }
      }
    });

    // Find the button in the modal-footer
    const button = wrapper.find('div.modal-footer button.btn.teambtn');

    // Simulate a button click
    await button.trigger('click');

    // Assert that the modifyPersonal method has been called
    // expect(singleTeam.methods.modifyPersonal).toHaveBeenCalled();
    expect(addContestSpy).toHaveBeenCalled();

  });

  it('if opponent is null cannot add contest in contest modal', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('if opponent is null cannot add contest in contest modal - jest.spyOn()')
    })

    // mock the modifyPersonal function
    // singleTeam.methods.modifyPersonal = jest.fn();
    const addContestSpy = jest.spyOn(singleTeam.methods, 'addContest').mockImplementation(() => {
      console.log('spy on addContest');
    })
  
    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          addContestModal: true,
          newContest: {
            opponent: '',
            contest: '系際盃',
            date:'2023-04-21',
            gameScore: '0:0',
            gamesNum: 3,
          },
        }
      }
    });

    // Find the button in the modal-footer
    const button = wrapper.find('div.modal-footer button.btn.teambtn');

    // Assert that the button is disabled
    expect(button.attributes('disabled')).toBe('disabled');

  });

  it('if contest is null cannot add contest in contest modal', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('if contest is null cannot add contest in contest modal - jest.spyOn()')
    })

    // mock the modifyPersonal function
    // singleTeam.methods.modifyPersonal = jest.fn();
    const addContestSpy = jest.spyOn(singleTeam.methods, 'addContest').mockImplementation(() => {
      console.log('spy on addContest');
    })
  
    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          addContestModal: true,
          newContest: {
            opponent: '',
            contest: '',
            date:'2023-04-21',
            gameScore: '0:0',
            gamesNum: 3,
          },
        }
      }
    });

    // Find the button in the modal-footer
    const button = wrapper.find('div.modal-footer button.btn.teambtn');

    // Assert that the button is disabled
    expect(button.attributes('disabled')).toBe('disabled');

  });

  it('if date is null cannot add contest in contest modal', async () => {
    jest.spyOn(singleTeam, 'beforeMount').mockImplementation(() => {
      console.log('if date is null cannot add contest in contest modal - jest.spyOn()')
    })

    // mock the modifyPersonal function
    // singleTeam.methods.modifyPersonal = jest.fn();
    const addContestSpy = jest.spyOn(singleTeam.methods, 'addContest').mockImplementation(() => {
      console.log('spy on addContest');
    })
  
    const wrapper = mount(singleTeam, {
      props: {
        uid: mockUid
      },
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          addContestModal: true,
          newContest: {
            opponent: '',
            contest: '系際盃',
            date:'',
            gameScore: '0:0',
            gamesNum: 3,
          },
        }
      }
    });

    // Find the button in the modal-footer
    const button = wrapper.find('div.modal-footer button.btn.teambtn');

    // Assert that the button is disabled
    expect(button.attributes('disabled')).toBe('disabled');

  });

});