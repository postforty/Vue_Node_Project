<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">DandyBoard</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: $route.path == '/home' }"
                aria-current="page"
                @click="goToMenu('/home')"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: $route.path == '/product/category' }"
                @click="goToMenu('/product/category')"
                >Category</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: $route.path == '/supplier/list' }"
                @click="goToMenu('/supplier/list')"
                >Supplier</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: $route.path == '/product/list' }"
                @click="goToMenu('/product/list')"
                >Product</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: $route.path == '/order/create' }"
                @click="goToMenu('/order/create')"
                >Order</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: $route.path == '/shipper' }"
                @click="goToMenu('/shipper')"
                >Shipper</a
              >
            </li>
          </ul>
          <!-- <div class="d-flex">
            <span v-if="userInfo.name" class="text-white">{{
              userInfo.name
            }}</span>
            <button class="btn btn-outline-success" @click="logout">
              ????????????
            </button>
          </div> -->
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  // computed: {
  //   userInfo() {
  //     return this.$store.state.user.userInfo
  //   }
  // },
  methods: {
    goToMenu(path) {
      this.$router.push({ path: path })
    }
    // logout() {
    //   this.$store.commit('user/logout')

    //   this.$router.push({ path: '/' })
    // }
  }
}
</script>
<style>
header {
  margin-bottom: 70px;
}
</style>
