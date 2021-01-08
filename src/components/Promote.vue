<template>
  <div class="modal-card" :class="{'is-active': isActive}">
    <section class="modal-card-body">
      <div class="buttons">
        <div v-bind:class='[pieces]'>
          <b-button class="button" type="button" @click="close('q')">
            <div class="piece queen" v-bind:class='[color]' />
          </b-button>
        </div>
        <div v-bind:class='[pieces]'>
          <b-button class="button" type="button" @click="close('r')">
            <div class="piece rook" v-bind:class='[color]' />
          </b-button>
        </div>
        <div v-bind:class='[pieces]'>
          <b-button class="button" type="button" @click="close('b')">
            <div class="piece bishop" v-bind:class='[color]' />
          </b-button>
        </div>
        <div v-bind:class='[pieces]'>
          <b-button class="button" type="button" @click="close('n')">
            <div class="piece knight" v-bind:class='[color]' />
          </b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PromotionModal',
  props: {
    visible: {
      type: Boolean
    },
    pieceStyle: {
      type: String,
      default: 'merida'
    },
    turn: {
      type: String,
      default: 'white'
    }
  },
  data: function () {
    return {
      isActive: this.visible,
      pieces: this.pieceStyle,
      color: this.turn
    }
  },
  methods: {
    close (p) {
      if (p !== undefined) {
        this.$emit('promote', p)
      }
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  /* THEME CUSTOMIZATION*/
  .modal-card {
      width: fit-content;
      height: fit-content;
  }
  .modal-card-body {
    width: fit-content;
    height: fit-content;
  }

  /*
   * Pieces
   */
  .merida  .button .piece.bishop.white {
    background-image: url(../assets/chesspieces/merida-svg/wB.svg);
    background-size: cover;
    width: 40px;
    height: 40px;
}
  .merida  .button .piece.knight.white {
    background-image: url(../assets/chesspieces/merida-svg/wN.svg);
    background-size: cover;
    width: 40px;
    height: 40px;
}
  .merida  .button .piece.rook.white {
    background-image: url(../assets/chesspieces/merida-svg/wR.svg);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .merida  .button .piece.queen.white {
    background-image: url(../assets/chesspieces/merida-svg/wQ.svg);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .merida  .button .piece.bishop.black {
    background-image: url(../assets/chesspieces/merida-svg/bB.svg);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .merida  .button .piece.knight.black {
    background-image: url(../assets/chesspieces/merida-svg/bN.svg);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .merida  .button .piece.rook.black {
    background-image: url(../assets/chesspieces/merida-svg/bR.svg);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .merida  .button .piece.queen.black {
    background-image: url(../assets/chesspieces/merida-svg/bQ.svg);
    background-size: cover;
    width: 40px;
    height: 40px;
  }

  /* Wikipedia */
  .wikipedia  .button .piece.bishop.white {
    background-image: url(../assets/chesspieces/wikipedia/wB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .wikipedia  .button .piece.knight.white {
    background-image: url(../assets/chesspieces/wikipedia/wN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .wikipedia  .button .piece.rook.white {
    background-image: url(../assets/chesspieces/wikipedia/wR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .wikipedia  .button .piece.queen.white {
    background-image: url(../assets/chesspieces/wikipedia/wQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .wikipedia .button .piece.bishop.black {
    background-image: url(../assets/chesspieces/wikipedia/bB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .wikipedia .button .piece.knight.black {
    background-image: url(../assets/chesspieces/wikipedia/bN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .wikipedia .button .piece.rook.black {
    background-image: url(../assets/chesspieces/wikipedia/bR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .wikipedia .button .piece.queen.black {
    background-image: url(../assets/chesspieces/wikipedia/bQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  /* Alpha */
  .alpha .button .piece.bishop.white {
    background-image: url(../assets/chesspieces/alpha/wB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .alpha .button .piece.knight.white {
    background-image: url(../assets/chesspieces/alpha/wN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .alpha .button .piece.rook.white {
    background-image: url(../assets/chesspieces/alpha/wR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .alpha .button .piece.queen.white {
    background-image: url(../assets/chesspieces/alpha/wQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .alpha .button .piece.bishop.black {
    background-image: url(../assets/chesspieces/alpha/bB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .alpha .button .piece.knight.black {
    background-image: url(../assets/chesspieces/alpha/bN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .alpha  .button .piece.rook.black {
    background-image: url(../assets/chesspieces/alpha/bR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .alpha  .button .piece.queen.black {
    background-image: url(../assets/chesspieces/alpha/bQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  /* Beyer */
  .beyer  .button .piece.bishop.white {
    background-image: url(../assets/chesspieces/beyer/wB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .beyer  .button .piece.knight.white {
    background-image: url(../assets/chesspieces/beyer/wN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .beyer  .button .piece.rook.white {
    background-image: url(../assets/chesspieces/beyer/wR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .beyer  .button .piece.queen.white {
    background-image: url(../assets/chesspieces/beyer/wQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .beyer  .button .piece.bishop.black {
    background-image: url(../assets/chesspieces/beyer/bB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .beyer  .button .piece.knight.black {
    background-image: url(../assets/chesspieces/beyer/bN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .beyer  .button .piece.rook.black {
    background-image: url(../assets/chesspieces/beyer/bR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .beyer  .button .piece.queen.black {
    background-image: url(../assets/chesspieces/beyer/bQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  /* Case */
  .case  .button .piece.bishop.white {
    background-image: url(../assets/chesspieces/case/wB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .case  .button .piece.knight.white {
    background-image: url(../assets/chesspieces/case/wN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .case  .button .piece.rook.white {
    background-image: url(../assets/chesspieces/case/wR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .case  .button .piece.queen.white {
    background-image: url(../assets/chesspieces/case/wQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .case  .button .piece.bishop.black {
    background-image: url(../assets/chesspieces/case/bB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .case  .button .piece.knight.black {
    background-image: url(../assets/chesspieces/case/bN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .case  .button .piece.rook.black {
    background-image: url(../assets/chesspieces/case/bR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .case  .button .piece.queen.black {
    background-image: url(../assets/chesspieces/case/bQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .case  .button .piece.king.black {
    background-image: url(../assets/chesspieces/case/bK.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  /* Chesscom */
  .chesscom  .button .piece.bishop.white {
    background-image: url(../assets/chesspieces/chesscom/wb.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .chesscom  .button .piece.knight.white {
    background-image: url(../assets/chesspieces/chesscom/wn.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .chesscom  .button .piece.rook.white {
    background-image: url(../assets/chesspieces/chesscom/wr.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .chesscom  .button .piece.queen.white {
    background-image: url(../assets/chesspieces/chesscom/wq.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .chesscom  .button .piece.bishop.black {
    background-image: url(../assets/chesspieces/chesscom/bb.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .chesscom  .button .piece.knight.black {
    background-image: url(../assets/chesspieces/chesscom/bn.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .chesscom  .button .piece.rook.black {
    background-image: url(../assets/chesspieces/chesscom/br.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .chesscom  .button .piece.queen.black {
    background-image: url(../assets/chesspieces/chesscom/bq.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  /* Condal */
  .condal  .button .piece.bishop.white {
    background-image: url(../assets/chesspieces/condal/wB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .condal  .button .piece.knight.white {
    background-image: url(../assets/chesspieces/condal/wN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .condal  .button .piece.rook.white {
    background-image: url(../assets/chesspieces/condal/wR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .condal  .button .piece.queen.white {
    background-image: url(../assets/chesspieces/condal/wQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .condal  .button .piece.bishop.black {
    background-image: url(../assets/chesspieces/condal/bB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .condal  .button .piece.knight.black {
    background-image: url(../assets/chesspieces/condal/bN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .condal  .button .piece.rook.black {
    background-image: url(../assets/chesspieces/condal/bR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .condal  .button .piece.queen.black {
    background-image: url(../assets/chesspieces/condal/bQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  /* Leipzig */
  .leipzig  .button .piece.bishop.white {
    background-image: url(../assets/chesspieces/leipzig/wB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .leipzig  .button .piece.knight.white {
    background-image: url(../assets/chesspieces/leipzig/wN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .leipzig  .button .piece.rook.white {
    background-image: url(../assets/chesspieces/leipzig/wR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .leipzig  .button .piece.queen.white {
    background-image: url(../assets/chesspieces/leipzig/wQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .leipzig  .button .piece.bishop.black {
    background-image: url(../assets/chesspieces/leipzig/bB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .leipzig  .button .piece.knight.black {
    background-image: url(../assets/chesspieces/leipzig/bN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .leipzig  .button .piece.rook.black {
    background-image: url(../assets/chesspieces/leipzig/bR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .leipzig  .button .piece.queen.black {
    background-image: url(../assets/chesspieces/leipzig/bQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  /* Maya */
  .maya  .button .piece.bishop.white {
    background-image: url(../assets/chesspieces/maya/wB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .maya  .button .piece.knight.white {
    background-image: url(../assets/chesspieces/maya/wN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .maya  .button .piece.rook.white {
    background-image: url(../assets/chesspieces/maya/wR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .maya  .button .piece.queen.white {
    background-image: url(../assets/chesspieces/maya/wQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .maya  .button .piece.bishop.black {
    background-image: url(../assets/chesspieces/maya/bB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .maya  .button .piece.knight.black {
    background-image: url(../assets/chesspieces/maya/bN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .maya  .button .piece.rook.black {
    background-image: url(../assets/chesspieces/maya/bR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .maya  .button .piece.queen.black {
    background-image: url(../assets/chesspieces/maya/bQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  /* USCF */
  .uscf  .button .piece.bishop.white {
    background-image: url(../assets/chesspieces/uscf/wB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .uscf  .button .piece.knight.white {
    background-image: url(../assets/chesspieces/uscf/wN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .uscf  .button .piece.rook.white {
    background-image: url(../assets/chesspieces/uscf/wR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .uscf  .button .piece.queen.white {
    background-image: url(../assets/chesspieces/uscf/wQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .uscf  .button .piece.bishop.black {
    background-image: url(../assets/chesspieces/uscf/bB.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .uscf  .button .piece.knight.black {
    background-image: url(../assets/chesspieces/uscf/bN.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .uscf  .button .piece.rook.black {
    background-image: url(../assets/chesspieces/uscf/bR.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .uscf  .button .piece.queen.black {
    background-image: url(../assets/chesspieces/uscf/bQ.png);
    background-size: cover;
    width: 40px;
    height: 40px;
  }

</style>
