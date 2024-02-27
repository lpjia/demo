<script setup>
import { ref, vModelText } from 'vue'

const _vModelText = vModelText

_vModelText.updated = (el, { value, modifiers: { capitalize } }) => {
  if (capitalize && value.hasOwnProperty(0)) {
    el.value = value[0].toUpperCase() + value.substring(1)
  }
}

const v = ref("")
</script>

<template>
  <input type="text" v-model.capitalize="v" />
  <br>
  <input type="text" v-model="v" />
</template>