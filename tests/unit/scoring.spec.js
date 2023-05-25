import { createLocalVue, mount } from '@vue/test-utils'
import scoring from '@/views/scoring.vue'
import VueRouter from 'vue-router';

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

const mockUid = '-N3hlfKxXwby0jSSDbxV'
describe('Page Transition', () => {
  it('Go Back to Profile Page', async () => {
    jest.spyOn(scoring, 'beforeMount').mockImplementation(() => {})

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const mockVueRouter = new VueRouter();

    const wrapper = mount(scoring, {
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
    expect(routerLinks).toHaveLength(3);

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

  it('Go to Record Page', async () => {
    jest.spyOn(scoring, 'beforeMount').mockImplementation(() => {})

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const mockVueRouter = new VueRouter();

    const wrapper = mount(scoring, {
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
    expect(routerLinks).toHaveLength(3);

    // Assert that the button exists
    expect(routerLinks.at(1)).toBeTruthy();
    // Assert the button's text
    expect(routerLinks.at(1).text()).toContain('分析');

    // Simulate a click on the router-link component
    await routerLinks.at(1).trigger('click');
    await wrapper.vm.$nextTick();

    // Assert that the expected navigation occurred
    expect(wrapper.vm.$route.path).toBe('/home/' + wrapper.vm.uid + '/team/' + wrapper.vm.teamid + '/record/' + wrapper.vm.contestid);

  });
})

describe('Testing Score Board', () => {
  // 用 spyOn 的方式 intercept "beforeMount" 
  // 來避免 this.$http.get() Undefined 的錯誤
  jest.spyOn(scoring, 'beforeMount').mockImplementation(() => {})

  const wrapper = mount(scoring, {
    stubs: ['router-link', 'router-view'], 
    mocks: {
      $router: mockRouter,
      $route: mockRoute
    },
    data() {
      return {
        scoring: {
          host: {'name': 'NYCU CS', 'winned_game': 1, 'cur_score': 20},
          opponent: {'name': 'NCKU CSIE', 'winned_game': 0, 'cur_score': 19}
        },
      }
    }
  })

  let scoreBoard = wrapper.findComponent('.scores')
  let teams = scoreBoard.findAll('button')
  let scores = scoreBoard.findAll('span')

  it('Score Board - Teams', () => {
    expect(teams.at(0).text()).toEqual('NYCU CS')
    expect(teams.at(1).text()).toEqual('NCKU CSIE')
  })

  it('Score Board - Game Score', () => {
    expect(scores.at(0).text()).toEqual('1')
    expect(scores.at(1).text()).toEqual('20')
  })

  it('Score Board - Score', () => {
    expect(scores.at(2).text()).toEqual('0')
    expect(scores.at(3).text()).toEqual('19')
  })
})

describe('Testing Record', () => {
  // 用 spyOn 的方式 intercept "beforeMount" 
  // 來避免 this.$http.get() Undefined 的錯誤
  jest.spyOn(scoring, 'beforeMount').mockImplementation(() => {})
  
  let mocked = jest.spyOn(scoring.methods, 'deleteLocalRecord').mockImplementation((record2delete) => {
    // delete from local record
    let indexOfTarget = Array.from(wrapper.vm.records_local).indexOf(record2delete);
    wrapper.vm.records_local.splice(indexOfTarget, 1);
    
    // delete from record to be pushed
    if (record2delete.record_type == '對方得分' && record2delete.game == wrapper.vm.cur_game) {
      wrapper.vm.scoring.opponent.cur_score--; // score adjustment
      
      // change "touch out" to numberic number
      if (record2delete.landing == 'Touch Out') 
        record2delete.landing = 10;

      let opponent = wrapper.vm.records_pushed_raw[record2delete.game-1].placement[record2delete.landing-1].find(x => x.num == record2delete.num && x.pos == record2delete.position),
          indexOfOpponent = wrapper.vm.records_pushed_raw[record2delete.game-1].placement[record2delete.landing-1].indexOf(opponent);
      
      wrapper.vm.records_pushed_raw[record2delete.game-1].placement[record2delete.landing-1].splice(indexOfOpponent, 1);
    } else {
      // score adjustment
      if (record2delete.record_type.indexOf('失誤') != -1  && record2delete.game == wrapper.vm.cur_game)
        wrapper.vm.scoring.opponent.cur_score--;
      else if (record2delete.game == wrapper.vm.cur_game) // 刪掉我們得分的紀錄
        wrapper.vm.scoring.host.cur_score--;

      // record deletion
      let engType = wrapper.vm.translateType2Eng[record2delete.record_type];
      wrapper.vm.records_pushed_raw[record2delete.game-1].ourTeam[record2delete.name][engType]--;
    }
  })
  
  const wrapper = mount(scoring, {
    stubs: ['router-link', 'router-view'], 
    mocks: {
      $router: mockRouter,
      $route: mockRoute
    },
    data() {
      return {
        cur_game: 1,
        records_pushed_raw: [
          {
            'ourTeam': {
              '蘇名偉': {name: '蘇名偉', pos: 'OH', number: '27',
                        attackPoint: 1, blockPoint: 0, servicePoint: 0,
                        attackError: 0, tossError: 0, blockError: 0,
                        receiveError: 0, serviceError: 0 },
              'Test7': {name: 'Test7', pos: 'L', number: '88',
                        attackPoint: 0, blockPoint: 0, servicePoint: 0,
                        attackError: 0, tossError: 0, blockError: 1,
                        receiveError: 0, serviceError: 0 },
            }, 
            'placement': [[''], [''], [{'num': 2, 'pos': 'S'}], [''], [''], [''], [''], [''], [''], [{'num': 43, 'pos': 'MB'}]] // 0~8: 1~9 九號位置 ; 9: touch out
          }
        ],
        scoring: {
          host: {'name': 'NYCU CS', 'winned_game': 0, 'cur_score': 1},
          opponent: {'name': 'NCKU CSIE', 'winned_game': 0, 'cur_score': 3}
        },
        records_local: [{'num': 88, 'name': 'Test7', 'position': 'L', 'record_type': '攻擊得分', 'landing': -1, 'game': 1},
                        {'num': 27, 'name': '蘇名偉', 'position': 'OH', 'record_type': '攔網失誤', 'landing': -1, 'game': 1},
                        {'num': 2, 'name': 'NCKU CSIE', 'position': 'S', 'record_type': '對方得分', 'landing': 3, 'game': 1},
                        {'num': 43, 'name': 'NCKU CSIE', 'position': 'MB', 'record_type': '對方得分', 'landing': 'Touch Out', 'game': 1}],
      }
    }
  })
  
  let rows = wrapper.findAll('td')
  let records_local = wrapper.vm.records_local
  it('Record - Badge & Name & Number', async () => {
    for (let i = 0; i < rows.length; ++i) {
      let recordIdx = i / 5
      if (i % 5 == 0) {
        // check Badge & Name & Number 
        let numAndName = rows.at(i).findAll('span')
        let iconColor = numAndName.at(0).classes()[3]
        
        // check badge color
        switch (records_local.at(recordIdx)['position']) {
          case 'MB':
            expect(iconColor).toEqual('bg-warning')
            break
          case 'OH':
            expect(iconColor).toEqual('bg-danger')
            break
          case 'S':
            expect(iconColor).toEqual('bg-success')
            break
          case 'L':
            expect(iconColor).toEqual('bg-secondary')
            break
          case 'O':
            expect(iconColor).toEqual('bg-primary')
            break
        }
        
        // check number and name 
        expect(numAndName.at(0).text()).toEqual(records_local.at(recordIdx)['num'].toString())
        expect(numAndName.at(1).text()).toEqual(records_local.at(recordIdx)['name'].toString())
      }
    }
  })

  it('Record - Record Type', async () => {
    for (let i = 0; i < rows.length; ++i) {
      let recordIdx = i / 5
      if (i % 5 == 1) {
        // check record type
        expect(rows.at(i).text()).toEqual(records_local.at(recordIdx)['record_type'])
      } 
    }
  })

  it('Record - Landing', async () => {
    for (let i = 0; i < rows.length; ++i) {
      let recordIdx = i / 5
      if (i % 5 == 2) {
        let landing = rows.at(i).find('span').text()
        if (records_local.at(recordIdx)['landing'] == 10)
          expect(landing).toEqual('Touch Out')
        else if (records_local.at(recordIdx)['landing'] != -1)
          expect(landing).toEqual(records_local.at(recordIdx)['landing'].toString())
        else
          expect(landing).toEqual('X')
      } 
    }
  })

  it('Record - Game', async () => {
    for (let i = 0; i < rows.length; ++i) {
      let recordIdx = i / 5
      if (i % 5 == 3) {
        expect(rows.at(i).text()).toEqual(records_local.at(recordIdx)['game'].toString())
      }
    }
  })

  // 這個 function 我有測到 deleteLocalRecord()，不過是把寫入 DB 的程式片段拔掉的版本
  it('Record - Delete Record', async () => {
    let records_local_deep = Array.from(wrapper.vm.records_local)
    let oldScoring = { host: {'name': 'NYCU CS', 'winned_game': 0, 'cur_score': 1},
                       opponent: {'name': 'NCKU CSIE', 'winned_game': 0, 'cur_score': 3} }
    for (let i = rows.length-1, counter = 0; i >= 0; --i) {
      if (i % 5 == 4) {
        let recordIdx = Math.floor(i / 5)
        let deleteBtn = rows.at(i).find('button')

        deleteBtn.trigger('click')
        await wrapper.vm.$nextTick()

        // after click
        // delete record
        expect(mocked).toHaveBeenCalledTimes(++counter)
        expect(Array.from(wrapper.vm.records_local).indexOf(records_local_deep.at(recordIdx))).toEqual(-1)
        
        // deduct score
        if (records_local_deep.at(recordIdx).record_type == '對方得分') 
          expect(wrapper.vm.scoring.opponent.cur_score).toEqual(--oldScoring.opponent.cur_score)
        else if (records_local_deep.at(recordIdx).record_type.indexOf('失誤') != -1) 
          expect(wrapper.vm.scoring.opponent.cur_score).toEqual(--oldScoring.opponent.cur_score)
        else 
          expect(wrapper.vm.scoring.host.cur_score).toEqual(--oldScoring.host.cur_score)
      }
    }

  })
})

describe('Player Selection', () => {
  // 用 spyOn 的方式 intercept "beforeMount" 
  // 來避免 this.$http.get() Undefined 的錯誤
  jest.spyOn(scoring, 'beforeMount').mockImplementation(() => {})
  
  it('Check Dropdown Options', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            // name, number, position, uid
            members: [{ "name": "蘇名偉", "number": "27", "position": "OH", "uid": "-N3hlfKxXwby0jSSDbxV" },
                      { "name": "張祐誠", "number": "3" , "position": "MB", "uid": "-N3hloXHeW7EIdJuh5ZD" },
                      { "name": "Test6", "number": "66", "position": "S" , "uid": "-N3hm182z3keR5kdjpoX" },
                      { "name": "Test5", "number": "77", "position": "O" , "uid": "-N3hlzbf69tjAcJjsAdG" },
                      { "name": "test4", "number": "4" , "position": "MB", "uid": "-N3hlp05s2nmpA4gx4XC" },
                      { "name": "test2", "number": "2" , "position": "OH", "uid": "-N3hlhMMtjy-u_QrqVL8" },
                      { "name": "Test7", "number": "88", "position": "L" , "uid": "-N3hm36BH5b9ngb2N8wQ" }],
          },
          // e.g.:) {'name': '張祐誠', 'number': 22, 'position': 'MB'}
          selected_members: [{}, {}, {}, {}, {}, {}, {}], 
          isCourtMemSet: true,
        }
      }
    })

    let selects = wrapper.findAll('select')
    for (var i = 0; i < selects.length; ++i) {
      let options = selects.at(i).findAll('option')
      for (var j = 1; j < selects.length; ++j) {
        var optionList = options.at(j).text().split(' | ')
        // console.log(optionList.at(0), wrapper.vm.teamInfo.members.at(j-1))
        expect(optionList.at(0)).toEqual(wrapper.vm.teamInfo.members[j-1]['number'])
        expect(optionList[1]).toEqual(wrapper.vm.teamInfo.members[j-1]['name'])
        expect(optionList[2]).toEqual(wrapper.vm.teamInfo.members[j-1]['position'])
      }
    }
  })
  
  it('Check Libero is Selected in L (falsy)', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            // name, number, position, uid
            members: [{ "name": "蘇名偉", "number": "27", "position": "OH", "uid": "-N3hlfKxXwby0jSSDbxV" },
                      { "name": "張祐誠", "number": "3" , "position": "MB", "uid": "-N3hloXHeW7EIdJuh5ZD" },
                      { "name": "Test6", "number": "66", "position": "S" , "uid": "-N3hm182z3keR5kdjpoX" },
                      { "name": "Test5", "number": "77", "position": "O" , "uid": "-N3hlzbf69tjAcJjsAdG" },
                      { "name": "test4", "number": "4" , "position": "MB", "uid": "-N3hlp05s2nmpA4gx4XC" },
                      { "name": "test2", "number": "2" , "position": "OH", "uid": "-N3hlhMMtjy-u_QrqVL8" },
                      { "name": "Test7", "number": "88", "position": "L" , "uid": "-N3hm36BH5b9ngb2N8wQ" }],
          },
          // e.g.:) {'name': '張祐誠', 'number': 22, 'position': 'MB'}
          selected_members: [{ "name": "蘇名偉", "number": "27", "position": "OH"},
                             { "name": "張祐誠", "number": "3" , "position": "MB"},
                             { "name": "Test6", "number": "66", "position": "S" },
                             { "name": "Test5", "number": "77", "position": "O" },
                             { "name": "test4", "number": "4" , "position": "MB"},
                             { "name": "Test7", "number": "88", "position": "L" },
                             { "name": "test2", "number": "2" , "position": "OH"}], 
          isCourtMemSet: true,
        }
      }
    })

    let select = wrapper.findAll('button').filter(divs => {return divs.classes().includes('team-member')})
    expect(select.at(6).find('span').classes().at(3)).toStrictEqual('bg-secondary')
  })

  it('Check Libero is Selected in L (truthy)', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            // name, number, position, uid
            members: [{ "name": "蘇名偉", "number": "27", "position": "OH", "uid": "-N3hlfKxXwby0jSSDbxV" },
                      { "name": "張祐誠", "number": "3" , "position": "MB", "uid": "-N3hloXHeW7EIdJuh5ZD" },
                      { "name": "Test6", "number": "66", "position": "S" , "uid": "-N3hm182z3keR5kdjpoX" },
                      { "name": "Test5", "number": "77", "position": "O" , "uid": "-N3hlzbf69tjAcJjsAdG" },
                      { "name": "test4", "number": "4" , "position": "MB", "uid": "-N3hlp05s2nmpA4gx4XC" },
                      { "name": "test2", "number": "2" , "position": "OH", "uid": "-N3hlhMMtjy-u_QrqVL8" },
                      { "name": "Test7", "number": "88", "position": "L" , "uid": "-N3hm36BH5b9ngb2N8wQ" }],
          },
          // e.g.:) {'name': '張祐誠', 'number': 22, 'position': 'MB'}
          selected_members: [{ "name": "蘇名偉", "number": "27", "position": "OH"},
                             { "name": "張祐誠", "number": "3" , "position": "MB"},
                             { "name": "Test6", "number": "66", "position": "S" },
                             { "name": "Test5", "number": "77", "position": "O" },
                             { "name": "test4", "number": "4" , "position": "MB"},
                             { "name": "test2", "number": "2" , "position": "OH"},
                             { "name": "Test7", "number": "88", "position": "L" }], 
          isCourtMemSet: true,
        }
      }
    })

    let select = wrapper.findAll('button').filter(divs => {return divs.classes().includes('team-member')})
    // console.log(select.length, select.at(6).find('span').classes(), select.at(6).findAll('span').at(1).text())
    expect(select.at(6).find('span').classes().at(3)).toStrictEqual('bg-secondary')
  })

  it('Check Selected Presentation - Position Tag', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            // name, number, position, uid
            members: [{ "name": "蘇名偉", "number": "27", "position": "OH", "uid": "-N3hlfKxXwby0jSSDbxV" },
                      { "name": "張祐誠", "number": "3" , "position": "MB", "uid": "-N3hloXHeW7EIdJuh5ZD" },
                      { "name": "Test6", "number": "66", "position": "S" , "uid": "-N3hm182z3keR5kdjpoX" },
                      { "name": "Test5", "number": "77", "position": "O" , "uid": "-N3hlzbf69tjAcJjsAdG" },
                      { "name": "test4", "number": "4" , "position": "MB", "uid": "-N3hlp05s2nmpA4gx4XC" },
                      { "name": "test2", "number": "2" , "position": "OH", "uid": "-N3hlhMMtjy-u_QrqVL8" },
                      { "name": "Test7", "number": "88", "position": "L" , "uid": "-N3hm36BH5b9ngb2N8wQ" }],
          },
          // e.g.:) {'name': '張祐誠', 'number': 22, 'position': 'MB'}
          selected_members: [{ "name": "蘇名偉", "number": "27", "position": "OH"},
                             { "name": "張祐誠", "number": "3" , "position": "MB"},
                             { "name": "Test6", "number": "66", "position": "S" },
                             { "name": "Test5", "number": "77", "position": "O" },
                             { "name": "test4", "number": "4" , "position": "MB"},
                             { "name": "test2", "number": "2" , "position": "OH"},
                             { "name": "Test7", "number": "88", "position": "L" }], 
          isCourtMemSet: true,
        }
      }
    })

    let selects = wrapper.findAll('button').filter(divs => {return divs.classes().includes('team-member')})
    expect(selects.at(0).findAll('span').at(0).classes().at(3)).toEqual('bg-danger')
    expect(selects.at(1).findAll('span').at(0).classes().at(3)).toEqual('bg-warning')
    expect(selects.at(2).findAll('span').at(0).classes().at(3)).toEqual('bg-success')
    expect(selects.at(3).findAll('span').at(0).classes().at(3)).toEqual('bg-primary')
    expect(selects.at(4).findAll('span').at(0).classes().at(3)).toEqual('bg-warning')
    expect(selects.at(5).findAll('span').at(0).classes().at(3)).toEqual('bg-danger')
  })

  it('Check Selected Presentation - Number', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            // name, number, position, uid
            members: [{ "name": "蘇名偉", "number": "27", "position": "OH", "uid": "-N3hlfKxXwby0jSSDbxV" },
                      { "name": "張祐誠", "number": "3" , "position": "MB", "uid": "-N3hloXHeW7EIdJuh5ZD" },
                      { "name": "Test6", "number": "66", "position": "S" , "uid": "-N3hm182z3keR5kdjpoX" },
                      { "name": "Test5", "number": "77", "position": "O" , "uid": "-N3hlzbf69tjAcJjsAdG" },
                      { "name": "test4", "number": "4" , "position": "MB", "uid": "-N3hlp05s2nmpA4gx4XC" },
                      { "name": "test2", "number": "2" , "position": "OH", "uid": "-N3hlhMMtjy-u_QrqVL8" },
                      { "name": "Test7", "number": "88", "position": "L" , "uid": "-N3hm36BH5b9ngb2N8wQ" }],
          },
          // e.g.:) {'name': '張祐誠', 'number': 22, 'position': 'MB'}
          selected_members: [{ "name": "蘇名偉", "number": "27", "position": "OH"},
                             { "name": "張祐誠", "number": "3" , "position": "MB"},
                             { "name": "Test6", "number": "66", "position": "S" },
                             { "name": "Test5", "number": "77", "position": "O" },
                             { "name": "test4", "number": "4" , "position": "MB"},
                             { "name": "test2", "number": "2" , "position": "OH"},
                             { "name": "Test7", "number": "88", "position": "L" }], 
          isCourtMemSet: true,
        }
      }
    })

    let selects = wrapper.findAll('button').filter(divs => {return divs.classes().includes('team-member')})
    for (let idx = 0; idx < 7; ++idx)
      expect(selects.at(idx).findAll('span').at(0).text()).toEqual(wrapper.vm.selected_members[idx]['number'])
  })

  it('Check Selected Presentation - Name', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          teamInfo:{
            teamName: 'NYCU CS',
            // name, number, position, uid
            members: [{ "name": "蘇名偉", "number": "27", "position": "OH", "uid": "-N3hlfKxXwby0jSSDbxV" },
                      { "name": "張祐誠", "number": "3" , "position": "MB", "uid": "-N3hloXHeW7EIdJuh5ZD" },
                      { "name": "Test6", "number": "66", "position": "S" , "uid": "-N3hm182z3keR5kdjpoX" },
                      { "name": "Test5", "number": "77", "position": "O" , "uid": "-N3hlzbf69tjAcJjsAdG" },
                      { "name": "test4", "number": "4" , "position": "MB", "uid": "-N3hlp05s2nmpA4gx4XC" },
                      { "name": "test2", "number": "2" , "position": "OH", "uid": "-N3hlhMMtjy-u_QrqVL8" },
                      { "name": "Test7", "number": "88", "position": "L" , "uid": "-N3hm36BH5b9ngb2N8wQ" }],
          },
          // e.g.:) {'name': '張祐誠', 'number': 22, 'position': 'MB'}
          selected_members: [{ "name": "蘇名偉", "number": "27", "position": "OH"},
                             { "name": "張祐誠", "number": "3" , "position": "MB"},
                             { "name": "Test6", "number": "66", "position": "S" },
                             { "name": "Test5", "number": "77", "position": "O" },
                             { "name": "test4", "number": "4" , "position": "MB"},
                             { "name": "test2", "number": "2" , "position": "OH"},
                             { "name": "Test7", "number": "88", "position": "L" }], 
          isCourtMemSet: true,
        }
      }
    })

    let selects = wrapper.findAll('button').filter(divs => {return divs.classes().includes('team-member')})
    
    for (let idx = 0; idx < 7; ++idx)
      expect(selects.at(idx).findAll('span').at(1).text()).toEqual(wrapper.vm.selected_members[idx]['name'])
  })

  it('Check if Opponent scores, players don\'t show', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          isOpponentScore: true,
        }
      }
    })

    let playerDiv = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                 divs.classes().includes('mb-3') && 
                                                                 divs.classes().includes('fw-bold')})

    expect(playerDiv.at(0).attributes('style')).toBeDefined()
    expect(playerDiv.at(2).attributes('style')).toBeUndefined()
  })

  it('Check if Opponent doesn\'t score, players show', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          isOpponentScore: false,
        }
      }
    })

    let playerDiv = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                 divs.classes().includes('mb-3') && 
                                                                 divs.classes().includes('fw-bold')})
    expect(playerDiv.at(0).attributes('style')).toBeUndefined()
  })
})

