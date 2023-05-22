import { shallowMount, mount, RouterLinkStub, createLocalVue, createRouter, createWebHistory} from '@vue/test-utils'
import VueRouter from 'vue-router';
import singleRecord from '@/views/singleRecord'

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
  
// mock the uid
const mockUid = '-N3hlfKxXwby0jSSDbxV'

describe('singleRecord', () => {
  // beforeMount
  it('should execute beforeMount()', async () => {
    const beforMountSpy = jest.spyOn(singleRecord, 'beforeMount').mockImplementation(() => {
      console.log('should execute beforeMount() - jest.spyOn()')
    })

    const wrapper = mount(singleRecord, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
    });

    // Assert that the beforeMount should be called
    expect(beforMountSpy).toHaveBeenCalled();

  });
  
  // go back btn
  it('test on back btn', async () => {
    jest.spyOn(singleRecord, 'beforeMount').mockImplementation(() => {
      console.log('test on back btn - jest.spyOn()')
    })

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const mockVueRouter = new VueRouter();

    const wrapper = mount(singleRecord, {
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
      data() {
        return {
          teamid: '-NTd4gODlBQPL9Na1VYr',
          contestid: '-NTdKbOPAh9F89udkTNB'
        }
      }
    });

    // Assert that the button exists
    const routerLinks = wrapper.findAllComponents({name: 'router-link'});
    await wrapper.vm.$nextTick();
    expect(routerLinks).toHaveLength(2);

    // Assert that the button exists
    expect(routerLinks.at(0)).toBeTruthy();
    // Assert the button's text
    expect(routerLinks.at(0).text()).toContain('返回');

    // Simulate a click on the router-link component
    await routerLinks.at(0).trigger('click');
    await wrapper.vm.$nextTick();
    // Assert that the expected navigation occurred
    // expect(wrapper.vm.$route.path).toBe('/home/' + wrapper.vm.uid + '/team/' + wrapper.vm.$route.params.teamid + '/scoring/' + wrapper.vm.teamInfo.contestRecords[0].key);
    expect(wrapper.vm.$route.path).toBe('/home/' + wrapper.vm.uid + '/team/' + wrapper.vm.teamid);

  });

  // go scoring btn
  it('test on scoring btn', async () => {
    jest.spyOn(singleRecord, 'beforeMount').mockImplementation(() => {
      console.log('test on scoring btn - jest.spyOn()')
    })

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const mockVueRouter = new VueRouter();

    const wrapper = mount(singleRecord, {
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
      data() {
        return {
          teamid: '-NTd4gODlBQPL9Na1VYr',
          contestid: '-NTdKbOPAh9F89udkTNB'
        }
      }
    });

    // Assert that the button exists
    const routerLinks = wrapper.findAllComponents({name: 'router-link'});
    await wrapper.vm.$nextTick();
    expect(routerLinks).toHaveLength(2);

    // Assert that the button exists
    expect(routerLinks.at(1)).toBeTruthy();
    // Assert the button's text
    expect(routerLinks.at(1).text()).toContain('計分');

    // Simulate a click on the router-link component
    await routerLinks.at(1).trigger('click');
    await wrapper.vm.$nextTick();

    // Assert that the expected navigation occurred
    expect(wrapper.vm.$route.path).toBe('/home/' + wrapper.vm.uid + '/team/' + wrapper.vm.teamid + '/scoring/' + wrapper.vm.contestid);

  });

  // contest info
  it('show the contest info correctly', async () => {
    jest.spyOn(singleRecord, 'beforeMount').mockImplementation(() => {
      console.log('show the contest info correctly - jest.spyOn()')
    })

    const wrapper = mount(singleRecord, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamid: this.$route.params.teamid,
          contestid: this.$route.params.contestid,
          contestInfo: {
            opponent: '交大電機',
            contest: '系際盃',
            date:'2023-04-20',
            score: '0:0',
            gameScore: '0:0',
            localRecords: '',
            games: [
              {
                ourTeam: [''],
                placement:{
                  1: [''],
                  2: [''],
                  3: [''],
                  4: [''],
                  5: [''],
                  6: [''],
                  7: [''],
                  8: [''],
                  9: [''],
                  'touchout': [''],
                }
              },
            ]
          },
        }
      }
    });

    // find the contest p
    const div = wrapper.find('div.d-flex.align-items-center.text-start.mx-3.my-3.justify-content-between');
    const contestName = div.find('p.mb-0.fs-5.fw-bolder');
    const contestDate = div.find('p.mb-0.fw-bold');

    // Assert that the contest name is correct
    expect(contestName.text()).toBe('系際盃');
    // Assert the contest date is correct
    expect(contestDate.text()).toBe('2023-04-20');

  });

  it('show the team info correctly', async () => {
    jest.spyOn(singleRecord, 'beforeMount').mockImplementation(() => {
      console.log('show the team info correctly - jest.spyOn()')
    })

    const wrapper = mount(singleRecord, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamid: this.$route.params.teamid,
          contestid: this.$route.params.contestid,
          teamName: 'NYCU CS',
          contestInfo: {
            opponent: '交大電機',
            contest: '系際盃',
            date:'2023-04-20',
            score: '0:0',
            gameScore: '0:0',
            localRecords: '',
            games: [
              {
                ourTeam: [''],
                placement:{
                  1: [''],
                  2: [''],
                  3: [''],
                  4: [''],
                  5: [''],
                  6: [''],
                  7: [''],
                  8: [''],
                  9: [''],
                  'touchout': [''],
                }
              },
            ]
          },
        }
      }
    });

    // find the all the team
    const teams = wrapper.findAll('div.d-grid.mx-3.my-1 h5');

    // Assert that the contest name is correct
    expect(teams.at(0).text()).toBe('NYCU CS');
    // Assert the contest date is correct
    expect(teams.at(1).text()).toBe('交大電機');

  });

  it('show the game score correctly', async () => {
    jest.spyOn(singleRecord, 'beforeMount').mockImplementation(() => {
      console.log('show the game score correctly - jest.spyOn()')
    })

    const wrapper = mount(singleRecord, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamid: this.$route.params.teamid,
          contestid: this.$route.params.contestid,
          contestInfo: {
            opponent: '交大電機',
            contest: '系際盃',
            date:'2023-04-20',
            score: '1:0',
            gameScore: '1:0',
            localRecords: '',
            games: [
              {
                ourTeam: [''],
                placement:{
                  1: [''],
                  2: [''],
                  3: [''],
                  4: [''],
                  5: [''],
                  6: [''],
                  7: [''],
                  8: [''],
                  9: [''],
                  'touchout': [''],
                }
              },
            ]
          },
        }
      }
    });

    // find the all the score
    const teams = wrapper.findAll('div.d-grid.mx-3.my-1 h3');

    // Assert that the contest name is correct
    expect(teams.at(0).text()).toBe('1');
    // Assert the contest date is correct
    expect(teams.at(2).text()).toBe('0');

  });

  // score recording
  it('show the tab number correctly', async () => {
    jest.spyOn(singleRecord, 'beforeMount').mockImplementation(() => {
      console.log('show the tab number correctly - jest.spyOn()')
    })

    const wrapper = mount(singleRecord, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamid: this.$route.params.teamid,
          contestid: this.$route.params.contestid,
          contestInfo: {
            opponent: '交大電機',
            contest: '系際盃',
            date:'2023-04-20',
            score: '1:0',
            gameScore: '1:0',
            localRecords: '',
            games: [
              {
                ourTeam: [''],
                placement:{
                  1: [''],
                  2: [''],
                  3: [''],
                  4: [''],
                  5: [''],
                  6: [''],
                  7: [''],
                  8: [''],
                  9: [''],
                  'touchout': [''],
                }
              },
              {
                ourTeam: [''],
                placement:{
                  1: [''],
                  2: [''],
                  3: [''],
                  4: [''],
                  5: [''],
                  6: [''],
                  7: [''],
                  8: [''],
                  9: [''],
                  'touchout': [''],
                }
              },
              {
                ourTeam: [''],
                placement:{
                  1: [''],
                  2: [''],
                  3: [''],
                  4: [''],
                  5: [''],
                  6: [''],
                  7: [''],
                  8: [''],
                  9: [''],
                  'touchout': [''],
                }
              },
            ]
          },
        }
      }
    });

    // find all the tabs
    const tabs = wrapper.findAll('ul.nav.nav-tabs li.nav-item');

    // Assert that the contest name is correct
    expect(tabs).toHaveLength(3);

  });

  it('show our team record correctly - no any statistic', async () => {
    jest.spyOn(singleRecord, 'beforeMount').mockImplementation(() => {
      console.log('show the tab number correctly - no any statistic - jest.spyOn()')
    })

    const wrapper = mount(singleRecord, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamid: this.$route.params.teamid,
          contestid: this.$route.params.contestid,
          contestInfo: {
            opponent: '交大電機',
            contest: '系際盃',
            date:'2023-04-20',
            score: '0:0',
            gameScore: '0:0',
            localRecords: '',
            games: [
              {
                ourTeam: [''],
                placement:{
                  1: [''],
                  2: [''],
                  3: [''],
                  4: [''],
                  5: [''],
                  6: [''],
                  7: [''],
                  8: [''],
                  9: [''],
                  'touchout': [''],
                }
              },
            ]
          },
        }
      }
    });

    // find the tbody
    const tbody = wrapper.find('tbody');
    // find the member
    const members = tbody.find('tr');

    // member1
    // find all the statistics
    const stats = members.findAll('td');
    await wrapper.vm.$nextTick();

    // Assert that there are 12 statistics
    expect(stats).toHaveLength(12);

    // Assert that all the data tob be '-'
    for(let i=0; i<12; i++){
      expect(stats.at(i).text()).toBe('-');
    }

  });

  it('show our team record correctly', async () => {
    jest.spyOn(singleRecord, 'beforeMount').mockImplementation(() => {
      console.log('show the tab number correctly - jest.spyOn()')
    })

    const wrapper = mount(singleRecord, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamid: this.$route.params.teamid,
          contestid: this.$route.params.contestid,
          contestInfo: {
            opponent: '交大電機',
            contest: '系際盃',
            date:'2023-04-20',
            score: '1:0',
            gameScore: '1:0',
            localRecords: '',
            games: [
              {
                ourTeam: {
                  '蘇名偉': { name: '蘇名偉', pos: 'OH', number: '27',
                            attackPoint: 1, blockPoint: 2, servicePoint: 3,
                            attackError: 2, tossError: 1, blockError: 0,
                            receiveError: 0, serviceError: 1 },
                },
                placement:{
                  1: [''],
                  2: [''],
                  3: [{'num': 2, 'pos': 'S'}],
                  4: [''],
                  5: [''],
                  6: [''],
                  7: [''],
                  8: [''],
                  9: [''],
                  'touchout': [''],
                }
              },
            ]
          },
        }
      }
    });

    // find the tbody
    const tbody = wrapper.find('tbody');
    // find all the member
    const members = tbody.findAll('tr');
    await wrapper.vm.$nextTick();

    // member1
    // find all the statistics
    const stats = members.at(0).findAll('td');
    await wrapper.vm.$nextTick();

    // Assert that the name and position are correct
    const manInfo = stats.at(0).findAll('span');
    await wrapper.vm.$nextTick();
    // console.log(wrapper.vm.contestInfo.games[0].ourTeam['蘇名偉'].pos);
    expect(manInfo.at(0).find('.badge.bg-danger.text-wrap.mx-1').text()).toBe('27');
    expect(manInfo.at(1).find('.text-nowrap').text()).toBe('蘇名偉');

    // point
    expect(stats.at(1).text()).toBe('OH');
    expect(stats.at(2).text()).toBe('1');
    expect(stats.at(3).text()).toBe('2');
    expect(stats.at(4).text()).toBe('3');
    expect(stats.at(5).text()).toBe('6');
    // error
    expect(stats.at(6).text()).toBe('2');
    expect(stats.at(7).text()).toBe('1');
    expect(stats.at(8).text()).toBe('0');
    expect(stats.at(9).text()).toBe('0');
    expect(stats.at(10).text()).toBe('1');
    expect(stats.at(11).text()).toBe('4');


  });

  it('show placement record correctly', async () => {
    jest.spyOn(singleRecord, 'beforeMount').mockImplementation(() => {
      console.log('show placement record correctly - jest.spyOn()')
    })

    const wrapper = mount(singleRecord, {
      propsData: {
        uid: mockUid
      },
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamid: this.$route.params.teamid,
          contestid: this.$route.params.contestid,
          contestInfo: {
            opponent: '交大電機',
            contest: '系際盃',
            date:'2023-04-20',
            score: '1:0',
            gameScore: '1:0',
            localRecords: '',
            games: [
              {
                ourTeam: {
                  '蘇名偉': { name: '蘇名偉', pos: 'OH', number: '27',
                            attackPoint: 1, blockPoint: 2, servicePoint: 3,
                            attackError: 2, tossError: 1, blockError: 0,
                            receiveError: 0, serviceError: 1 },
                },
                placement:{
                  1: [''],
                  2: [''],
                  3: [{'num': 2, 'pos': 'S'}, {'num': 3, 'pos': 'OH'}],
                  4: [''],
                  5: [''],
                  6: [''],
                  7: [''],
                  8: [''],
                  9: [''],
                  'touchout': [{'num': 50, 'pos': 'MB'}],
                }
              },
            ]
          },
        }
      }
    });

    // find the 3*3 div
    const court = wrapper.find('div.container.border.border-2.border-dark')

    // the row1 div
    const row1 = court.findAll('div.row.border-bottom.border-2.border-dark div.col.px-1');
    await wrapper.vm.$nextTick();

    // Assert that the placement3 div has 2 spans
    const spans3 = row1.at(2).findAll('span span');
    expect(spans3).toHaveLength(2);
    expect(spans3.at(0).find('span.badge.bg-success.score_point').text()).toBe('2');
    expect(spans3.at(1).find('span.badge.bg-danger.score_point').text()).toBe('3');

    // find the outside div
    const outside = wrapper.find('div.container.border-dark.border-2.px-1 div.col');
    
    // Assert that the outside div has 1 spans
    const spanTouchout = outside.findAll('span span');
    expect(spanTouchout).toHaveLength(1);
    expect(spanTouchout.at(0).find('span.badge.bg-warning.score_point').text()).toBe('50');

  });


}); 