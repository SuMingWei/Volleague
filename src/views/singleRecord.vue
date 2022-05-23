<template>
  <div class="row py-4 px-4" style="background-color:#EAECEE"> 
      <div class="col-md-10 col-lg-10 mx-auto "> 
        <div class="col-md-10 col-lg-10">
          <div class="d-flex align-items-center">
            <form class="me-4 my-3 text-center">
              <router-link to="/singleteam" class="btn d-flex align-items-center fs-4" style="color:#2c3e50">
                <i class="fa-solid fa-arrow-left fs-2" style="color:#2c3e50"></i>
              </router-link>
            </form>
          </div>
        </div>
        <div class="card" >
          <div class="card-body"> 
            <h3 class="d-flex text-start align-items-center"><i class="fa-regular fa-face-laugh"></i>&nbsp;我方得失紀錄</h3>
            <div class="table-responsive">
              <table class="table table-striped align-middle text-nowrap">
                <thead>
                  <tr style="color:#2c3e50;">
                    <th colspan="2"></th>
                    <th colspan="4">得分</th>
                    <th colspan="5">失誤</th>
                  </tr>
                  <tr style="background-color:#2c3e50; color:white">
                    <th scope="col">球員</th>
                    <th scope="col">位置</th>
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
                      <div class=" col-auto mx-2 my-2 d-flex align-items-center">
                        <span class="badge bg-primary text-wrap mx-1" style="width:35px">2</span>
                        <span class="text-nowrap">蘇名偉</span>
                      </div>
                    </td>
                    <td class="border-start">OP</td>
                    <td class="border-start">4</td>
                    <th>1</th>
                    <td>1</td>
                    <td>6</td>
                    <td class="border-start">1</td>
                    <th>1</th>
                    <td>0</td>
                    <td>0</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>
                      <div class=" col-auto mx-2 my-2 d-flex align-items-center">
                        <span class="badge bg-warning text-wrap mx-1" style="width:35px">12</span>
                        <span class="text-nowrap">蘇名偉偉</span>
                      </div>
                    </td>
                    <td class="border-start">MB</td>
                    <td class="border-start">5</td>
                    <th>3</th>
                    <td>0</td>
                    <td>8</td>
                    <td class="border-start">2</td>
                    <th>3</th>
                    <td>1</td>
                    <td>0</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td>
                      <div class=" col-auto mx-2 my-2 d-flex align-items-center">
                        <span class="badge bg-success text-wrap mx-1" style="width:35px">33</span>
                        <span class="text-nowrap">蘇名</span>
                      </div>
                    </td>
                    <td class="border-start">S</td>
                    <td class="border-start">0</td>
                    <th>2</th>
                    <td>2</td>
                    <td>4</td>
                    <td class="border-start">1</td>
                    <th>2</th>
                    <td>1</td>
                    <td>2</td>
                    <td>6</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr>
            <h3 class="d-flex text-start align-items-center"><i class="fa-regular fa-face-grimace"></i>&nbsp;對手攻擊落點</h3>
            <div class="container">
              <div class="row">
                <div class="col-md-4 col-sm-12">
                  <h5 class="mt-3">Game 1</h5>
                  <div class="container border border-2 border-dark">
                    <div class="row border-bottom border-2 border-dark">
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-primary score_point" >1</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-danger score_point" >7</small>
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-primary score_point" >1</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-danger score_point" >7</small>
                        <small class="badge bg-danger score_point" >27</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-warning score_point" >22</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-primary score_point" >1</small>
                      </div>
                    </div>
                    <div class="row border-bottom border-dark-50">
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-danger score_point" >27</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-danger score_point" >7</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-warning score_point" >22</small>
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-danger score_point" >7</small>
                      </div>
                      <div class="col" style="height:90px"> 
                        <small class="badge bg-danger score_point" >27</small>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-warning score_point" >5</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-warning score_point" >5</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-primary score_point" >1</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-primary score_point" >1</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-12">
                  <h5 class="mt-3">Game 2</h5>
                  <div class="container border border-2 border-dark">
                    <div class="row border-bottom border-2 border-dark">
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-primary score_point" >1</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-danger score_point" >7</small>
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-primary score_point" >1</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-danger score_point" >7</small>
                        <small class="badge bg-danger score_point" >27</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-warning score_point" >22</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-primary score_point" >1</small>
                      </div>
                    </div>
                    <div class="row border-bottom border-dark-50">
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-danger score_point" >27</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-danger score_point" >7</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-warning score_point" >22</small>
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-danger score_point" >7</small>
                      </div>
                      <div class="col" style="height:90px"> 
                        <small class="badge bg-danger score_point" >27</small>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-warning score_point" >5</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-warning score_point" >5</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-primary score_point" >1</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-primary score_point" >1</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-12">
                  <h5 class="mt-3">Game 3</h5>
                  <div class="container border border-2 border-dark">
                    <div class="row border-bottom border-2 border-dark">
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-primary score_point" >1</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-danger score_point" >7</small>
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-primary score_point" >1</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-danger score_point" >7</small>
                        <small class="badge bg-danger score_point" >27</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-warning score_point" >22</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-primary score_point" >1</small>
                      </div>
                    </div>
                    <div class="row border-bottom border-dark-50">
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-danger score_point" >27</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-danger score_point" >7</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-warning score_point" >22</small>
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-danger score_point" >7</small>
                      </div>
                      <div class="col" style="height:90px"> 
                        <small class="badge bg-danger score_point" >27</small>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-warning score_point" >5</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-warning score_point" >5</small>
                      </div>
                      <div class="col" style="height:90px">
                        <small class="badge bg-danger score_point" >27</small>
                        <small class="badge bg-primary score_point" >1</small>
                        <small class="badge bg-warning score_point" >5</small>
                        <small class="badge bg-primary score_point" >1</small>
                      </div>
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
  
}
</script>

<style scoped>
.score_point{
  font-size: 3px; 
  margin: 1px;
}
</style>