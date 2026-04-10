import {
  defineConfig,
  presetUno, presetAttributify, presetIcons,
  transformerDirectives
} from 'unocss'
// import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})