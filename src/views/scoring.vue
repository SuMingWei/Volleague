<template>
  <!-- <div class="row py-4 px-4" style="background-color:#EAECEE">  -->
  <div>
    <div class="card text-center">
      <!-- 計分表 -->
      <div class="card-body mx-1">
        <div class="card" style="border: none">
          <div class="d-grid score-board text-center">
            <div class="d-grid scores text-center">
              <button class="btn btn-sm btn-primary" style="background-color: #e76f51; border: none;">土木系</button>
              <span class="justify-content-center mx-1 my-1" style="color: #e76f51; font-weight: bolder">2</span>
              <span class="justify-content-center mx-1 my-1" style="color: #e76f51; font-weight: bolder">16</span>
              <button class="btn btn-sm btn-primary" style="background-color: #2a9d8f; border: none;">資訊系</button>
              <span class="justify-content-center mx-1 my-1" style="color: #2a9d8f; font-weight: bolder">1</span>
              <span class="justify-content-center mx-1 my-1" style="color: #2a9d8f; font-weight: bolder">23</span>
            </div>

            <div class="d-grid round-controls text-center">
              <button class="btn btn-sm btn-outline-dark" style="color: #888; border-color: #888">下一局</button>
              <button class="btn btn-sm btn-outline-dark" style="color: #888; border-color: #888">結束比賽</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 上場球員 -->
      <div class="card-body"> 
        <div class="card fw-bold">
          <div class="card-head py-2" style="background-color:#E5E8E8">
            <span class="fw-bolder fs-5">
              <i class="fa-solid fa-people-group"></i> 上場球員
            </span>
          </div>
          <div class="card-body text-center" style="padding: 0.5em 0.5em !important">
            <div class="d-grid team-members-grid">
              <button type="button" class="btn btn-outline-secondary team-member">
                <span class="badge bg-danger text-wrap mx-0" style="">27</span> 張祐誠
              </button>
              <button type="button" class="btn btn-outline-secondary team-member">
                <span class="badge bg-warning text-wrap mx-0" style="">22</span> 張祐誠
              </button>
              <button type="button" class="btn btn-outline-secondary team-member">
                <span class="badge bg-success text-wrap mx-0" style="">33</span> 張祐誠
              </button>
              <button type="button" class="btn btn-outline-secondary team-member">
                <span class="badge bg-primary text-wrap mx-0" style="">02</span> 張祐誠
              </button>
              <button type="button" class="btn btn-outline-secondary team-member">
                <span class="badge bg-warning text-wrap mx-0" style="">09</span> 張祐誠
              </button>
              <button type="button" class="btn btn-outline-secondary team-member">
                <span class="badge bg-danger text-wrap mx-0" style="">34</span> 張祐誠
              </button>
              <button type="button" class="btn btn-outline-secondary team-member" style="grid-column-start: 2;">
                <span class="badge bg-secondary text-wrap mx-0" style="">34</span> 張祐誠
              </button>
              <div class="d-block text-end">
                <button class="btn text-black-50 mx-1 my-1"><i class="fa-solid fa-pencil fs-5"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 分頁標籤 -->
      <ul class="nav nav-tabs" id="myTab" role="tablist" style="margin: 1em 1em 0 1em;">
        <li class="nav-item" role="presentation">
          <button class="nav-link active fw-bold" id="record-tab" data-bs-toggle="tab" data-bs-target="#record-tab-pane" type="button" role="tab" aria-controls="record-tab-pane" aria-selected="true">記錄選項</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link fw-bold" id="history-tab" data-bs-toggle="tab" data-bs-target="#history-tab-pane" type="button" role="tab" aria-controls="history-tab-pane" aria-selected="false">歷史記錄</button>
        </li>
      </ul>
      <!-- 分頁標籤內容 -->
      <div class="tab-content border border-1 border-top-0" id="myTabContent" style="margin: 0em 1em 1em 1em;">
        <!-- 紀錄選項 -->
        <div class="tab-pane fade show active" id="record-tab-pane" role="tabpanel" aria-labelledby="record-tab" tabindex="0">
          <div class="card-body"> 
            <!-- 各球記錄 -->
            <div class="card mb-3 fw-bold">
              <div class="card-head py-2" style="background-color:#E5E8E8">
                <span class="fw-bolder fs-5">
                  <i class="far fa-clipboard"></i> 各球記錄
                </span>
              </div>
              <div class="card-body text-center">
                <div class="d-grid" style="grid-template-rows: 2fr 1fr ; row-gap: 5px ;">
                  <div class="d-grid" style="grid-template-columns: 1fr 1fr 1fr ; grid-template-rows: 1fr 1fr ; gap: 5px 5px">
                    <button type="button" class="btn btn-outline-secondary"> 攻擊 </button>
                    <button type="button" class="btn btn-outline-secondary"> 攔網 </button>
                    <button type="button" class="btn btn-outline-secondary"> 舉球 </button>
                    <button type="button" class="btn btn-outline-secondary"> 防守 </button>
                    <button type="button" class="btn btn-outline-secondary"> 發球 </button>
                    <button type="button" class="btn btn-outline-secondary"> 接發 </button>
                  </div>
                  <div class="d-grid" style="grid-template-columns: 1fr 1fr; gap: 5px 5px">
                    <button type="button" class="btn btn-outline-secondary"
                            style="background-color: #90be6d ; border-color: #90be6d !important ; color: #FFF"> 得分 </button>
                    <button type="button" class="btn btn-outline-secondary" 
                            style="background-color: #f08080 ; border-color: #f08080 !important ; color: #FFF"> 失誤 </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 落點記錄 -->
            <div class="card mb-3 fw-bold">
              <div class="card-head py-2" style="background-color:#E5E8E8">
                <span class="fw-bolder fs-5">
                  <i class="fas fa-volleyball-ball"></i> 落點記錄
                </span>
              </div>

              <div class="card-body text-center">
                <div class="d-grid" style="grid-template-rows: auto auto; row-gap: 5px;">
                  <!-- 場地九宮格 -->
                  <div class="container border border-2 border-dark" style="width: 272px; height: 272px">
                    <div class="row border-bottom border-2 border-dark" style="width: 270px">
                      <div class="d-flex col landing-spots" style="height: 90px">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> 1 </button>
                      </div>
                      <div class="d-flex col landing-spots" style="height: 90px">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> 2 </button>
                      </div>
                      <div class="d-flex col landing-spots" style="height: 90px">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> 3 </button>
                      </div>
                    </div>
                    <div class="row border-bottom border-2 border-dark-80" style="width: 270px">
                      <div class="d-flex col landing-spots" style="height: 90px">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> 4 </button>
                      </div>
                      <div class="d-flex col landing-spots" style="height: 90px">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> 5 </button>
                      </div>
                      <div class="d-flex col landing-spots" style="height: 90px">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> 6 </button>
                      </div>
                    </div>
                    <div class="row" style="width: 270px">
                      <div class="d-flex col landing-spots" style="height: 90px">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> 7 </button>
                      </div>
                      <div class="d-flex col landing-spots" style="height: 90px">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> 8 </button>
                      </div>
                      <div class="d-flex col landing-spots" style="height: 90px">
                        <button type="button" class="btn btn-outline-secondary" style="height: 50px; width: 50px"> 9 </button>
                      </div>
                    </div>
                  </div>

                  <!-- 右邊控制項 & 界外按鈕 -->
                  <div class="d-grid" style="grid-template-columns: 1fr 2fr; column-gap: 5px; width: 272px; margin: auto auto">
                    <div class="landing-spots">
                      <button type="button" class="btn btn-outline-secondary" style="padding: auto auto; height: 80px; width: 80px"> 
                        Touch Out
                      </button>
                    </div>

                    <div class="d-grid text-center" style="grid-template-rows: 0.75fr 1fr 1fr">
                      <p class="" style="margin: auto auto; grid-row-start: 1">輸入敵方背號</p>
                      <input type="text" id="fname" name="fname" size="1" class="mx-1 my-1" style="grid-row-start: 2">
                      <button type="button" class="btn btn-outline-secondary mx-1 my-1"
                              style="background-color: #90be6d; border-color: #90be6d !important; color: #FFF; grid-row-start: 3"> 
                            送出
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 本局歷史記錄 -->
        <div class="tab-pane fade" id="history-tab-pane" role="tabpanel" aria-labelledby="history-tab" tabindex="0">
          <!-- <h3 class="my-3">Filter: </h3> -->
          <div class="table-responsive-md mx-2 my-3 fw-bold text-center" style="max-height:400px">
            <table class="table table-striped align-middle text-nowrap">
              <thead class="sticky-top">
                <tr style="background-color:#2c3e50; color:white">
                  <th scope="col">球員</th>
                  <th scope="col">位置</th>
                  <th scope="col">內容</th>
                  <th scope="col">落點</th>
                  <th scope="col">功能</th>
                </tr>
              </thead>
              <tbody>
                <!-- row1 -->
                <tr>
                  <td class="">
                    <div class="col-auto d-flex align-items-center">
                      <span class="badge bg-primary text-wrapm mx-1" style="width:35px">2</span>
                      <span class="text-nowrap">蘇名偉</span>
                    </div>
                  </td>
                  <td class="border-start">OP</td>
                  <td class="border-start">攻擊失誤</td>
                  <td class="border-start">3</td>
                  <td class="border-start"> 
                    <button style="border-color: red; border-style: solid; border-radius: 20%">
                      <i class="fas fa-trash-alt" style="color: red"></i>
                    </button>
                  </td >
                </tr>
                <!-- row2 -->
                <tr>
                  <td>
                    <div class=" col-auto d-flex align-items-center">
                      <span class="badge bg-warning text-wrap mx-1" style="width:35px">22</span>
                      <span class="text-nowrap">蘇名</span>
                    </div>
                  </td>
                  <td class="border-start">MB</td>
                  <td class="border-start">攔網失誤</td>
                  <td class="border-start">2</td>
                  <td class="border-start"> 
                    <button style="border-color: red; border-style: solid; border-radius: 20%">
                      <i class="fas fa-trash-alt" style="color: red"></i>
                    </button>
                  </td >
                </tr>
                <!-- row3 -->
                <tr>
                  <td>
                    <div class="col-auto d-flex align-items-center">
                      <span class="badge bg-success text-wrap mx-1" style="width:35px">34</span>
                      <span class="text-nowrap">蘇蘇蘇</span>
                    </div>
                  </td>
                  <td class="border-start">S</td>
                  <td class="border-start">舉球失誤</td>
                  <td class="border-start">5</td>
                  <td class="border-start"> 
                    <button style="border-color: red; border-style: solid; border-radius: 20%">
                      <i class="fas fa-trash-alt" style="color: red"></i>
                    </button>
                  </td >
                </tr>
                <!-- row4 -->
                <tr>
                  <td>
                    <div class="col-auto d-flex align-items-center">
                      <span class="badge bg-success text-wrap mx-1" style="width:35px">34</span>
                      <span class="text-nowrap">蘇蘇蘇</span>
                    </div>
                  </td>
                  <td class="border-start">S</td>
                  <td class="border-start">舉球失誤</td>
                  <td class="border-start">5</td>
                  <td class="border-start"> 
                    <button style="border-color: red; border-style: solid; border-radius: 20%">
                      <i class="fas fa-trash-alt" style="color: red"></i>
                    </button>
                  </td >
                </tr>
                <!-- row5 -->
                <tr>
                  <td>
                    <div class="col-auto d-flex align-items-center">
                      <span class="badge bg-success text-wrap mx-1" style="width:35px">34</span>
                      <span class="text-nowrap">蘇蘇蘇</span>
                    </div>
                  </td>
                  <td class="border-start">S</td>
                  <td class="border-start">舉球失誤</td>
                  <td class="border-start">5</td>
                  <td class="border-start"> 
                    <button style="border-color: red; border-style: solid; border-radius: 20%">
                      <i class="fas fa-trash-alt" style="color: red"></i>
                    </button>
                  </td >
                </tr>
                <!-- row6 -->
                <tr>
                  <td>
                    <div class="col-auto d-flex align-items-center">
                      <span class="badge bg-success text-wrap mx-1" style="width:35px">34</span>
                      <span class="text-nowrap">蘇蘇蘇</span>
                    </div>
                  </td>
                  <td class="border-start">S</td>
                  <td class="border-start">舉球失誤</td>
                  <td class="border-start">5</td>
                  <td class="border-start"> 
                    <button style="border-color: red; border-style: solid; border-radius: 20%">
                      <i class="fas fa-trash-alt" style="color: red"></i>
                    </button>
                  </td >
                </tr>
                <!-- row7 -->
                <tr>
                  <td>
                    <div class="col-auto d-flex align-items-center">
                      <span class="badge bg-success text-wrap mx-1" style="width:35px">34</span>
                      <span class="text-nowrap">蘇蘇蘇</span>
                    </div>
                  </td>
                  <td class="border-start">S</td>
                  <td class="border-start">舉球失誤</td>
                  <td class="border-start">5</td>
                  <td class="border-start"> 
                    <button style="border-color: red; border-style: solid; border-radius: 20%">
                      <i class="fas fa-trash-alt" style="color: red"></i>
                    </button>
                  </td >
                </tr>
                <!-- row8 -->
                <tr>
                  <td>
                    <div class="col-auto d-flex align-items-center">
                      <span class="badge bg-success text-wrap mx-1" style="width:35px">34</span>
                      <span class="text-nowrap">蘇蘇蘇</span>
                    </div>
                  </td>
                  <td class="border-start">S</td>
                  <td class="border-start">舉球失誤</td>
                  <td class="border-start">5</td>
                  <td class="border-start"> 
                    <button style="border-color: red; border-style: solid; border-radius: 20%">
                      <i class="fas fa-trash-alt" style="color: red"></i>
                    </button>
                  </td >
                </tr>
                <!-- row9 -->
                <tr>
                  <td>
                    <div class="col-auto d-flex align-items-center">
                      <span class="badge bg-success text-wrap mx-1" style="width:35px">34</span>
                      <span class="text-nowrap">蘇蘇蘇</span>
                    </div>
                  </td>
                  <td class="border-start">S</td>
                  <td class="border-start">舉球失誤</td>
                  <td class="border-start">5</td>
                  <td class="border-start"> 
                    <button style="border-color: red; border-style: solid; border-radius: 20%">
                      <i class="fas fa-trash-alt" style="color: red"></i>
                    </button>
                  </td >
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    
  }
}

</script>

<style scoped>
.score-board {
  grid-template-columns: 7fr 2fr;
  column-gap: 15px;
}
.scores{
  grid-template-columns: 13fr 3fr 3fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 5px;
  row-gap: 5px;
  vertical-align: middle;
}
.round-controls {
  grid-template-rows: 1fr 1fr;
  row-gap: 5px;
}
.btn-outline-dark:hover {
  background-color: #888;
  color: #EEE !important;
}
.btn-primary:hover {
  border: none !important;
  border-color: transparent !important;
}
.team-members-grid {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  column-gap: 5px;
  row-gap: 5px;
}
.team-member {
  padding: 0.25em 0.25em !important;
}
.landing-spots {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>