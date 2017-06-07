<script>
    export default {
        name: 'scroll',
        data () {
            return {
                scrolled: false
            }
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
        }
    }
  </script>
