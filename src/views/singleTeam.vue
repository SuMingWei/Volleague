<template>
  <div class="row py-4 px-4" style="background-color:#EAECEE"> 
    <div class="col-md-8 col-lg-8 mx-auto "> 
      <div class="col-md-12 col-lg-12">
        <div class="d-flex align-items-center">
          <form class="me-4 my-3">
            <router-link to="/team" class="btn align-center"><i class="fa-solid fa-arrow-left fs-2" style="color:#2c3e50"></i></router-link>
          </form>
          <span class="fs-2 fw-bolder">NCKU CSIE</span>
        </div>
      </div>
      <div class="card" >
        <div class="card-body"> 
          <div class="my-3 mx-3 card fw-bold">
            <div class="card-head py-2" style="background-color:#E5E8E8">
              <span class="fw-bolder fs-5">
                <i class="fa-solid fa-bullhorn mx-2"></i> Bulletin Board
              </span>
            </div>
            <div class="card-body text-start">
              <p>Hello! This is ncku csie volleyball team</p>
            </div>
            <div class="d-block text-end ">
              <button class="btn text-black-50 me-2 mb-2"><i class="fa-solid fa-pencil fs-5"></i></button>
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
                <div class=" col-auto mx-2 my-2 d-flex align-items-center">
                  <span class="badge bg-light text-dark text-nowrap fs-5">2022 大資盃 - 殿軍</span>
                </div>
                <div class=" col-auto mx-2 my-2 d-flex align-items-center">
                  <span class="badge bg-light text-dark text-nowrap fs-5">2022 大資盃 - 殿軍</span>
                </div>
                <div class=" col-auto mx-2 my-2 d-flex align-items-center">
                  <span class="badge bg-light text-dark text-nowrap fs-5">2022 大資盃 - 殿軍</span>
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
                <i class="fa-solid fa-person mx-2"></i> Members
              </span>
            </div>
            <div class="card-body text-start">
              <div class="row">
                <div class=" col-auto mx-2 my-2 d-flex align-items-center">
                  <span class="badge bg-danger text-wrap mx-1" style="width:35px">27</span>
                  <span class="text-nowrap">Justin biebieber</span>
                </div>
                <div class=" col-auto mx-2 my-2 d-flex align-items-center">
                  <span class="badge bg-warning text-wrap mx-1" style="width:35px">12</span>
                  <span class="text-nowrap">蘇名偉偉</span>
                </div>
                <div class=" col-auto mx-2 my-2 d-flex align-items-center">
                  <span class="badge bg-success text-wrap mx-1" style="width:35px">33</span>
                  <span class="text-nowrap">蘇名</span>
                </div>
                <div class=" col-auto mx-2 my-2 d-flex align-items-center">
                  <span class="badge bg-primary text-wrap mx-1" style="width:35px">2</span>
                  <span class="text-nowrap">蘇名偉</span>
                </div>
                <div class=" col-auto mx-2 my-2 d-flex align-items-center">
                  <span class="badge bg-secondary text-wrap mx-1" style="width:35px">9</span>
                  <span class="text-nowrap">蘇</span>
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
  </div>
</template>

<script>
// import AddContest from "../components/add_contest.vue";

export default {
  components:{
    
  },
}
</script>

<style scoped>
.teambtn {
  background-color:#2c3e50; 
  color:white;
}
</style>