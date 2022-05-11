<template>
  <div class="row py-4 px-4" style="background-color:#EAECEE"> 
      <div class="col-md-8 mx-auto">  
        <!-- Profile widget --> 
        <div class="card" >
          <div class="card-body">
            <div class="row">
              <div class="col-sm-4">
                <div>
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="img-radius rounded-circle img-thumbnail my-3 mx-3 align-self-middle" style="width:150px" alt="User-Profile-Image">
                  <h5 class="fw-bold my-2">Alessa Robert</h5>
                  <h6 class=" my-2">2000 | 12 | 12</h6>
                  <span class="badge bg-danger text-wrap mx-1">Outside Hitter</span>
                  <span class="badge bg-warning text-wrap mx-1">Middle Blocker</span>
                  <span class="badge bg-success text-wrap mx-1">Setter</span>
                  <span class="badge bg-primary text-wrap mx-1">Opposite</span>
                  <span class="badge bg-secondary text-wrap mx-1">Libero</span>
                </div>
              </div>
              <div class="col-sm-8">
                <p class="my-2 text-muted text-start">
                  Welcome to my profile and nice to meet you.<br>
                  Welcome to my profile and nice to meet you.
                  Welcome to my profile and nice to meet you.
                  Welcome to my profile and nice to meet you.
                </p>
              </div>
            </div>
            <div>
              <button class="btn btn-outline-dark mt-3" style="width:150px">Edit profile</button>
            </div>
            <hr>
            <div class="my-3 mx-3 card fw-bold">
              <div class="card-head py-2" style="background-color:#E5E8E8">
                <span>
                  <i class="fa-solid fa-circle-check mx-2"/> Team
                </span>
              </div>
              <div class="card-body fs-3 text-start">
                <router-link to="/singleteam" class="btn teambtn mx-2 fw-bolder">NCKU CSIE</router-link>
                <router-link to="/singleteam" class="btn teambtn mx-2 fw-bolder">NTU CE</router-link>
              </div>
            </div>
            <div class="my-3 mx-3 card fw-bold">
              <div class="card-head py-2" style="background-color:#E5E8E8">
                <span>
                  <i class="fa-solid fa-chart-simple mx-2"/> Statistics
                </span>
              </div>
              <div class="card-body my-2 d-flex justify-content-between stats bd-highlight">
                <div class="d-flex flex-column">
                  <span class="fs-6">Game</span>
                  <span class="fw-bold border rounded">75</span> 
                </div>
                <div class="d-flex flex-column">
                  <span class="fs-6">Spike</span>
                  <span class="fw-bold border rounded">322</span> 
                </div>
                <div class="d-flex flex-column">
                  <span class="fs-6">Block</span>
                  <span class="fw-bold border rounded">30</span> 
                </div>
                <div class="d-flex flex-column">
                  <span class="fs-6">Serve</span>
                  <span class="fw-bold border rounded">41</span>   
                </div>
                <div class="d-flex flex-column">
                  <span class="fs-6">Rating</span>
                  <span class="fw-bolder border rounded">5.24</span>
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
  
}
</script>

<style scope>
.teambtn {
  background-color:#2c3e50; 
  color:white;
}
</style>