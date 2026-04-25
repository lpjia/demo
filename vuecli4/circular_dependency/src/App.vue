<template>
  <div id="app">
    <Header />

    <div class="w-77px" flex>
      <About />
      <Home />
    </div>
    <div>
      <button class="
      py-2
      px-4
      font-semibold
      rounded-lg
      shadow-md
      text-white
      bg-green-500
      hover:bg-green-700
      border-none
      cursor-pointer
    ">
        Click me
      </button>
      <button p="y-2 x-4" font="semibold" shadow="lg" text="white" bg="green-500 hover:green-700"
        border="rounded-lg none " cursor="pointer">Click me</button>
      <button class=""></button>
    </div>

    <div class="mt-10 p-5">
      <ProductInfo :item="item" />
    </div>

  </div>
</template>

<script>
import About from './components/About.vue'
import Header from './components/Header.vue'
import Home from './components/Home.vue'
import ProductInfo from './components/ProductInfo.vue'

export default {
  name: 'App',
  components: {
    About,
    Home,
    Header,
    ProductInfo,
  },
  data() {
    return {
      item: {
        name: 'Goods',
        price: 10,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing',
      },
    }
  }
}
</script>

<style>
</style>
