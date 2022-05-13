<template>
  <div class="row py-4 px-4" style="background-color:#EAECEE"> 
    <div class="col-md-6 col-lg-6 mx-auto "> 
      <div class="col-md-12 col-lg-12">
        <div class="d-flex align-items-center">
          <form class="me-4 my-3 text-center">
            <router-link to="/singleteam" class="btn d-flex align-items-center fs-4" style="color:#2c3e50">
              <i class="fa-solid fa-angle-left fs-2" style="color:#2c3e50"></i>&nbsp;Cancel
            </router-link>
          </form>
        </div>
      </div>
      <div class="card" >
        <div class="card-body"> 
          <h4 class="my-3 fw-bolder"><i class="fa-solid fa-volleyball fs-4"></i>&nbsp;&nbsp;New Contest</h4>
          <form class="needs-validation" novalidate>
            <div class="row mx-3 ">
              <div class="col-12 my-2">
                <label for="opponent" class="form-label d-flex align-items-start">對手</label>
                <input type="text" class="form-control" id="opponent" placeholder="" value="" required>
                <div class="invalid-feedback">
                  Valid opponent is required.
                </div>
              </div>
              <div class="col-12 my-2">
                <label for="date" class="form-label d-flex align-items-start">日期</label>
                <input type="text" class="form-control" id="date" placeholder="" value="" required>
                <div class="invalid-feedback">
                  Valid date is required.
                </div>
              </div>
              <div class="col-12 my-2">
                <label for="time" class="form-label d-flex align-items-start">時間</label>
                <input type="text" class="form-control" id="time" placeholder="" value="" required>
                <div class="invalid-feedback">
                  Valid time is required.
                </div>
              </div>
              <div class="col-12 my-2">
                <label for="cup" class="form-label d-flex align-items-start">盃賽</label>
                <select class="form-select" id="cup" required>
                  <option value="">Choose...</option>
                  <option>工院盃</option>
                  <option>系際盃</option>
                  <option>成功盃</option>
                </select>
                <small class="d-block text-end mt-1">
                  <a herf='#'>+ Add a cup</a>
                </small>
                <div class="invalid-feedback">
                  Valid cup is required.
                </div>
              </div>
              <div class="col-12 my-2">
                <label for="round" class="form-label d-flex align-items-start">局數</label>
                <select class="form-select" id="round" required>
                  <option>1</option>
                  <option>2</option>
                  <option selected>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <div class="invalid-feedback">
                  Valid round is required.
                </div>
              </div>
              <div class="col-12 my-4">
                <button class="btn btn-primary btn-lg col-6" type="submit">Create</button>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {

    }
  },
  components:{
  },
  methods: {

  },
}
</script>

<style scoped>

</style>