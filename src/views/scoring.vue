<template>
  <div>
    <div class="card text-center">
      <!-- 計分表 -->
      <div class="card-body mx-1">
        <div class="card" style="border: none">
          <!-- 隊伍 & 局數 & 分數 -->
          <div class="d-grid score-board text-center">
            <div class="d-grid scores text-center">
              <button class="btn btn-sm btn-primary" style="background-color: #e76f51; border: none;"> {{ scoring['host']['name'] }} </button>
              <span class="justify-content-center mx-1 my-1" style="color: #e76f51; font-weight: bolder"> {{ scoring['host']['winned_game'] }} </span>
              <span class="justify-content-center mx-1 my-1" style="color: #e76f51; font-weight: bolder"> {{ scoring['host']['cur_score'] }} </span>
              <button class="btn btn-sm btn-primary" style="background-color: #2a9d8f; border: none;"> {{ scoring['opponent']['name'] }} </button>
              <span class="justify-content-center mx-1 my-1" style="color: #2a9d8f; font-weight: bolder"> {{ scoring['opponent']['winned_game'] }} </span>
              <span class="justify-content-center mx-1 my-1" style="color: #2a9d8f; font-weight: bolder"> {{ scoring['opponent']['cur_score'] }} </span>
            </div>

            <!-- 下一局 & 結束比賽 -->
            <div class="d-grid round-controls text-center">
              <button class="btn btn-sm btn-outline-dark" style="color: #888; border-color: #888" v-on:click="nextGame()">下一局</button>
              <button class="btn btn-sm btn-outline-dark" style="color: #888; border-color: #888"
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
                    <button type="button" class="btn btn-primary" v-on:click="endGame()" data-bs-dismiss="modal">確定</button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <!-- 上場球員 -->
      <div class="card-body"> 
        <div class="card fw-bold">
          <div class="card-head py-2" style="background-color:#E5E8E8">
            <span class="fw-bolder fs-5">
              <i class="fa-solid fa-people-group"></i> 上場球員
            </span>
          </div>
          <div class="card-body text-center" style="padding: 0.5em 0.5em !important">
            <!-- 已經有設定過上場人員了 -->
            <div v-if="this.isCourtMemSet" class="d-grid team-members-grid">
              <!-- 上場人員九宮格 -->
              <button v-for="(member, index) in selected_members" :key="index" type="button" class="btn btn-outline-secondary team-member" 
                      v-bind:style="[ index == 6 ? {gridColumnStart: 2} : {} ]"
                      v-on:click="selected_button['name'] = member['name']; selected_button['number'] = member['number']">
                <span :class="setPositionTag(member)" style="width:35px">{{ member['number'] }}</span> {{ member['name'] }}
              </button>

              <!-- 開啟 modal -->
              <div class="d-block text-end" style="grid-column-start: 3; grid-row-start: 3">
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
                    <!-- <button v-on:click="setCourtMem()">Set Court Member</button> -->
                    <div class="d-grid mx-1 my-1 team-members-grid">
                      <div v-for="n in 7" :key="n" v-bind:style="[ n == 7 ? {gridColumnStart: 2} : {} ]">
                        <select class="form-select text-center"  v-model="selected_members[n-1]">
                          <option selected>
                            <p v-if="n != 7">人員 {{ n }}</p>
                            <p v-else>自由</p>
                          </option>
                          <option v-for="(item, index) in team_members" :key="index" :value="item"> 
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
      </div>
      
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
            <!-- 各球記錄 -->
            <div class="card mb-3 fw-bold">
              <div class="card-head py-2" style="background-color:#E5E8E8">
                <span class="fw-bolder fs-5">
                  <i class="far fa-clipboard"></i> 各球記錄
                </span>
              </div>
              <div class="card-body text-center">
                <div class="d-grid" style="grid-template-rows: 2fr 1fr ; row-gap: 5px ;">
                  <div class="d-grid" style="grid-template-columns: 1fr 1fr 1fr ; grid-template-rows: 1fr 1fr ; gap: 5px 5px">
                    <button type="button" class="btn btn-outline-secondary"
                            v-on:click="selected_button['record_type'] = '攻擊'">
                            攻擊
                    </button>
                    <button type="button" class="btn btn-outline-secondary"
                            v-on:click="selected_button['record_type'] = '攔網'">
                            攔網
                    </button>
                    <button type="button" class="btn btn-outline-secondary"
                            v-on:click="selected_button['record_type'] = '舉球'">
                            舉球
                    </button>
                    <button type="button" class="btn btn-outline-secondary"
                            v-on:click="selected_button['record_type'] = '防守'">
                            防守
                    </button>
                    <button type="button" class="btn btn-outline-secondary"
                            v-on:click="selected_button['record_type'] = '發球'">
                            發球
                    </button>
                    <button type="button" class="btn btn-outline-secondary"
                            v-on:click="selected_button['record_type'] = '接發'">
                            接發
                    </button>
                  </div>
                  <div class="d-grid" style="grid-template-columns: 1fr 1fr; gap: 5px 5px">
                    <button type="button" class="btn btn-outline-secondary"
                            style="background-color: #90be6d ; border-color: #90be6d !important ; color: #FFF"
                            v-on:click="selected_button['pointed'] = '得分'">
                            得分
                    </button>
                    <button type="button" class="btn btn-outline-secondary" 
                            style="background-color: #f08080 ; border-color: #f08080 !important ; color: #FFF"
                            v-on:click="selected_button['pointed'] = '失誤'">
                            失誤
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 落點記錄 -->
            <div class="card mb-3 fw-bold">
              <div class="card-head py-2" style="background-color:#E5E8E8">
                <span class="fw-bolder fs-5">
                  <i class="fas fa-volleyball-ball"></i> 落點記錄
                </span>
              </div>

              <div class="card-body text-center">
                <div class="d-grid" style="grid-template-rows: auto auto; row-gap: 5px;">
                  <!-- 場地九宮格 -->
                  <div class="container border border-2 border-dark" style="width: 272px; height: 272px">
                    <div class="row border-bottom border-2 border-dark" style="width: 270px">
                      <div  v-for="n in 3" :key="n" class="d-flex col landing-spots" style="height: 90px" 
                            v-on:click="selected_button['landing'] = n.toString()">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> {{ n }} </button>
                      </div>
                    </div>
                    <div class="row border-bottom border-2 border-dark-80" style="width: 270px">
                      <div  v-for="n in 3" :key="n" class="d-flex col landing-spots" style="height: 90px"
                            v-on:click="selected_button['landing'] = (n+3).toString()">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> {{ n+3 }} </button>
                      </div>
                    </div>
                    <div class="row" style="width: 270px">
                      <div  v-for="n in 3" :key="n" class="d-flex col landing-spots" style="height: 90px"
                            v-on:click="selected_button['landing'] = (n+6).toString()">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> {{ n+6 }} </button>
                      </div>
                    </div>
                  </div>

                  <!-- 右邊控制項 & 界外按鈕 -->
                  <div class="d-grid" style="grid-template-columns: 1fr 2fr; column-gap: 5px; width: 272px; margin: auto auto">
                    <div class="landing-spots">
                      <button type="button" class="btn btn-outline-secondary" style="padding: auto auto; height: 80px; width: 80px"
                              v-on:click="selected_button['landing'] = 'TouchOut'"> 
                        Touch Out
                      </button>
                    </div>

                    <div class="d-grid text-center" style="grid-template-rows: 0.75fr 1fr 1fr">
                      <p class="" style="margin: auto auto">輸入敵方背號</p>
                      <input type="text" v-model="opponent" size="1" class="mx-1 my-1">
                      <button type="button" class="btn btn-outline-secondary mx-1 my-1"
                              style="background-color: #90be6d; border-color: #90be6d !important; color: #FFF"
                              v-on:click="sentRecord()"> 
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
                  <th scope="col">球員</th>
                  <th scope="col">內容</th>
                  <th scope="col">敵方</th>
                  <th scope="col">落點</th>
                  <th scope="col">局數</th>
                  <th scope="col">功能</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(record, index) in records" :key="index">
                  <td class="">
                    <div class="col-auto d-flex align-items-center">
                      <span :class="setPositionTag(record)" style="width:35px"> {{ record['num'] }} </span>
                      <span class="text-nowrap"> {{ record['name'] }} </span>
                    </div>
                  </td>
                  <td class="border-start"> {{ record['record'] }} </td>
                  <td class="border-start">
                    <span v-if="record['opponent'] != 'none'"> {{ record['opponent'] }} </span>
                    <span v-else> X </span>
                  </td>
                  <td class="border-start"> {{ record['landing'] }} </td>
                  <td class="border-start"> {{ record['game'] }} </td>
                  <td class="border-start"> 
                    <button style="border-color: red; border-style: solid; border-radius: 20%">
                      <i class="fas fa-trash-alt" style="color: red"></i>
                    </button>
                  </td >
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      cur_game: 1,
      opponent: '', // bind to opponent input box
      isCourtMemSet: false, // bind to court member section
      records: [{'num': 22, 'name': '張祐誠', 'position': 'MB', 'record': '攻擊得分', 'opponent': 'none', 'landing': '3', 'game': 1},
                {'num': 27, 'name': '蘇名偉', 'position': 'OH', 'record': '攔網失誤', 'opponent': '43', 'landing': '7', 'game': 1},
                {'num': 2, 'name': '張張張', 'position': 'S', 'record': '舉球得分', 'opponent': 'none', 'landing': '8', 'game': 1}],
      scoring: {
        host: {'name': '資訊系', 'winned_game': 2, 'cur_score': 19},
        opponent: {'name': '土木系', 'winned_game': 1, 'cur_score': 15}
      },
      selected_button: {
        'name': '',
        'number': 0,
        'record_type': '',
        'pointed': '',  // 得分或失誤
        'landing': '',
        'opponent': '',
        'game': this.cur_game
      },
      selected_members: [{}, {}, {}, {}, {}, {}, {}],     // e.g.:) {'name': '張祐誠', 'number': 22, 'position': 'MB'}
      team_members:[{'name': '張祐誠', 'number': 22, 'position': 'MB'},
                        {'name': '張祐誠', 'number': 23, 'position': 'S'},
                        {'name': '張祐誠', 'number': 24, 'position': 'OP'},
                        {'name': '張祐誠', 'number': 25, 'position': 'L'},
                        {'name': '張祐誠', 'number': 26, 'position': 'OH'},
                        {'name': '張祐誠', 'number': 27, 'position': 'OH'},
                        {'name': '張祐誠', 'number': 28, 'position': 'MB'},
                        {'name': '張祐誠', 'number': 29, 'position': 'S'}], // e.g.:) {'name': '張祐誠', 'number': 22, 'position': 'MB'}


      // records: [{'num': 22, 'name': '張祐誠', 'position': 'MB', 'record': '攻擊得分', 'opponent': 'none', 'landing': '3', 'game': 1},
      //           {'num': 27, 'name': '蘇名偉', 'position': 'OH', 'record': '攔網失誤', 'opponent': '43', 'landing': '7', 'game': 1},
      //           {'num': 2, 'name': '張張張', 'position': 'S', 'record': '舉球得分', 'opponent': 'none', 'landing': '8', 'game': 1}],
      // team_members:[{'name': '張祐誠', 'number': 22, 'position': 'MB'},
      //               {'name': '張祐誠', 'number': 23, 'position': 'S'},
      //               {'name': '張祐誠', 'number': 24, 'position': 'OP'},
      //               {'name': '張祐誠', 'number': 25, 'position': 'L'},
      //               {'name': '張祐誠', 'number': 26, 'position': 'OH'},
      //               {'name': '張祐誠', 'number': 27, 'position': 'OH'},
      //               {'name': '張祐誠', 'number': 28, 'position': 'MB'},
      //               {'name': '張祐誠', 'number': 29, 'position': 'S'}],
      // selected_members:[{'name': '張祐誠', 'number': 27, 'position': 'OH'},
      //                   {'name': '張祐誠', 'number': 23, 'position': 'S'},
      //                   {'name': '張祐誠', 'number': 24, 'position': 'OP'},
      //                   {'name': '張祐誠', 'number': 26, 'position': 'OH'},
      //                   {'name': '張祐誠', 'number': 22, 'position': 'MB'},
      //                   {'name': '張祐誠', 'number': 28, 'position': 'MB'},
      //                   {'name': '張祐誠', 'number': 25, 'position': 'L'}],
    }
  },
  methods: {
    setPositionTag(record) {
      var tag = 'badge text-wrapm mx-1 ';
      
      if (record['position'] == 'MB')
        return tag + 'bg-warning';
      else if (record['position'] == 'OH')
        return tag + 'bg-danger';
      else if (record['position'] == 'S')
        return tag + 'bg-success';
      else if (record['position'] == 'L')
        return tag + 'bg-secondary';
      else if (record['position'] == 'OP')
        return tag + 'bg-primary';
      else 
        return tag + 'bg-warning';
    },
    sentRecord() {
      this.selected_button['opponent'] = this.opponent == '' ? 'none' : this.opponent;
        
      console.log(this.selected_button);
      console.log(this.cur_game);
    },
    setCourtMem() {
      this.selected_members = [{'name': '張祐誠', 'number': 27, 'position': 'OH'},
                              {'name': '張祐誠', 'number': 23, 'position': 'S'},
                              {'name': '張祐誠', 'number': 24, 'position': 'OP'},
                              {'name': '張祐誠', 'number': 26, 'position': 'OH'},
                              {'name': '張祐誠', 'number': 22, 'position': 'MB'},
                              {'name': '張祐誠', 'number': 28, 'position': 'MB'},
                              {'name': '張祐誠', 'number': 25, 'position': 'L'}];
      console.log(this.selected_members);
    },
    checkSetCourtMem() {
      for (let i = 0; i < 7; ++i) {
        if (Object.entries(this.selected_members[i]).length == 0) {
          this.isCourtMemSet = false;
          return;
        }
      }
      this.isCourtMemSet = true;

      for (let i = 0; i < 7; ++i)
        console.log(this.selected_members[i]);
      console.log(this.isCourtMemSet);
    },
    resetGame() {
      this.cur_game = 1;
      this.scoring['host']['cur_score'] = this.scoring['opponent']['cur_score'] = 0;
      this.isCourtMemSet = false;
      this.selected_button = {
        'name': '',
        'number': 0,
        'record_type': '',
        'pointed': '',  // 得分或失誤
        'landing': '',
        'opponent': '',
        'game': this.cur_game
      };
      
      // this.team_members = this.selected_members = [{}];
    },
    nextGame() {
      this.cur_game += 1;
      
      if (this.scoring['host']['cur_score'] > this.scoring['opponent']['cur_score'])
        this.scoring['host']['winned_game'] += 1;
      else 
        this.scoring['opponent']['winned_game'] += 1;
      
      // send info & clear the record

      // reset game
      this.resetGame();
    },
    endGame() {
      this.nextGame();
      this.scoring['host']['winned_game'] = this.scoring['opponent']['winned_game'] = 0;
      this.selected_members = [{}, {}, {}, {}, {}, {}, {}];
    }

  }
}

</script>

<style scoped>
.score-board {
  grid-template-columns: 7fr 2fr;
  column-gap: 15px;
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
