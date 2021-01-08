<template>
  <div class="home">
    <Chessboard :boardStyle=boardStyle :pieceStyle=pieceStyle :edit=false :fen=currentFen />
  </div>
</template>

<script>
// @ is an alias to /src
import Chessboard from '@/components/Chessboard.vue'

export default {
  name: 'Home',
  components: {
    Chessboard
  },
  data () {
    return {
      boardStyle: 'blue',
      pieceStyle: 'alpha',
      currentFen: 'rnbq2nr/pppppkbP/8/8/8/8/PPPP1PPp/RNBQKBNR w KQ - 1 5'
    }
  }
}
</script>
