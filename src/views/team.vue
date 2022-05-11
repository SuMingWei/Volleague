<template>
  <div class="row py-4 px-4" style="background-color:#EAECEE"> 
    <div class="col-md-6 mx-auto "> 
      <div class="col-md-10 ">
        <form class="d-flex mx-5">
          <input class="form-control me-2 my-3" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-primary my-3" type="submit">Search</button>
        </form>
      </div>
      <div class="card" >
        <div class="card-body">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link active fw-bold" id="nav-teamlist-tab" data-bs-toggle="tab" data-bs-target="#nav-teamlist" type="button" role="tab" aria-controls="nav-teamlist" aria-selected="true"><i class="fa-solid fa-list"></i> Team List</button>
              <button class="nav-link fw-bold" id="nav-join-tab" data-bs-toggle="tab" data-bs-target="#nav-join" type="button" role="tab" aria-controls="nav-join" aria-selected="false"><i class="fa-solid fa-user-group"></i> Join</button>
              <button class="nav-link fw-bold" id="nav-create-tab" data-bs-toggle="tab" data-bs-target="#nav-create" type="button" role="tab" aria-controls="nav-create" aria-selected="false"><i class="fa-solid fa-plus"></i> Create</button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-teamlist" role="tabpanel" aria-labelledby="nav-teamlist-tab"  style="height: 400px; overflow-y:scroll">
              <div class="card">
                <router-link to="/singleteam" class="btn teambtn my-2 mx-2 p-2 fw-bolder fs-4 text-left">
                  <i class="fa-solid fa-poo"></i> NCKU CSIE
                </router-link>
                <router-link to="/singleteam" class="btn teambtn my-2 mx-2 p-2 fw-bolder fs-4 ">
                  <i class="fa-solid fa-poo"></i> NTU CE
                </router-link>
              </div>
            </div>
            <div class="tab-pane fade" id="nav-join" role="tabpanel" aria-labelledby="nav-join-tab">...</div>
            <div class="tab-pane fade" id="nav-create" role="tabpanel" aria-labelledby="nav-create-tab">...</div>
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