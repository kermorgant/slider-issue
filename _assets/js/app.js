import '../css/design.less';

import Vue from 'vue'
import { navbar } from 'vue-strap'
import { dropdown } from 'vue-strap'

new Vue({
    el: '#app',
    //render: h => h(sliderbasic),
    components: {
        navbar,
        dropdown,
    },
    data: {
        scrolled: false
    },
    methods: {
        handleScroll () {
            this.scrolled = window.scrollY > 100;
        }
    },
    created () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
})


require('jquery');
// require('plugins/smoothScroll.js');
require('./custom');
