<template>
  <div>
    <div class="card text-center border-0"> 
      <div class="d-flex align-items-center text-start mx-3 mt-3 justify-content-between">
        <button class="btn d-flex align-items-center fs-5 ps-0" style="color:#2c3e50" @click="$router.push('/home/'+ uid + '/profile')">
          <i class="fa-solid fa-angle-left fs-2" style="color:#495057"></i>&nbsp;返回&nbsp;
        </button>
        <span class="fs-2 fw-bolder d-flex align-items-center" style="height:54px">{{teamInfo.teamName}}</span>
        <div class="d-flex">
          <p class="me-4">&nbsp;&nbsp;&nbsp;</p>
          <button class="btn d-flex align-items-center fs-5 pe-0" style="color:#2c3e50" @click="modifyPersonalModal=true">
            <i class="fa-solid fa-gear fs-2"></i>
          </button>
        </div>
      </div>
      <!-- {{teamid}}
      {{teamInfo}} -->
      <div class="card border-0" >
        <div class="my-3 mx-3 card fw-bold">
          <div class="card-head py-2" style="background-color:#E5E8E8">
            <span class="fw-bolder fs-5">
              <i class="fa-solid fa-person mx-2"></i> 成員
            </span>
          </div>
          <div class="card-body text-start px-1 py-2">
            <div class="container">
              <div class="row d-flex justify-content-between">
                <div class=" col-auto mx-1 my-1 px-0 d-flex align-items-center" v-for="(mem,idx) in teamInfo.members" :key=idx>
                  <span v-if="mem.position=='OH'" class="badge bg-danger text-wrap mx-1" style="width:35px">{{mem.number}}</span>
                  <span v-else-if="mem.position=='MB'" class="badge bg-warning text-wrap mx-1" style="width:35px">{{mem.number}}</span>
                  <span v-else-if="mem.position=='S'" class="badge bg-success text-w rap mx-1" style="width:35px">{{mem.number}}</span>
                  <span v-else-if="mem.position=='O'" class="badge bg-primary text-wrap mx-1" style="width:35px">{{mem.number}}</span>
                  <span v-else-if="mem.position=='L'" class="badge bg-secondary text-wrap mx-1" style="width:35px">{{mem.number}}</span>
                  <span class="text-nowrap">{{mem.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-3 mx-3 card fw-bold">
          <div class="card-head py-2" style="background-color:#E5E8E8">
            <span class="fw-bolder fs-5">
              <i class="fa-solid fa-clipboard mx-2"></i> 比賽紀錄
            </span>
          </div>
          <div class="card-body text-start">
            <div class="d-block text-end mb-3">
              <button @click="addContestModal=true" class="btn btn-outline-dark">
                <i class="fa-solid fa-plus"></i> 新增比賽
              </button>
            </div>
            <!-- <div class="d-flex gap-3 justify-content-center mb-2">
              <button @click="addPoint" class="btn btn-warning">測試</button>
            </div> -->
            <div v-if="teamInfo.contestRecords[0] != ''" class="list-group" style="height: 350px; overflow-y:scroll">
              <div v-for="(item,idx) in teamInfo.contestRecords" :key="idx" class="list-group-item d-flex justify-content-between list-group-item-action">
                <div class=" text-center">
                  <p class="mb-0 fs-5">{{item.contest}}</p>
                  <!-- <p class="mb-1"><i class="fa-solid fa-hand-fist"></i> {{item.opponent}}</p> -->
                  <p class="mb-1">vs <span class="badge bg-main">{{item.opponent}}</span></p>
                  <p class="mb-0 opacity-75">{{item.date}}</p>
                </div>
                <div class="d-flex align-items-center">
                  <p class="mb-0 fs-4">{{item.gameScore}}</p> 
                </div>
                <div class="d-grid gap-2 text-center">
                  <router-link :to="`/home/${uid}/team/${teamid}/scoring/${item.key}`" class="btn btn-primary">計分</router-link>
                  <router-link :to="`/home/${uid}/team/${teamid}/record/${item.key}`" class="btn btn-success">紀錄</router-link>
                </div>
              </div>
            </div>
            <div v-else class="list-group-item d-flex justify-content-center align-items-center list-group-item-action">
              <p class="my-2 text-secondary">現在還沒有比賽</p>
            </div>
          </div>
        </div>  
      </div>
      <!-- Modal add contest-->
      <div v-if="addContestModal">
        <div name="modal fade">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog"> 
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title"><i class="fa-solid fa-volleyball fs-4"></i>&nbsp;&nbsp;新比賽</h4>
                    <button type="button" class="btn-close" @click="addContestModal=false"></button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group mb-2">
                      <label>對手</label>
                      <input type="text" class="form-control" v-model="newContest.opponent" />
                    </div>
                    <div class="d-flex gap-3 mb-2">
                      <div class="col">
                        <label>盃賽</label>
                        <input type="text" class="form-control" v-model="newContest.contest" />
                      </div>
                      <div class="col">
                        <label>局數</label>
                        <select class="form-select" v-model="newContest.gamesNum">
                          <option>1</option>
                          <option selected>3</option>
                          <option>5</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>日期</label>
                    </div>
                    <div class="form-group">
                      <date-picker v-model="newContest.date" valueType="format"></date-picker>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button class="btn teambtn"
                            @click="addContest"
                            :disabled="newContest.opponent=='' || newContest.contest=='' || 
                              newContest.gamesNum=='' || newContest.date==''" >新增</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal add contest-->
      <div v-if="modifyPersonalModal">
        <div name="modal fade">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog"> 
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">修改個人資訊</h4>
                    <button type="button" class="btn-close" @click="modifyPersonalModal=false"></button>
                  </div>
                  <div class="modal-body">
                    <div class="d-flex gap-3">
                      <div class="col">
                        <label>背號</label>
                        <input type="text" class="form-control" v-model="myInfo.number" />
                      </div>
                      <div class="col">
                        <label>位置</label>
                        <select class="form-select" v-model="myInfo.position">
                          <option value="OH" selected>Outside Hitter</option>
                          <option value="MB">Middle Blocker</option>
                          <option value="S">Setter</option>
                          <option value="O">Opposite</option>
                          <option value="L">Libero</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button class="btn teambtn" @click="modifyPersonal">修改</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AddContest from "../components/add_contest.vue";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  props: ['uid'],
  components:{
    'date-picker': DatePicker,
  },
  data() {
    return {
      teamid: this.$route.params.teamid,
      db: 'https://volleague-default-rtdb.firebaseio.com/',
      teamInfo:{
        teamName: '',
        members: [],
        contestRecords: [''],
      },
      myInfo:{
        number: '',
        position: '',
        name: '',
        uid: '',
      },
      allContest: [],
      newContest: {
        opponent: '',
        contest: '',
        date:'',
        gameScore: '0:0',
        gamesNum: 3,
      },
      personalRecord:{
        name: '',
        pos: '',
        number: '',
        attackPoint: 0,
        blockPoint: 0,
        servicePoint: 0,
        attackError: 0,
        tossError: 0,
        blockError: 0,
        receiveError: 0,
        serviceError: 0,
      },
      personalPlacement:{
        pos: '',
        number: '',
      },
      emptyGame: {
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
      addContestModal:false,
      modifyPersonalModal:false,
    }
  },
  beforeMount(){
    // console.log(this.teamid);
    this.$http.get(this.db + 'team/' + this.teamid + '.json').then(function(data){
      return data.json();
    }).then(function(data){
      this.teamInfo = data;
      var userid = this.uid;
      var userInfo = {};
      this.teamInfo.members.find(function(value){
        if(value.uid == userid){
          userInfo = value;
        }
      });
      this.myInfo = userInfo;
    })
  },
  methods: {
    addContest(){
      // console.log(this.newContest);
      var gameArr = [];
      for(let i=0; i<this.newContest.gamesNum;i++){
        gameArr.push(this.emptyGame);
      }
      var emptyContest = {
        opponent: this.newContest.opponent,
        contest: this.newContest.contest,
        date: this.newContest.date,
        gameScore: this.newContest.gameScore,
        score: '0:0',
        localRecords: [''],
        localRecordsRaw: [''],
        onCourtMem: '',
        games: gameArr,
      }
      var singleContest = {
        key: '',
        opponent: this.newContest.opponent,
        contest: this.newContest.contest,
        date: this.newContest.date,
        gameScore: this.newContest.gameScore,
      }
      this.$http.post(this.db + 'contest.json',emptyContest).then(function(data){
        singleContest.key = data.body.name;
        // update contest record
        if(this.teamInfo.contestRecords[0] == ''){
          this.teamInfo.contestRecords[0] = singleContest;
        }else{
          this.teamInfo.contestRecords.push(singleContest);
        }
        this.teamInfo.contestRecords.sort(function(a,b){
          return new Date(a.date) - new Date(b.date);
        }).reverse();
        this.$http.patch(this.db + 'team/' + this.teamid + '.json', {contestRecords: this.teamInfo.contestRecords});
        // clear
        this.newContest = {
          opponent: '',
          contest: '',
          date:'',
          gameScore: '0:0',
          gamesNum: 3,
        }
      })
      this.addContestModal = false;
    },
    modifyPersonal(){
      var membersArr = this.teamInfo.members;
      var myID = this.myInfo.uid;
      var idx = -1;
      membersArr.find(function(value,index){
        if(value.uid == myID){
          idx = index;
        }
      })
      membersArr[idx] = this.myInfo;
      membersArr.sort(function(a,b){
        return a.number - b.number;
      });
      this.$http.patch(this.db + 'team/' + this.teamid + '.json', {members: membersArr});
      this.modifyPersonalModal = false;
    },
    //test
    addPoint(){
      var gameArr = [];
      for(let i=0; i<this.newContest.gamesNum;i++){
        gameArr.push(this.emptyGame);
      }
      var emptyContest = {
        opponent: this.teamInfo.contestRecords[0].opponent,
        contest: this.teamInfo.contestRecords[0].contest,
        date: this.teamInfo.contestRecords[0].date,
        gameScore: this.teamInfo.contestRecords[0].gameScore,
        score: '0:0',
        localRecords: [''],
        localRecordsRaw: [''],
        onCourtMem: '',
        games: gameArr,
      }
      this.$http.patch(this.db + 'contest/-N3hrnRBzCzhGgmCwhil.json', JSON.stringify(emptyContest)).then(function(){
        // clear
        this.newContest = {
          opponent: '',
          contest: '',
          date:'',
          gameScore: '0:0',
          gamesNum: 3,
        }
      })

    },
  }

}
</script>

<style scoped>
.teambtn {
  background-color:#2c3e50; 
  color:white;
}
.bg-main {
  background-color:#2c3e50; 
}
.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>