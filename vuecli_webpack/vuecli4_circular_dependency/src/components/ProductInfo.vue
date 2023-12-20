<template>
  <div class="ring-2 p-2 rounded-sm">
    <div class="flex py-2">
      <div class="w-20">name:</div>
      <div class="font-bold">{{ item.name }} </div>
    </div>
    <div class="flex py-2">
      <div class="w-20">price:</div>
      <div class="font-bold">¥{{ item.price }} </div>
    </div>
    <div class="flex py-2">
      <div class="w-30">description:</div>
      <div class="font-bold">{{ item.description }} </div>
    </div>
    <div class="flex py-2">
      <div class="w-40">related product:</div>
    </div>
    <div>
      <RelatedProduct :products="relatedProducts" />
    </div>
  </div>
</template>

<script>
import RelatedProduct from './RelatedProduct.vue';

export default {
  name: 'ProductInfo',
  components: {
    RelatedProduct
  },
  props: {
    item: {
      required: true
    }
  },
  data() {
    return {
      relatedProducts: [
        {
          name: 'Shoes',
          price: 120,
          description: 'Lorem, ipsum dolor sit amet consectetur adipisicing',
        },
        {
          name: 'Hat',
          price: 50,
          description: 'exercitationem, maxime dolores mollitia',
        },
        {
          name: 'Jacket',
          price: 150,
          description: 'Vero, hic minus omnis nemo, dolorum repellat',
        },
      ]
    };
  },
};
</script>