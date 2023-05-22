import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import login from '@/views/login.vue'


describe('login.vue', () => {
    
    it('Call loginRequest method', () => {
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

  
    })
  })
  

// describe('scoring.vue', () => {
//   it('Single Record', () => {
// 		// mock the Router
//     const mockRouter = {
//       push: jest.fn()
//     }
	  
// 		// mock the Route
//     const mockRoute = {
//       params: {
//         teamid: '-NTd4gODlBQPL9Na1VYr',
//         contestid: '-NTdKbOPAh9F89udkTNB'
//       }
//     }
		
// 		// 用 spyOn 的方式 intercept "beforeMount" 
// 		// 來避免 this.$http.get() Undefined 的錯誤
//     jest.spyOn(scoring, 'beforeMount').mockImplementation(() => {
//       console.log('jest.spyOn()')
//     })

//     const wrapper = mount(scoring, {
//       stubs: ['router-link', 'router-view'], 
//       mocks: {
//         $router: mockRouter,
//         $route: mockRoute
//       },
//       data() {
//         return {
//           cur_game: 1,
//           id: this.uid,
//           teamid: this.$route.params.teamid,
//           contestid: this.$route.params.contestid,
//           db: 'https://volleague-default-rtdb.firebaseio.com/',
//           users: {
//             // 'uid': {
//             //   StatisticsList: [''],
//             //   authid: '',
//             //   birthday: {},
//             //   name: {},
//             //   position: [],
//             //   teamList: []
//             // }
//           },
//           contestInfo: {
//             contest: '成功盃',
//             date: '',
//             games: [],
//             opponent: '',
//             score: '',
//             gameScore: '',
//             onCourtMem: '',
//             localRecordsRaw: [''],
//             localRecords: ['']
//           },
//           teamInfo:{
//             teamName: '',
//             bulletin: '',
//             awards: [''],
//             members: [],  // name, number, position, uid
//             contestRecords: [{
//               contest: '成功盃',
//               date: '',
//               gameScore: '',
//               key: '',
//               opponent: ''
//             }],
//           },
//           isGameOver: false,
//           isNextGame: false,
//           isCourtMemSet: false, // bind to court member section
//           isOpponentScore: false, // bind to button, '對方得分'
//           positions: ['OH', 'O', 'MB', 'S', 'L'],
//           translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
//                           'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '觸網失誤',
//                           'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
//           translateType2Eng: {'攻擊得分': 'attackPoint', '攔網得分': 'blockPoint','發球得分': 'servicePoint',
//                           '攻擊失誤': 'attackError', '舉球失誤': 'tossError', '觸網失誤': 'blockError',
//                           '接發失誤': 'receiveError', '發球失誤': 'serviceError', '對方得分': 'oppoScore'},
//           records_pushed_raw: [{
//             'ourTeam': {},
//             'placement': [[''], [''], [''], [''], [''], [''], [''], [''], [''], ['']]
//           }],
//           // records_pushed_raw: [
//           //   {
//           //     'ourTeam': {
//           //       '蘇名偉': {name: '蘇名偉', pos: 'OH', number: '27',
//           //                 attackPoint: 1, blockPoint: 0, servicePoint: 0,
//           //                 attackError: 0, tossError: 0, blockError: 0,
//           //                 receiveError: 0, serviceError: 0 },
//           //       'Test7': {name: 'Test7', pos: 'L', number: '88',
//           //                 attackPoint: 0, blockPoint: 0, servicePoint: 0,
//           //                 attackError: 0, tossError: 0, blockError: 1,
//           //                 receiveError: 0, serviceError: 0 },
//           //     }, 
//           //     'placement': [[''], [''], [{'num': 2, 'pos': 'S'}], [''], [''], [''], [''], [''], [''], ['']] // 0~8: 1~9 九號位置 ; 9: touch out
//           //   }
//           // ],
//           // landing: 呈現在表格 --> 1~9 + touch-out
//           records_local: [],
//           // records_local: [{'num': 88, 'name': 'Test7', 'position': 'L', 'record_type': '攻擊得分', 'landing': -1, 'game': 1},
//           //                 {'num': 27, 'name': '蘇名偉', 'position': 'OH', 'record_type': '攔網失誤', 'landing': -1, 'game': 1},
//           //                 {'num': 2, 'name': 'NCKU EE', 'position': 'S', 'record_type': '對方得分', 'landing': 3, 'game': 1}],
//           scoring: {
//             host: {'name': '', 'winned_game': 0, 'cur_score': 0},
//             opponent: {'name': '', 'winned_game': 0, 'cur_score': 0}
//           },
//           selected_button: {
//             'name': '',
//             'number': -1,
//             'position': '',
//             'record_type': '',
//             'landing': -1,  // 依照 placement 的 index (0~9)
//             'opponent': {'num': -1, 'pos': ''},
//             'game': this.cur_game
//           },
//           selected_members: [{}, {}, {}, {}, {}, {}, {}],     // e.g.:) {'name': '張祐誠', 'number': 22, 'position': 'MB'}
//         }
//       }
//     })

//     console.log(wrapper.vm.$route.params.teamid)
//   })

// })

