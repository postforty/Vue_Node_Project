<template>
  <div class="container">
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Customer</label>
      <div class="col-sm-10">
        <select class="form-select" v-model="header.customer_id">
          <option
            :value="customer.customer_id"
            :key="customer.customer_id"
            v-for="customer in customerList"
          >
            {{ customer.customer_name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Shipper</label>
      <div class="col-sm-10">
        <select class="form-select" v-model="header.shipper_id">
          <option
            :value="shipper.shipper_id"
            :key="shipper.shipper_id"
            v-for="shipper in shipperList"
          >
            {{ shipper.shipper_name }}
          </option>
        </select>
      </div>
    </div>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Price</th>
          <th>Category Name</th>
          <th>Supplier Name</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="product.product_id" v-for="product in productList">
          <td></td>
          <td>{{ product.product_name }}</td>
          <td>{{ $convertNumberFormat(product.original_price, '#,###') }}</td>
          <td>{{ product.category_name }}</td>
          <td>{{ product.supplier_name }}</td>
        </tr>
      </tbody>
    </table>
    <table></table>
    <button class="btn btn-secondary me-1" @click="goToList">목록</button>
    <button class="btn btn-primary" @click="doSave">저장</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      id: '',
      searchName: '',
      supplier: {
        supplier_name: '',
        email: '',
        phone: '',
        address: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        business_no: '',
        representative_name: ''
      },
      header: {
        customer_id: -1,
        shipper_id: -1
      },
      customerList: [],
      shipperList: [],
      productList: []
    }
  },
  setup() {},
  created() {
    this.getCustomerList()
    this.getShipperList()
    this.getProductList()
  },
  mounted() {},
  unmounted() {},
  methods: {
    async getCustomerList() {
      this.customerList = await this.$get('/api/customer')
    },
    async getShipperList() {
      this.shipperList = await this.$get('/api/shipper')
    },
    async getProductList() {
      this.productList = await this.$get('/api/product')
      // console.log('productList', this.productList)
    },
    async doSave() {
      if (this.supplier.supplier_name === '') {
        return this.$swal('Supplier Name을 입력하세요.')
      }

      this.$swal({
        title: '공급자를 생성 하시겠습니까?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '취소',
        confirmButtonText: '저장'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const loader = this.$loading.show({ canCancel: false })

          const r = await this.$post('http://localhost:3000/api/supplier', {
            param: this.supplier
          })

          loader.hide()

          console.log(r)
          if (r.status === 200) {
            this.$swal('공급자 정보가 저장되었습니다.')
            this.$router.push({
              path: '/supplier/detail',
              query: { supplier_id: r.data.insertId }
            })
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
