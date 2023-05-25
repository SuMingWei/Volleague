import { shallowMount, mount, RouterLinkStub, createLocalVue} from '@vue/test-utils'
import DropSearch from '@/components/dropSearch';
import VueRouter from 'vue-router';
import profile from '@/views/profile';

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

// mock the drop search
// jest.mock('@components/dropSearch.vue', () => ({
//   name: 'DropSearch',
//   template: '<div>Mocked DropSearch component</div>',
// }));

// mock the uid
const mockUid = '-N3hlfKxXwby0jSSDbxV'

const db = 'https://volleague-default-rtdb.firebaseio.com/'


describe('profile', () => {
  // personal profile
  it('show the person profile correctly', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('show the person correctly - jest.spyOn()')
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ["OH", "MB"],
            teamList: ["NYCU CS"],
            StatisticsList: [],
          },
        }
      }
    });

    // find the card body
    const div = wrapper.find('div.card-body');

    // Assert that the user name is correct
    expect(div.find('h5').text()).toBe('test1');
    // Assert that the birthday is correct
    expect(div.find('h6').text()).toBe('2000 | 1 | 1');

    const badges = div.findAll('span span');
    await wrapper.vm.$nextTick();
    // Assert the pos is correct
    expect(badges.at(0).find('.badge.bg-danger.text-wrap.mx-1').text()).toBe('Outside Hitter');
    expect(badges.at(1).find('.badge.bg-warning.text-wrap.mx-1').text()).toBe('Middle Blocker');

  });

  // edit profile modal
  it('test on open setting profile btn', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('test on open setting profile btn - jest.spyOn()')
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ["OH", "MB"],
            teamList: ["NYCU CS"],
            StatisticsList: [],
          },
          editProfileModal: false,
        }
      }
    });

    const settingBtn = wrapper.find('div.card-body button');
    // Assert that the button exists
    expect(settingBtn).toBeTruthy();
    // console.log(settingBtn)
    
    // Simulate a button click
    await settingBtn.trigger('click');
    
    // Assert that the editProfileModal property is set to true
    expect(wrapper.vm.editProfileModal).toBe(true);
  });

  it('test on close setting profile btn', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('test on close setting profile btn - jest.spyOn()')
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ["OH", "MB"],
            teamList: ["NYCU CS"],
            StatisticsList: [],
          },
          editProfileModal: true,
        }
      }
    });

    const closeSettingBtn = wrapper.find('button.btn-close');
    // Assert that the button exists
    expect(closeSettingBtn).toBeTruthy();
    
    // Simulate a button click
    await closeSettingBtn.trigger('click');
    
    // Assert that the editProfileModal property is set to false
    expect(wrapper.vm.editProfileModal).toBe(false);
  });

  it('test on modify info in modal', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('test on modify info in modal - jest.spyOn()')
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ['OH', 'MB'],
            teamList: ['NYCU CS'],
            StatisticsList: [],
          },
          editProfileModal: true,
        }
      }
    });

    // get form div
    const div = wrapper.findAll('div.form-group.mb-2');
    await wrapper.vm.$nextTick();

    // modify the name
    await div.at(0).find('input.form-control').setValue('hello');
    // assert that the name has been updated correctly
    expect(wrapper.vm.profile.name).toBe('hello');

    // modify the birthday
    const birthday = div.at(1).findAll('input.form-control');
    await wrapper.vm.$nextTick();

    await birthday.at(0).setValue('1999');
    await birthday.at(1).setValue('12');
    await birthday.at(2).setValue('12');
    expect(wrapper.vm.profile.birthday.year).toBe('1999');
    expect(wrapper.vm.profile.birthday.month).toBe('12');
    expect(wrapper.vm.profile.birthday.day).toBe('12');

    // modify the position
    const positions = wrapper.findAll('input.form-check-input');
    await wrapper.vm.$nextTick();

    console.log(wrapper.vm.profile.position);
    await positions.at(0).setChecked(false);
    console.log(wrapper.vm.profile.position);
    expect(wrapper.vm.profile.position).toEqual(['MB']);

  });

  it('test on modify info in modal - invalid type', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('test on modify info in modal - invalid type - jest.spyOn()')
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ['OH', 'MB'],
            teamList: ['NYCU CS'],
            StatisticsList: [],
          },
          editProfileModal: true,
        }
      }
    });

    // get form div
    const div = wrapper.findAll('div.form-group.mb-2');
    await wrapper.vm.$nextTick();

    // give the invalid date
    const birthday = div.at(1).findAll('input.form-control');
    await wrapper.vm.$nextTick();

    await birthday.at(0).setValue('hello');

    expect(Number(wrapper.vm.profile.birthday.year)).not.toBe(NaN);

  });

  it('test on modify info in modal - invalid date', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('test on modify info in modal - jest.spyOn()')
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ['OH', 'MB'],
            teamList: ['NYCU CS'],
            StatisticsList: [],
          },
          editProfileModal: true,
        }
      }
    });

    // get form div
    const div = wrapper.findAll('div.form-group.mb-2');
    await wrapper.vm.$nextTick();

    // give the invalid date
    const birthday = div.at(1).findAll('input.form-control');
    await wrapper.vm.$nextTick();

    await birthday.at(0).setValue('2000');
    await birthday.at(1).setValue('13');
    await birthday.at(2).setValue('20');
    expect(wrapper.vm.profile.birthday.year).toBe('2000');
    expect(Number(wrapper.vm.profile.birthday.month)).toBeLessThan(13);
    expect(Number(wrapper.vm.profile.birthday.month)).toBeGreaterThanOrEqual(1);
    expect(wrapper.vm.profile.birthday.day).toBe('12');

  });

  it('test on modify info button in modal', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('test on modify info button in modal - jest.spyOn()')
    })

    const changeProfileSpy = jest.spyOn(profile.methods, 'changeProfile').mockImplementation(() => {
      console.log('spy on changeProfileSpy');
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ['OH', 'MB'],
            teamList: ['NYCU CS'],
            StatisticsList: [],
          },
          editProfileModal: true,
        }
      }
    });

    // Find the button in the modal-footer
    const button = wrapper.find('div.modal-footer button.btn.teambtn');

    // Simulate a button click
    await button.trigger('click');

    // Assert that the modifyPersonal method has been called
    // expect(singleTeam.methods.modifyPersonal).toHaveBeenCalled();
    expect(changeProfileSpy).toHaveBeenCalled();

  });

  // team info
  it('show all the team correctly', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('show all the team correctly - jest.spyOn()')
    })

    const getTeamIDSpy = jest.spyOn(profile.methods, 'getTeamID').mockImplementation(() => {
      return '-NTd4gODlBQPL9Na1VYr';
    })

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const mockVueRouter = new VueRouter();

    const wrapper = mount(profile, {
      localVue,
      propsData: {
        uid: mockUid
      },
      router: mockVueRouter,
      // stubs: ['router-link', 'router-view'], 
      mocks: {
        // $router: mockRouter,
        // $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ['OH', 'MB'],
            teamList: ['NYCU CS'],
            StatisticsList: [],
          },
          id: mockUid,
          teamid: '-NTd4gODlBQPL9Na1VYr',
        }
      }
    });

    // Find the team router-link
    const routerLinks = wrapper.findAllComponents({name: 'router-link'});
    await wrapper.vm.$nextTick();
    expect(routerLinks).toHaveLength(1);

    // Assert that the button exists
    expect(routerLinks.at(0)).toBeTruthy();
    // Assert the button's text
    expect(routerLinks.at(0).text()).toContain('NYCU CS');

    // Simulate a click on the router-link component
    await routerLinks.at(0).trigger('click');
    await wrapper.vm.$nextTick();
    // Assert that the expected navigation occurred
    expect(wrapper.vm.$route.path).toBe('/home/' + wrapper.vm.uid + '/team/' + wrapper.vm.teamid);

  });

  // create team modal
  it('test on open create team btn', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('test on open create team btn - jest.spyOn()')
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ["OH", "MB"],
            teamList: ["NYCU CS"],
            StatisticsList: [],
          },
          createTeamModal: false,
        }
      }
    });

    const createTeamBtn = wrapper.find('button.btn.btn-outline-dark.me-3.text-nowrap');
    // Assert that the button exists
    expect(createTeamBtn).toBeTruthy();
    // console.log(settingBtn)
    
    // Simulate a button click
    await createTeamBtn.trigger('click');
    
    // Assert that the createTeamModal property is set to true
    expect(wrapper.vm.createTeamModal).toBe(true);
  });

  it('test on close create team btn', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('test on close create team btn - jest.spyOn()')
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ["OH", "MB"],
            teamList: ["NYCU CS"],
            StatisticsList: [],
          },
          createTeamModal: true,
        }
      }
    });

    const closeCreateTeamBtn = wrapper.find('button.btn-close');
    // Assert that the button exists
    expect(closeCreateTeamBtn).toBeTruthy();
    
    // Simulate a button click
    await closeCreateTeamBtn.trigger('click');
    
    // Assert that the editProfileModal property is set to false
    expect(wrapper.vm.createTeamModal).toBe(false);
  });

  it('test on create team modal', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('test on open create team btn - jest.spyOn()')
    })

    const createTeamSpy = jest.spyOn(profile.methods, 'createTeam').mockImplementation(() => {
      console.log('spy on createTeam');
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ["OH", "MB"],
            teamList: ["NYCU CS"],
            StatisticsList: [],
          },
          newTeam:{
            teamName: 'NYCU TMP',
            members: [''],
            contestRecords: [''],
          },
          personalInfo: {
            number: '10',
            position: 'OH',
            name: 'test1',
            uid: '-N3hlfKxXwby0jSSDbxV',
          },
          createTeamModal: true,
        }
      }
    });

    // Find the button in the modal-footer
    const button = wrapper.find('div.modal-footer button.btn.teambtn');

    // Simulate a button click
    await button.trigger('click');

    // Assert that the modifyPersonal method has been called
    // expect(singleTeam.methods.modifyPersonal).toHaveBeenCalled();
    expect(createTeamSpy).toHaveBeenCalled();
  });

  it('if team name is null cannot create team in create team modal', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('if team name is null cannot create team in create team modal - jest.spyOn()')
    })

    const createTeamSpy = jest.spyOn(profile.methods, 'createTeam').mockImplementation(() => {
      console.log('spy on createTeam');
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ["OH", "MB"],
            teamList: ["NYCU CS"],
            StatisticsList: [],
          },
          newTeam:{
            teamName: '',
            members: [''],
            contestRecords: [''],
          },
          personalInfo: {
            number: '10',
            position: 'OH',
            name: 'test1',
            uid: '-N3hlfKxXwby0jSSDbxV',
          },
          createTeamModal: true,
        }
      }
    });

    // Find the button in the modal-footer
    const button = wrapper.find('div.modal-footer button.btn.teambtn');

    // Assert that the button is disabled
    expect(button.attributes('disabled')).toBe('disabled');
  });

  it('if position is null cannot create team in create team modal', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('if position is null cannot create team in create team modal - jest.spyOn()')
    })

    const createTeamSpy = jest.spyOn(profile.methods, 'createTeam').mockImplementation(() => {
      console.log('spy on createTeam');
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ["OH", "MB"],
            teamList: ["NYCU CS"],
            StatisticsList: [],
          },
          newTeam:{
            teamName: 'NYCU TMP',
            members: [''],
            contestRecords: [''],
          },
          personalInfo: {
            number: '10',
            position: '',
            name: 'test1',
            uid: '-N3hlfKxXwby0jSSDbxV',
          },
          createTeamModal: true,
        }
      }
    });

    // Find the button in the modal-footer
    const button = wrapper.find('div.modal-footer button.btn.teambtn');

    // Assert that the button is disabled
    expect(button.attributes('disabled')).toBe('disabled');
  });

  it('if number is null cannot create team in create team modal', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('if number is null cannot create team in create team modal - jest.spyOn()')
    })

    const createTeamSpy = jest.spyOn(profile.methods, 'createTeam').mockImplementation(() => {
      console.log('spy on createTeam');
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ["OH", "MB"],
            teamList: ["NYCU CS"],
            StatisticsList: [],
          },
          newTeam:{
            teamName: 'NYCU TMP',
            members: [''],
            contestRecords: [''],
          },
          personalInfo: {
            number: '',
            position: 'OH',
            name: 'test1',
            uid: '-N3hlfKxXwby0jSSDbxV',
          },
          createTeamModal: true,
        }
      }
    });

    // Find the button in the modal-footer
    const button = wrapper.find('div.modal-footer button.btn.teambtn');

    // Assert that the button is disabled
    expect(button.attributes('disabled')).toBe('disabled');
  });

  // statistics info
  it('show my record correctly - no any statistic', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('show my record correctly - no any statistic - jest.spyOn()')
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ["OH", "MB"],
            teamList: ["NYCU CS"],
            StatisticsList: [''],
          },
          editProfileModal: false,
        }
      }
    });

    // find the tbody
    const tbody = wrapper.find('tbody');

    // find all the statistics
    const stats = tbody.findAll('td');
    await wrapper.vm.$nextTick();

    // Assert that there are 12 statistics
    expect(stats).toHaveLength(11);

    // Assert that all the data tob be '-'
    for(let i=0; i<11; i++){
      expect(stats.at(i).text()).toBe('-');
    }

  });

  it('show my record correctly - no any statistic', async () => {
    jest.spyOn(profile, 'beforeMount').mockImplementation(() => {
      console.log('show my record correctly - no any statistic - jest.spyOn()')
    })

    const wrapper = mount(profile, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      components:{
        'DropSearch': DropSearch
      },
      data() {
        return {
          profile: {
            authid: '-N3hlf6SroA1k582Ip-9', // for login
            name: 'test1',
            birthday: {
              year: '2000',
              month: '1',
              day: '1',
            },
            position: ["OH", "MB"],
            teamList: ["NYCU CS"],
            StatisticsList: [
              {
                contestid: '-NW1TCL0Frg3amRA_EYl',
                name: 'test1', number: '0', pos: 'OH',
                contest: '系際盃', teamName: 'NYCU CS', opponent: 'NYCU EE',
                date: '2023-05-22', gameScore: '1:0', score: '25:1',
                attackPoint: 1, blockPoint: 2, servicePoint: 3,
                attackError: 2, tossError: 1, blockError: 0,
                receiveError: 0, serviceError: 1
              }
            ],
          },
          editProfileModal: false,
        }
      }
    });

    // find the tbody
    const tbody = wrapper.find('tbody');
    // find all the contest
    const contests = tbody.findAll('tr');
    await wrapper.vm.$nextTick();

    // contests1
    // find all the statistics
    const stats = contests.at(0).findAll('td');
    await wrapper.vm.$nextTick();

    // contest info
    const contestInfo = stats.at(0).findAll('p');
    await wrapper.vm.$nextTick();
    expect(contestInfo.at(0).text()).toBe('系際盃');
    expect(contestInfo.at(1).text()).toContain('NYCU CS');
    expect(contestInfo.at(1).text()).toContain('NYCU EE');
    expect(contestInfo.at(2).text()).toBe('2023-05-22');
    expect(contestInfo.at(3).text()).toBe('1:0');

    // Assert that the point is correct
    // point
    expect(stats.at(1).text()).toBe('1');
    expect(stats.at(2).text()).toBe('2');
    expect(stats.at(3).text()).toBe('3');
    expect(stats.at(4).text()).toBe('6');
    // error
    expect(stats.at(5).text()).toBe('2');
    expect(stats.at(6).text()).toBe('1');
    expect(stats.at(7).text()).toBe('0');
    expect(stats.at(8).text()).toBe('0');
    expect(stats.at(9).text()).toBe('1');
    expect(stats.at(10).text()).toBe('4');

  });

});

