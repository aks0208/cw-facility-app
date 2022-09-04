import Vue from 'vue'

import VModal from 'vue-js-modal/dist/ssr.nocss.js'
import 'vue-js-modal/dist/styles.css';

Vue.use(VModal, {
    dynamic: true,
    maxHeight: 300,
})
