<template>
  <div class="home">
    <Chessboard :edit=false :onPromotion=promote :fen=currentFen />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Chessboard from '@/components/Chessboard.vue'
import '../assets/styles/themes.css'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Chessboard
  },
  data () {
    return {
      currentFen: 'rnbq2nr/pppppkbP/8/8/8/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'
    }
  },
  methods: {
    async promote () {
      const { value: p } = await this.$swal({
        title: 'Select the promotion figure',
        input: 'radio',
        inputOptions: {
          q: '♕',
          r: '♖',
          b: '♗',
          n: '♘'
        }
      })
      return p
    }
  }
}
</script>