describe('Record Buttons - Score & Error Type', () => {
  // 用 spyOn 的方式 intercept "beforeMount" 
  // 來避免 this.$http.get() Undefined 的錯誤
  jest.spyOn(scoring, 'beforeMount').mockImplementation(() => {})
  
  it('Check Attack Scoring', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': '',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    btns.at(0).trigger('click')
    await wrapper.vm.$nextTick()
    
    // console.log(wrapper.vm.selected_button.record_type, btns.at(9).text().split('   ').at(1))
    expect(wrapper.vm.selected_button.record_type).toEqual('attackPoint')
    expect(btns.at(9).text().split('   ').at(1)).toEqual('攻擊得分')

    // console.log(btnCandidates.length)
    // for (let a = 0; a < btnCandidates.length; ++a) 
    // console.log(btnCandidates.at(a).html())
    
    // console.log(btns.length)
    // for (let a = 0; a < btns.length; ++a) 
    //   console.log(btns.at(a).text())
  })
  
  it('Check Block Scoring', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': '',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    btns.at(1).trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.selected_button.record_type).toEqual('blockPoint')
    expect(btns.at(9).text().split('   ').at(1)).toEqual('攔網得分')
  })

  it('Check Serve Scoring', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': '',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    btns.at(2).trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.selected_button.record_type).toEqual('servicePoint')
    expect(btns.at(9).text().split('   ').at(1)).toEqual('發球得分')
  })

  it('Check Attack failures', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': '',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    btns.at(3).trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.selected_button.record_type).toEqual('attackError')
    expect(btns.at(9).text().split('   ').at(1)).toEqual('攻擊失誤')
  })

  it('Check Set failures', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': '',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    btns.at(4).trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.selected_button.record_type).toEqual('tossError')
    expect(btns.at(9).text().split('   ').at(1)).toEqual('舉球失誤')
  })

  it('Check Block failures', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': '',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    btns.at(5).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected_button.record_type).toEqual('blockError')
    expect(btns.at(9).text().split('   ').at(1)).toEqual('觸網失誤')
  })

  it('Check Receive failures', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': '',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    btns.at(6).trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.selected_button.record_type).toEqual('receiveError')
    expect(btns.at(9).text().split('   ').at(1)).toEqual('接發失誤')
  })

  it('Check Serve failures', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': '',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    btns.at(7).trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.selected_button.record_type).toEqual('serviceError')
    expect(btns.at(9).text().split('   ').at(1)).toEqual('發球失誤')
  })
})

