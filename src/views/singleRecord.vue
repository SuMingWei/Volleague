<template>
  <div>
    <div class="card text-center">
      <div class="d-flex align-items-center text-start mx-3 my-3 justify-content-between">
        <router-link :to="`/home/${uid}/team/${teamid}`" class="btn d-flex align-items-center fs-5" style="color:#2c3e50">
          <i class="fa-solid fa-angle-left fs-2" style="color:#495057"></i>&nbsp;返回&nbsp;
        </router-link>
        <div class="text-center">
          <p class="mb-0 fs-5 fw-bolder">{{contestInfo.contest}}</p>
          <p class="mb-0 fw-bold">{{contestInfo.date}}</p>
        </div>
        <router-link :to="`/home/${uid}/team/${teamid}/scoring/${contestid}`" class="btn btn-outline-dark">
          前往計分
        </router-link>
      </div>
      <div>
        <div class="text-center px-3">
          <div class="row text-center">
            <div class="d-flex align-items-center justify-content-start col-4">
              <h5 class="btn teambtn fw-bolder" style="background-color: #e76f51;">{{teamName}}</h5>
            </div>
            <div class="d-flex align-items-center justify-content-center col-1">
              <h3 class="fw-bold">{{contestInfo.score[0]}}</h3>
            </div >
            <div class="d-flex align-items-center justify-content-center col-2 ">
              <h3 class="fw-bold">:</h3>
            </div>
            <div class="d-flex align-items-center justify-content-center col-1">
              <h3 class="fw-bold">{{contestInfo.score[2]}}</h3>
            </div>
            <div class="d-flex align-items-center justify-content-end col-4">
              <h5 class="btn teambtn fw-bolder" style="background-color: #2a9d8f; border:">{{contestInfo.opponent}}</h5>
            </div>
          </div>
        </div>
      </div>
      <!-- 分頁標籤 -->
      <ul class="nav nav-tabs" id="myTab" role="tablist" style="margin: 1em 1em 0 1em;">
        <li class="nav-item" role="presentation" v-for="idx in contestInfo.games.length" :key="idx">
          <button v-if="tabInfo[idx-1].aria_select==true" class="nav-link active fw-bold" :id="tabInfo[idx-1].id" data-bs-toggle="tab" :data-bs-target="tabInfo[idx-1].target" type="button" role="tab" :aria-controls="tabInfo[idx-1].aria_ctrl" :aria-selected="tabInfo[idx-1].aria_select">{{tabInfo[idx-1].name}}</button>
          <button v-else class="nav-link fw-bold" :id="tabInfo[idx-1].id" data-bs-toggle="tab" :data-bs-target="tabInfo[idx-1].target" type="button" role="tab" :aria-controls="tabInfo[idx-1].aria_ctrl" :aria-selected="tabInfo[idx-1].aria_select">{{tabInfo[idx-1].name}}</button>
        </li>
      </ul>
      <!-- 分頁標籤內容 -->
      <div class="tab-content border border-1 border-top-0" id="myTabContent" style="margin: 0em 1em 1em 1em;">
        <div v-for="idx in contestInfo.games.length" :key="idx" :class="tabInfo[idx-1].aria_select? 'tab-pane fade show active':'tab-pane fade'" :id="tabInfo[idx-1].aria_ctrl" role="tabpanel" :aria-labelledby="tabInfo[idx-1].id" tabindex="0">
          <div class="card-body"> 
            <!-- 我方得失紀錄 -->
            <div class="card mb-3 fw-bold">
              <div class="card-head py-2" style="background-color:#E5E8E8">
                <span class="fw-bolder fs-5">
                  <i class="fa-regular fa-face-laugh"></i>&nbsp;我方得失紀錄
                </span>
              </div>
              <div class="card-body text-center">
                <div class="table-responsive">
                  <table class="table table-striped align-middle text-nowrap">
                    <thead>
                      <tr class="align-middle" style="background-color:#2c3e50; color:white">
                        <th scope="col">球員</th>
                        <th scope="col">位置</th>
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
                    <tbody>
                      <tr v-for="(member,idx2) in contestInfo.games[idx-1].ourTeam" :key="idx2">
                        <td>
                          <div class="col-auto mx-2 my-2 d-flex align-items-center">
                            <span v-if="member.pos=='OH'" class="badge bg-danger text-wrap mx-1" style="width:35px">{{member.number}}</span>
                            <span v-else-if="member.pos=='MB'" class="badge bg-warning text-wrap mx-1" style="width:35px">{{member.number}}</span>
                            <span v-else-if="member.pos=='S'" class="badge bg-success text-w rap mx-1" style="width:35px">{{member.number}}</span>
                            <span v-else-if="member.pos=='O'" class="badge bg-primary text-wrap mx-1" style="width:35px">{{member.number}}</span>
                            <span v-else-if="member.pos=='L'" class="badge bg-secondary text-wrap mx-1" style="width:35px">{{member.number}}</span>
                            <span class="text-nowrap">{{member.name}}</span>
                          </div>
                        </td>
                        <td class="border-start">{{member.pos}}</td>
                        <td class="border-start">{{member.attackPoint}}</td>
                        <td>{{member.blockPoint}}</td>
                        <td>{{member.servicePoint}}</td>
                        <td class="border-start">{{member.attackPoint + member.blockPoint + member.servicePoint}}</td>
                        <td class="border-start">{{member.attackError}}</td>
                        <td>{{member.tossError}}</td>
                        <td>{{member.blockError}}</td>
                        <td>{{member.receiveError}}</td>
                        <td>{{member.serviceError}}</td>
                        <td class="border-start">{{member.attackError + member.tossError + member.blockError + member.receiveError + member.serviceError}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- 對手攻擊落點 -->
            <div class="card mb-3 fw-bold">
              <div class="card-head py-2" style="background-color:#E5E8E8">
                <span class="fw-bolder fs-5">
                  <i class="fa-regular fa-face-grimace"></i>&nbsp;對手攻擊落點
                </span>
              </div>
              <div class="card-body text-center">
                <div class="container border border-2 border-dark" style="width:272px;">
                  <div class="row border-bottom border-2 border-dark" style="width:270px;">
                    <div v-for="idx2 in 3" :key="idx2" class="col" style="height:95px; width:90px;">
                      <span v-for="(member,idx3) in contestInfo.games[idx-1].placement[idx2]" :key="idx3">
                        <small v-if="member.pos=='OH'" class="badge bg-danger score_point">{{member.number}}</small>
                        <small v-else-if="member.pos=='MB'" class="badge bg-warning score_point">{{member.number}}</small>
                        <small v-else-if="member.pos=='S'" class="badge bg-success score_point">{{member.number}}</small>
                        <small v-else-if="member.pos=='O'" class="badge bg-primary score_point">{{member.number}}</small>
                        <small v-else-if="member.pos=='L'" class="badge bg-secondary score_point">{{member.number}}</small>
                      </span>
                    </div>
                  </div>
                  <div class="row border-bottom border-2 border-dark-50" style="width:270px;">
                    <div v-for="idx2 in 3" :key="idx2" class="col" style="height:95px; width:90px;">
                      <span v-for="(member,idx3) in contestInfo.games[idx-1].placement[idx2+3]" :key="idx3">
                        <small v-if="member.pos=='OH'" class="badge bg-danger score_point">{{member.number}}</small>
                        <small v-else-if="member.pos=='MB'" class="badge bg-warning score_point">{{member.number}}</small>
                        <small v-else-if="member.pos=='S'" class="badge bg-success score_point">{{member.number}}</small>
                        <small v-else-if="member.pos=='O'" class="badge bg-primary score_point">{{member.number}}</small>
                        <small v-else-if="member.pos=='L'" class="badge bg-secondary score_point">{{member.number}}</small>
                      </span>
                    </div>
                  </div>
                  <div class="row" style="width:270px;">
                    <div v-for="idx2 in 3" :key="idx2" class="col" style="height:95px; width:05px;">
                      <span v-for="(member,idx3) in contestInfo.games[idx-1].placement[idx2+3]" :key="idx3">
                        <small v-if="member.pos=='OH'" class="badge bg-danger score_point">{{member.number}}</small>
                        <small v-else-if="member.pos=='MB'" class="badge bg-warning score_point">{{member.number}}</small>
                        <small v-else-if="member.pos=='S'" class="badge bg-success score_point">{{member.number}}</small>
                        <small v-else-if="member.pos=='O'" class="badge bg-primary score_point">{{member.number}}</small>
                        <small v-else-if="member.pos=='L'" class="badge bg-secondary score_point">{{member.number}}</small>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="container border-dark border-2" style="border-left:1px dashed;border-right:1px dashed;border-bottom:1px dashed; width:272px;">
                  <p class="mb-0">Touch Out</p>
                  <div v-for="(member,idx2) in contestInfo.games[idx-1].placement.touchout" :key="idx2">
                    <small v-if="member.pos=='OH'" class="badge bg-danger score_point">{{member.num}}</small>
                    <small v-else-if="member.pos=='MB'" class="badge bg-warning score_point">{{member.num}}</small>
                    <small v-else-if="member.pos=='S'" class="badge bg-success score_point">{{member.num}}</small>
                    <small v-else-if="member.pos=='O'" class="badge bg-primary score_point">{{member.num}}</small>
                    <small v-else-if="member.pos=='L'" class="badge bg-secondary score_point">{{member.num}}</small>
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
export default {
  props: ['uid'],
  data() {
    return {
      teamid: this.$route.params.teamid,
      contestid: this.$route.params.contestid,
      db: 'https://volleague-default-rtdb.firebaseio.com/',
      teamName: '',
      contestInfo: {},
      tabInfo:[
        {id: "game1-tab", target: "#game1-tab-pane", aria_ctrl: "game1-tab-pane", aria_select: true, name: "第一局"},
        {id: "game2-tab", target: "#game2-tab-pane", aria_ctrl: "game2-tab-pane", aria_select: false, name: "第二局"},
        {id: "game3-tab", target: "#game3-tab-pane", aria_ctrl: "game3-tab-pane", aria_select: false, name: "第三局"},
        {id: "game4-tab", target: "#game4-tab-pane", aria_ctrl: "game4-tab-pane", aria_select: false, name: "第四局"},
        {id: "game5-tab", target: "#game5-tab-pane", aria_ctrl: "game5-tab-pane", aria_select: false, name: "第五局"},
      ],
    }
  },
  beforeMount(){
    // console.log(this.teamid);
    this.$http.get(this.db + 'team/' + this.teamid + '.json').then(function(data){
      return data.json();
    }).then(function(data){
      this.teamName = data.teamName;
    })
    this.$http.get(this.db + 'contest/' + this.contestid + '.json').then(function(data){
      return data.json();
    }).then(function(data){
      this.contestInfo = data;
      // console.log(this.contestInfo.games[0].ourTeam);
    })
  },
}
</script>

<style scoped>
.score_point{
  font-size: 3px; 
  margin: 1px;
}
.teambtn {
  background-color:#2c3e50; 
  color:white;
}
.bg-main {
  background-color:#2c3e50; 
}
</style>