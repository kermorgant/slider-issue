import '../css/design.less';

import Vue from 'vue'
import { navbar } from 'vue-strap'
import { dropdown } from 'vue-strap'
import sliderbasic from './components/slider_basic.vue'
//import { scroll } from './components/scroll-above-100.vue'
//import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import carrousel from './components/vue-awesome-slider.vue'


new Vue({
    el: '#app',
    components: {
        sliderbasic,
        navbar,
        dropdown,
        // swiper,
        // swiperSlide,
        // carrousel,
    },
    data: {
        scrolled: false,
        swiperOption: {},
    },
    methods: {
        handleScroll () {
            this.scrolled = window.scrollY > 100;
        },
        onSlideChangeStart (currentPage) {
            console.log('onSlideChangeStart', currentPage);
        },
        onSlideChangeEnd (currentPage) {
            console.log('onSlideChangeEnd', currentPage);
        },
    },
    created () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
})


require('jquery');
// require('plugins/bootstrap/js/bootstrap.js');
// require('plugins/owl-carousel/owl-carousel/owl.carousel.js');
// require('plugins/smoothScroll.js');
// require('./owl');
require('./custom');
