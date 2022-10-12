<template>
  <div class="container">
    <!-- 조회조건 -->
    <div class="row row-cols-lg-auto g-3 align-items-center mb-2">
      <div class="col-12">
        <input
          type="search"
          class="form-control"
          v-model.trim="searchName"
          @keyup.enter="getCustomers"
          placeholder="Name"
        />
      </div>
      <div class="col-12">
        <button class="btn btn-primary me-1" @click="getList">조회</button>
        <button class="btn btn-success me-1" @click="openModal">생성</button>
        <button class="btn btn-info me-1" @click="doExcel">엑셀다운로드</button>
      </div>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.product_category_id" v-for="item in list">
          <td>{{ item.product_category_id }}</td>
          <td>{{ item.category_name }}</td>
          <td>{{ item.category_description }}</td>
          <td>
            <button
              class="btn btn-success me-1"
              data-bs-toggle="modal"
              data-bs-target="#categoryModal"
              @click="openModal(item.product_category_id)"
            >
              수정</button
            ><button class="btn btn-danger" @click="doDelete">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div
      class="modal fade"
      id="categoryModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">카테고리</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row mb-3">
              <label class="col-sm-3 col-form-label">Name</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="selectedItem.category_name"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-3 col-form-label"
                >category_description</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="selectedItem.category_description"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      headers: [
        { title: 'ID', key: 'product_category_id' },
        { title: 'Name', key: 'category_name' },
        { title: 'Description', key: 'category_description' }
      ],
      list: [],
      searchName: '',
      selectedItem: {
        product_category_id: -1,
        category_name: '',
        category_description: ''
      }
    }
  },
  setup() {},
  created() {},
  async mounted() {
    this.list = await this.$get('/api/product/category')
  },
  unmounted() {},
  methods: {
    async getList() {
      const loader = this.$loading.show({ canCancel: false })
      this.list = await this.$get('/api/product/category')
      loader.hide()
    },
    doExcel() {
      this.$ExcelFromTable(this.headers, this.list, 'category', {})
    },
    doDelete() {},
    doSave() {},
    doCreate() {},
    openModal(id) {
      console.log('openModal', this.list)
      console.log('id', id)
      this.selectedItem = this.list.filter(
        (item) => item.product_category_id === id
      )[0]
    }
  }
}
</script>