var counter = 0;
jest.spyOn(scoring.methods, 'record').mockImplementation(() => { ++counter; })
describe('Send Record Buttons - Our Score & Error', () => {
  // 用 spyOn 的方式 intercept "beforeMount" 
  // 來避免 this.$http.get() Undefined 的錯誤
  jest.spyOn(scoring, 'beforeMount').mockImplementation(() => {})
  
  it('Check Sending Attack Scoring', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '張祐誠',
            'number': 22,
            'position': 'MB',
            'record_type': 'attackPoint',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    // console.log(btns.at(9).html())
    btns.at(9).trigger('click')
    await wrapper.vm.$nextTick()

    // console.log(counter)
    expect(counter).toEqual(1)
    counter = 0;
  })
  
  it('Check Sending Block Scoring', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '張祐誠',
            'number': 22,
            'position': 'MB',
            'record_type': 'blockPoint',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    // console.log(btns.at(9).html())
    btns.at(9).trigger('click')
    await wrapper.vm.$nextTick()

    // console.log(counter)
    expect(counter).toEqual(1)
    counter = 0;
  })

  it('Check Sending Serve Scoring', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '張祐誠',
            'number': 22,
            'position': 'MB',
            'record_type': 'servicePoint',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    // console.log(btns.at(9).html())
    btns.at(9).trigger('click')
    await wrapper.vm.$nextTick()

    // console.log(counter)
    expect(counter).toEqual(1)
    counter = 0;
  })

  it('Check Sending Attack failures', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '張祐誠',
            'number': 22,
            'position': 'MB',
            'record_type': 'attackError',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    // console.log(btns.at(9).html())
    btns.at(9).trigger('click')
    await wrapper.vm.$nextTick()

    // console.log(counter)
    expect(counter).toEqual(1)
    counter = 0;
  })
  
  it('Check Sending Set failures', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '張祐誠',
            'number': 22,
            'position': 'MB',
            'record_type': 'tossError',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    // console.log(btns.at(9).html())
    btns.at(9).trigger('click')
    await wrapper.vm.$nextTick()

    // console.log(counter)
    expect(counter).toEqual(1)
    counter = 0;
  })

  it('Check Sending Block failures', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '張祐誠',
            'number': 22,
            'position': 'MB',
            'record_type': 'blockError',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    // console.log(btns.at(9).html())
    btns.at(9).trigger('click')
    await wrapper.vm.$nextTick()

    // console.log(counter)
    expect(counter).toEqual(1)
    counter = 0;
  })

  it('Check Sending Receive failures', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '張祐誠',
            'number': 22,
            'position': 'MB',
            'record_type': 'receiveError',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    // console.log(btns.at(9).html())
    btns.at(9).trigger('click')
    await wrapper.vm.$nextTick()

    // console.log(counter)
    expect(counter).toEqual(1)
    counter = 0;
  })
  
  it('Check Sending Serve failures', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: false,
          translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                              'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
                              'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
          selected_button: {
            'name': '張祐誠',
            'number': 22,
            'position': 'MB',
            'record_type': 'serviceError',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
    let btns = btnCandidates.at(1).findAll('button')
    // console.log(btns.at(9).html())
    btns.at(9).trigger('click')
    await wrapper.vm.$nextTick()

    // console.log(counter)
    expect(counter).toEqual(1)
    counter = 0;
  })
})

