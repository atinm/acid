<template>
  <div v-bind:class="[b, p]">
    <div id="board" ref="board" class="cg-board-wrap"></div>
  </div>
</template>

<script>
import { Position } from 'kokopu'
import { Chessground } from 'chessgroundx'

export default {
  name: 'Chessboard',
  props: {
    boardStyle: {
      type: String,
      default: 'brown'
    },
    pieceStyle: {
      type: String,
      default: 'merida'
    },
    fen: {
      type: String,
      default: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    },
    edit: {
      type: Boolean
    },
    onPromotion: {
      type: Function,
      default: () => 'q'
    },
    orientation: {
      type: String,
      default: 'white'
    }
  },
  data: function () {
    return {
      b: this.boardStyle,
      p: this.pieceStyle,
      currentFen: this.position === undefined ? this.fen : this.position.fen()
    }
  },
  watch: {
    fen: function (newFen) {
      this.fen = newFen
      this.loadPosition()
    },
    edit: function (edit) {
      this.edit = edit
    },
    orientation: function (orientation) {
      this.orientation = orientation
      this.loadPosition()
    }
  },
  methods: {
    possibleMoves () {
      const dests = {}
      this.position.moves().forEach(md => {
        if (dests[md.from()] === undefined) {
          dests[md.from()] = []
        }
        dests[md.from()].push(md.to())
      })
      return dests
    },
    toColor () {
      return (this.position.turn() === 'w') ? 'white' : 'black'
    },
    updateBoard () {
      this.board.set({
        fen: this.position.fen(),
        turnColor: this.toColor(),
        movable: {
          color: this.toColor(),
          dests: this.possibleMoves()
        }
      })
      this.afterMove()
    },
    changeTurn () {
      return (orig, dest, metadata) => {
        const result = this.position.isMoveLegal(orig, dest)
        if (result) {
          switch (result.status) {
            case 'promotion':
              this.onPromotion().then((p) => {
                if (p !== undefined) {
                  this.promoteTo = p
                  this.position.play(result(this.promoteTo))
                }
                this.updateBoard()
              }).catch((e) => console.log(e))
              break
            case 'regular':
              this.position.play(result())
              this.updateBoard()
              break
            case 'castle960':
              this.position.play(result('castle'))
              this.updateBoard()
              break
          }
        }
      }
    },
    afterMove () {
      this.currentFen = this.position.fen()
    },
    loadPosition () { // set a default value for the configuration object itself to allow call to loadPosition()
      this.position.fen(this.fen)
      this.board = Chessground(this.$refs.board, {
        fen: this.position.fen(),
        resizable: true,
        turnColor: this.toColor(),
        movable: {
          color: this.toColor(),
          free: this.edit,
          dests: this.possibleMoves()
        },
        orientation: this.orientation
      })
      this.board.set({
        movable: { events: { after: this.changeTurn() } }
      })
      this.afterMove()
    }
  },
  mounted () {
    console.log('mounted: calling loadPosition()')
    this.loadPosition()
  },
  created () {
    this.position = new Position('regular')
    this.board = null
    this.promotions = []
    this.promoteTo = 'q'
  }
}
</script>
