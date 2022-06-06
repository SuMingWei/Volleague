<template>
  <div>
    <div class="card text-center border-0">
      <!-- 返回按鈕 -->
      <div class="d-flex align-items-center text-start mx-3 my-3 justify-content-between">
        <!-- <router-link :to="`/home/${uid}/team/${teamid}`"  class="btn btn-outline-dark">
          <p v-on:click="storeLocalData()" class="mb-0 d-flex align-items-center">
            返回頁面
          </p>
        </router-link> -->
        <router-link :to="`/home/${uid}/team/${teamid}`" class="btn d-flex align-items-center fs-5 px-0" style="color:#2c3e50">
          <p v-on:click="storeLocalData()" class="mb-0 d-flex align-items-center">
            <i class="fa-solid fa-angle-left fs-2" style="color:#495057;"></i>&nbsp;返回
          </p>
        </router-link>
        <div class="text-center">
          <p class="mb-0 fs-5 fw-bolder">{{contestInfo.contest}}</p>
          <p class="mb-0 fw-bold">{{contestInfo.date}}</p>
        </div>
        <router-link :to="`/home/${uid}/team/${teamid}/record/${contestid}`" class="btn btn-outline-success">
          <span>
            分析
          </span>
        </router-link>
        <!-- <router-link :to="`/home/${uid}/team/${teamid}/record/${contestid}`" class="btn d-flex align-items-center fs-5 px-0" style="color:#2c3e50">
          <span class="mb-0 d-flex align-items-center text-success">
            分析&nbsp;<i class="fa-solid fa-angle-right fs-2"></i>
          </span>
        </router-link> -->
      </div>

      <!-- 計分表 -->
      <div class="card-body py-2 mx-0">
        <div class="card" style="border: none">
          <!-- 隊伍 & 局數 & 分數 -->
          <div class="d-grid score-board text-center">
            <div class="d-grid scores text-center">
              <!-- 我方 -->
              <button class="btn btn-sm btn-primary fw-bolder" style="background-color: #e76f51; border: none;"> {{ scoring['host']['name'] }} </button>
              <span class="justify-content-center d-flex align-items-center mx-1 my-1" style="color: #e76f51; font-weight: bolder"> {{ scoring['host']['winned_game'] }} </span>
              <span class="justify-content-center d-flex align-items-center mx-1 my-1" style="color: #e76f51; font-weight: bolder"> {{ scoring['host']['cur_score'] }} </span>
              <!-- 敵方: 兩個顏色可以選 #219ebc(水藍) 和 #2a9d8f(藍綠) -->
              <button class="btn btn-sm btn-primary fw-bolder" style=";background-color: #2a9d8f; border: none;"> {{ scoring['opponent']['name'] }} </button>
              <span class="justify-content-center d-flex align-items-center mx-1 my-1" style="color: #2a9d8f; font-weight: bolder"> {{ scoring['opponent']['winned_game'] }} </span>
              <span class="justify-content-center d-flex align-items-center mx-1 my-1" style="color: #2a9d8f; font-weight: bolder"> {{ scoring['opponent']['cur_score'] }} </span>
            </div>

            <!-- 下一局 & 結束比賽 -->
            <div class="d-grid round-controls text-center">
              <button :disabled="!checkNextGame()" class="btn btn-sm btn-outline-dark" style="color: #888; border-color: #888" v-on:click="nextGame(false)">
                下一局
              </button>
              <button :disabled="!checkEndGame()" class="btn btn-sm btn-outline-dark" style="color: #888; border-color: #888"
                      data-bs-toggle="modal" data-bs-target="#endGameCheck">結束比賽</button>
            </div>

            <!-- 結束比賽的的 modal -->
            <div class="modal fade" id="endGameCheck" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="endGameCheckLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="endGameCheckLabel">確定要結束比賽嗎？</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    若要確定要結束，請按<span style="text-weight: bold; color: red">「確認」</span><pre/>
                    若否，請按<span style="text-weight: bold; color: red">「取消」</span>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <router-link :to="`/home/${uid}/team/${teamid}`" class="btn d-flex align-items-center fs-5" style="color:#2c3e50" >
                      <span class="btn btn-primary" v-on:click="endGame(true)" data-bs-dismiss="modal">
                        確定
                      </span>
                    </router-link>
                    <!-- <button type="button" v-on:click="endGame(true)" data-bs-dismiss="modal">
                      確定
                    </button> -->
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <!-- 如果比賽已經結束 -->
      <div v-if="isGameOver">
        <div class="card-body py-3 mx-0">
          <div class="p-2 d-flex align-items-center justify-content-center border" style="border-radius: 5px">
            <p class="my-2 text-secondary">比賽已經結束了喔！</p>
          </div>
        </div> 
      </div>
      <!-- 比賽還沒結束 -->
      <div v-else>
        <!-- 分頁標籤 -->
        <ul class="nav nav-tabs" id="myTab" role="tablist" style="margin: 1em 1em 0 1em;">
          <li class="nav-item" role="presentation">
            <button class="nav-link active fw-bold" id="record-tab" data-bs-toggle="tab" data-bs-target="#record-tab-pane" type="button" role="tab" aria-controls="record-tab-pane" aria-selected="true">記錄選項</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold" id="history-tab" data-bs-toggle="tab" data-bs-target="#history-tab-pane" type="button" role="tab" aria-controls="history-tab-pane" aria-selected="false">歷史記錄</button>
          </li>
        </ul>
        <!-- 分頁標籤內容 -->
        <div class="tab-content border border-1 border-top-0" id="myTabContent" style="margin: 0em 1em 1em 1em;">
          <!-- 紀錄選項 -->
          <div class="tab-pane fade show active" id="record-tab-pane" role="tabpanel" aria-labelledby="record-tab" tabindex="0">
            <div class="card-body"> 
              <!-- 上場球員 -->
              <div v-show="!isOpponentScore" class="card mb-3 fw-bold">
                <!-- card 標題 -->
                <div class="card-head py-2" style="background-color:#E5E8E8">
                  <span class="fw-bolder fs-5">
                    <i class="fa-solid fa-people-group"></i> 上場球員
                  </span>
                </div>
                <!-- card 內容 -->
                <div class="card-body text-center" style="padding: 0.5em 0.5em !important">
                  <!-- 已經設定過上場人員 -->
                  <div v-if="this.isCourtMemSet" class="d-grid team-members-grid">
                    <!-- 上場人員九宮格 -->
                    <button v-for="(member, index) in selected_members" :key="index" type="button" class="btn btn-outline-secondary team-member" 
                            v-bind:style="[ index == 6 ? {gridColumnStart: 2} : {} ]"
                            v-on:click="selected_button['name'] = member['name']; selected_button['number'] = member['number']; selected_button['position'] = member['position']">
                      <span :class="setPositionTag(member)" style="width:35px; font-size:70%">{{ member['number'] }}</span>
                      <br><span style="font-size:100%">{{ member['name'] }}</span>
                    </button>

                    <!-- 開啟 modal -->
                    <div class="d-block d-flex align-items-middle justify-content-end" style="grid-column-start: 3; grid-row-start: 3">
                      <button class="btn text-black-50 mx-1 my-1" data-bs-toggle="modal" data-bs-target="#setCourtMemModal">
                        <i class="fa-solid fa-pencil fs-5"></i>
                      </button>
                    </div>
                  </div>

                  <!-- 沒有設定過上場人員（初始化） -->
                  <div v-else>
                    <div class="d-block text-center">
                      <button class="btn btn-outline-secondary text-black-50 mx-1 my-1" data-bs-toggle="modal" data-bs-target="#setCourtMemModal">
                        按我來選擇上場的人員
                      </button>
                    </div>

                  </div>
                  
                  <!-- 編輯上場人員的 modal -->
                  <div class="modal fade" id="setCourtMemModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="setCourtMemModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="setCourtMemModalLabel">選擇上場人員</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
                          <!-- quickly set on-court members -->
                          <button v-on:click="setCourtMem()" class="py-1">設定上場人員</button>
                          <button v-on:click="checkSetCourtMem()">Test Check</button>
                          <!-- <button v-on:click="setCourtMem()">Set Court Member</button> -->
                          <div class="d-grid mx-1 my-1 team-members-grid">
                            <div v-for="n in 7" :key="n" v-bind:style="[ n == 7 ? {gridColumnStart: 2} : {} ]">
                              <select class="form-select text-center"  v-model="selected_members[n-1]">
                                <option selected>
                                  <p v-if="n != 7">人員 {{ n }}</p>
                                  <p v-else>自由</p>
                                </option>
                                <option v-for="(item, index) in teamInfo.members" :key="index" :value="item"> 
                                  <p>{{ item['number'] }} | {{ item['name'] }} | {{ item['position'] }}</p>
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                          <button type="button" class="btn btn-primary" v-on:click="checkSetCourtMem()" data-bs-dismiss="modal">確認</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              
              <!-- 各球記錄 -->
              <div class="card mb-3 fw-bold">
                <!-- 標題 -->
                <div class="card-head py-2" style="background-color:#E5E8E8">
                  <span class="fw-bolder fs-5">
                    <i class="far fa-clipboard"></i> 各球記錄
                  </span>
                </div>

                <!-- 十個按鈕 -->
                <div class="card-body text-center">
                  <div class="d-grid" style="grid-template-rows: 3fr 1fr; row-gap: 15px">
                    <!-- 九個得失分按鈕 -->
                    <!-- <div class="d-grid" style="grid-template-rows: 2fr 1fr; gap: 5px"> -->
                      <div class="d-grid" style="grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 1fr 1fr; gap: 5px 5px">
                        <!-- <span class="d-flex align-items-center justify-content-center" style="grid-column-start:2">
                          得分
                        </span> -->
                        <!-- 得分 -->
                        <button type="button" class="btn btn-outline-secondary"
                                style="background-color: #95a5a6; border-color: #95a5a6; color: #FFF; font-size: 85%"
                                v-on:click="selected_button['record_type'] = 'attackPoint'">
                                攻擊得分
                        </button>
                        <button type="button" class="btn btn-outline-secondary"
                                style="background-color: #95a5a6; border-color: #95a5a6; color: #FFF; font-size: 85%"
                                v-on:click="selected_button['record_type'] = 'blockPoint'">
                                攔網得分
                        </button>
                        <button type="button" class="btn btn-outline-secondary"
                                style="background-color: #95a5a6; border-color: #95a5a6; color: #FFF; font-size: 85%"
                                v-on:click="selected_button['record_type'] = 'servicePoint'">
                                發球得分
                        </button>

                        <!-- <span class="d-flex align-items-center justify-content-center" style="grid-column-start:2">
                          失誤
                        </span> -->
                        <!-- 失誤 & 失分 -->
                        <button type="button" class="btn btn-outline-secondary"
                                style="background-color: #515a5a; border-color: #515a5a; color: #FFF; font-size: 85%;"
                                v-on:click="selected_button['record_type'] = 'attackError'">
                                攻擊失誤
                        </button>
                        <button type="button" class="btn btn-outline-secondary"
                                style="background-color: #515a5a; border-color: #515a5a; color: #FFF; font-size: 85%;"
                                v-on:click="selected_button['record_type'] = 'tossError'">
                                舉球失誤
                        </button>
                        <button type="button" class="btn btn-outline-secondary"
                                style="background-color: #515a5a; border-color: #515a5a; color: #FFF; font-size: 85%;"
                                v-on:click="selected_button['record_type'] = 'blockError'">
                                觸網失誤
                        </button>
                      <!-- </div> -->
                      <!-- <div class="d-grid" style="grid-template-columns: 1fr 1fr;; grid-template-rows: 1fr; gap: 5px"> -->
                        <button type="button" class="btn btn-outline-secondary"
                                style="background-color: #515a5a; border-color: #515a5a; color: #FFF; font-size: 85%;"
                                v-on:click="selected_button['record_type'] = 'receiveError'">
                                接發失誤
                        </button>
                        <button type="button" class="btn btn-outline-secondary"
                                style="background-color: #515a5a; border-color: #515a5a; color: #FFF; font-size: 85%;"
                                v-on:click="selected_button['record_type'] = 'serviceError'">
                                發球失誤
                        </button>
                        <button type="button" class="btn btn-outline-secondary"
                                style="background-color: #515a5a; border-color: #515a5a; color: #FFF; font-size: 85%;"
                                v-on:click="clearSelected(); selected_button['record_type'] = 'oppoScore'; isOpponentScore = true">
                                對方得分
                      </button>
                      </div>
                    <!-- </div> -->
                      
                    <!-- 送出按鈕 -->
                    <div class="d-grid" style="grid-template-columns: 1fr; gap: 5px">
                      <!-- <button type="button" class="btn btn-outline-secondary"
                              style="background-color: #f08080; border-color: #f08080; color: #FFF; font-size: 85%; grid-column-start:2"
                              v-on:click="clearSelected();">
                              取消
                      </button> -->
                      <button type="button" class="btn btn-outline-secondary"
                              style="background-color: #90be6d; border-color: #90be6d; color: #FFF; font-size: 85%; grid-column-start:1"
                              v-on:click="record('upper')">
                              <!-- <span>送出紀錄</span> -->
                              <span v-if="selected_button.name == '' && selected_button.record_type == ''">送出紀錄</span>
                              <span v-else>送出：</span>
                              
                              <span v-if="selected_button.name != ''">{{ this.selected_button.name }} </span>
                              <span v-if="selected_button.record_type != ''"> {{ this.translateType2Man[this.selected_button.record_type] }}</span>
                      </button>
                      <!-- 對方得分：用於記錄落點 -->
                    </div>
                  </div>
                </div>
              </div>

              <!-- 落點記錄 -->
              <div v-if="isOpponentScore" class="card mb-3 fw-bolds">
                <!-- 標題 -->
                <div class="card-head py-2" style="background-color:#E5E8E8">
                  <span class="fw-bolder fs-5">
                    <i class="fas fa-volleyball-ball"></i> 落點記錄
                  </span>
                </div>

                <!-- 場地九宮格 & 下方控制項 -->
                <div class="card-body">
                  <!-- 場地九宮格 -->
                  <div class="container border border-2 border-dark" style="width: 272px; height: 272px">
                    <div class="row border-bottom border-2 border-dark" style="width: 270px">
                      <div  v-for="n in 3" :key="n" class="d-flex col landing-spots" style="height: 90px" 
                            v-on:click="selected_button['landing'] = n-1">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> {{ n }} </button>
                      </div>
                    </div>
                    <div class="row border-bottom border-2 border-dark-80" style="width: 270px">
                      <div  v-for="n in 3" :key="n" class="d-flex col landing-spots" style="height: 90px"
                            v-on:click="selected_button['landing'] = (n-1+3)">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> {{ n+3 }} </button>
                      </div>
                    </div>
                    <div class="row" style="width: 270px">
                      <div  v-for="n in 3" :key="n" class="d-flex col landing-spots" style="height: 90px"
                            v-on:click="selected_button['landing'] = (n-1+6)">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> {{ n+6 }} </button>
                      </div>
                    </div>
                  </div>

                  <!-- 右邊控制項 & 界外按鈕 -->
                  <div class="d-grid" style="grid-template-columns: 1fr 2fr; column-gap: 5px; width: 272px; margin: auto auto">
                    <!-- 界外按鈕 -->
                    <div class="landing-spots">
                      <button type="button" class="btn btn-outline-secondary" style="padding: auto auto; height: 80px; width: 80px"
                              v-on:click="selected_button['landing'] = 9"> 
                        Touch Out
                      </button>
                    </div>
                    <!-- 右邊控制項 -->
                    <div class="d-grid text-center" style="grid-template-rows: 1.75fr 1fr">
                      <div class="d-grid" style="grid-template-rows: 0.75fr 1fr; grid-template-columns: 1fr 1fr">
                        <p class="" style="margin: auto auto">敵方背號</p>
                        <p class="" style="margin: auto auto">敵方位置</p>
                        <input type="text" v-model="selected_button['opponent']['num']" size="1" class="mx-1 my-1">
                        <select class="form-select text-center mx-1 my-1" style="min-width: auto"  v-model="selected_button['opponent']['pos']">
                          <option selected> 選擇位置</option>
                          <option v-for="(item, index) in positions" :key="index" :value="item"> 
                            <p> {{ item }} </p>
                          </option>
                        </select>
                      </div>
                      <div class="d-grid" style="grid-template-columns: 1fr 1fr">
                        <button type="button" class="btn btn-outline-secondary mx-1 my-1"
                                style="background-color: #f08080; border-color: #f08080 !important; color: #FFF"
                                v-on:click="isOpponentScore = false; clearSelected()"> 
                              取消
                        </button>
                        <button type="button" class="btn btn-outline-secondary mx-1 my-1"
                                style="background-color: #90be6d; border-color: #90be6d !important; color: #FFF"
                                v-on:click="record('lower')"> 
                              送出
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 本局歷史記錄 -->
          <div class="tab-pane fade" id="history-tab-pane" role="tabpanel" aria-labelledby="history-tab" tabindex="0">
            <!-- 位置與標記的對應 -->
            <div class="mt-3">
              <span class="fw-bold">位置：</span>
              <span class="badge bg-primary text-wrapm mx-1" style="width:35px">OP</span>
              <span class="badge bg-secondary text-wrapm mx-1" style="width:35px">L</span>
              <span class="badge bg-danger text-wrapm mx-1" style="width:35px">OH</span>
              <span class="badge bg-warning text-wrapm mx-1" style="width:35px">MB</span>
              <span class="badge bg-success text-wrapm mx-1" style="width:35px">S</span>
            </div>

            <!-- 表格 -->
            <div class="table-responsive-md mx-2 my-3 fw-bold text-center" style="max-height:400px">
              <table class="table table-striped align-middle text-nowrap">
                <thead class="sticky-top">
                  <tr style="background-color:#2c3e50; color:white">
                    <th scope="col" style="">球員</th>
                    <th scope="col" style="" >內容</th>
                    <th scope="col">落點</th>
                    <th scope="col">局數</th>
                    <th scope="col">功能</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(record, index) in records_local" :key="index">
                    <td class="" style="">
                      <div class="col-auto d-flex align-items-center">
                        <span :class="setPositionTag(record)" style="width:35px"> {{ record['num'] }} </span>
                        <span class="text-nowrap"> {{ record['name'] }} </span>
                      </div>
                    </td>
                    <td class="border-start" style=""> {{ record['record_type'] }} </td>
                    <td class="border-start"> 
                      <span v-if="record['landing'] == 10">Touch Out</span>
                      <span v-else-if="record['landing'] != -1">{{ record['landing'] }}</span>
                      <span v-else>X</span>
                    </td>
                    <td class="border-start"> {{ record['game'] }} </td>
                    <td class="border-start"> 
                      <button style="border-color: red; border-style: solid; border-radius: 20%"
                              v-on:click="deleteLocalRecord(record)">
                        <i class="fas fa-trash-alt" style="color: red"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ['uid'],
  data() {
    return {
      cur_game: 1,
      id: this.uid,
      teamid: this.$route.params.teamid,
      contestid: this.$route.params.contestid,
      db: 'https://volleague-default-rtdb.firebaseio.com/',
      users: {
        // 'uid': {
        //   StatisticsList: [''],
        //   authid: '',
        //   birthday: {},
        //   name: {},
        //   position: [],
        //   teamList: []
        // }
      },
      contestInfo: {
        contest: '',
        date: '',
        games: [],
        opponent: '',
        score: '',
        gameScore: '',
        onCourtMem: '',
        localRecordsRaw: [''],
        localRecords: ['']
      },
      teamInfo:{
        teamName: '',
        bulletin: '',
        awards: [''],
        members: [],  // name, number, position, uid
        contestRecords: [{
          contest: '',
          date: '',
          gameScore: '',
          key: '',
          opponent: ''
        }],
      },
      isGameOver: false,
      isCourtMemSet: false, // bind to court member section
      isOpponentScore: false, // bind to button, '對方得分'
      positions: ['OH', 'O', 'MB', 'S', 'L'],
      translateType2Man: {'attackPoint': '攻擊得分', 'blockPoint': '攔網得分','servicePoint': '發球得分',
                      'attackError': '攻擊失誤', 'tossError': '舉球失誤', 'blockError': '攔網失誤',
                      'receiveError': '接發失誤', 'serviceError': '發球失誤', 'oppoScore': '對方得分'},
      translateType2Eng: {'攻擊得分': 'attackPoint', '攔網得分': 'blockPoint','發球得分': 'servicePoint',
                      '攻擊失誤': 'attackError', '舉球失誤': 'tossError', '攔網失誤': 'blockError',
                      '接發失誤': 'receiveError', '發球失誤': 'serviceError', '對方得分': 'oppoScore'},
      records_pushed_raw: [{
        'ourTeam': {},
        'placement': [[''], [''], [''], [''], [''], [''], [''], [''], [''], ['']]
      }],
      // records_pushed_raw: [
      //   {
      //     'ourTeam': {
      //       '蘇名偉': {name: '蘇名偉', pos: 'OH', number: '27',
      //                 attackPoint: 1, blockPoint: 0, servicePoint: 0,
      //                 attackError: 0, tossError: 0, blockError: 0,
      //                 receiveError: 0, serviceError: 0 },
      //       'Test7': {name: 'Test7', pos: 'L', number: '88',
      //                 attackPoint: 0, blockPoint: 0, servicePoint: 0,
      //                 attackError: 0, tossError: 0, blockError: 1,
      //                 receiveError: 0, serviceError: 0 },
      //     }, 
      //     'placement': [[''], [''], [{'num': 2, 'pos': 'S'}], [''], [''], [''], [''], [''], [''], ['']] // 0~8: 1~9 九號位置 ; 9: touch out
      //   }
      // ],
      // landing: 呈現在表格 --> 1~9 + touch-out
      records_local: [],
      // records_local: [{'num': 88, 'name': 'Test7', 'position': 'L', 'record_type': '攻擊得分', 'landing': -1, 'game': 1},
      //                 {'num': 27, 'name': '蘇名偉', 'position': 'OH', 'record_type': '攔網失誤', 'landing': -1, 'game': 1},
      //                 {'num': 2, 'name': 'NCKU EE', 'position': 'S', 'record_type': '對方得分', 'landing': 3, 'game': 1}],
      scoring: {
        host: {'name': '', 'winned_game': 0, 'cur_score': 0},
        opponent: {'name': '', 'winned_game': 0, 'cur_score': 0}
      },
      selected_button: {
        'name': '',
        'number': -1,
        'position': '',
        'record_type': '',
        'landing': -1,  // 依照 placement 的 index (0~9)
        'opponent': {'num': -1, 'pos': ''},
        'game': this.cur_game
      },
      selected_members: [{}, {}, {}, {}, {}, {}, {}],     // e.g.:) {'name': '張祐誠', 'number': 22, 'position': 'MB'}
    }
  },
  beforeMount(){
    // console.log(this.teamid);
    // get teamInfo & memberStatisticList
    this.$http.get(this.db + 'team/' + this.teamid + '.json').then(function(data){
      return data.json();
    }).then(function(data){
      this.teamInfo = data;
      console.log('[beforeMount] this.teamInfo = ', this.teamInfo);
      this.scoring.host.name = this.teamInfo.teamName;

      this.$http.get(this.db + 'user.json').then(function(NumData) {
        return NumData.json();
      }).then(function(NumDataJsoned) {
        this.users = NumDataJsoned;
        console.log('[beforeMount] this.users = ', this.users);
        for (let user of Object.entries(this.users)) {
          user[1].StatisticsList.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
          }).reverse();
        }
      });
    })
    
    // get contestInfo
    this.$http.get(this.db + 'contest/' + this.contestid + '.json').then(function(data) {
        return data.json();
      }).then(function(data) {
        this.contestInfo = data;
        this.scoring.opponent.name = this.contestInfo.opponent;
        this.scoring.host.cur_score = parseInt(this.contestInfo.score.split(':')[0]);
        this.scoring.host.winned_game = parseInt(this.contestInfo.gameScore.split(':')[0]);
        this.scoring.opponent.cur_score = parseInt(this.contestInfo.score.split(':')[1]);
        this.scoring.opponent.winned_game = parseInt(this.contestInfo.gameScore.split(':')[1]);

        this.cur_game = this.scoring.host.winned_game + this.scoring.opponent.winned_game + 1;

        if (typeof this.contestInfo.onCourtMem == 'string')
          this.selected_members = [{}, {}, {}, {}, {}, {}, {}];
        else {
          this.selected_members = this.contestInfo.onCourtMem;
          this.isCourtMemSet = true;
        }

        // empty localRecordsRaw = ['']
        if (this.contestInfo.localRecordsRaw[0] == '') {
          this.records_pushed_raw = [{
            'ourTeam': {},
            'placement': [[''], [''], [''], [''], [''], [''], [''], [''], [''], ['']]
          }]
        } else {
          if (this.contestInfo.localRecordsRaw[this.cur_game-1].ourTeam[0] == '')
            this.contestInfo.localRecordsRaw[this.cur_game-1].ourTeam = {};

          this.records_pushed_raw = this.contestInfo.localRecordsRaw;
        }

        // check if game over
        console.log('[beforeMount] check = ', this.contestInfo.games.length, this.cur_game, this.contestInfo.games.length < this.cur_game);
        if (this.contestInfo.games.length < this.cur_game) 
          this.isGameOver = true;

        console.log('[beforeMount] localRecordsRaw', this.contestInfo, this.contestInfo.localRecordsRaw, typeof this.contestInfo.localRecordsRaw);
        console.log('[beforeMount] records_pushed_raw', this.records_pushed_raw, this.records_pushed_raw, typeof this.records_pushed_raw);
      });
  
    // get local_records
    this.$http.get(this.db + 'contest/' + this.contestid + '/localRecords.json').then(function(data) {
      return data.json();
    }).then(function(data) {
      // empty localRecords = ['']
      if (data[0] == '')
        this.records_local = [];
      else
        this.records_local = data;

      console.log('[beforeMount] records_local = ', typeof data, typeof this.records_local, this.records_local, this.records_local == null);
    });
  
    
  },
  methods: {
    setPositionTag(record) {
      var tag = 'badge text-wrap me-1 ';
      
      if (record['position'] == 'MB')
        return tag + 'bg-warning';
      else if (record['position'] == 'OH')
        return tag + 'bg-danger';
      else if (record['position'] == 'S')
        return tag + 'bg-success';
      else if (record['position'] == 'L')
        return tag + 'bg-secondary';
      else if (record['position'] == 'O')
        return tag + 'bg-primary';
      else 
        return tag + 'bg-warning';
    },
    clearSelected() {
      this.selected_button = {'name': '',
                              'number': -1,
                              'position': '',
                              'record_type': '',
                              'landing': -1,
                              'opponent': {'num': -1, 'pos': ''},
                              'game': this.cur_game};
    },
    checkOptionAllSelected(whichBtn) {
      console.log('[checkOptionAllSelected]', this.selected_button);
      if (whichBtn == 'upper') {
        if (this.selected_button.name == '' || this.selected_button.record_type == '')
          return false;
        else
          return true;
      } else {
        if (this.selected_button.opponent.num == -1 || this.selected_button.opponent.pos == '' || this.selected_button.landing == -1) {
          console.log('[checkOptionAllSelected] Lower False');
          return false;
        } else {
          console.log('[checkOptionAllSelected] Lower True');
          return true;
        }
      }
    },    
    record(whichBtn) {
      if (whichBtn == 'upper' && this.checkOptionAllSelected('upper')) {
        console.log('[record]', this.selected_button, this.records_local);
        // score adjustment
        if (this.selected_button.record_type.indexOf('Point') != -1)
          this.scoring.host.cur_score++;
        else
          this.scoring.opponent.cur_score++;

        // record ajustment
        this.records_pushed_raw[this.cur_game-1].ourTeam[this.selected_button['name']][this.selected_button['record_type']]++;
        this.records_local.unshift({'num': this.selected_button.number,
                                    'name': this.selected_button.name,
                                    'position': this.selected_button.position,
                                    'record_type': this.translateType2Man[this.selected_button.record_type],
                                    'landing': -1,
                                    'game': this.cur_game});
        
        // store local data
        this.storeLocalData();
      } else if (whichBtn == 'lower' && this.isOpponentScore && this.checkOptionAllSelected('lower')) { 
        // whichBtn == 'lower'
        this.scoring.opponent.cur_score++;  // score adjustment
        this.isOpponentScore = false;

        if (this.records_pushed_raw[this.cur_game-1].placement[this.selected_button.landing][0] == '')
          this.records_pushed_raw[this.cur_game-1].placement[this.selected_button.landing][0] = (this.selected_button.opponent);
        else
          this.records_pushed_raw[this.cur_game-1].placement[this.selected_button.landing].push(this.selected_button.opponent);
        this.records_local.unshift({'num': this.selected_button.opponent.num,
                                    'name': this.scoring.opponent.name,
                                    'position': this.selected_button.opponent.pos,
                                    'record_type': this.translateType2Man[this.selected_button.record_type],
                                    'landing': this.selected_button.landing+1 == 10 ? 'Touch Out' : this.selected_button.landing+1,
                                    'game': this.cur_game});

        // store local data
        this.storeLocalData();
      }

      // 無論如何只要按下送出都要清空選取項目
      this.clearSelected();
    },
    deleteLocalRecord(record2delete){
      // delete from local record
      let indexOfTarget = this.records_local.indexOf(record2delete);
      this.records_local.splice(indexOfTarget, 1);
      
      // delete from record to be pushed
      if (record2delete.record_type == '對方得分' && record2delete.game == this.cur_game) {
        this.scoring.opponent.cur_score--; // score adjustment
        
        // change "touch out" to numberic number
        if (record2delete.landing == 'Touch Out')
          record2delete.landing = 10;

        let opponent = this.records_pushed_raw[record2delete.game-1].placement[record2delete.landing-1].find(x => x.num == record2delete.num && x.pos == record2delete.position),
            indexOfOpponent = this.records_pushed_raw[record2delete.game-1].placement[record2delete.landing-1].indexOf(opponent);
        
        this.records_pushed_raw[record2delete.game-1].placement[record2delete.landing-1].splice(indexOfOpponent, 1);
      } else {
        // score adjustment
        if (record2delete.record_type.indexOf('失誤') != -1  && record2delete.game == this.cur_game)
          this.scoring.opponent.cur_score--;
        else if (record2delete.game == this.cur_game) // 刪掉我們得分的紀錄
          this.scoring.host.cur_score--;

        // record deletion
        let engType = this.translateType2Eng[record2delete.record_type];
        this.records_pushed_raw[record2delete.game-1].ourTeam[record2delete.name][engType]--;
      }

      this.storeLocalData();
    },
    setCourtMem() {
      this.selected_members = [ { "name": "蘇名偉", "number": "27", "position": "OH", "uid": "-N3hlfKxXwby0jSSDbxV" },
                                { "name": "張祐誠", "number": "3", "position": "MB", "uid": "-N3hloXHeW7EIdJuh5ZD" },
                                { "name": "Test6", "number": "66", "position": "S", "uid": "-N3hm182z3keR5kdjpoX" },
                                { "name": "Test5", "number": "77", "position": "O", "uid": "-N3hlzbf69tjAcJjsAdG" },
                                { "name": "test4", "number": "4", "position": "MB", "uid": "-N3hlp05s2nmpA4gx4XC" },
                                { "name": "test2", "number": "2", "position": "OH", "uid": "-N3hlhMMtjy-u_QrqVL8" },
                                { "name": "Test7", "number": "88", "position": "L", "uid": "-N3hm36BH5b9ngb2N8wQ" },];
      console.log(this.selected_members);

    },
    checkSetCourtMem() {
      // modal check
      for (let i = 0; i < 7; ++i) {
        if (Object.entries(this.selected_members[i]).length == 0) {
          this.isCourtMemSet = false;
          return;
        }
      }
      this.isCourtMemSet = true;

      // add personal entry to "records_pushed_raw"
      for (let entry of Object.entries(this.selected_members)) {
        if (!(entry[1].name in this.records_pushed_raw[this.cur_game-1].ourTeam)) {
          this.records_pushed_raw[this.cur_game-1].ourTeam[entry[1].name] = { name: entry[1].name, pos: entry[1].position, number: entry[1].number,
                                                                              attackPoint: 0, blockPoint: 0, servicePoint: 0,
                                                                              attackError: 0, tossError: 0, blockError: 0, receiveError: 0, serviceError: 0
          };
        }
      }
      console.log('[checkSetCourtMem]', this.records_pushed_raw[this.cur_game-1]);
    },
    checkNextGame() {
        if (this.contestInfo.games.length == this.cur_game) {
            return false;
        } else {
          if (this.scoring.host.cur_score >= 24 && this.scoring.opponent.cur_score >= 24) {
            // 雙方大於 24 分
            // deuce
            if (Math.abs(this.scoring.host.cur_score - this.scoring.opponent.cur_score) == 2)
              return true;
            else
              return false;
          } else if (this.scoring.host.cur_score == 25 || this.scoring.opponent.cur_score == 25)// not deucing
            return true;
          else 
            return false;
        }
    },
    checkEndGame() {
      if (this.contestInfo.games.length == this.cur_game && this.contestInfo.games.length != 1) {
        if (this.scoring.host.cur_score >= 14 && this.scoring.opponent.cur_score >= 14) {
            // 雙方大於 24 分
            // deuce
            if (Math.abs(this.scoring.host.cur_score - this.scoring.opponent.cur_score) == 2)
              return true;
            else
              return false;
          } else if (this.scoring.host.cur_score == 15 || this.scoring.opponent.cur_score == 15)// not deucing
            return true;
          else 
            return false;
        } else if (this.contestInfo.games.length == 1) {
          if (this.scoring.host.cur_score >= 24 && this.scoring.opponent.cur_score >= 24) {
            // 雙方大於 24 分
            // deuce
            if (Math.abs(this.scoring.host.cur_score - this.scoring.opponent.cur_score) == 2)
              return true;
            else
              return false;
          } else if (this.scoring.host.cur_score == 25 || this.scoring.opponent.cur_score == 25)// not deucing
            return true;
          else 
            return false;
        } else {
          return false;
        }
    },
    nextGame(isEndGame) {
      this.splitGameRecord(true);

      // judge who wins
      if (this.scoring['host']['cur_score'] > this.scoring['opponent']['cur_score'])
        this.scoring['host']['winned_game'] += 1;
      else 
        this.scoring['opponent']['winned_game'] += 1;
      
      // reset variables
      this.isCourtMemSet = false;
      this.isOpponentScore = false;
      this.clearSelected();
      this.scoring.host.cur_score = this.scoring.opponent.cur_score = 0;
      if (!isEndGame) { // 如果是最後一場就不用再新增了
        this.cur_game += 1;
        this.records_pushed_raw.push({ 
          'ourTeam': {},
          'placement': [[''], [''], [''], [''], [''], [''], [''], [''], [''], ['']] // 0~8: 1~9 九號位置 ; 9: touch out
        });
      }

      // push to DB
      // userSTAT & games
      this.$http.patch(this.db + 'user.json', JSON.stringify(this.users));
      this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {games: this.contestInfo.games});

      // 比分資料
      this.contestInfo.gameScore = this.scoring.host.winned_game.toString() + ':' + this.scoring.opponent.winned_game.toString();
      this.contestInfo.score = this.scoring.host.cur_score.toString() + ':' + this.scoring.opponent.cur_score.toString();
      this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {gameScore: this.contestInfo.gameScore});
      this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {score: this.contestInfo.score});

      // contestRecords
      for(let i = 0; i < this.teamInfo.contestRecords.length; ++i) {
        if (this.teamInfo.contestRecords[i].contest == this.contestInfo.contest) {
          this.teamInfo.contestRecords[i].gameScore = this.contestInfo.gameScore;
          this.$http.patch(this.db + 'team/' + this.teamid + '.json', JSON.stringify(this.teamInfo));
        }
      }

      // 上場球員
      this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {onCourtMem: ''});
      
      // 紀錄資料
      if (this.records_local.length == 0)
        this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {localRecords: ['']});
      else 
        this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {localRecords: this.records_local});

      if (Object.entries(this.records_pushed_raw[0].ourTeam).length < 7)
        this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {localRecordsRaw: ['']});
      else {
        let temp = this.records_pushed_raw;
        temp[this.cur_game-1].ourTeam = [''];

        this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {localRecordsRaw: temp});
      }
    },
    endGame() {
      this.nextGame(true);

      // 清除遠端的暫存資料
      this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {onCourtMem: ''});
      this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {localRecords: ['']});
      this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {localRecordsRaw: ['']});
    },
    getMemID(name) {
      for (let member of Object.entries(this.teamInfo.members)) {
        // console.log('[getMemID]', member[1], name);
        if (member[1].name == name) 
          return member[1].uid;
      }
      return '-1';
    },
    splitGameRecord(isGameChanges) {
      let per_game = {'ourTeam': [''], 
                      'placement': {'1': [''], '2': [''], '3': [''], '4': [''], '5': [''],
                                    '6': [''], '7': [''], '8': [''], '9': [''], 'touchout': ['']}};
      
      // ourTeam & placement
      for (let [key, item_inner] of Object.entries(this.records_pushed_raw[this.cur_game-1])) { 
        if (key == 'ourTeam') {
          for (let [name, trimmed_ourTeam] of Object.entries(item_inner)) {
            if (per_game['ourTeam'][0] == '')
              per_game['ourTeam'][0] = trimmed_ourTeam;
            else
              per_game['ourTeam'].push(trimmed_ourTeam);
            
            console.log('[splitGameRecord]', name);
            // sum UserSTAT 
            if (isGameChanges) {
              if (this.users[this.getMemID(name)].StatisticsList[0] == '' || this.cur_game == 1) 
                this.addNewRecord2STAT(name);

              this.sumUserSTAT(name, trimmed_ourTeam);
              
              // if (this.users[this.getMemID(name)].StatisticsList[0] == '') {
              //   this.addNewRecord2STAT(name);
              //   this.sumUserSTAT(name, trimmed_ourTeam);
              // } else if (this.users[this.getMemID(name)].StatisticsList[0].contest != this.contestInfo.contest) {
              //   this.addNewRecord2STAT(name);
              //   this.sumUserSTAT(name, trimmed_ourTeam);
              // } else if (this.users[this.getMemID(name)].StatisticsList[0].contest != this.contestInfo.contest) {
              //   let record = {'contest': '', 'date': '', 'teamName': '', 'opponent': '', 'score': '',
              //                 'name': '', 'pos': '', 'number': '',
              //                 'attackPoint': 0, 'blockPoint': 0, 'servicePoint': 0,
              //                 'attackError': 0, 'tossError': 0, 'blockError': 0,
              //                 'receiveError': 0, 'serviceError': 0};
              //   this.users[this.getMemID(name)].StatisticsList[0] = record;
                
              //   if (this.cur_game != 1) {
              //     for (let i = 1; i < this.cur_game; ++i) {
              //       let targetIdx = this.contestInfo.games[i-1]['ourTeam'].findIndex(ele => name in ele);
              //       if (targetIdx != -1)
              //         console.log('[splitGameRecord]', this.contestInfo.games[i-1]['ourTeam'][targetIdx]);
              //         // this.users[this.getMemID(name)].StatisticsList[0] += this.contestInfo.games[i-1]['ourTeam'][targetIdx];
              //     }
              //   }
  
              //   this.sumUserSTAT(name, trimmed_ourTeam);
              // }
            }


          }
        } else if (key == 'placement') {
          for (let index = 1; index <= 9; index++) 
            per_game['placement'][index.toString()] = item_inner[index-1];

          
          per_game['placement']['touchout'] = item_inner[9];
        }
      }

      // storing per_game
      console.log('[nextGame]', this.cur_game, per_game);
      this.contestInfo.games[this.cur_game-1] = per_game;
      console.log('[nextGame]', this.cur_game, this.contestInfo.games);
    },
    addNewRecord2STAT(name) {
      let record = {'contest': '', 'date': '', 'teamName': '', 'opponent': '', 'gameScore': '', 'score': '',
                    'name': '', 'pos': '', 'number': '',
                    'attackPoint': 0, 'blockPoint': 0, 'servicePoint': 0,
                    'attackError': 0, 'tossError': 0, 'blockError': 0,
                    'receiveError': 0, 'serviceError': 0};
      
      // insert contest info
      for (let [key, value] of Object.entries(this.contestInfo)) {
        if (['games', 'localRecordsRaw', 'localRecords', 'onCourtMem'].includes(key)) continue;
        else 
          record[key] = value;
      }
      record['teamName'] = this.teamInfo.teamName;

      // PUSH
      if (this.users[this.getMemID(name)].StatisticsList[0] == '')
        this.users[this.getMemID(name)].StatisticsList[0] = record;
      else 
        this.users[this.getMemID(name)].StatisticsList.unshift(record);
    },
    sumUserSTAT(name, trimmed_ourTeam) {
      for (let [key, value] of Object.entries(trimmed_ourTeam)) {
        if (typeof value == 'number') 
          this.users[this.getMemID(name)].StatisticsList[0][key] += value;
        else if (typeof value == 'string')
          this.users[this.getMemID(name)].StatisticsList[0][key] = value;
      }
    }, 
    storeLocalData() {
      console.log('TEST');
      this.splitGameRecord(false);

      // DB
      // userStat & game info
      this.$http.patch(this.db + 'user.json', JSON.stringify(this.users));
      this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {games: this.contestInfo.games});

      // 比分資料
      this.contestInfo.score = this.scoring.host.cur_score.toString() + ':' + this.scoring.opponent.cur_score.toString();
      this.contestInfo.gameScore = this.scoring.host.winned_game.toString() + ':' + this.scoring.opponent.winned_game.toString();
      this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {gameScore: this.contestInfo.gameScore});
      this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {score: this.contestInfo.score});

      // contestRecords
      for(let i = 0; i < this.teamInfo.contestRecords.length; ++i) {
        if (this.teamInfo.contestRecords[i].contest == this.contestInfo.contest) {
          this.teamInfo.contestRecords[i].gameScore = this.contestInfo.gameScore;
          this.$http.patch(this.db + 'team/' + this.teamid + '.json', JSON.stringify(this.teamInfo));
        }
      }

      // 上場球員
      console.log('[storeLocalData]', this.isCourtMemSet, Object.entries(this.selected_members[0]).length == 0, this.selected_members);
      if (Object.entries(this.selected_members[0]).length == 0 || this.isCourtMemSet == false)
        this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {onCourtMem: ''});
      else 
        this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {onCourtMem: this.selected_members});
      
      // 紀錄資料
      if (this.records_local.length == 0)
        this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {localRecords: ['']});
      else
        this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {localRecords: this.records_local});

      if (Object.entries(this.records_pushed_raw[0].ourTeam).length < 7)
        this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {localRecordsRaw: ['']});
      else {
        if (this.records_pushed_raw[this.cur_game-1].ourTeam[0] == '') {
          let temp = this.records_pushed_raw;
          temp[this.cur_game-1].ourTeam = [''];
  
          this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {localRecordsRaw: temp});
        } else {
          this.$http.patch(this.db + 'contest/' + this.contestid + '.json', {localRecordsRaw: this.records_pushed_raw});
        }
      }
    }
  }
}

</script>

<style scoped>
.score-board {
  grid-template-columns: 7fr 3fr;
  column-gap: 5px;
}
.scores{
  grid-template-columns: 13fr 3fr 3fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 5px;
  row-gap: 5px;
  vertical-align: middle;
}
.round-controls {
  grid-template-rows: 1fr 1fr;
  row-gap: 5px;
}
.btn-outline-dark:hover {
  background-color: #888;
  color: #EEE !important;
}
.btn-primary:hover {
  border: none !important;
  border-color: transparent !important;
}
.team-members-grid {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  column-gap: 5px;
  row-gap: 5px;
}
.team-member {
  padding: 0.25em 0.25em !important;
}
.landing-spots {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