describe('Opponent Scores - Landing Point Selection', () => {
  // 用 spyOn 的方式 intercept "beforeMount" 
  // 來避免 this.$http.get() Undefined 的錯誤
  // var counter = 0;
  jest.spyOn(scoring, 'beforeMount').mockImplementation(() => {})

  it('Select landing point: 1', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
             
    let btns = btnCandidates.at(2).findAll('button')
    let landingIdx = 0
    btns.at(landingIdx).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected_button.landing).toEqual(landingIdx)
  })

  it('Select landing point: 2', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
             
    let btns = btnCandidates.at(2).findAll('button')
    let landingIdx = 1
    btns.at(landingIdx).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected_button.landing).toEqual(landingIdx)
  })

  it('Select landing point: 3', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
             
    let btns = btnCandidates.at(2).findAll('button')
    let landingIdx = 2
    btns.at(landingIdx).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected_button.landing).toEqual(landingIdx)
  })

  it('Select landing point: 4', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
             
    let btns = btnCandidates.at(2).findAll('button')
    let landingIdx = 3
    btns.at(landingIdx).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected_button.landing).toEqual(landingIdx)
  })

  it('Select landing point: 5', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
             
    let btns = btnCandidates.at(2).findAll('button')
    let landingIdx = 4
    btns.at(landingIdx).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected_button.landing).toEqual(landingIdx)
  })

  it('Select landing point: 6', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
             
    let btns = btnCandidates.at(2).findAll('button')
    let landingIdx = 5
    btns.at(landingIdx).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected_button.landing).toEqual(landingIdx)
  })

  it('Select landing point: 7', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
             
    let btns = btnCandidates.at(2).findAll('button')
    let landingIdx = 6
    btns.at(landingIdx).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected_button.landing).toEqual(landingIdx)
  })

  it('Select landing point: 8', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
             
    let btns = btnCandidates.at(2).findAll('button')
    let landingIdx = 7
    btns.at(landingIdx).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected_button.landing).toEqual(landingIdx)
  })

  it('Select landing point: 9', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
             
    let btns = btnCandidates.at(2).findAll('button')
    let landingIdx = 8
    btns.at(landingIdx).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected_button.landing).toEqual(landingIdx)
  })

  it('Select landing point: Touch Out', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let btnCandidates = wrapper.findAll('div').filter(divs => { return divs.classes().includes('card') &&
                                                                       divs.classes().includes('mb-3') && 
                                                                       divs.classes().includes('fw-bold')})
             
    let btns = btnCandidates.at(2).findAll('button')
    let landingIdx = 9
    btns.at(landingIdx).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected_button.landing).toEqual(landingIdx)
  })
})

