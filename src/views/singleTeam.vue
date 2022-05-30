<template>
  <div class="row py-4 px-4" style="background-color:#EAECEE"> 
    <div class="col-md-8 col-lg-8 mx-auto "> 
      <div class="col-md-12 col-lg-12">
        <div class="d-flex align-items-center">
          <div class="me-4 my-3">
            <button class="btn align-center" @click="$router.push('/home/'+ uid + '/profile')"><i class="fa-solid fa-arrow-left fs-2" style="color:#2c3e50"></i></button>
          </div>
          <span class="fs-2 fw-bolder">{{teamInfo.teamName}}</span>
        </div>
      </div>
      {{teamid}}
      {{teamInfo}}
      <div class="card" >
        <div class="card-body"> 
          <div class="my-3 mx-3 card fw-bold">
            <div class="card-head py-2" style="background-color:#E5E8E8">
              <span class="fw-bolder fs-5">
                <i class="fa-solid fa-bullhorn mx-2"></i> Bulletin Board
              </span>
            </div>
            <div class="card-body text-start">
              <p style="white-space: pre-line;">{{teamInfo.bulletin}}</p>
            </div>
            <div class="d-block text-end ">
              <button @click="editBulletinModal=true" class="btn text-black-50 me-2 mb-2" ><i class="fa-solid fa-pencil fs-5"></i></button>
            </div>
          </div>
          <div class="my-3 mx-3 card fw-bold">
            <div class="card-head py-2" style="background-color:#E5E8E8">
              <span class="fw-bolder fs-5">
                <i class="fa-solid fa-trophy mx-2"></i> Awards
              </span>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-auto mx-2 my-2 d-flex align-items-center" v-for="award in teamInfo.awards" :key="award">
                  <span class="badge bg-light text-dark text-nowrap fs-5">{{award}}</span>
                </div>
              </div>
            </div>
            <div class="d-block text-end ">
              <button @click="editAwardsModal=true" class="btn text-black-50 me-2 mb-2"><i class="fa-solid fa-pencil fs-5"></i></button>
            </div>
          </div>
          <div class="my-3 mx-3 card fw-bold">
            <div class="card-head py-2" style="background-color:#E5E8E8">
              <span class="fw-bolder fs-5">
                <i class="fa-solid fa-person mx-2"></i> Members
              </span>
            </div>
            <div class="card-body text-start">
              <div  class="row">
                <div class=" col-auto mx-2 my-2 d-flex align-items-center" v-for="(mem,idx) in teamInfo.members" :key=idx>
                  <span v-if="mem.position=='OH'" class="badge bg-danger text-wrap mx-1" style="width:35px">{{mem.number}}</span>
                  <span v-else-if="mem.position=='MB'" class="badge bg-warning text-wrap mx-1" style="width:35px">{{mem.number}}</span>
                  <span v-else-if="mem.position=='S'" class="badge bg-success text-w rap mx-1" style="width:35px">{{mem.number}}</span>
                  <span v-else-if="mem.position=='O'" class="badge bg-primary text-wrap mx-1" style="width:35px">{{mem.number}}</span>
                  <span v-else-if="mem.position=='L'" class="badge bg-secondary text-wrap mx-1" style="width:35px">{{mem.number}}</span>
                  <span class="text-nowrap">{{mem.name}}</span>
                </div>
              </div>
            </div>
            <div class="d-block text-end ">
              <button class="btn text-black-50 me-2 mb-2"><i class="fa-solid fa-pencil fs-5"></i></button>
            </div>
          </div>
          <div class="my-3 mx-3 card fw-bold">
            <div class="card-head py-2" style="background-color:#E5E8E8">
              <span class="fw-bolder fs-5">
                <i class="fa-solid fa-clipboard mx-2"></i> Contest Records
              </span>
            </div>
            <div class="card-body text-start">
              <div class="d-block text-end ">
                <router-link to="/addcontest" class="btn btn-outline-dark me-2 mb-2 ">
                  <i class="fa-solid fa-plus"></i> New Contest
                </router-link>
              </div>
              <div class="list-group" style="height: 230px; overflow-y:scroll">
                <div class="list-group-item d-flex justify-content-between list-group-item-action">
                  <div class=" text-center">
                    <p class="mb-1">資訊 VS 土木</p>
                    <p class="mb-0 opacity-75">2022-01-02 | 18:00</p>
                    <p class="mb-0 opacity-75">2:0</p> 
                  </div>
                  <div class="d-grid gap-2 text-center">
                    <button class="btn btn-sm btn-primary">Scoring</button>
                    <router-link to="/singlerecord" class="btn btn-sm btn-success">Record</router-link>
                    <!-- <button class="btn btn-sm btn-success">Record</button> -->
                  </div>
                </div>
                <div class="list-group-item d-flex justify-content-between list-group-item-action">
                  <div class=" text-center">
                    <p class="mb-1">資訊 VS 電機</p>
                    <p class="mb-0 opacity-75">2022-01-03 | 1:00</p>
                    <p class="mb-0 opacity-75">2:0</p> 
                  </div>
                  <div class="d-grid gap-2 text-center">
                    <button class="btn btn-sm btn-primary">Scoring</button>
                    <button class="btn btn-sm btn-success">Record</button>
                  </div>
                </div>
                <div class="list-group-item d-flex justify-content-between list-group-item-action">
                  <div class=" text-center">
                    <p class="mb-1">資訊 VS 材料</p>
                    <p class="mb-0 opacity-75">2022-01-04 | 1:00</p>
                    <p class="mb-0 opacity-75">2:0</p> 
                  </div>
                  <div class="d-grid gap-2 text-center">
                    <button class="btn btn-sm btn-primary">Scoring</button>
                    <button class="btn btn-sm btn-success">Record</button>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
    <!-- Modal edit bulletin-->
    <div v-if="editBulletinModal">
      <div name="modal fade">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog"> 
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Edit Bulletin</h4>
                  <button type="button" class="btn-close" @click="editBulletinModal=false"></button>
                </div>
                <div class="modal-body">
                  <div class="form-group mb-2">
                    <textarea class="form-control" v-model="teamInfo.bulletin" />
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="btn teambtn" @click="editBulletin">Modify</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal edit awards-->
    <div v-if="editAwardsModal">
      <div name="modal fade">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog"> 
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Edit Awards</h4>
                  <button type="button" class="btn-close" @click="editAwardsModal=false"></button>
                </div>
                <div class="modal-body">
                  <div class="form-group mb-2">
                    <label>New Awards</label>
                    <div class="d-flex gap-3">
                      <input type="text" class="form-control col" v-model="newAward.year" placeholder="year"/>
                      <input type="text" class="form-control col" v-model="newAward.contest" placeholder="contest"/>
                      <input type="text" class="form-control col" v-model="newAward.award" placeholder="award"/>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="btn teambtn" @click="editAwards" :disabled="newAward.year=='' || newAward.contest=='' || newAward.award==''">Modify</button>
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

