/**
 * Hyperdrive Portfolio - Main Entry Point
 * 
 * @author Juan Lias
 * @email contact@juanlias.com
 * @github https://github.com/juanlias
 * @year 2025
 * @license MIT
 */

import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import './style.css'

createApp(App)
  .use(i18n)
  .mount('#app')