describe('Opponent Scores - Info Submission', () => {
  // 用 spyOn 的方式 intercept "beforeMount" 
  // 來避免 this.$http.get() Undefined 的錯誤
  // var counter = 0;
  jest.spyOn(scoring, 'beforeMount').mockImplementation(() => {})

  it('Check Opponent Number isn\'t Number', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let input = wrapper.find('input')
    input.setValue('錯誤')
    await wrapper.vm.$nextTick()
    expect(isNaN(Number(wrapper.vm.selected_button['opponent']['num']))).toBeTruthy()
  })

  it('Check Opponent Number is Number', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let input = wrapper.find('input')
    input.setValue(86)
    await wrapper.vm.$nextTick()
    expect(isNaN(Number(wrapper.vm.selected_button['opponent']['num']))).toBeFalsy()
  })

  it('Check Opponent Position is OH', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let selects = wrapper.findAll('select')
    let options = selects.at(selects.length-1).findAll('option')

    await options.at(1).setSelected()
    
    let checkeds = wrapper.findAll('option:checked')
    expect(wrapper.vm.selected_button['opponent']['pos'].length).toBeGreaterThan(0)
    expect(wrapper.vm.selected_button['opponent']['pos']).toEqual(wrapper.find('option:checked').element.value)
  })

  it('Check Opponent Position is O', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let selects = wrapper.findAll('select')
    let options = selects.at(selects.length-1).findAll('option')

    await options.at(2).setSelected()
    
    let checkeds = wrapper.findAll('option:checked')
    expect(wrapper.vm.selected_button['opponent']['pos'].length).toBeGreaterThan(0)
    expect(wrapper.vm.selected_button['opponent']['pos']).toEqual(wrapper.find('option:checked').element.value)
  })

  it('Check Opponent Position is MB', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let selects = wrapper.findAll('select')
    let options = selects.at(selects.length-1).findAll('option')

    await options.at(3).setSelected()
    
    let checkeds = wrapper.findAll('option:checked')
    expect(wrapper.vm.selected_button['opponent']['pos'].length).toBeGreaterThan(0)
    expect(wrapper.vm.selected_button['opponent']['pos']).toEqual(wrapper.find('option:checked').element.value)
  })

  it('Check Opponent Position is S', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let selects = wrapper.findAll('select')
    let options = selects.at(selects.length-1).findAll('option')

    await options.at(4).setSelected()
    
    let checkeds = wrapper.findAll('option:checked')
    expect(wrapper.vm.selected_button['opponent']['pos'].length).toBeGreaterThan(0)
    expect(wrapper.vm.selected_button['opponent']['pos']).toEqual(wrapper.find('option:checked').element.value)
  })

  it('Check Opponent Position is L', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let selects = wrapper.findAll('select')
    let options = selects.at(selects.length-1).findAll('option')

    await options.at(5).setSelected()
    
    let checkeds = wrapper.findAll('option:checked')
    expect(wrapper.vm.selected_button['opponent']['pos'].length).toBeGreaterThan(0)
    expect(wrapper.vm.selected_button['opponent']['pos']).toEqual(wrapper.find('option:checked').element.value)
  })




})

