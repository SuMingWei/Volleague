<template>
  <div class="card border-0"> 
    <div class="row justify-content-center">
      <div class="col-md-3">  
        <div class="card border-0">
          <div class="card-body">
            <!-- {{this.profile}} -->
            <div >
              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="img-radius rounded-circle img-thumbnail my-3 mx-3 align-self-middle" style="width:150px" alt="User-Profile-Image">
              <h5 class="fw-bold my-2">{{profile.name}}</h5>
              <h6 class=" my-2">{{profile.birthday.year}} | {{profile.birthday.month}} | {{profile.birthday.day}}</h6>
              <span v-for="pos in profile.position" :key="pos">
                <span v-if="pos=='OH'" class="badge bg-danger text-wrap mx-1">Outside Hitter</span>
                <span v-else-if="pos=='MB'" class="badge bg-warning text-wrap mx-1">Middle Blocker</span>
                <span v-else-if="pos=='S'" class="badge bg-success text-w rap mx-1">Setter</span>
                <span v-else-if="pos=='O'" class="badge bg-primary text-wrap mx-1">Opposite</span>
                <span v-else-if="pos=='L'" class="badge bg-secondary text-wrap mx-1">Libero</span>
              </span>
            </div>
            <div>
              <button class="btn border-secondary text-secondary text-muted mt-3" style="width:150px" @click="editProfileModal=true">編輯個人檔案</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card border-0">  
        <div class="my-3 mx-3 card fw-bold">
          <div class="card-head py-2" style="background-color:#E5E8E8">
            <span>
              <i class="fa-solid fa-people-group mx-2"/> 隊伍資訊
            </span>
          </div>
          <div class="card-body fs-3 text-start">
            <div>
              <div class="d-flex my-2">
                <button class="btn btn-outline-dark me-3 text-nowrap" @click="createTeamModal=true">
                  <i class="fa-solid fa-plus"></i> 建立隊伍
                </button>
                <dropSearch class="form-control" 
                            :options="options"
                            :disabled="false"
                            :placeholder="'搜尋隊伍...'"
                            v-on:selected="validateSelection">
                </dropSearch>
              </div>
            </div>
            <hr>
            <div>
              <span v-for="team in profile.teamList" :key="team">
                <router-link :to="`/home/${id}/team/${getTeamID(team)}`" v-if="team!=''" class="btn teambtn me-2 mb-2 fw-bolder">{{team}}</router-link>
              </span>
            </div>
          </div>
        </div>
        <div class="my-3 mx-3 card fw-bold">
          <div class="card-head py-2" style="background-color:#E5E8E8">
            <span>
              <i class="fa-solid fa-chart-simple mx-2"/> 個人數據紀錄
            </span>
          </div>
          <div class="card-body" style="height: 500px; overflow-y:scroll">
            <div class="table-responsive">
              <table class="table table-striped align-middle text-nowrap">
                <thead>
                  <tr class="align-middle" style="background-color:#2c3e50; color:white">
                    <th scope="col">比賽</th>
                    <th scope="col">攻擊<br>得分</th>
                    <th scope="col">攔網<br>得分</th>
                    <th scope="col">發球<br>得分</th>
                    <th scope="col">總得<br>分</th>
                    <th scope="col">攻擊<br>失誤</th>
                    <th scope="col">舉球<br>失誤</th>
                    <th scope="col">觸網<br>失誤</th>
                    <th scope="col">接發<br>失誤</th>
                    <th scope="col">發球<br>失誤</th>
                    <th scope="col">總失<br>分</th>
                  </tr>
                </thead>
                <tbody v-if="profile.StatisticsList[0]!=''">
                  <tr v-for="(statistic,idx) in profile.StatisticsList" :key="idx">
                    <td>
                      <div class="text-center">
                        <p class="mb-0">{{statistic.contest}}</p>
                        <p class="mb-1">{{statistic.teamName}}&nbsp;<span class="badge bg-main">vs</span>&nbsp;{{statistic.opponent}}</p>
                        <p class="mb-0 opacity-75">{{statistic.date}}</p>
                        <p class="mb-0 opacity-75">{{statistic.score}}</p> 
                      </div>
                    </td>
                    <td class="border-start">{{statistic.attackPoint}}</td>
                    <td>{{statistic.blockPoint}}</td>
                    <td>{{statistic.servicePoint}}</td>
                    <td class="border-start">{{statistic.attackPoint + statistic.blockPoint + statistic.servicePoint}}</td>
                    <td class="border-start">{{statistic.attackError}}</td>
                    <td>{{statistic.tossError}}</td>
                    <td>{{statistic.blockError}}</td>
                    <td>{{statistic.receiveError}}</td>
                    <td>{{statistic.serviceError}}</td>
                    <td class="border-start">{{statistic.attackError + statistic.tossError + statistic.blockError + statistic.receiveError + statistic.serviceError}}</td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td v-for="idx in 11" :key="idx"> - </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal edit profile-->
    <div v-if="editProfileModal">
      <div name="modal fade">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog modal-dialog-centered"> 
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">編輯個人檔案</h4>
                  <button type="button" class="btn-close" @click="editProfileModal=false"></button>
                </div>
                <div class="modal-body">
                  <div class="form-group mb-2">
                    <label>姓名</label>
                    <input type="text" class="form-control" v-model="profile.name" />
                  </div>
                  <div class="form-group mb-2">
                    <label>生日</label>
                    <div class="d-flex gap-3">
                      <input type="text" class="form-control col" v-model="profile.birthday.year" />
                      <input type="text" class="form-control col" v-model="profile.birthday.month" />
                      <input type="text" class="form-control col" v-model="profile.birthday.day" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label>位置</label>
                  </div>
                  <div>
                    <div class="form-check form-check-inline mb-1">
                      <input class="form-check-input" type="checkbox" id="OH" value="OH" v-model="profile.position">
                      <label class="form-check-label" for="OH"><span class="badge bg-danger text-wrap mx-1">Outside Hitter</span></label>
                    </div>
                    <div class="form-check form-check-inline mb-1">
                      <input class="form-check-input" type="checkbox" id="MB" value="MB" v-model="profile.position">
                      <label class="form-check-label" for="MB"><span class="badge bg-warning text-wrap mx-1">Middle Blocker</span></label>
                    </div>
                    <div class="form-check form-check-inline mb-1">
                      <input class="form-check-input" type="checkbox" id="S" value="S" v-model="profile.position">
                      <label class="form-check-label" for="S"><span class="badge bg-success text-w rap mx-1">Setter</span></label>
                    </div>
                    <div class="form-check form-check-inline mb-1">
                      <input class="form-check-input" type="checkbox" id="O" value="O" v-model="profile.position">
                      <label class="form-check-label" for="O"><span class="badge bg-primary text-wrap mx-1">Opposite</span></label>
                    </div>
                    <div class="form-check form-check-inline mb-1">
                      <input class="form-check-input" type="checkbox" id="L" value="L" v-model="profile.position">
                      <label class="form-check-label" for="L"><span class="badge bg-secondary text-wrap mx-1">Libero</span></label>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="btn teambtn" @click="changeProfile">儲存</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal create team-->
    <div v-if="createTeamModal">
      <div name="modal fade">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog"> 
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">建立新隊伍</h4>
                  <button type="button" class="btn-close" @click="createTeamModal=false"></button>
                </div>
                <div v-if="errorMessage !== ''" class="alert alert-danger mx-4" role="alert">
                  <span>{{ errorMessage }}</span>
                </div>
                <div class="modal-body">
                  <div class="form-group mb-2">
                    <label>隊名</label>
                    <input type="text" class="form-control" v-model="newTeam.teamName" />
                  </div>
                  <div class="form-group">
                    <label>個人資訊</label>
                  </div>
                  <div class="d-flex gap-3">
                    <div class="col">
                      <label>背號</label>
                      <input type="text" class="form-control" v-model="personalInfo.number" />
                    </div>
                    <div class="col">
                      <label>位置</label>
                      <select class="form-select" v-model="personalInfo.position">
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
                  <button class="btn teambtn" 
                          :disabled="newTeam.teamName=='' || personalInfo.number=='' || personalInfo.position==''" 
                          @click="createTeam">建立</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Join team-->
    <div v-if="teamInfoModal">
      <div name="modal fade">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog"> 
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">{{teamInfo.teamName}}&nbsp;</h4>
                  <i v-if="profile.teamList.includes(teamInfo.teamName)" class="fa-solid fa-circle-check text-success"></i>
                  <button type="button" class="btn-close" @click="teamInfoModal=false"></button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label>成員</label>
                  </div>
                  <div class="card mb-2">
                    <div class="container">
                    <div class="row my-2">
                      <div class="col-auto mx-0 my-1 d-flex align-items-center" v-for="(mem,idx) in teamInfo.members" :key=idx>
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
                  <div class="form-group">
                    <label>個人資訊</label>
                  </div>
                  <div class="d-flex gap-3">
                    <div class="col">
                      <label>背號</label>
                      <input type="text" class="form-control" v-model="personalInfo.number" />
                    </div>
                    <div class="col">
                      <label>位置</label>
                      <select class="form-select" v-model="personalInfo.position">
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
                  <button class="btn teambtn" :disabled="profile.teamList.includes(teamInfo.teamName) || (personalInfo.number == '' || personalInfo.position == '')" @click="JoinTeam(teamInfo.teamName)">加入</button>
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
// import Dropdown from 'vue-simple-search-dropdown';
import DropSearch from '../components/dropSearch.vue';

