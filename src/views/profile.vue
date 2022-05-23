<template>
  <div class="row py-4 px-4" style="background-color:#EAECEE"> 
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-3">  
          <div class="card" >
            <div class="card-body">
              {{this.profile}}
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
                <button class="btn btn-outline-dark text-muted mt-3" style="width:150px" @click="editProfileModal=true">Edit profile</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7">  
          <div class="card" >
            <div class="my-3 mx-3 card fw-bold">
              <div class="card-head py-2" style="background-color:#E5E8E8">
                <span>
                  <i class="fa-solid fa-people-group mx-2"/> Team
                </span>
              </div>
              <div class="card-body fs-3 text-start">
                <div>
                  <div class="d-flex my-2">
                    <button class="btn btn-outline-dark me-4 text-nowrap" @click="createTeamModal=true">
                      <i class="fa-solid fa-plus"></i> Create
                    </button>
                    <input class="form-control me-2" placeholder="Team's ID">
                    <button class="btn btn-outline-dark">Join</button>
                  </div>
                </div>
                <hr>
                <div>
                  <router-link :to="`/home/${id}/team`" class="btn teambtn mx-1 mb-1 fw-bolder">NCKU CSIE</router-link>
                  <router-link :to="`/home/${id}/team`" class="btn teambtn mx-1 mb-1 fw-bolder">NTU CE</router-link>
                </div>
              </div>
            </div>
            <div class="my-3 mx-3 card fw-bold">
              <div class="card-head py-2" style="background-color:#E5E8E8">
                <span>
                  <i class="fa-solid fa-chart-simple mx-2"/> Statistics
                </span>
              </div>
              <div class="card-body" style="height: 500px; overflow-y:scroll">
                <div class="table-responsive">
                  <table class="table table-striped align-middle text-nowrap">
                    <thead>
                      <tr style="color:#2c3e50;">
                        <th colspan="1"></th>
                        <th colspan="4">得分</th>
                        <th colspan="5">失誤</th>
                      </tr>
                      <tr style="background-color:#2c3e50; color:white">
                        <th scope="col">比賽</th>
                        <th scope="col">攻擊得分</th>
                        <th scope="col">攔網得分</th>
                        <th scope="col">發球得分</th>
                        <th scope="col">總得分</th>
                        <th scope="col">攻擊失誤</th>
                        <th scope="col">攔網失誤</th>
                        <th scope="col">發球失誤</th>
                        <th scope="col">舉球失誤</th>
                        <th scope="col">總失分</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div class=" text-center">
                            <p class="mb-1">NCKU CSIE <span class="badge bg-main">VS</span> NCKU CE</p>
                            <p class="mb-0 opacity-75">2022-01-02 | 18:00</p>
                            <p class="mb-0 opacity-75">2:0</p> 
                          </div>
                        </td>
                        <td class="border-start">4</td>
                        <td>1</td>
                        <td>1</td>
                        <td>6</td>
                        <td class="border-start">1</td>
                        <td>1</td>
                        <td>0</td>
                        <td>0</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>
                          <div class=" text-center">
                            <p class="mb-1">NCKU CSIE <span class="badge bg-main">VS</span> NCKU EE</p>
                            <p class="mb-0 opacity-75">2022-01-03 | 18:00</p>
                            <p class="mb-0 opacity-75">2:1</p> 
                          </div>
                        </td>
                        <td class="border-start">3</td>
                        <td>0</td>
                        <td>1</td>
                        <td>4</td>
                        <td class="border-start">1</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>1</td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>
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
                  <h4 class="modal-title">Edit Profile</h4>
                  <button type="button" class="btn-close" @click="editProfileModal=false"></button>
                </div>
                <div class="modal-body">
                  <div class="form-group mb-2">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="profile.name" />
                  </div>
                  <div class="form-group mb-2">
                    <label>Birthday</label>
                    <div class="d-flex gap-3">
                      <input type="text" class="form-control col" v-model="profile.birthday.year" />
                      <input type="text" class="form-control col" v-model="profile.birthday.month" />
                      <input type="text" class="form-control col" v-model="profile.birthday.day" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Position</label>
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
                  <button class="btn teambtn" @click="changeProfile">Save Change</button>
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
                  <h4 class="modal-title">Create a New Team</h4>
                  <button type="button" class="btn-close" @click="createTeamModal=false"></button>
                </div>
                <div v-if="errorMessage !== ''" class="alert alert-danger mx-4" role="alert">
                  <span>{{ errorMessage }}</span>
                </div>
                <div class="modal-body">
                  <div class="form-group mb-2">
                    <label>Team Name</label>
                    <input type="text" class="form-control" v-model="newTeam.teamName" />
                  </div>
                  <div class="form-group mb-2">
                    <label>Bulletin Board</label>
                    <input type="text" class="form-control" v-model="newTeam.bulletin" />
                  </div>
                  <div class="form-group">
                    <label>Your Personal Information</label>
                  </div>
                  <div class="d-flex gap-3">
                    <div class="col">
                      <label>Number</label>
                      <input type="text" class="form-control" v-model="personalInfo.number" />
                    </div>
                    <div class="col">
                      <label>Position</label>
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
                  <button class="btn teambtn" @click="createTeam">Create</button>
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
export default {
  props: ['uid'],
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
      allTeam: [],
      errorMessage: '',
      newTeam:{
        teamName: '',
        bulletin: '',
        awards: [''],
        members: [],
        contestRecords: [''],
      },
      personalInfo: {
        number: '',
        position: '',
        name: '',
      },
      editProfileModal: false,
      createTeamModal: false,
    }
  },
  beforeMount(){
    // console.log('before');
    this.id = this.uid;
    this.$http.get(this.db + 'user/' + this.id + '.json').then(function(data){
      return data.json();
    }).then(function(data){
      this.profile = data;
    })
  },
  methods: {
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
      this.$http.patch(this.db + 'user/' + this.id + '.json', updateData).then(function(data){
        console.log(data);
        this.editProfileModal=false
      })
    },
    createTeam(){
      // get all team
      this.$http.get(this.db + 'team.json').then(function(data){
        return data.json();
      }).then(function(data){
        var teamArr = [];
        for(let key in data){
          teamArr.push(data[key].teamName);
        }
        this.allTeam = teamArr;
        
        // check
        if(this.allTeam.find(element => element == this.newTeam.teamName)){
          this.errorMessage = 'This Team Name Already Exists !';
        }else{
          // create team
          this.personalInfo.name = this.profile.name;
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
              bulletin: '',
              awards: [''],
              members: [],
              contestRecords: [''],
            },
            this.personalInfo = {
              number: '',
              position: '',
              name: '',
            },
            this.createTeamModal=false;
          });
        }
      })
    }
  }
}
</script>

<style scope>
.teambtn {
  background-color:#2c3e50; 
  color:white;
}
.bg-main {
  background-color:#2c3e50; 
}
.modal-mask {
  position: fixed;
  z-index: 9998;
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