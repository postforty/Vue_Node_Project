<template>
  <div class="container">
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Product No</label>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          v-model.trim="product.product_no"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Product Name</label>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          v-model.trim="product.product_name"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Category</label>
      <div class="col-sm-10">
        <select v-model="product.product_category_id" class="form-select">
          <option
            :value="category.product_category_id"
            :key="category.product_category_id"
            v-for="category in categoryList"
          >
            {{ category.category_name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Supplier</label>
      <div class="col-sm-10">
        <select v-model="product.supplier_id" class="form-select">
          <option
            :value="supplier.supplier_id"
            :key="supplier.supplier_id"
            v-for="supplier in supplierList"
          >
            {{ supplier.supplier_name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Original Price</label>
      <div class="col-sm-10">
        <input
          type="number"
          class="form-control"
          v-model.number="product.original_price"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Sales Price</label>
      <div class="col-sm-10">
        <input
          type="number"
          class="form-control"
          v-model.number="product.sales_price"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Stock</label>
      <div class="col-sm-10">
        <input
          type="number"
          class="form-control"
          v-model.number="product.stock"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Photo</label>
      <div class="col-sm-10">
        <button class="btn btn-danger" @click="$refs.file.click()">
          ????????? ?????????
        </button>
        <input
          type="file"
          style="display: none"
          ref="file"
          accept="image/png, image/jpeg"
          @change="uploadImage($event.target.files)"
        />
        <img :src="imgSrc" alt="" style="width: 200px; height: auto" />
      </div>
    </div>
    <button class="btn btn-secondary me-1" @click="goToList">??????</button>
    <button class="btn btn-primary" @click="doSave">??????</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      id: '',
      searchName: '',
      categoryList: [],
      supplierList: [],
      imgSrc: '',
      product: {
        product_no: '',
        product_name: '',
        product_category_id: -1,
        supplier_id: -1,
        original_price: 0,
        sales_price: 0,
        stock: 0,
        img1: '',
        discount_type: 'P',
        discount: 0
      }
    }
  },
  setup() {},
  created() {
    this.getCategoryList()
    this.getSupplierList()
  },
  mounted() {},
  unmounted() {},
  methods: {
    async uploadImage(files) {
      const r = await this.$upload('/api/upload/image', files[0])
      console.log(r)
      this.imgSrc = `http://localhost:3000/static/images/${r.filename}`
      this.product.img1 = r.filename
    },
    async getCategoryList() {
      this.categoryList = await this.$get('/api/product/category')
    },
    async getSupplierList() {
      this.supplierList = await this.$get('/api/supplier')
    },
    async doSave() {
      if (this.product.product_no === '') {
        return this.$swal('Product No??? ???????????????.')
      }

      this.$swal({
        title: '????????? ?????? ???????????????????',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '??????',
        confirmButtonText: '??????'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const loader = this.$loading.show({ canCancel: false })

          const r = await this.$post('http://localhost:3000/api/product', {
            param: this.product
          })

          loader.hide()

          console.log(r)
          if (r.status === 200) {
            this.$swal('?????? ????????? ?????????????????????.')
            // this.$router.push({
            //   path: '/supplier/detail',
            //   query: { supplier_id: r.data.insertId }
            // })
          }
        }
      })
    },

    goToList() {
      this.$router.push({
        path: '/supplier/list'
      })
    }
  }
}
</script>
