import {
  defineConfig, presetAttributify, presetUno,
  presetIcons,
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetRemToPx(),
  ],
})