<style lang="sass">
@import "../utils/common.scss"
</style>
<template>
<div>
  <slider :pages="someList" :sliderinit="sliderinit" @slide='slide'>
  <!-- slot  -->
  </slider>
</div>
</template>
<script>
import slider from './slider.vue'
export default {
  name: 'sliderbasic',
  data () {
    return {
      someList: [
        {
          title: 'slide1',
          style: {
             background:'url(assets/images/slider/airport.jpg)'
            //'background': '#1bbc9b'
          }
        },
        {
          title: 'slide2',
          style: {
            background:'url(assets/images/slider/engineering.jpg)'
          }
        },
        {
          title: 'slide3',
          style: {
            background:'url(assets/images/slider/cargo.jpg)'
          }
        }
      ],
      sliderinit: {
        currentPage: 0,
        thresholdTime: 500,
        thresholdDistance: 100,
        slideSpeed:500,
        loop:true,
        autoplay: 6000
      }
    }
  },
  components: {
    slider
  },
  methods: {
    turnTo (num) {
      this.$children[0].$emit('slideTo', num)
    },
    slideNext () {
      this.$children[0].$emit('slideNext')
    },
    slidePre () {
      this.$children[0].$emit('slidePre')
    },
    appendslider () {
      this.someList.push({
        title: 'slidernew',
        style: {
          background: '#333',
          color: '#fff'
        }
      })
    },
    slide (pagenum) {
      console.log('currentPage:' + pagenum)
    }
  }
}
</script>
