<template>
  <div class="container">
    <div class="col-md-6">
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-bs-ride="true"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              :src="`http://localhost:3000/static/images/${product.img1}`"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="col-md-6">
      <h2>{{ product.product_name }}</h2>
      <p>{{ product.category_name }} | {{ product.supplier_name }}</p>
      <h3>{{ $convertNumberFormat(product.original_price, '#,###') }}원</h3>
    </div>
  </div>
  <div class="row">
    <img :src="`http://localhost:3000/static/images/${product.img2}`" alt="" />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      product_id: '',
      searchName: '',
      product: {}
    }
  },
  setup() {},
  created() {
    this.product_id = this.$route.query.product_id
  },
  mounted() {
    this.getProduct()
    console.log(this.product)
  },
  unmounted() {},
  methods: {
    async getProduct() {
      this.product = await this.$get(
        `http://localhost:3000/api/product/${this.product_id}`
      )
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
            // this.$router.push({ path: '/template/listtodetail' })
          }
        }
      })
    },

    goToList() {
      this.$router.push({
        path: '/supplier/list'
        // name: 'supplier_detail'
      })
    }
  }
}
</script>