describe('Send Record Buttons - Opponent Score', () => {
  // 用 spyOn 的方式 intercept "beforeMount" 
  // 來避免 this.$http.get() Undefined 的錯誤
  jest.spyOn(scoring, 'beforeMount').mockImplementation(() => {})

  it('Cancel Button', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': -1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': -1, 'pos': ''},
            'game': this.cur_game
          }
        }
      }
    })

    let cancekBtnCandidates = wrapper.findAll('button').filter(divs => { return divs.text() == '取消' })
    let btn = cancekBtnCandidates.at(2)
    // let landingIdx = 9
    btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isOpponentScore).toBeFalsy()
    expect(wrapper.vm.selected_button.record_type).toEqual('')
  })

  it('Check Sending Record on Landing Point: 1', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          positions: ['OH', 'O', 'MB', 'S', 'L'],
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': 0,  // 依照 placement 的 index (0~9)
            'opponent': {'num': 25, 'pos': 'MB'},
            'game': this.cur_game
          }
        }
      }
    })

    let cancekBtnCandidates = wrapper.findAll('button').filter(divs => { return divs.text() == '送出' })
    let btn = cancekBtnCandidates.at(0)

    counter = 0
    btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(counter).toEqual(1)
  })

  it('Check Sending Record on Landing Point: 2', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          positions: ['OH', 'O', 'MB', 'S', 'L'],
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': 1,  // 依照 placement 的 index (0~9)
            'opponent': {'num': 25, 'pos': 'MB'},
            'game': this.cur_game
          }
        }
      }
    })

    let cancekBtnCandidates = wrapper.findAll('button').filter(divs => { return divs.text() == '送出' })
    let btn = cancekBtnCandidates.at(0)

    counter = 0
    btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(counter).toEqual(1)
  })

  it('Check Sending Record on Landing Point: 3', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          positions: ['OH', 'O', 'MB', 'S', 'L'],
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': 2,  // 依照 placement 的 index (0~9)
            'opponent': {'num': 25, 'pos': 'MB'},
            'game': this.cur_game
          }
        }
      }
    })

    let cancekBtnCandidates = wrapper.findAll('button').filter(divs => { return divs.text() == '送出' })
    let btn = cancekBtnCandidates.at(0)

    counter = 0
    btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(counter).toEqual(1)
  })

  it('Check Sending Record on Landing Point: 4', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          positions: ['OH', 'O', 'MB', 'S', 'L'],
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': 3,  // 依照 placement 的 index (0~9)
            'opponent': {'num': 25, 'pos': 'MB'},
            'game': this.cur_game
          }
        }
      }
    })

    let cancekBtnCandidates = wrapper.findAll('button').filter(divs => { return divs.text() == '送出' })
    let btn = cancekBtnCandidates.at(0)

    counter = 0
    btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(counter).toEqual(1)
  })

  it('Check Sending Record on Landing Point: 5', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          positions: ['OH', 'O', 'MB', 'S', 'L'],
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': 4,  // 依照 placement 的 index (0~9)
            'opponent': {'num': 25, 'pos': 'MB'},
            'game': this.cur_game
          }
        }
      }
    })

    let cancekBtnCandidates = wrapper.findAll('button').filter(divs => { return divs.text() == '送出' })
    let btn = cancekBtnCandidates.at(0)

    counter = 0
    btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(counter).toEqual(1)
  })

  it('Check Sending Record on Landing Point: 6', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          positions: ['OH', 'O', 'MB', 'S', 'L'],
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': 5,  // 依照 placement 的 index (0~9)
            'opponent': {'num': 25, 'pos': 'MB'},
            'game': this.cur_game
          }
        }
      }
    })

    let cancekBtnCandidates = wrapper.findAll('button').filter(divs => { return divs.text() == '送出' })
    let btn = cancekBtnCandidates.at(0)

    counter = 0
    btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(counter).toEqual(1)
  })

  it('Check Sending Record on Landing Point: 7', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          positions: ['OH', 'O', 'MB', 'S', 'L'],
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': 6,  // 依照 placement 的 index (0~9)
            'opponent': {'num': 25, 'pos': 'MB'},
            'game': this.cur_game
          }
        }
      }
    })

    let cancekBtnCandidates = wrapper.findAll('button').filter(divs => { return divs.text() == '送出' })
    let btn = cancekBtnCandidates.at(0)

    counter = 0
    btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(counter).toEqual(1)
  })

  it('Check Sending Record on Landing Point: 8', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          positions: ['OH', 'O', 'MB', 'S', 'L'],
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': 7,  // 依照 placement 的 index (0~9)
            'opponent': {'num': 25, 'pos': 'MB'},
            'game': this.cur_game
          }
        }
      }
    })

    let cancekBtnCandidates = wrapper.findAll('button').filter(divs => { return divs.text() == '送出' })
    let btn = cancekBtnCandidates.at(0)

    counter = 0
    btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(counter).toEqual(1)
  })

  it('Check Sending Record on Landing Point: 9', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          positions: ['OH', 'O', 'MB', 'S', 'L'],
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': 8,  // 依照 placement 的 index (0~9)
            'opponent': {'num': 25, 'pos': 'MB'},
            'game': this.cur_game
          }
        }
      }
    })

    let cancekBtnCandidates = wrapper.findAll('button').filter(divs => { return divs.text() == '送出' })
    let btn = cancekBtnCandidates.at(0)

    counter = 0
    btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(counter).toEqual(1)
  })

  it('Check Sending Record on Landing Point: Touch Out', async () => {
    const wrapper = mount(scoring, {
      stubs: ['router-link', 'router-view'], 
      attachTo: document.body, // for testing modal
      mocks: {
        $router: mockRouter,
        $route: mockRoute
      },
      data() {
        return {
          cur_game: 1,
          isOpponentScore: true,
          positions: ['OH', 'O', 'MB', 'S', 'L'],
          selected_button: {
            'name': '',
            'number': -1,
            'position': '',
            'record_type': 'oppoScore',
            'landing': 9,  // 依照 placement 的 index (0~9)
            'opponent': {'num': 25, 'pos': 'MB'},
            'game': this.cur_game
          }
        }
      }
    })

    let cancekBtnCandidates = wrapper.findAll('button').filter(divs => { return divs.text() == '送出' })
    let btn = cancekBtnCandidates.at(0)

    counter = 0
    btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(counter).toEqual(1)
  })

})