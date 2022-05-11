<template>
  <div class="row py-4 px-4" style="background-color:#EAECEE"> 
    <div class="col-md-8 col-lg-8 mx-auto "> 
      <div class="col-md-12 col-lg-12">
        <div class="d-flex align-items-center">
          <form class="me-4 my-3">
            <router-link to="/team" class="btn teambtn align-center"><i class="fa-solid fa-arrow-left fs-2"></i></router-link>
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
            <div class="container">
              <div class="row justify-content-end">
                <button class="btn text-black-50 col-2 my-2 text-end"><i class="fa-solid fa-pencil fs-5"></i></button>
              </div>
            </div>
          </div>
          <div class="my-3 mx-3 card fw-bold">
            <div class="card-head py-2" style="background-color:#E5E8E8">
              <span class="fw-bolder fs-5">
                <i class="fa-solid fa-bullhorn mx-2"></i> Awards
              </span>
            </div>
            <div class="card-body text-start">
              <p>Hello! This is ncku csie volleyball team</p>
            </div>
          </div>
          <div class="my-3 mx-3 card fw-bold">
            <div class="card-head py-2" style="background-color:#E5E8E8">
              <span class="fw-bolder fs-5">
                <i class="fa-solid fa-bullhorn mx-2"></i> Members
              </span>
            </div>
            <div class="card-body text-start">
              <p>Hello! This is ncku csie volleyball team</p>
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

<style scoped>
.teambtn {
  background-color:#2c3e50; 
  color:white;
}
</style>