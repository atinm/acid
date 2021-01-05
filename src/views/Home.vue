<template>
  <div class="home">
    <Chessboard :boardStyle=boardStyle :pieceStyle=pieceStyle :edit=false :onPromotion=promote :fen=currentFen />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Chessboard from '@/components/Chessboard.vue'
// import '../assets/styles/themes.css'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Chessboard
  },
  data () {
    return {
      boardStyle: 'blue',
      pieceStyle: 'alpha',
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
<style>
/*
 * Chessground base css properties.
 */

  .cg-board-wrap {
    width: 800px;
    height: 800px;
    position: relative;
    display: block;
  }

  cg-helper {
    position: absolute;
    width: 12.5%;
    padding-bottom: 12.5%;
    display: table; /* hack: round to full pixel size in chrome */
    bottom: 0;
  }

  cg-container {
    position: absolute;
    width: 800%;
    height: 800%;
    display: block;
    bottom: 0;
  }

  cg-board {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    line-height: 0;
    background-size: cover;
    cursor: pointer;
  }

  cg-board square {
    position: absolute;
    top: 0;
    left: 0;
    width: 12.5%;
    height: 12.5%;
  }
  cg-board square.move-dest {
    background: radial-gradient(rgba(20, 85, 30, 0.5) 22%, #208530 0, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0) 0);
  }
  cg-board square.premove-dest {
    background: radial-gradient(rgba(20, 30, 85, 0.5) 22%, #203085 0, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0) 0);
  }
  cg-board square.oc.move-dest {
    background: radial-gradient(transparent 0%, transparent 80%, rgba(20, 85, 0, 0.3) 80%);
  }
  cg-board square.oc.premove-dest {
    background: radial-gradient(transparent 0%, transparent 80%, rgba(20, 30, 85, 0.2) 80%);
  }
  cg-board .cg-square.move-dest.drag-over,
  cg-board .cg-square.premove-dest.drag-over {
    box-shadow: inset 0 0 10px 2px rgba(216, 85, 0, 0.9);
  }
  cg-board square.last-move {
    will-change: transform;
    background-color: rgba(155, 199, 0, 0.41);
  }
  cg-board square.selected {
    background-color: rgba(20, 85, 30, 0.5);
  }
  cg-board square.check {
    background: radial-gradient(ellipse at center, rgba(255, 0, 0, 1) 0%, rgba(231, 0, 0, 1) 25%, rgba(169, 0, 0, 0) 89%, rgba(158, 0, 0, 0) 100%);
  }
  cg-board square.current-premove {
    background-color: rgba(20, 30, 85, 0.5);
  }
  cg-board piece {
    position: absolute;
    top: 0;
    left: 0;
    width: 12.5%;
    height: 12.5%;
    background-size: cover;
    z-index: 2;
    will-change: transform;
  }
  cg-board piece.dragging {
    cursor: move;
    z-index: 9;
  }
  cg-board piece.anim {
    z-index: 8;
  }
  cg-board piece.fading {
    z-index: 1;
    opacity: 0.5;
  }
  .cg-board-wrap div.over {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(20, 85, 30, 0.3);
  }
  .cg-board-wrap piece.ghost {
    opacity: 0.3;
  }
  .cg-board-wrap svg {
    overflow: hidden;
    position: relative;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    opacity: 0.6;
  }
  .cg-board-wrap svg image {
    opacity: 0.5;
  }
  .cg-board-wrap coords {
    position: absolute;
    display: flex;
    pointer-events: none;
    opacity: 0.8;
    font-size: 9px;
  }
  .cg-board-wrap coords.ranks {
    right: -15px;
    top: 0;
    flex-flow: column-reverse;
    height: 100%;
    width: 12px;
  }
  .cg-board-wrap coords.ranks.black {
    flex-flow: column;
  }
  .cg-board-wrap coords.files {
    bottom: -16px;
    left: 0;
    flex-flow: row;
    width: 100%;
    height: 16px;
    text-transform: uppercase;
    text-align: center;
  }
  .cg-board-wrap coords.files.black {
    flex-flow: row-reverse;
  }
  .cg-board-wrap coords coord {
    flex: 1 1 auto;
  }
  .cg-board-wrap coords.ranks coord {
    transform: translateY(39%);
  }

  /* THEME CUSTOMIZATION*/
  /*
   * Board
   */
   .blue .cg-wrap {
    background-image: url(../assets/board/blue.svg);
  }
  .brown .cg-wrap {
    background-image: url(../assets/board/brown.svg);
  }
  .zeit .cg-wrap {
    background-image: url(../assets/board/zeit.svg);
  }
  .chesscom .cg-wrap {
    background-image: url(../assets/board/chesscom.svg);
  }
  .informator .cg-wrap {
    background-image: url(../assets/board/informator.svg);
  }
  .sportverlag .cg-wrap {
    background-image: url(../assets/board/sportverlag.svg);
  }
  .beyer .cg-wrap {
    background-image: url(../assets/board/beyer.svg);
  }
  .falken .cg-wrap {
    background-image: url(../assets/board/falken.svg);
  }
  .green .cg-wrap {
    background-image: url(../assets/board/green.svg);
  }

  /*
   * Board
   */
  .merida  cg-board piece.pawn.white {
    background-image: url(../assets/chesspieces/merida-svg/wP.svg);
  }
  .merida  cg-board piece.bishop.white {
    background-image: url(../assets/chesspieces/merida-svg/wB.svg);
  }
  .merida  cg-board piece.knight.white {
    background-image: url(../assets/chesspieces/merida-svg/wN.svg);
  }
  .merida  cg-board piece.rook.white {
    background-image: url(../assets/chesspieces/merida-svg/wR.svg);
  }
  .merida  cg-board piece.queen.white {
    background-image: url(../assets/chesspieces/merida-svg/wQ.svg);
  }
  .merida  cg-board piece.king.white {
    background-image: url(../assets/chesspieces/merida-svg/wK.svg);
  }
  .merida  cg-board piece.pawn.black {
    background-image: url(../assets/chesspieces/merida-svg/bP.svg);
  }
  .merida  cg-board piece.bishop.black {
    background-image: url(../assets/chesspieces/merida-svg/bB.svg);
  }
  .merida  cg-board piece.knight.black {
    background-image: url(../assets/chesspieces/merida-svg/bN.svg);
  }
  .merida  cg-board piece.rook.black {
    background-image: url(../assets/chesspieces/merida-svg/bR.svg);
  }
  .merida  cg-board piece.queen.black {
    background-image: url(../assets/chesspieces/merida-svg/bQ.svg);
  }
  .merida  cg-board piece.king.black {
    background-image: url(../assets/chesspieces/merida-svg/bK.svg);
  }

  /* Wikipedia */
  .wikipedia  cg-board piece.pawn.white {
    background-image: url(../assets/chesspieces/wikipedia/wP.png);
  }
  .wikipedia  cg-board piece.bishop.white {
    background-image: url(../assets/chesspieces/wikipedia/wB.png);
  }
  .wikipedia  cg-board piece.knight.white {
    background-image: url(../assets/chesspieces/wikipedia/wN.png);
  }
  .wikipedia  cg-board piece.rook.white {
    background-image: url(../assets/chesspieces/wikipedia/wR.png);
  }
  .wikipedia  cg-board piece.queen.white {
    background-image: url(../assets/chesspieces/wikipedia/wQ.png);
  }
  .wikipedia cg-board piece.king.white {
    background-image: url(../assets/chesspieces/wikipedia/wK.png);
  }
  .wikipedia cg-board piece.pawn.black {
    background-image: url(../assets/chesspieces/wikipedia/bP.png);
  }
  .wikipedia cg-board piece.bishop.black {
    background-image: url(../assets/chesspieces/wikipedia/bB.png);
  }
  .wikipedia cg-board piece.knight.black {
    background-image: url(../assets/chesspieces/wikipedia/bN.png);
  }
  .wikipedia cg-board piece.rook.black {
    background-image: url(../assets/chesspieces/wikipedia/bR.png);
  }
  .wikipedia cg-board piece.queen.black {
    background-image: url(../assets/chesspieces/wikipedia/bQ.png);
  }
  .wikipedia cg-board piece.king.black {
    background-image: url(../assets/chesspieces/wikipedia/bK.png);
  }
  /* Alpha */
  .alpha cg-board piece.pawn.white {
    background-image: url(../assets/chesspieces/alpha/wP.png);
  }
  .alpha cg-board piece.bishop.white {
    background-image: url(../assets/chesspieces/alpha/wB.png);
  }
  .alpha cg-board piece.knight.white {
    background-image: url(../assets/chesspieces/alpha/wN.png);
  }
  .alpha cg-board piece.rook.white {
    background-image: url(../assets/chesspieces/alpha/wR.png);
  }
  .alpha cg-board piece.queen.white {
    background-image: url(../assets/chesspieces/alpha/wQ.png);
  }
  .alpha cg-board piece.king.white {
    background-image: url(../assets/chesspieces/alpha/wK.png);
  }
  .alpha cg-board piece.pawn.black {
    background-image: url(../assets/chesspieces/alpha/bP.png);
  }
  .alpha cg-board piece.bishop.black {
    background-image: url(../assets/chesspieces/alpha/bB.png);
  }
  .alpha  cg-board piece.knight.black {
    background-image: url(../assets/chesspieces/alpha/bN.png);
  }
  .alpha  cg-board piece.rook.black {
    background-image: url(../assets/chesspieces/alpha/bR.png);
  }
  .alpha  cg-board piece.queen.black {
    background-image: url(../assets/chesspieces/alpha/bQ.png);
  }
  .alpha  cg-board piece.king.black {
    background-image: url(../assets/chesspieces/alpha/bK.png);
  }
  /* Beyer */
  .beyer  cg-board piece.pawn.white {
    background-image: url(../assets/chesspieces/beyer/wP.png);
  }
  .beyer  cg-board piece.bishop.white {
    background-image: url(../assets/chesspieces/beyer/wB.png);
  }
  .beyer  cg-board piece.knight.white {
    background-image: url(../assets/chesspieces/beyer/wN.png);
  }
  .beyer  cg-board piece.rook.white {
    background-image: url(../assets/chesspieces/beyer/wR.png);
  }
  .beyer  cg-board piece.queen.white {
    background-image: url(../assets/chesspieces/beyer/wQ.png);
  }
  .beyer  cg-board piece.king.white {
    background-image: url(../assets/chesspieces/beyer/wK.png);
  }
  .beyer  cg-board piece.pawn.black {
    background-image: url(../assets/chesspieces/beyer/bP.png);
  }
  .beyer  cg-board piece.bishop.black {
    background-image: url(../assets/chesspieces/beyer/bB.png);
  }
  .beyer  cg-board piece.knight.black {
    background-image: url(../assets/chesspieces/beyer/bN.png);
  }
  .beyer  cg-board piece.rook.black {
    background-image: url(../assets/chesspieces/beyer/bR.png);
  }
  .beyer  cg-board piece.queen.black {
    background-image: url(../assets/chesspieces/beyer/bQ.png);
  }
  .beyer  cg-board piece.king.black {
    background-image: url(../assets/chesspieces/beyer/bK.png);
  }
  /* Case */
  .case  cg-board piece.pawn.white {
    background-image: url(../assets/chesspieces/case/wP.png);
  }
  .case  cg-board piece.bishop.white {
    background-image: url(../assets/chesspieces/case/wB.png);
  }
  .case  cg-board piece.knight.white {
    background-image: url(../assets/chesspieces/case/wN.png);
  }
  .case  cg-board piece.rook.white {
    background-image: url(../assets/chesspieces/case/wR.png);
  }
  .case  cg-board piece.queen.white {
    background-image: url(../assets/chesspieces/case/wQ.png);
  }
  .case  cg-board piece.king.white {
    background-image: url(../assets/chesspieces/case/wK.png);
  }
  .case  cg-board piece.pawn.black {
    background-image: url(../assets/chesspieces/case/bP.png);
  }
  .case  cg-board piece.bishop.black {
    background-image: url(../assets/chesspieces/case/bB.png);
  }
  .case  cg-board piece.knight.black {
    background-image: url(../assets/chesspieces/case/bN.png);
  }
  .case  cg-board piece.rook.black {
    background-image: url(../assets/chesspieces/case/bR.png);
  }
  .case  cg-board piece.queen.black {
    background-image: url(../assets/chesspieces/case/bQ.png);
  }
  .case  cg-board piece.king.black {
    background-image: url(../assets/chesspieces/case/bK.png);
  }
  /* Chesscom */
  .chesscom  cg-board piece.pawn.white {
    background-image: url(../assets/chesspieces/chesscom/wp.png);
  }
  .chesscom  cg-board piece.bishop.white {
    background-image: url(../assets/chesspieces/chesscom/wb.png);
  }
  .chesscom  cg-board piece.knight.white {
    background-image: url(../assets/chesspieces/chesscom/wn.png);
  }
  .chesscom  cg-board piece.rook.white {
    background-image: url(../assets/chesspieces/chesscom/wr.png);
  }
  .chesscom  cg-board piece.queen.white {
    background-image: url(../assets/chesspieces/chesscom/wq.png);
  }
  .chesscom  cg-board piece.king.white {
    background-image: url(../assets/chesspieces/chesscom/wk.png);
  }
  .chesscom  cg-board piece.pawn.black {
    background-image: url(../assets/chesspieces/chesscom/bp.png);
  }
  .chesscom  cg-board piece.bishop.black {
    background-image: url(../assets/chesspieces/chesscom/bb.png);
  }
  .chesscom  cg-board piece.knight.black {
    background-image: url(../assets/chesspieces/chesscom/bn.png);
  }
  .chesscom  cg-board piece.rook.black {
    background-image: url(../assets/chesspieces/chesscom/br.png);
  }
  .chesscom  cg-board piece.queen.black {
    background-image: url(../assets/chesspieces/chesscom/bq.png);
  }
  .chesscom  cg-board piece.king.black {
    background-image: url(../assets/chesspieces/chesscom/bk.png);
  }
  /* Condal */
  .condal  cg-board piece.pawn.white {
    background-image: url(../assets/chesspieces/condal/wP.png);
  }
  .condal  cg-board piece.bishop.white {
    background-image: url(../assets/chesspieces/condal/wB.png);
  }
  .condal  cg-board piece.knight.white {
    background-image: url(../assets/chesspieces/condal/wN.png);
  }
  .condal  cg-board piece.rook.white {
    background-image: url(../assets/chesspieces/condal/wR.png);
  }
  .condal  cg-board piece.queen.white {
    background-image: url(../assets/chesspieces/condal/wQ.png);
  }
  .condal  cg-board piece.king.white {
    background-image: url(../assets/chesspieces/condal/wK.png);
  }
  .condal  cg-board piece.pawn.black {
    background-image: url(../assets/chesspieces/condal/bP.png);
  }
  .condal  cg-board piece.bishop.black {
    background-image: url(../assets/chesspieces/condal/bB.png);
  }
  .condal  cg-board piece.knight.black {
    background-image: url(../assets/chesspieces/condal/bN.png);
  }
  .condal  cg-board piece.rook.black {
    background-image: url(../assets/chesspieces/condal/bR.png);
  }
  .condal  cg-board piece.queen.black {
    background-image: url(../assets/chesspieces/condal/bQ.png);
  }
  .condal  cg-board piece.king.black {
    background-image: url(../assets/chesspieces/condal/bK.png);
  }
  /* Leipzig */
  .leipzig  cg-board piece.pawn.white {
    background-image: url(../assets/chesspieces/leipzig/wP.png);
  }
  .leipzig  cg-board piece.bishop.white {
    background-image: url(../assets/chesspieces/leipzig/wB.png);
  }
  .leipzig  cg-board piece.knight.white {
    background-image: url(../assets/chesspieces/leipzig/wN.png);
  }
  .leipzig  cg-board piece.rook.white {
    background-image: url(../assets/chesspieces/leipzig/wR.png);
  }
  .leipzig  cg-board piece.queen.white {
    background-image: url(../assets/chesspieces/leipzig/wQ.png);
  }
  .leipzig  cg-board piece.king.white {
    background-image: url(../assets/chesspieces/leipzig/wK.png);
  }
  .leipzig  cg-board piece.pawn.black {
    background-image: url(../assets/chesspieces/leipzig/bP.png);
  }
  .leipzig  cg-board piece.bishop.black {
    background-image: url(../assets/chesspieces/leipzig/bB.png);
  }
  .leipzig  cg-board piece.knight.black {
    background-image: url(../assets/chesspieces/leipzig/bN.png);
  }
  .leipzig  cg-board piece.rook.black {
    background-image: url(../assets/chesspieces/leipzig/bR.png);
  }
  .leipzig  cg-board piece.queen.black {
    background-image: url(../assets/chesspieces/leipzig/bQ.png);
  }
  .leipzig  cg-board piece.king.black {
    background-image: url(../assets/chesspieces/leipzig/bK.png);
  }
  /* Maya */
  .maya  cg-board piece.pawn.white {
    background-image: url(../assets/chesspieces/maya/wP.png);
  }
  .maya  cg-board piece.bishop.white {
    background-image: url(../assets/chesspieces/maya/wB.png);
  }
  .maya  cg-board piece.knight.white {
    background-image: url(../assets/chesspieces/maya/wN.png);
  }
  .maya  cg-board piece.rook.white {
    background-image: url(../assets/chesspieces/maya/wR.png);
  }
  .maya  cg-board piece.queen.white {
    background-image: url(../assets/chesspieces/maya/wQ.png);
  }
  .maya  cg-board piece.king.white {
    background-image: url(../assets/chesspieces/maya/wK.png);
  }
  .maya  cg-board piece.pawn.black {
    background-image: url(../assets/chesspieces/maya/bP.png);
  }
  .maya  cg-board piece.bishop.black {
    background-image: url(../assets/chesspieces/maya/bB.png);
  }
  .maya  cg-board piece.knight.black {
    background-image: url(../assets/chesspieces/maya/bN.png);
  }
  .maya  cg-board piece.rook.black {
    background-image: url(../assets/chesspieces/maya/bR.png);
  }
  .maya  cg-board piece.queen.black {
    background-image: url(../assets/chesspieces/maya/bQ.png);
  }
  .maya  cg-board piece.king.black {
    background-image: url(../assets/chesspieces/maya/bK.png);
  }
  /* USCF */
  .uscf  cg-board piece.pawn.white {
    background-image: url(../assets/chesspieces/uscf/wP.png);
  }
  .uscf  cg-board piece.bishop.white {
    background-image: url(../assets/chesspieces/uscf/wB.png);
  }
  .uscf  cg-board piece.knight.white {
    background-image: url(../assets/chesspieces/uscf/wN.png);
  }
  .uscf  cg-board piece.rook.white {
    background-image: url(../assets/chesspieces/uscf/wR.png);
  }
  .uscf  cg-board piece.queen.white {
    background-image: url(../assets/chesspieces/uscf/wQ.png);
  }
  .uscf  cg-board piece.king.white {
    background-image: url(../assets/chesspieces/uscf/wK.png);
  }
  .uscf  cg-board piece.pawn.black {
    background-image: url(../assets/chesspieces/uscf/bP.png);
  }
  .uscf  cg-board piece.bishop.black {
    background-image: url(../assets/chesspieces/uscf/bB.png);
  }
  .uscf  cg-board piece.knight.black {
    background-image: url(../assets/chesspieces/uscf/bN.png);
  }
  .uscf  cg-board piece.rook.black {
    background-image: url(../assets/chesspieces/uscf/bR.png);
  }
  .uscf  cg-board piece.queen.black {
    background-image: url(../assets/chesspieces/uscf/bQ.png);
  }
  .uscf  cg-board piece.king.black {
    background-image: url(../assets/chesspieces/uscf/bK.png);
  }
</style>
