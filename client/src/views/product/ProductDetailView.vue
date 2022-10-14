<template>
  <div class="container"></div>
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
  },
  unmounted() {},
  methods: {
    async getProduct() {
      this.product = await this.$get(
        `http://localhost:3000/api/product/${this.product_id}`
      )

      console.log(this.product)
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