export default {
  props: ['uid'],
  components:{
    'dropSearch':DropSearch,
  },
  data() {
    return {
      id: '',
      db: 'https://volleague-default-rtdb.firebaseio.com/',
      profile: {
        authid: '',
        name: '',
        birthday: {
          year: '',
          month: '',
          day: '',
        },
        position: [],
        teamList: [],
        StatisticsList: [],
      },
      allTeamName: [],
      errorMessage: '',
      newTeam:{
        teamName: '',
        members: [],
        contestRecords: [''],
      },
      personalInfo: {
        number: '',
        position: '',
        name: '',
        uid: '',
      },
      teamInfo: {
        teamName: '',
        members: [],
      },
      editProfileModal: false,
      createTeamModal: false,
      teamInfoModal: false,
      options: [],
    }
  },
  beforeMount(){
    this.id = this.uid;
    this.$http.get(this.db + 'user/' + this.id + '.json').then(function(data){
      return data.json();
    }).then(function(data){
      this.profile = data;
    })

    // get all team 
    this.getAllTeam();
  },
  methods: {
    getTeamID(teamname){
      var team = this.options.find(element => element["name"] == teamname);
      if(team != undefined){
        return team["teamid"];
      }
    },
    changeProfile(){
      var updateData = {
        name: this.profile.name,
        birthday: {
          year: this.profile.birthday.year,
          month: this.profile.birthday.month,
          day: this.profile.birthday.day,
        },
        position: this.profile.position,
      }
      this.$http.patch(this.db + 'user/' + this.id + '.json', updateData);

      var tempTeam = {};
      var tempID = this.id;
      var tempName = this.profile.name;
      for(let key in this.profile.teamList){
        this.$http.get(this.db + 'team/' + this.getTeamID(this.profile.teamList[key])+ '.json').then(function(data){
          return data.json();
        }).then(function(data){
          tempTeam = data;
          tempTeam.members.find(function(value,index){
            if(value.uid == tempID){
              tempTeam.members[index].name = tempName;
            }
          });
        }).then(function(){
          this.$http.patch(this.db + 'team/' + this.getTeamID(this.profile.teamList[key]) + '.json', {members: tempTeam.members});
        })
      }
      this.editProfileModal=false;
    },
    createTeam(){
      // get all team
      this.$http.get(this.db + 'team.json').then(function(data){
        return data.json();
      }).then(function(data){
        var teamNameArr = [];
        for(let key in data){
          teamNameArr.push(data[key].teamName);
        }
        this.allTeamName = teamNameArr;
        
        // check
        if(this.allTeamName.find(element => element == this.newTeam.teamName)){
          this.errorMessage = '這個隊名已被他人使用!';
        }else{
          // create team
          this.personalInfo.name = this.profile.name;
          this.personalInfo.uid = this.id;
          this.newTeam.members.push(this.personalInfo);
          this.$http.post(this.db + 'team.json',this.newTeam).then(function(data){
            console.log(data);
            
            // update teamlist
            if(this.profile.teamList[0] == ''){
              this.profile.teamList[0] = this.newTeam.teamName;
            }else{
              this.profile.teamList.push(this.newTeam.teamName);
            }
            this.$http.patch(this.db + 'user/' + this.id + '.json', {teamList: this.profile.teamList});
            // clear 
            this.newTeam = {
              teamName: '',
              members: [],
              contestRecords: [''],
            };
            this.personalInfo = {
              number: '',
              position: '',
              name: '',
              id: '',
            };
            this.createTeamModal=false;
            //update options
            this.getAllTeam();
          });
        }
      })
    },
    getAllTeam(){
      this.$http.get(this.db + 'team.json').then(function(data){
        return data.json();
      }).then(function(data){
        var teamArr = [];
        for(let key in data){
          var opt = {};
          opt["name"] = data[key].teamName;
          opt["teamid"] = key;
          teamArr.push(opt);
        }
        teamArr.sort();
        this.options = teamArr;
      })
    },
    JoinTeam(teamname){
      // console.log(teamname);
      // add team to personal teamlist
      if(this.profile.teamList[0] == ''){
        this.profile.teamList[0] = teamname;
      }else{
        this.profile.teamList.push(teamname);
      }
      this.$http.patch(this.db + 'user/' + this.id + '.json', {teamList: this.profile.teamList});
      // add new member to this team 
      this.personalInfo.name = this.profile.name;
      this.personalInfo.uid = this.id;
      this.teamInfo.members.push(this.personalInfo);
      this.teamInfo.members.sort(function(a,b){
        return a.number - b.number;
      })
      var team = this.options.find(element => element["name"] == teamname);
      this.$http.patch(this.db + 'team/' + team["teamid"] + '.json',{members: this.teamInfo.members});
      // clear
      this.personalInfo = {
        number: '',
        position: '',
        name: '',
        id: '',
      };
      this.teamInfoModal = false;
      
    },
    validateSelection(selection) {
      this.selected = selection;
      console.log(selection.name + " has been selected");
      if(selection.name != undefined){
        this.teamInfo.teamName = selection.name;
        this.$http.get(this.db + 'team/'+ selection.teamid + '.json').then(function(data){
          return data.json();
        }).then(function(data){
          this.teamInfo.members = data.members;
          // console.log(this.teamInfo.members);
          this.teamInfoModal = true;
        })
        
      }
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