export default {
  props: ['uid'],
  data() {
    return {
      teamid: this.$route.params.teamid,
      db: 'https://volleague-default-rtdb.firebaseio.com/',
      teamInfo:{
        teamName: '',
        bulletin: '',
        awards: [''],
        members: [],
        contestRecords: [''],
      },
      newAward: {
        year: '',
        contest: '',
        award: '',
      },
      editBulletinModal: false,
      editAwardsModal: false,
    }
  },
  beforeMount(){
    // console.log(this.teamid);
    this.$http.get(this.db + 'team/' + this.teamid + '.json').then(function(data){
      return data.json();
    }).then(function(data){
      this.teamInfo = data;
    })
  },
  methods: {
    editBulletin(){
      // console.log(this.teamInfo.bulletin);
      this.$http.patch(this.db + 'team/' + this.teamid + '.json', {bulletin: this.teamInfo.bulletin}).then(function(data){
        console.log(data);
        this.editBulletinModal = false;
      })
    },
    editAwards(){
      var awardTitle = this.newAward.year + ' ' + this.newAward.contest + ' ' + this.newAward.award;
      if(this.teamInfo.awards[0] == ''){
        this.teamInfo.awards[0] = awardTitle;
      }else{
        this.teamInfo.awards.push(awardTitle);
      }
      this.$http.patch(this.db + 'team/' + this.teamid + '.json', {awards: this.teamInfo.awards}).then(function(data){
        console.log(data);
        this.editAwardsModal = false;
      })
    }
  }

}
</script>

<style scoped>
.teambtn {
  background-color:#2c3e50; 
  color:white;
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