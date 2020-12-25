/**
 * kokopu (https://www.npmjs.com/package/kokopu)
 * @version 1.4.1
 * @author Yoann Le Montagner <yo35@melix.net>
 * @license LGPL-3.0-or-later
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.kokopu = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


exports.i18n = require('./src/i18n');
exports.exception = require('./src/exception');

var util = require('./src/util');
exports.forEachSquare = util.forEachSquare;
exports.squareColor = util.squareColor;
exports.squareToCoordinates = util.squareToCoordinates;
exports.coordinatesToSquare = util.coordinatesToSquare;

exports.isMoveDescriptor = require('./src/movedescriptor').isMoveDescriptor;

exports.Position = require('./src/position').Position;
exports.Game = require('./src/game').Game;

var pgn = require('./src/pgn');
exports.pgnRead = pgn.pgnRead;

},{"./src/exception":4,"./src/game":5,"./src/i18n":6,"./src/movedescriptor":7,"./src/pgn":8,"./src/position":9,"./src/util":17}],2:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


// Colors
exports.WHITE = 0;
exports.BLACK = 1;

// Pieces
exports.KING   = 0;
exports.QUEEN  = 1;
exports.ROOK   = 2;
exports.BISHOP = 3;
exports.KNIGHT = 4;
exports.PAWN   = 5;

// Colored pieces
exports.WK =  0; exports.BK =  1;
exports.WQ =  2; exports.BQ =  3;
exports.WR =  4; exports.BR =  5;
exports.WB =  6; exports.BB =  7;
exports.WN =  8; exports.BN =  9;
exports.WP = 10; exports.BP = 11;

// Special square values
exports.EMPTY = -1;
exports.INVALID = -2;

// Game result
exports.WHITE_WINS = 0;
exports.BLACK_WINS = 1;
exports.DRAW = 2;
exports.LINE = 3;

// Game variant
exports.REGULAR_CHESS = 0;
exports.CHESS960 = 1;
exports.NO_KING = 2;
exports.WHITE_KING_ONLY = 3;
exports.BLACK_KING_ONLY = 4;


// -----------------------------------------------------------------------------
// Conversion API constants (strings) <-> internal constants (integers)
// -----------------------------------------------------------------------------

var COLOR_SYMBOL   = 'wb';
var PIECE_SYMBOL   = 'kqrbnp';
var RANK_SYMBOL    = '12345678';
var FILE_SYMBOL    = 'abcdefgh';
var RESULT_SYMBOL  = ['1-0', '0-1', '1/2-1/2', '*'];
var VARIANT_SYMBOL = ['regular', 'chess960', 'no-king', 'white-king-only', 'black-king-only'];

exports.colorToString   = function(color  ) { return COLOR_SYMBOL  [color  ]; };
exports.pieceToString   = function(piece  ) { return PIECE_SYMBOL  [piece  ]; };
exports.rankToString    = function(rank   ) { return RANK_SYMBOL   [rank   ]; };
exports.fileToString    = function(file   ) { return FILE_SYMBOL   [file   ]; };
exports.resultToString  = function(result ) { return RESULT_SYMBOL [result ]; };
exports.variantToString = function(variant) { return VARIANT_SYMBOL[variant]; };

exports.colorFromString   = function(color  ) { return COLOR_SYMBOL  .indexOf(color  ); };
exports.pieceFromString   = function(piece  ) { return PIECE_SYMBOL  .indexOf(piece  ); };
exports.rankFromString    = function(rank   ) { return RANK_SYMBOL   .indexOf(rank   ); };
exports.fileFromString    = function(file   ) { return FILE_SYMBOL   .indexOf(file   ); };
exports.resultFromString  = function(result ) { return RESULT_SYMBOL .indexOf(result ); };
exports.variantFromString = function(variant) { return VARIANT_SYMBOL.indexOf(variant); };

exports.squareToString = function(square) {
	return FILE_SYMBOL[square % 16] + RANK_SYMBOL[Math.floor(square / 16)];
};

exports.squareFromString = function(square) {
	if(!/^[a-h][1-8]$/.test(square)) {
		return -1;
	}
	var file = FILE_SYMBOL.indexOf(square[0]);
	var rank = RANK_SYMBOL.indexOf(square[1]);
	return rank*16 + file;
};

exports.coloredPieceToString = function(cp) {
	return COLOR_SYMBOL[cp % 2] + PIECE_SYMBOL[Math.floor(cp / 2)];
};

exports.coloredPieceFromString = function(cp) {
	if(!/^[wb][kqrbnp]$/.test(cp)) {
		return -1;
	}
	var color = COLOR_SYMBOL.indexOf(cp[0]);
	var piece = PIECE_SYMBOL.indexOf(cp[1]);
	return piece*2 + color;
};


// -----------------------------------------------------------------------------
// Typedefs for documentation
// -----------------------------------------------------------------------------

/**
 * Either `'w'` (white) or `'b'` (black).
 * @typedef {string} Color
 */

/**
 * One-character string identifying a type of piece: `'p'` (pawn), `'n'`, `'b'`, `'r'`, `'q'` or `'k'`.
 * @typedef {string} Piece
 */

/**
 * Two-character string identifying a colored piece: `'wk'` (white king), `'br'` (black rook), etc...
 * @typedef {string} ColoredPiece
 */

/**
 * `'-'` Symbol used to identify an empty square.
 * @typedef {string} Empty
 */

/**
 * Either a one-character string among `'a'`, `'b'`, ..., `'h'` (indicating the file on which *en-passant* is allowed),
 * or `'-'` (indicating that *en-passant* is not allowed).
 * @typedef {string} EnPassantFlag
 */

/**
 * Two-character string identifying a castle: `'wq'` (white queen-side castle), `'wk'`, `'bq'` or `'bk'`.
 * @typedef {string} Castle
 */

/**
 * Two-character string identifying a castle with the Chess960 rules: `'wa'` (white castle with rook initially on the a-file),
 * `'wb'`, `'wc'`, ..., `'bh'`.
 * @typedef {string} Castle960
 */

/**
 * Two-character string identifying a square: `'a1'`, `'a2'`, ..., `'h8'`.
 * @typedef {string} Square
 */

/**
 * Result of a chess game. Must be one of the following constant:
 *  - `'1-0'` (white wins),
 *  - `'1/2-1/2'` (draw),
 *  - `'0-1'` (black wins),
 *  - `'*'` (unfinished game, or undefined result).
 *
 * @typedef {string} GameResult
 */

/**
 * Variant of chess. Must be one of the following constant:
 *  - `'regular'` (regular chess rules),
 *  - `'chess960'` ([Chess960](https://en.wikipedia.org/wiki/Chess960), also known as Fischer Random Chess).
 *  - `'no-king'` (chess position without any king)
 *  - `'white-king-only'` (chess position with no black king)
 *  - `'black-king-only'` (chess position with no white king)
 *
 * Variants `'no-king'`, `'white-king-only'` and `'black-king-only'` do not correspond to "real" games. They are mainly provided
 * to create games explaining a particular piece scheme, concept, or sequence of moves... with a reduced number of pieces.
 *
 * @typedef {string} GameVariant
 */

},{}],3:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


/**
 * @class
 * @classdesc Describe a set of chess games (see also {@link Game}).
 *
 * @description This constructor is not exposed in the public Kokopu API. Only internal objects and functions
 *              are allowed to instantiate {@link Database} objects.
 */
var Database = exports.Database = function(impl, gameCountGetter, gameGetter) {
	this._impl = impl;
	this._gameCountGetter = gameCountGetter;
	this._gameGetter = gameGetter;
};


/**
 * Number of games in the database.
 *
 * @returns {number}
 */
Database.prototype.gameCount = function() {
	return this._gameCountGetter(this._impl);
};


/**
 * Return the game corresponding to the given index.
 *
 * @param {number} index Between 0 inclusive and {@link Database#gameCount} exclusive.
 * @returns {Game}
 */
Database.prototype.game = function(index) {
	return this._gameGetter(this._impl, index);
};

/**
 * Return the errors generated when creating the database.
 */
Database.prototype.errors = function() {
	return this._impl.errors;
};

},{}],4:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


/**
 * @module exception
 * @description This module defines the exceptions used by the library.
 */



/**
 * @class
 * @classdesc Exception thrown when an invalid argument is passed to a function.
 * @static
 */
var IllegalArgument = exports.IllegalArgument = function(functionName) {

	/**
	 * Name of the function that raises the exception.
	 * @member {string}
	 */
	this.functionName = functionName;
};

IllegalArgument.prototype.toString = function() {
	return 'Illegal argument in function ' + this.functionName;
};



/**
 * @class
 * @classdesc Exception thrown by the FEN parsing functions.
 * @static
 */
var InvalidFEN = exports.InvalidFEN = function(fen, message) {

	/**
	 * FEN string that causes the error.
	 * @member {string}
	 */
	this.fen = fen;

	/**
	 * Human-readable message describing the error.
	 * @member {string}
	 */
	this.message = buildMessage(message, 2, arguments);
};

InvalidFEN.prototype.toString = function() {
	return toStringImpl('InvalidFEN', this.message);
};



/**
 * @class
 * @classdesc Exception thrown by the move notation parsing functions.
 * @static
 */
var InvalidNotation = exports.InvalidNotation = function(fen, notation, message) {

	/**
	 * FEN representation of the position used to interpret the move notation.
	 * @member {string}
	 */
	this.fen = fen;

	/**
	 * Move notation that causes the error.
	 * @member {string}
	 */
	this.notation = notation;

	/**
	 * Human-readable message describing the error.
	 * @member {string}
	 */
	this.message = buildMessage(message, 3, arguments);
};

InvalidNotation.prototype.toString = function() {
	return toStringImpl('InvalidNotation', this.message);
};


/**
 * @class
 * @classdesc Exception thrown by the PGN parsing functions.
 * @static
 */
var InvalidPGN = exports.InvalidPGN = function(pgn, index, lineNumber, message) {

	/**
	 * PGN string that causes the error.
	 * @member {string}
	 */
	this.pgn = pgn;

	/**
	 * Index of the character in the PGN string where the parsing fails (or a negative value is no particular character is related to the error).
	 * @member {number}
	 */
	this.index = index;

	/**
	 * Current line number
	 */
	this.lineNumber = lineNumber;

	/**
	 * Human-readable message describing the error.
	 * @member {string}
	 */
	this.message = buildMessage(message, 3, arguments);
};

InvalidPGN.prototype.toString = function() {
	return toStringImpl('InvalidPGN', '[' + this.index + '] ' + this.message);
};



function buildMessage(message, offset, tokens) {
	for(var i = offset; i < tokens.length; ++i) {
		var re = new RegExp('%' + (i - offset + 1) + '\\$s');
		message = message.replace(re, tokens[i]);
	}
	return message;
}


function toStringImpl(exceptionName, message) {
	return exceptionName + ' -> ' + message;
}

},{}],5:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


var bt = require('./basetypes');
var exception = require('./exception');
var i18n = require('./i18n');

var Position = require('./position').Position;



// -----------------------------------------------------------------------------
// Game
// -----------------------------------------------------------------------------

/**
 * @class
 * @classdesc Chess game, with the move history, the position at each step of the game,
 *            the comments and annotations (if any), the result of the game,
 *            and some meta-data such as the name of the players, the date of the game,
 *            the name of the tournament, etc...
 */
var Game = exports.Game = function() {
	this._playerName  = [undefined, undefined];
	this._playerElo   = [undefined, undefined];
	this._playerTitle = [undefined, undefined];
	this._event     = undefined;
	this._round     = undefined;
	this._date      = undefined;
	this._site      = undefined;
	this._annotator = undefined;
	this._result    = bt.LINE;
	this._tags      = {};

	this._initialPosition = new Position();
	this._fullMoveNumber = 1;
	this._mainVariationInfo = createVariationInfo(true);
};


/**
 * Get the player name.
 *
 * @param {Color} color
 * @returns {string?}
 *
 *//**
 *
 * Set the player name.
 *
 * @param {Color} color
 * @param {string?} value
 */
Game.prototype.playerName = function(color, value) {
	color = bt.colorFromString(color);
	if(color < 0) { throw new exception.IllegalArgument('Game#playerName()'); }
	if(arguments.length === 1) { return this._playerName[color]; }
	else { this._playerName[color] = value; }
};


/**
 * Get the player elo.
 *
 * @param {Color} color
 * @returns {string?}
 *
 *//**
 *
 * Set the player elo.
 *
 * @param {Color} color
 * @param {string?} value
 */
Game.prototype.playerElo = function(color, value) {
	color = bt.colorFromString(color);
	if(color < 0) { throw new exception.IllegalArgument('Game#playerElo()'); }
	if(arguments.length === 1) { return this._playerElo[color]; }
	else { this._playerElo[color] = value; }
};


/**
 * Get the player title.
 *
 * @param {Color} color
 * @returns {string?}
 *
 *//**
 *
 * Set the player title.
 *
 * @param {Color} color
 * @param {string?} value
 */
Game.prototype.playerTitle = function(color, value) {
	color = bt.colorFromString(color);
	if(color < 0) { throw new exception.IllegalArgument('Game#playerTitle()'); }
	if(arguments.length === 1) { return this._playerTitle[color]; }
	else { this._playerTitle[color] = value; }
};


/**
 * Get the event.
 *
 * @returns {string?}
 *
 *//**
 *
 * Set the event.
 *
 * @param {string?} value
 */
Game.prototype.event = function(value) {
	if(arguments.length === 0) { return this._event; }
	else { this._event = value; }
};


/**
 * Get the round.
 *
 * @returns {string?}
 *
 *//**
 *
 * Set the round.
 *
 * @param {string?} value
 */
Game.prototype.round = function(value) {
	if(arguments.length === 0) { return this._round; }
	else { this._round = value; }
};


/**
 * Get the date of the game.
 *
 * @returns {Date|{year:number, month:number}|{year:number}|undefined} Depending on what is defined, the method returns
 *          the whole date, or just the year and the month, or just the year, or `undefined`.
 *
 *//**
 *
 * Set the date of the game.
 *
 * @param {Date|{year:number, month:number}|{year:number}|undefined} value
 */
Game.prototype.date = function(value) {
	if(arguments.length === 0) {
		return this._date;
	}
	else if(value === undefined || value === null) {
		this._date = undefined;
	}
	else if(value instanceof Date) {
		this._date = value;
	}
	else if(typeof value === 'object' && typeof value.year === 'number' && typeof value.month === 'number') {
		this._date = { year: value.year, month: value.month };
	}
	else if(typeof value === 'object' && typeof value.year === 'number' && (value.month === undefined || value.month === null)) {
		this._date = { year: value.year };
	}
	else {
		throw new exception.IllegalArgument('Game#date()');
	}
};


/**
 * Get where the game takes place.
 *
 * @returns {string?}
 *
 *//**
 *
 * Set where the game takes place.
 *
 * @param {string?} value
 */
Game.prototype.site = function(value) {
	if(arguments.length === 0) { return this._site; }
	else { this._site = value; }
};


/**
 * Get the name of the annotator.
 *
 * @returns {string?}
 *
 *//**
 *
 * Set the name of the annotator.
 *
 * @param {string?} value
 */
Game.prototype.annotator = function(value) {
	if(arguments.length === 0) { return this._annotator; }
	else { this._annotator = value; }
};


/**
 * Get the result of the game.
 *
 * @returns {GameResult}
 *
 *//**
 *
 * Set the result of the game.
 *
 * @param {GameResult} value
 */
Game.prototype.result = function(value) {
	if(arguments.length === 0) {
		return bt.resultToString(this._result);
	}
	else {
		var result = bt.resultFromString(value);
		if(result < 0) {
			throw new exception.IllegalArgument('Game#result()');
		}
		this._result = result;
	}
};


/**
 * Get the {@link GameVariant} of the game.
 *
 * @returns {GameVariant}
 */
Game.prototype.variant = function() {
	return this._initialPosition.variant();
};

Game.prototype.tags = function(obj) {
	if (arguments.length === 0) {
		return this._tags;
	} else {
		return this._tags.push(obj);
	}
};

/**
 * Get the initial position of the game.
 *
 * @returns {Position}
 *
 *//**
 *
 * Set the initial position of the game.
 *
 * WARNING: this resets the main variation.
 *
 * @param {Position} initialPosition
 * @param {number} [fullMoveNumber=1]
 */
Game.prototype.initialPosition = function(initialPosition, fullMoveNumber) {
	if(arguments.length === 0) {
		return this._initialPosition;
	}
	else {
		if(!(initialPosition instanceof Position)) {
			throw new exception.IllegalArgument('Game#initialPosition()');
		}
		if(arguments.length === 1) {
			fullMoveNumber = 1;
		}
		else if(typeof fullMoveNumber !== 'number') {
			throw new exception.IllegalArgument('Game#initialPosition()');
		}
		this._initialPosition = initialPosition;
		this._fullMoveNumber = fullMoveNumber;
		this._mainVariationInfo = createVariationInfo(true);
	}
};


/**
 * The main variation of the game.
 *
 * @returns {Variation}
 */
Game.prototype.mainVariation = function() {
	return new Variation(this._mainVariationInfo, this._fullMoveNumber, this._initialPosition, true);
};



// -----------------------------------------------------------------------------
// Node
// -----------------------------------------------------------------------------

/**
 * @param {MoveDescriptor} moveDescriptor
 * @returns {object}
 * @ignore
 */
function createNodeInfo(moveDescriptor) {
	return {

		// `moveDescriptor` is `undefined` in case of a null-move.
		moveDescriptor: moveDescriptor,

		// Next move and alternative variations.
		next: undefined,
		variations: [],

		// Annotations and comments associated to the underlying move.
		nags: {},
		tags: {},
		comment: undefined,
		isLongComment: false
	};
}


/**
 * @class
 * @classdesc Represent one move in the tree structure formed by a chess game with multiple variations.
 *
 * @description This constructor is not exposed in the public Kokopu API. Only internal objects and functions
 *              are allowed to instantiate {@link Node} objects.
 */
function Node(info, parentVariation, fullMoveNumber, positionBefore) {
	this._info = info;
	this._parentVariation = parentVariation;
	this._fullMoveNumber = fullMoveNumber;
	this._positionBefore = positionBefore;
}


/**
 * Play the move descriptor encoded in the given node info structure, or play null-move if no move descriptor is defined.
 *
 * @param {Position} position
 * @param {object} info
 * @ignore
 */
function applyMoveDescriptor(position, info) {
	if(info.moveDescriptor === undefined) {
		position.playNullMove();
	}
	else {
		position.play(info.moveDescriptor);
	}
}


/**
 * Regenerate `_positionBefore` if necessary on the given node.
 *
 * @param {Node} node
 * @returns {Position}
 * @ignore
 */
function rebuildPositionBeforeIfNecessary(node) {
	if(!node._positionBefore) {
		node._positionBefore = new Position(node._parentVariation._initialPosition);
		var currentInfo = node._parentVariation._info.first;
		while(currentInfo !== node._info) {
			if(currentInfo === undefined) {
				throw new exception.IllegalArgument('The current node is invalid.');
			}
			applyMoveDescriptor(node._positionBefore, currentInfo);
			currentInfo = currentInfo.next;
		}
	}
	return node._positionBefore;
}

/**
 * MoveDescriptor for the move associated with the current node.
 *
 * @returns {MoveDescriptor}
 */
Node.prototype.move = function() {
	return this._info.moveDescriptor;
};

/**
 * SAN representation of the move associated to the current node.
 *
 * @returns {string}
 */
Node.prototype.notation = function() {
	return this._info.moveDescriptor === undefined ? '--' : rebuildPositionBeforeIfNecessary(this).notation(this._info.moveDescriptor);
};


/**
 * Chess position before the current move.
 *
 * @returns {Position}
 */
Node.prototype.positionBefore = function() {
	return new Position(rebuildPositionBeforeIfNecessary(this));
};


/**
 * Chess position obtained after the current move.
 *
 * @returns {Position}
 */
Node.prototype.position = function() {
	var position = this.positionBefore();
	if(this._info.moveDescriptor === undefined) {
		position.playNullMove();
	}
	else {
		position.play(this._info.moveDescriptor);
	}
	return position;
};


/**
 * Full-move number. It starts at 1, and is incremented after each black move.
 *
 * @returns {number}
 */
Node.prototype.fullMoveNumber = function() {
	return this._fullMoveNumber;
};


/**
 * Color the side corresponding to the current move.
 *
 * @returns {Color}
 */
Node.prototype.moveColor = function() {
	return rebuildPositionBeforeIfNecessary(this).turn();
};


/**
 * Compute the "position-before" and "full-move-number" applicable to the node after the given one.
 *
 * @param {Node} node
 * @returns {{positionBefore:Position, fullMoveNumber:number}}
 * @ignore
 */
function computePositionBeforeAndFullMoveNumberForNextNode(node) {

	// Compute the position-before applicable on the next node.
	var positionBefore = rebuildPositionBeforeIfNecessary(node);
	applyMoveDescriptor(positionBefore, node._info);

	// Compute the full-move-number applicable to the next node.
	var fullMoveNumber = positionBefore.turn() === 'w' ? node._fullMoveNumber + 1 : node._fullMoveNumber;

	// Invalidate the position-before on the current node.
	node._positionBefore = null;

	return { positionBefore:positionBefore, fullMoveNumber:fullMoveNumber };
}


/**
 * Go to the next move within the same variation.
 *
 * @returns {Node?} `undefined` if the current move is the last move of the variation, or a node corresponding to the next move otherwise.
 */
Node.prototype.next = function() {
	if(!this._info.next) { return undefined; }
	var next = computePositionBeforeAndFullMoveNumberForNextNode(this);
	return new Node(this._info.next, this._parentVariation, next.fullMoveNumber, next.positionBefore);
};


/**
 * Return the variations that can be followed instead of the current move.
 *
 * @returns {Variation[]}
 */
Node.prototype.variations = function() {
	if(this._info.variations.length === 0) {
		return [];
	}

	var result = [];
	var positionBefore = this.positionBefore();
	for(var i = 0; i < this._info.variations.length; ++i) {
		result.push(new Variation(this._info.variations[i], this._fullMoveNumber, positionBefore, this._parentVariation._withinLongVariation));
	}
	return result;
};


/**
 * Return the NAGs associated to the current move.
 *
 * @returns {number[]}
 */
Node.prototype.nags = function() {
	var result = [];
	for(var key in this._info.nags) {
		if(this._info.nags[key]) {
			result.push(key);
		}
	}
	return result;
};


/**
 * Check whether the current move has the given NAG or not.
 *
 * @param {number} nag
 * @returns {boolean}
 */
Node.prototype.hasNag = function(nag) {
	return Boolean(this._info.nags[nag]);
};


/**
 * Add the given NAG to the current move.
 *
 * @param {number} nag
 */
Node.prototype.addNag = function(nag) {
	this._info.nags[nag] = true;
};


/**
 * Remove the given NAG from the current move.
 *
 * @param {number} nag
 */
Node.prototype.removeNag = function(nag) {
	delete this._info.nags[nag];
};


/**
 * Return the keys of the tags associated to the current move.
 *
 * @returns {string[]}
 */
Node.prototype.tags = function() {
	var result = [];
	for(var key in this._info.tags) {
		if(this._info.tags[key] !== undefined) {
			result.push(key);
		}
	}
	return result;
};


/**
 * Get the value associated to the given tag key on the current move.
 *
 * @param {string} tagKey
 * @returns {string?} `undefined` if no value is associated to this tag key on the current move.
 *
 *//**
 *
 * Set the value associated to the given tag key on the current move.
 *
 * @param {string} tagKey
 * @param {string?} value
 */
Node.prototype.tag = function(tagKey, value) {
	if(arguments.length === 1) {
		return this._info.tags[tagKey];
	}
	else {
		this._info.tags[tagKey] = value;
	}
};


/**
 * Get the text comment associated to the current move.
 *
 * @returns {string?} `undefined` if no comment is defined for the move.
 *
 *//**
 *
 * Set the text comment associated to the current move.
 *
 * @param {string} value
 * @param {boolean} [isLongComment=false]
 */
Node.prototype.comment = function(value, isLongComment) {
	if(arguments.length === 0) {
		return this._info.comment;
	}
	else {
		this._info.comment = value;
		this._info.isLongComment = Boolean(isLongComment);
	}
};


/**
 * Whether the text comment associated to the current move is long or short.
 *
 * @returns {boolean}
 */
Node.prototype.isLongComment = function() {
	return this._parentVariation._withinLongVariation && this._info.isLongComment;
};


/**
 * Compute the move descriptor associated to the given SAN notation, assuming the given position.
 *
 * @param {Position} position Position based on which the given SAN notation must be interpreted.
 * @param {string} move SAN notation (or `'--'` for a null-move).
 * @returns {MoveDescriptor?} `undefined` is returned in case of a null-move.
 * @throws {module:exception.InvalidNotation} If the move notation cannot be parsed.
 * @ignore
 */
function computeMoveDescriptor(position, move) {
	if(move === '--') {
		if(!position.isNullMoveLegal()) {
			throw new exception.InvalidNotation(position, '--', i18n.ILLEGAL_NULL_MOVE);
		}
		return undefined;
	}
	else {
		return position.notation(move);
	}
}


/**
 * Play the given move, and return a new {@link Node} pointing at the resulting position.
 *
 * @param {string} move SAN notation (or `'--'` for a null-move).
 * @returns {Node} A new node, pointing at the new position.
 * @throws {module:exception.InvalidNotation} If the move notation cannot be parsed.
 */
Node.prototype.play = function(move) {
	var next = computePositionBeforeAndFullMoveNumberForNextNode(this);
	this._info.next = createNodeInfo(computeMoveDescriptor(next.positionBefore, move));
	return new Node(this._info.next, this._parentVariation, next.fullMoveNumber, next.positionBefore);
};


/**
 * Create a new variation that can be played instead of the current move.
 *
 * @param {boolean} isLongVariation
 * @returns {Variation}
 */
Node.prototype.addVariation = function(isLongVariation) {
	this._info.variations.push(createVariationInfo(isLongVariation));
	return new Variation(this._info.variations[this._info.variations.length - 1], this._fullMoveNumber, this.positionBefore(), this._parentVariation._withinLongVariation);
};



// -----------------------------------------------------------------------------
// Variation
// -----------------------------------------------------------------------------

/**
 * @param {boolean} isLongVariation
 * @returns {object}
 * @ignore
 */
function createVariationInfo(isLongVariation) {
	return {

		isLongVariation: isLongVariation,

		// First move of the variation.
		first: undefined,

		// Annotations and comments associated to the underlying variation.
		nags: {},
		tags: {},
		comment: undefined,
		isLongComment: false
	};
}


/**
 * @class
 * @classdesc Represent one variation in the tree structure formed by a chess game, meaning
 * a starting chess position and list of played consecutively from this position.
 *
 * @description This constructor is not exposed in the public Kokopu API. Only internal objects and functions
 *              are allowed to instantiate {@link Variation} objects.
 */
function Variation(info, initialFullMoveNumber, initialPosition, withinLongVariation) {
	this._info = info;
	this._initialFullMoveNumber = initialFullMoveNumber;
	this._initialPosition = initialPosition;
	this._withinLongVariation = withinLongVariation && info.isLongVariation;
}


/**
 * Whether the current variation is considered as a "long" variation, i.e. a variation that
 * should be displayed in an isolated block.
 *
 * @returns {boolean}
 */
Variation.prototype.isLongVariation = function() {
	return this._withinLongVariation;
};


/**
 * Chess position at the beginning of the variation.
 *
 * @returns {Position}
 */
Variation.prototype.initialPosition = function() {
	return new Position(this._initialPosition);
};


/**
 * Full-move number at the beginning of the variation.
 *
 * @returns {number}
 */
Variation.prototype.initialFullMoveNumber = function() {
	return this._initialFullMoveNumber;
};


/**
 * First move of the variation.
 *
 * @returns {Node?} `undefined` if the variation is empty.
 */
Variation.prototype.first = function() {
	if(!this._info.first) { return undefined; }
	return new Node(this._info.first, this, this._initialFullMoveNumber, new Position(this._initialPosition));
};


/**
 * Generate the nodes corresponding to the moves of the current variation.
 *
 * @returns {Node[]} An empty array is returned if the variation is empty.
 */
Variation.prototype.nodes = function() {
	var result = [];

	var currentNodeInfo = this._info.first;
	var previousNodeInfo = null;
	var previousPositionBefore = this._initialPosition;
	var previousFullMoveNumber = this._initialFullMoveNumber;
	while(currentNodeInfo) {

		// Compute the "position-before" attribute the current node.
		var previousPositionBefore = new Position(previousPositionBefore);
		if(previousNodeInfo !== null) {
			applyMoveDescriptor(previousPositionBefore, previousNodeInfo);
		}

		// Compute the "full-move-number" attribute the current node.
		previousFullMoveNumber = previousNodeInfo !== null && previousPositionBefore.turn() === 'w' ? previousFullMoveNumber + 1 : previousFullMoveNumber;

		// Push the current node.
		result.push(new Node(currentNodeInfo, this, previousFullMoveNumber, previousPositionBefore));

		// Increment the counters.
		previousNodeInfo = currentNodeInfo;
		currentNodeInfo = currentNodeInfo.next;
	}

	return result;
};


/**
 * Return the NAGs associated to the current variation.
 *
 * @returns {number[]}
 * @function
 */
Variation.prototype.nags = Node.prototype.nags;


/**
 * Check whether the current variation has the given NAG or not.
 *
 * @param {number} nag
 * @returns {boolean}
 * @function
 */
Variation.prototype.hasNag = Node.prototype.hasNag;


/**
 * Add the given NAG to the current variation.
 *
 * @param {number} nag
 * @function
 */
Variation.prototype.addNag = Node.prototype.addNag;


/**
 * Remove the given NAG from the current variation.
 *
 * @param {number} nag
 * @function
 */
Variation.prototype.removeNag = Node.prototype.removeNag;


/**
 * Return the keys of the tags associated to the current variation.
 *
 * @returns {string[]}
 * @function
 */
Variation.prototype.tags = Node.prototype.tags;


/**
 * Get the value associated to the given tag key on the current variation.
 *
 * @param {string} tagKey
 * @returns {string?} `undefined` if no value is associated to this tag key on the current variation.
 * @function
 *
 *//**
 *
 * Set the value associated to the given tag key on the current variation.
 *
 * @param {string} tagKey
 * @param {string?} value
 * @function
 */
Variation.prototype.tag = Node.prototype.tag;


/**
 * Get the text comment associated to the current variation.
 *
 * @returns {string?} `undefined` if no comment is defined for the variation.
 * @function
 *
 *//**
 *
 * Set the text comment associated to the current variation.
 *
 * @param {string} value
 * @param {boolean} [isLongComment=false]
 * @function
 */
Variation.prototype.comment = Node.prototype.comment;


/**
 * Whether the text comment associated to the current variation is long or short.
 *
 * @returns {boolean}
 */
Variation.prototype.isLongComment = function() {
	return this._withinLongVariation && this._info.isLongComment;
};


/**
 * Play the given move as the first move of the variation.
 *
 * @param {string} move SAN notation (or `'--'` for a null-move).
 * @returns {Node} A new node object, to represents the new move.
 * @throws {module:exception.InvalidNotation} If the move notation cannot be parsed.
 */
Variation.prototype.play = function(move) {
	var positionBefore = new Position(this._initialPosition);
	this._info.first = createNodeInfo(computeMoveDescriptor(positionBefore, move));
	return new Node(this._info.first, this, this._initialFullMoveNumber, positionBefore);
};

},{"./basetypes":2,"./exception":4,"./i18n":6,"./position":9}],6:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


/**
 * @module i18n
 * @description This module defines the localizable strings used by the library.
 */



// Ordinal integers (from 1 to 8).
exports.ORDINALS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

// FEN parsing error messages
exports.WRONG_NUMBER_OF_FEN_FIELDS                = 'A FEN string must contain exactly 6 space-separated fields.';
exports.WRONG_NUMBER_OF_SUBFIELDS_IN_BOARD_FIELD  = 'The 1st field of a FEN string must contain exactly 8 `/`-separated subfields.';
exports.UNEXPECTED_CHARACTER_IN_BOARD_FIELD       = 'Unexpected character in the 1st field of the FEN string: `%1$s`.';
exports.UNEXPECTED_END_OF_SUBFIELD_IN_BOARD_FIELD = 'The %1$s subfield of the FEN string 1st field is unexpectedly short.';
exports.INVALID_TURN_FIELD                        = 'The 2nd field of a FEN string must be either `w` or `b`.';
exports.INVALID_CASTLING_FIELD                    = 'The 3rd field of a FEN string must be either `-` or a list of characters among `K`, `Q`, `k` and `q` (in this order).';
exports.INVALID_EN_PASSANT_FIELD                  = 'The 4th field of a FEN string must be either `-` or a square from the 3rd or 6th rank where en-passant is allowed.';
exports.WRONG_RANK_IN_EN_PASSANT_FIELD            = 'The rank number indicated in the FEN string 4th field is inconsistent with respect to the 2nd field.';
exports.INVALID_MOVE_COUNTING_FIELD               = 'The %1$s field of a FEN string must be a number.';

// Notation parsing error messages
exports.INVALID_MOVE_NOTATION_SYNTAX        = 'The syntax of the move notation is invalid.';
exports.ILLEGAL_POSITION                    = 'The position is not legal.';
exports.ILLEGAL_NO_KING_CASTLING            = 'Casting is not legal in the considered position as it has no king.';
exports.ILLEGAL_QUEEN_SIDE_CASTLING         = 'Queen-side castling is not legal in the considered position.';
exports.ILLEGAL_KING_SIDE_CASTLING          = 'King-side castling is not legal in the considered position.';
exports.NO_PIECE_CAN_MOVE_TO                = 'No %1$s can move to %2$s.';
exports.NO_PIECE_CAN_MOVE_TO_DISAMBIGUATION = 'No %1$s on the specified rank/file can move to %2$s.';
exports.REQUIRE_DISAMBIGUATION              = 'Cannot determine uniquely which %1$s is supposed to move to %2$s.';
exports.WRONG_DISAMBIGUATION_SYMBOL         = 'Wrong disambiguation symbol (expected: `%1$s`, observed: `%2$s`).';
exports.TRYING_TO_CAPTURE_YOUR_OWN_PIECES   = 'Capturing its own pieces is not legal.';
exports.INVALID_CAPTURING_PAWN_MOVE         = 'Invalid capturing pawn move.';
exports.INVALID_NON_CAPTURING_PAWN_MOVE     = 'Invalid non-capturing pawn move.';
exports.NOT_SAFE_FOR_WHITE_KING             = 'This move would put let the white king in check.';
exports.NOT_SAFE_FOR_BLACK_KING             = 'This move would put let the black king in check.';
exports.MISSING_PROMOTION                   = 'A promoted piece must be specified for this move.';
exports.MISSING_PROMOTION_SYMBOL            = 'Character `=` is required to specify a promoted piece.';
exports.INVALID_PROMOTED_PIECE              = '%1$s cannot be specified as a promoted piece.';
exports.ILLEGAL_PROMOTION                   = 'Specifying a promoted piece is illegal for this move.';
exports.ILLEGAL_NULL_MOVE                   = 'Cannot play a null-move in this position.';
exports.MISSING_CAPTURE_SYMBOL              = 'Capture symbol `x` is missing.';
exports.INVALID_CAPTURE_SYMBOL              = 'This move is not a capture move.';
exports.WRONG_CHECK_CHECKMATE_SYMBOL        = 'Wrong check/checkmate symbol (expected: `%1$s`, observed: `%2$s`).';

// PGN parsing error messages
exports.INVALID_PGN_TOKEN               = 'Unrecognized character or group of characters.';
exports.INVALID_MOVE_IN_PGN_TEXT        = 'Invalid move (%1$s). %2$s';
exports.INVALID_FEN_IN_PGN_TEXT         = 'Invalid FEN string in the initial position header. %1$s';
exports.UNEXPECTED_PGN_HEADER           = 'Unexpected PGN game header.';
exports.UNEXPECTED_BEGIN_OF_VARIATION   = 'Unexpected begin of variation.';
exports.UNEXPECTED_END_OF_VARIATION     = 'Unexpected end of variation.';
exports.UNEXPECTED_END_OF_GAME          = 'Unexpected end of game: there are pending variations.';
exports.UNEXPECTED_END_OF_TEXT          = 'Unexpected end of text: there is a pending game.';
exports.INVALID_GAME_INDEX              = 'Game index %1$s is invalid (only %2$s game(s) found in the PGN data).';
exports.UNKNOWN_VARIANT                 = 'Unknown chess game variant (%1$s).';
exports.VARIANT_WITHOUT_FEN             = 'For non-standard game variant, the FEN header is mandatory.';

},{}],7:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


var bt = require('./basetypes');
var exception = require('./exception');


var CASTLING_FLAG   = 0x01;
var EN_PASSANT_FLAG = 0x02;
var CAPTURE_FLAG    = 0x04;
var PROMOTION_FLAG  = 0x08;


exports.make = function(from, to, color, movingPiece, capturedPiece) {
	var flags = capturedPiece >= 0 ? CAPTURE_FLAG : 0x00;
	var movingColoredPiece = movingPiece*2 + color;
	return new MoveDescriptor(flags, from, to, movingColoredPiece, movingColoredPiece, capturedPiece, -1, -1);
};


exports.makeCastling = function(from, to, rookFrom, rookTo, color) {
	var movingKing = bt.KING*2 + color;
	var movingRook = bt.ROOK*2 + color;
	return new MoveDescriptor(CASTLING_FLAG, from, to, movingKing, movingKing, movingRook, rookFrom, rookTo);
};


exports.makeEnPassant = function(from, to, enPassantSquare, color) {
	var flags = EN_PASSANT_FLAG | CAPTURE_FLAG;
	var movingPawn = bt.PAWN*2 + color;
	var capturedPawn = bt.PAWN*2 + 1 - color;
	return new MoveDescriptor(flags, from, to, movingPawn, movingPawn, capturedPawn, enPassantSquare, -1);
};


exports.makePromotion = function(from, to, color, promotion, capturedPiece) {
	var flags = PROMOTION_FLAG | (capturedPiece >= 0 ? CAPTURE_FLAG : 0x00);
	var movingPawn = bt.PAWN*2 + color;
	var finalPiece = promotion*2 + color;
	return new MoveDescriptor(flags, from, to, movingPawn, finalPiece, capturedPiece, -1, -1);
};


/**
 * @class
 * @classdesc Describe a legal chess move, with its characteristics.
 *
 * @description This constructor is not exposed in the public Kokopu API. Only internal objects and functions
 *              are allowed to instantiate {@link MoveDescriptor} objects.
 */
function MoveDescriptor(flags, from, to, movingPiece, finalPiece, optionalPiece, optionalSquare1, optionalSquare2) {
	this._type            = flags          ;
	this._from            = from           ;
	this._to              = to             ;
	this._movingPiece     = movingPiece    ;
	this._finalPiece      = finalPiece     ;
	this._optionalPiece   = optionalPiece  ; // Captured piece in case of capture, moving rook in case of castling.
	this._optionalSquare1 = optionalSquare1; // Rook-from or en-passant square.
	this._optionalSquare2 = optionalSquare2; // Rook-to.
}


/**
 * Whether the given object is a {@link MoveDescriptor} or not.
 *
 * @param {Object} obj
 * @returns {boolean}
 */
exports.isMoveDescriptor = function(obj) {
	return obj instanceof MoveDescriptor;
};


MoveDescriptor.prototype.toString = function() {
	var result = bt.squareToString(this._from) + bt.squareToString(this._to);
	if(this.isPromotion()) {
		result += this.promotion().toUpperCase();
	}
	else if(this.isCastling()) {
		result += 'O';
	}
	return result;
};


/**
 * Whether or not the current move is a castling move.
 *
 * @returns {boolean}
 */
MoveDescriptor.prototype.isCastling = function() {
	return (this._type & CASTLING_FLAG) !== 0;
};


/**
 * Whether or not the current move is a *en-passant* move.
 *
 * @returns {boolean}
 */
MoveDescriptor.prototype.isEnPassant = function() {
	return (this._type & EN_PASSANT_FLAG) !== 0;
};


/**
 * Whether or not the current move is a capture (either a regular capture or a *en-passant* capture).
 *
 * @returns {boolean}
 */
MoveDescriptor.prototype.isCapture = function() {
	return (this._type & CAPTURE_FLAG) !== 0;
};


/**
 * Whether or not the current move is a promotion.
 *
 * @returns {boolean}
 */
MoveDescriptor.prototype.isPromotion = function() {
	return (this._type & PROMOTION_FLAG) !== 0;
};


/**
 * Origin square of the moving piece. In case of castling, this is the origin square of the king.
 *
 * @returns {Square}
 */
MoveDescriptor.prototype.from = function() {
	return bt.squareToString(this._from);
};


/**
 * Destination square of the moving piece. In case of castling, this is the destination square of the king.
 *
 * @returns {Square}
 */
MoveDescriptor.prototype.to = function() {
	return bt.squareToString(this._to);
};


/**
 * Color of the moving piece.
 *
 * @returns {Color}
 */
MoveDescriptor.prototype.color = function() {
	return bt.colorToString(this._movingPiece % 2);
};


/**
 * Type of the moving piece. In case of castling, the moving piece is considered to be the king.
 *
 * @returns {Piece}
 */
MoveDescriptor.prototype.movingPiece = function() {
	return bt.pieceToString(Math.floor(this._movingPiece / 2));
};


/**
 * Color and type of the moving piece. In case of castling, the moving piece is considered to be the king.
 *
 * @returns {ColoredPiece}
 */
MoveDescriptor.prototype.movingColoredPiece = function() {
	return bt.coloredPieceToString(this._movingPiece);
};


/**
 * Type of the captured piece.
 *
 * @returns {Piece}
 * @throws {module:exception.IllegalArgument} If the current move is not a capture (see {@link MoveDescriptor#isCapture}).
 */
MoveDescriptor.prototype.capturedPiece = function() {
	if(!this.isCapture()) { throw new exception.IllegalArgument('MoveDescriptor#capturedPiece()'); }
	return bt.pieceToString(Math.floor(this._optionalPiece / 2));
};


/**
 * Color and type of the captured piece.
 *
 * @returns {ColoredPiece}
 * @throws {module:exception.IllegalArgument} If the current move is not a capture (see {@link MoveDescriptor#isCapture}).
 */
MoveDescriptor.prototype.capturedColoredPiece = function() {
	if(!this.isCapture()) { throw new exception.IllegalArgument('MoveDescriptor#capturedColoredPiece()'); }
	return bt.coloredPieceToString(this._optionalPiece);
};


/**
 * Origin square of the rook, in case of a castling move.
 *
 * @returns {Square}
 * @throws {module:exception.IllegalArgument} If the current move is not a castling move (see {@link MoveDescriptor#isCastling}).
 */
MoveDescriptor.prototype.rookFrom = function() {
	if(!this.isCastling()) { throw new exception.IllegalArgument('MoveDescriptor#rookFrom()'); }
	return bt.squareToString(this._optionalSquare1);
};


/**
 * Destination square of the rook, in case of a castling move.
 *
 * @returns {Square}
 * @throws {module:exception.IllegalArgument} If the current move is not a castling move (see {@link MoveDescriptor#isCastling}).
 */
MoveDescriptor.prototype.rookTo = function() {
	if(!this.isCastling()) { throw new exception.IllegalArgument('MoveDescriptor#rookTo()'); }
	return bt.squareToString(this._optionalSquare2);
};


/**
 * Square containing the captured pawn, in case of a *en-passant* move.
 *
 * @returns {Square}
 * @throws {module:exception.IllegalArgument} If the current move is not a *en-passant* move (see {@link MoveDescriptor#isEnPassant}).
 */
MoveDescriptor.prototype.enPassantSquare = function() {
	if(!this.isEnPassant()) { throw new exception.IllegalArgument('MoveDescriptor#enPassantSquare()'); }
	return bt.squareToString(this._optionalSquare1);
};


/**
 * Type of the promoted piece, in case of a promotion.
 *
 * @returns {Piece}
 * @throws {module:exception.IllegalArgument} If the current move is not a promotion (see {@link MoveDescriptor#isPromotion}).
 */
MoveDescriptor.prototype.promotion = function() {
	if(!this.isPromotion()) { throw new exception.IllegalArgument('MoveDescriptor#promotion()'); }
	return bt.pieceToString(Math.floor(this._finalPiece / 2));
};


/**
 * Color and type of the promoted piece, in case of a promotion.
 *
 * @returns {ColoredPiece}
 * @throws {module:exception.IllegalArgument} If the current move is not a promotion (see {@link MoveDescriptor#isPromotion}).
 */
MoveDescriptor.prototype.coloredPromotion = function() {
	if(!this.isPromotion()) { throw new exception.IllegalArgument('MoveDescriptor#coloredPromotion()'); }
	return bt.coloredPieceToString(this._finalPiece);
};

},{"./basetypes":2,"./exception":4}],8:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


var exception = require('./exception');
var i18n = require('./i18n');

var Position = require('./position').Position;
var Game = require('./game').Game;
var Database = require('./database').Database;
var TokenStream = require('./private_pgn/tokenstream').TokenStream;


function parseNullableHeader(value) {
	return value === '?' ? undefined : value;
}


function parseDateHeader(value) {
	if(/^([0-9]{4})\.([0-9]{2})\.([0-9]{2})$/.test(value)) {
		var year = RegExp.$1;
		var month = RegExp.$2;
		var day = RegExp.$3;
		year = parseInt(year, 10);
		month = parseInt(month, 10);
		day = parseInt(day, 10);
		if(month >= 1 && month <= 12 && day >= 1 && day <= 31) {
			return new Date(year, month - 1, day);
		}
	}
	else if(/^([0-9]{4})\.([0-9]{2})\.\?\?$/.test(value)) {
		var year = RegExp.$1;
		var month = parseInt(RegExp.$2, 10);
		if(month >= 1 && month <= 12) {
			return { year: parseInt(year, 10), month: month };
		}
	}
	else if(/^([0-9]{4})(?:\.\?\?\.\?\?)?$/.test(value)) {
		return { year: parseInt(RegExp.$1, 10) };
	}
	return undefined;
}


function parseVariant(value) {
	switch(value.toLowerCase()) {
		case 'regular':
		case 'standard':
			return 'regular';
		case 'chess960':
		case 'fischerandom':
			return 'chess960';
		case 'no king':
			return 'no-king';
		case 'white king only':
			return 'white-king-only';
		case 'black king only':
			return 'black-king-only';
		default:
			return undefined;
	}
}


function processHeader(stream, game, initialPositionFactory, key, value) {
	value = value.trim();
	switch(key) {
		case 'White': game.playerName('w', parseNullableHeader(value)); break;
		case 'Black': game.playerName('b', parseNullableHeader(value)); break;
		case 'WhiteElo': game.playerElo('w', value); break;
		case 'BlackElo': game.playerElo('b', value); break;
		case 'WhiteTitle': game.playerTitle('w', value); break;
		case 'BlackTitle': game.playerTitle('b', value); break;
		case 'Event': game.event(parseNullableHeader(value)); break;
		case 'Round': game.round(parseNullableHeader(value)); break;
		case 'Date': game.date(parseDateHeader(value)); break;
		case 'Site': game.site(parseNullableHeader(value)); break;
		case 'Annotator': game.annotator(value); break;

		// The header 'FEN' has a special meaning, in that it is used to define a custom
		// initial position, that may be different from the usual one.
		case 'FEN':
			initialPositionFactory.fen = value;
			initialPositionFactory.fenTokenIndex = stream.tokenIndex();
			break;

		// The header 'Variant' indicates that this is not a regular chess game.
		case 'Variant':
			initialPositionFactory.variant = parseVariant(value);
			if(!initialPositionFactory.variant) {
				throw stream.invalidPGNException(i18n.UNKNOWN_VARIANT, value);
			}
			break;
	}

	// also add the header to game tags, includes the above tags as well as unknown tags
	game.tags[key] = value;
}


function initializeInitialPosition(stream, game, initialPositionFactory) {

	// Nothing to do if no custom FEN has been defined -> let the default state.
	if(!initialPositionFactory.fen) {
		if(initialPositionFactory.variant && initialPositionFactory.variant !== 'regular') {
			throw stream.invalidPGNException(i18n.VARIANT_WITHOUT_FEN);
		}
		return;
	}

	try {
		var position = new Position(initialPositionFactory.variant ? initialPositionFactory.variant : 'regular', 'empty');
		var moveCounters = position.fen(initialPositionFactory.fen);
		game.initialPosition(position, moveCounters.fullMoveNumber);
	}
	catch(error) {
		if(error instanceof exception.InvalidFEN) {
			throw stream.invalidPGNException(initialPositionFactory.fenTokenIndex, i18n.INVALID_FEN_IN_PGN_TEXT, error.message);
		}
		else {
			throw error;
		}
	}
}


/**
 * Parse exactly 1 game from the given stream.
 *
 * @param {TokenStream} stream
 * @returns {Game}
 * @throws {module:exception.InvalidPGN}
 * @ignore
 */
function doParseGame(stream) {

	// State variable for syntaxic analysis.
	var game            = null;  // the result
	var node            = null;  // current node (or variation) to which the next move should be appended
	var nodeIsVariation = false; // whether the current node is a variation or not
	var nodeStack       = [];    // when starting a variation, its parent node (btw., always a "true" node, not a variation) is stacked here
	var initialPositionFactory = {};

	// Token loop
	while(stream.consumeToken()) {

		// Create a new game if necessary
		if(game === null) {
			game = new Game();
		}

		// Matching anything else different from a header means that the move section
		// is going to be parse => set-up the root node.
		if(stream.token() !== TokenStream.HEADER && node === null) {
			initializeInitialPosition(stream, game, initialPositionFactory);
			node = game.mainVariation();
			nodeIsVariation = true;
		}

		// Token type switch
		switch(stream.token()) {

			// Header
			case TokenStream.HEADER:
				if(node !== null) {
					throw stream.invalidPGNException(i18n.UNEXPECTED_PGN_HEADER);
				}
				processHeader(stream, game, initialPositionFactory, stream.tokenValue().key, stream.tokenValue().value);
				break;

			// Move or null-move
			case TokenStream.MOVE:
				try {
					node = node.play(stream.tokenValue());
					nodeIsVariation = false;
				}
				catch(error) {
					if(error instanceof exception.InvalidNotation) {
						throw stream.invalidPGNException(i18n.INVALID_MOVE_IN_PGN_TEXT, error.notation, error.message);
					}
					else {
						throw error;
					}
				}
				break;

			// NAG
			case TokenStream.NAG:
				node.addNag(stream.tokenValue());
				break;

			// Comment
			case TokenStream.COMMENT:
				var tags = stream.tokenValue().tags;
				for(var key in tags) {
					if(tags[key] !== undefined) {
						node.tag(key, tags[key]);
					}
				}
				if(stream.tokenValue().comment !== undefined) {
					node.comment(stream.tokenValue().comment, stream.emptyLineFound());
				}
				break;

			// Begin of variation
			case TokenStream.BEGIN_VARIATION:
				if(nodeIsVariation) {
					throw stream.invalidPGNException(i18n.UNEXPECTED_BEGIN_OF_VARIATION);
				}
				nodeStack.push(node);
				node = node.addVariation(stream.emptyLineFound());
				nodeIsVariation = true;
				break;

			// End of variation
			case TokenStream.END_VARIATION:
				if(nodeStack.length === 0) {
					throw stream.invalidPGNException(i18n.UNEXPECTED_END_OF_VARIATION);
				}
				node = nodeStack.pop();
				nodeIsVariation = false;
				break;

			// End-of-game
			case TokenStream.END_OF_GAME:
				if(nodeStack.length > 0) {
					throw stream.invalidPGNException(i18n.UNEXPECTED_END_OF_GAME);
				}
				game.result(stream.tokenValue());
				return game;

		} // switch(stream.token())

	} // while(stream.consumeToken())

	throw stream.invalidPGNException(i18n.UNEXPECTED_END_OF_TEXT);
}


/**
 * Skip 1 game in the given stream.
 *
 * @param {TokenStream} stream
 * @returns {boolean} `true` if a game has been skipped, false if the end of the stream has been reached.
 * @throws {module:exception.InvalidPGN}
 * @ignore
 */
function doSkipGame(stream) {
	var atLeastOneTokenFound = false;
	while(stream.consumeToken()) {
		atLeastOneTokenFound = true;
		if(stream.token() === TokenStream.END_OF_GAME) {
			return true;
		}
	}

	// If the end of the stream has been reached without seeing any END_OF_GAME token, then no token should have been seen at all.
	// Throw an exception if this is not the case.
	if(atLeastOneTokenFound) {
		throw stream.invalidPGNException(i18n.UNEXPECTED_END_OF_TEXT);
	}
	return false;
}


function gameCountGetterImpl(impl) {
	return impl.games.length;
}


function gameGetterImpl(impl, gameIndex) {
	if(impl.currentGameIndex !== gameIndex) {
		impl.stream = new TokenStream(impl.text, impl.games[gameIndex]);
	}
	impl.currentGameIndex = -1;
	var result = doParseGame(impl.stream);
	impl.currentGameIndex = gameIndex + 1;
	return result;
}


/**
 * PGN parsing function.
 *
 * @param {string} pgnString String to parse.
 * @returns {Database}
 * @throws {module:exception.InvalidPGN}
 *
 *//**
 *
 * PGN parsing function.
 *
 * @param {string} pgnString String to parse.
 * @param {number} gameIndex Only the game corresponding to this index is parsed.
 * @returns {Game}
 * @throws {module:exception.InvalidPGN}
 */
exports.pgnRead = function(pgnString, gameIndex) {
	var stream = new TokenStream(pgnString, 0);
	var errors = [];

	// Parse all games (and return a Database object)...
	if(arguments.length === 1) {
		var games = [];
		while(true) {
			var currentPos = stream.currentPosition();
			try {
				if(!doSkipGame(stream)) {
					break;
				}
				games.push(currentPos);
			}
			catch (err) {
				if (err instanceof exception.InvalidPGN) {
					errors.push({message: err.message, lineno: err.lineNumber});
					// skip this game, but continue
					stream.skipGame();
				}
			}
		}
		return new Database({ text: pgnString, games: games, currentGameIndex: -1, errors: errors }, gameCountGetterImpl, gameGetterImpl);
	}

	// Parse one game...
	else {
		var gameCounter = 0;
		while(gameCounter < gameIndex) {
			if(doSkipGame(stream)) {
				++gameCounter;
			}
			else {
				throw new exception.InvalidPGN(pgnString, pgnString.length, stream._lineCount, i18n.INVALID_GAME_INDEX, gameIndex, gameCounter);
			}
		}
		return doParseGame(stream);
	}
};

},{"./database":3,"./exception":4,"./game":5,"./i18n":6,"./position":9,"./private_pgn/tokenstream":10}],9:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


var bt = require('./basetypes');
var moveDescriptor = require('./movedescriptor');
var exception = require('./exception');

var impl = require('./private_position/impl');
var fen = require('./private_position/fen');
var attacks = require('./private_position/attacks');
var legality = require('./private_position/legality');
var moveGeneration = require('./private_position/movegeneration');
var notation = require('./private_position/notation');



// -----------------------------------------------------------------------------
// Constructor & reset/clear
// -----------------------------------------------------------------------------

/**
 * @class
 * @classdesc Represent a chess position, i.e. the state of a 64-square chessboard with a few additional
 *            information (who is about to play, castling rights, en-passant rights).
 *
 * @description
 * This constructor can be invoked with different types of arguments:
 * ```
 * new kokopu.Position('regular');                  //  1 -> Usual starting position.
 * new kokopu.Position('regular', 'start');         //  2 -> Same as 1.
 * new kokopu.Position('regular', 'empty');         //  3 -> Empty board.
 * new kokopu.Position('no-king', 'empty');         //  4 -> Empty board, configured to be considered as legal without any king.
 * new kokopu.Position('white-king-only', 'empty'); //  5 -> Empty board, configured to be considered as legal with no black king.
 * new kokopu.Position('black-king-only', 'empty'); //  6 -> Empty board, configured to be considered as legal with no white king.
 * new kokopu.Position('chess960', 'empty');        //  7 -> Empty board, configured for Chess960.
 * new kokopu.Position('chess960', scharnaglCode);  //  8 -> One of the Chess960 starting position (`scharnaglCode` is a number between 0 and 959 inclusive).
 * new kokopu.Position(variant, fenString);         //  9 -> Parse the given FEN string, assuming the given game variant.
 * new kokopu.Position(anotherPosition);            // 10 -> Make a copy of `anotherPosition`.
 * ```
 * Please note that the argument `'regular'` can be omitted in forms 1, 2, 3. In particular, the constructor can be invoked
 * with no argument, as in `new kokopu.Position()`: in this case, a new `Position` initialized to the usual starting position
 * is instantiated (as in forms 1 and 2).
 *
 * In form 9, `variant` must be one of the game variant proposed in {@link GameVariant}. The `variant` argument can be omitted,
 * as in `new kokopu.Position(fenString)`: in this case, the usual chess rules are assumed (as if `variant` where set to `'regular'`).
 * If `variant` is set to `'chess960'`, then the X-FEN syntax can be used for `fenString'`.
 *
 * In form 10, `anotherPosition` must be another {@link Position} object.
 *
 * @throws {module:exception.InvalidFEN} If the input parameter is not a valid FEN string (can be thrown only in cases 6 and 7).
 *
 * @see FEN notation: {@link https://en.wikipedia.org/wiki/Forsyth–Edwards_Notation}
 * @see Chess960 (aka. Fischer Random Chess): {@link https://en.wikipedia.org/wiki/Chess960}
 * @see Chess960 starting positions: {@link https://chess960.net/start-positions/}
 * @see X-FEN notation: {@link https://en.wikipedia.org/wiki/X-FEN}
 */
var Position = exports.Position = function() {

	// Copy constructor
	if(arguments[0] instanceof Position) {
		this._impl = impl.makeCopy(arguments[0]._impl);
	}

	// Special constructor codes
	else if(arguments.length === 0 || arguments[0] === 'start' || (arguments[0] === 'regular' && (arguments.length === 1 || arguments[1] === 'start'))) {
		this._impl = impl.makeInitial();
	}
	else if(arguments[0] === 'empty' || (arguments[0] === 'regular' && arguments[1] === 'empty')) {
		this._impl = impl.makeEmpty(bt.REGULAR_CHESS);
	}
	else if(arguments[0] === 'chess960' && arguments[1] === 'empty') {
		this._impl = impl.makeEmpty(bt.CHESS960);
	}
	else if(arguments[0] === 'chess960' && typeof arguments[1] === 'number' && arguments[1] >= 0 && arguments[1] <= 959) {
		this._impl = impl.make960FromScharnagl(arguments[1]);
	}
	else if(arguments[0] === 'no-king' && arguments[1] === 'empty') {
		this._impl = impl.makeEmpty(bt.NO_KING);
	}
	else if(arguments[0] === 'white-king-only' && arguments[1] === 'empty') {
		this._impl = impl.makeEmpty(bt.WHITE_KING_ONLY);
	}
	else if(arguments[0] === 'black-king-only' && arguments[1] === 'empty') {
		this._impl = impl.makeEmpty(bt.BLACK_KING_ONLY);
	}

	// FEN parsing
	else if(typeof arguments[0] === 'string') {
		var variant = bt.variantFromString(arguments[0]);
		if(variant >= 0) {
			if(typeof arguments[1] === 'string') {
				this._impl = fen.parseFEN(variant, arguments[1], false).position;
			}
			else {
				throw new exception.IllegalArgument('Position()');
			}
		}
		else {
			this._impl = fen.parseFEN(bt.REGULAR_CHESS, arguments[0], false).position;
		}
	}

	// Wrong argument scheme
	else {
		throw new exception.IllegalArgument('Position()');
	}
};


/**
 * Set the position to the empty state.
 *
 * @param {GameVariant} [variant=`'regular'`] Chess game variant to use.
 */
Position.prototype.clear = function(variant) {
	if(arguments.length === 0) {
		this._impl = impl.makeEmpty(bt.REGULAR_CHESS);
	}
	else {
		var v = bt.variantFromString(variant);
		if(v < 0) {
			throw new exception.IllegalArgument('Position#clear()');
		}
		this._impl = impl.makeEmpty(v);
	}
};


/**
 * Set the position to the starting state.
 */
Position.prototype.reset = function() {
	this._impl = impl.makeInitial();
};


/**
 * Set the position to one of the Chess960 starting position.
 *
 * @param {number} scharnaglCode Must be between 0 and 959 inclusive (see {@link https://chess960.net/start-positions/}
 *        or {@link https://chessprogramming.wikispaces.com/Reinhard+Scharnagl} for more details).
 */
Position.prototype.reset960 = function(scharnaglCode) {
	this._impl = impl.make960FromScharnagl(scharnaglCode);
};



// -----------------------------------------------------------------------------
// FEN & ASCII conversion
// -----------------------------------------------------------------------------


/**
 * Return a human-readable string representing the position. This string is multi-line,
 * and is intended to be displayed in a fixed-width font (similarly to an ASCII-art picture).
 *
 * @returns {string} Human-readable representation of the position.
 */
Position.prototype.ascii = function() {
	return fen.ascii(this._impl);
};


/**
 * Get the FEN representation of the current {@link Position}).
 *
 * @param {{fiftyMoveClock:number, fullMoveNumber:number}} [options] If not provided the `fiftyMoveClock`
 *        and the `fullMoveNumber` fields of the returned FEN string are set respectively to 0 and 1.
 *
 *//**
 *
 * Parse the given FEN string and set the position accordingly.
 *
 * @param {string} fen
 * @param {boolean} [strict=false] If `true`, only perfectly formatted FEN strings are accepted.
 * @returns {{fiftyMoveClock:number, fullMoveNumber:number}}
 * @throws {module:exception.InvalidFEN} If the given string cannot be parsed as a valid FEN string.
 */
Position.prototype.fen = function() {
	if(arguments.length === 0) {
		return fen.getFEN(this._impl, 0, 1);
	}
	else if(arguments.length === 1 && typeof arguments[0] === 'object') {
		var fiftyMoveClock = (typeof arguments[0].fiftyMoveClock === 'number') ? arguments[0].fiftyMoveClock : 0;
		var fullMoveNumber = (typeof arguments[0].fullMoveNumber === 'number') ? arguments[0].fullMoveNumber : 1;
		return fen.getFEN(this._impl, fiftyMoveClock, fullMoveNumber);
	}
	else if(arguments.length === 1 && typeof arguments[0] === 'string') {
		var result = fen.parseFEN(this._impl.variant, arguments[0], false);
		this._impl = result.position;
		return { fiftyMoveClock: result.fiftyMoveClock, fullMoveNumber: result.fullMoveNumber };
	}
	else if(arguments.length >= 2 && typeof arguments[0] === 'string' && typeof arguments[1] === 'boolean') {
		var result = fen.parseFEN(this._impl.variant, arguments[0], arguments[1]);
		this._impl = result.position;
		return { fiftyMoveClock: result.fiftyMoveClock, fullMoveNumber: result.fullMoveNumber };
	}
	else {
		throw new exception.IllegalArgument('Position#fen()');
	}
};



// -----------------------------------------------------------------------------
// Accessors
// -----------------------------------------------------------------------------


/**
 * Get the {@link GameVariant} in use.
 *
 * @returns {GameVariant}
 */
Position.prototype.variant = function() {
	return bt.variantToString(this._impl.variant);
};


/**
 * Get the content of a square.
 *
 * @param {Square} square
 * @returns {ColoredPiece|Empty}
 *
 *//**
 *
 * Set the content of a square.
 *
 * @param {Square} square
 * @param {ColoredPiece|Empty} value
 */
Position.prototype.square = function(square, value) {
	square = bt.squareFromString(square);
	if(square < 0) {
		throw new exception.IllegalArgument('Position#square()');
	}

	if(arguments.length === 1) {
		var cp = this._impl.board[square];
		return cp < 0 ? '-' : bt.coloredPieceToString(cp);
	}
	else if(value === '-') {
		this._impl.board[square] = bt.EMPTY;
		this._impl.legal = null;
	}
	else {
		var cp = bt.coloredPieceFromString(value);
		if(cp < 0) {
			throw new exception.IllegalArgument('Position#square()');
		}
		this._impl.board[square] = cp;
		this._impl.legal = null;
	}
};


/**
 * Get the turn flag (i.e. who is about to play).
 *
 * @returns {Color}
 *
 *//**
 *
 * Set the turn flag (i.e. who is about to play).
 *
 * @param {Color} value
 */
Position.prototype.turn = function(value) {
	if(arguments.length === 0) {
		return bt.colorToString(this._impl.turn);
	}
	else {
		var turn = bt.colorFromString(value);
		if(turn < 0) {
			throw new exception.IllegalArgument('Position#turn()');
		}
		this._impl.turn = turn;
		this._impl.legal = null;
	}
};


/**
 * Get a castle flag (i.e. whether or not the corresponding castle is allowed or not).
 *
 * @param {Castle|Castle960} castle Must be {@link Castle960} if the {@link Position} is configured for Chess960, or {@link Castle} otherwise.
 * @returns {boolean}
 *
 *//**
 *
 * Set a castle flag (i.e. whether or not the corresponding castle is allowed or not).
 *
 * @param {Castle|Castle960} castle Must be {@link Castle960} if the {@link Position} is configured for Chess960, or {@link Castle} otherwise.
 * @param {boolean} value
 */
Position.prototype.castling = function(castle, value) {
	if(!(this._impl.variant === bt.CHESS960 ? /^[wb][a-h]$/ : /^[wb][qk]$/).test(castle)) {
		throw new exception.IllegalArgument('Position#castling()');
	}
	var color = bt.colorFromString(castle[0]);
	var file = this._impl.variant === bt.CHESS960 ? bt.fileFromString(castle[1]) : castle[1]==='k' ? 7 : 0;

	if(arguments.length === 1) {
		return (this._impl.castling[color] & 1 << file) !== 0;
	}
	else if(value) {
		this._impl.castling[color] |= 1 << file;
		this._impl.legal = null;
	}
	else {
		this._impl.castling[color] &= ~(1 << file);
		this._impl.legal = null;
	}
};


/**
 * Get the *en-passant* flag (i.e. the file on which *en-passant* is allowed, if any).
 *
 * @returns {EnPassantFlag}
 *
 *//**
 *
 * Set the *en-passant* flag (i.e. the file on which *en-passant* is allowed, if any).
 *
 * @param {EnPassantFlag} value
 */
Position.prototype.enPassant = function(value) {
	if(arguments.length === 0) {
		return this._impl.enPassant < 0 ? '-' : bt.fileToString(this._impl.enPassant);
	}
	else if(value === '-') {
		this._impl.enPassant = -1;
		this._impl.legal = null;
	}
	else {
		var enPassant = bt.fileFromString(value);
		if(enPassant < 0) {
			throw new exception.IllegalArgument('Position#enPassant()');
		}
		this._impl.enPassant = enPassant;
		this._impl.legal = null;
	}
};



// -----------------------------------------------------------------------------
// Attacks
// -----------------------------------------------------------------------------


/**
 * Check if any piece of the given color attacks a given square.
 *
 * @param {Square} square
 * @param {Color} byWho
 * @returns {boolean}
 */
Position.prototype.isAttacked = function(square, byWho) {
	square = bt.squareFromString(square);
	byWho = bt.colorFromString(byWho);
	if(square < 0 || byWho < 0) {
		throw new exception.IllegalArgument('Position#isAttacked()');
	}
	return attacks.isAttacked(this._impl, square, byWho);
};


/**
 * Return the squares from which a piece of the given color attacks a given square.
 *
 * @param {Square} square
 * @param {Color} byWho
 * @returns {Square[]}
 */
Position.prototype.getAttacks = function(square, byWho) {
	square = bt.squareFromString(square);
	byWho = bt.colorFromString(byWho);
	if(square < 0 || byWho < 0) {
		throw new exception.IllegalArgument('Position#getAttacks()');
	}
	return attacks.getAttacks(this._impl, square, byWho).map(bt.squareToString);
};



// -----------------------------------------------------------------------------
// Legality
// -----------------------------------------------------------------------------


/**
 * Check whether the current position is legal or not.
 *
 * A position is considered to be legal if all the following conditions are met:
 *
 *  1. There is exactly one white king and one black king on the board.
 *  2. The player that is not about to play is not in check.
 *  3. There are no pawn on ranks 1 and 8.
 *  4. For each colored castle flag set, there is a rook and a king on the
 *     corresponding initial squares.
 *  5. The pawn situation is consistent with the *en-passant* flag if it is set.
 *     For instance, if it is set to the "e" file and black is about to play,
 *     the squares e2 and e3 must be empty, and there must be a white pawn on e4.
 *
 * @returns {boolean}
 */
Position.prototype.isLegal = function() {
	return legality.isLegal(this._impl);
};


/**
 * Return the square on which is located the king of the given color.
 *
 * @param {Color} color
 * @returns {Square|boolean} Square where is located the searched king. `false` is returned
 *          if there is no king of the given color, or if the are 2 such kings or more.
 */
Position.prototype.kingSquare = function(color) {
	color = bt.colorFromString(color);
	if(color < 0) {
		throw new exception.IllegalArgument('Position#kingSquare()');
	}
	legality.refreshLegalFlagAndKingSquares(this._impl);
	var square = this._impl.king[color];
	return square < 0 ? false : bt.squareToString(square);
};



// -----------------------------------------------------------------------------
// Move generation
// -----------------------------------------------------------------------------


/**
 * Return `true` if the player that is about to play is in check. If the position is not legal (see {@link Position#isLegal}),
 * the returned value is always `false`.
 *
 * @returns {boolean}
 */
Position.prototype.isCheck = function() {
	return moveGeneration.isCheck(this._impl);
};


/**
 * Return `true` if the player that is about to play is checkmated. If the position is not legal (see {@link Position#isLegal}),
 * the returned value is always `false`.
 *
 * @returns {boolean}
 */
Position.prototype.isCheckmate = function() {
	return moveGeneration.isCheckmate(this._impl);
};


/**
 * Return `true` if the player that is about to play is stalemated. If the position is not legal (see {@link Position#isLegal}),
 * the returned value is always `false`.
 *
 * @returns {boolean}
 */
Position.prototype.isStalemate = function() {
	return moveGeneration.isStalemate(this._impl);
};


/**
 * Whether at least one legal move exists in the current position or not. If the position is not legal (see {@link Position#isLegal}),
 * the returned value is always `false`.
 *
 * @returns {boolean}
 */
Position.prototype.hasMove = function() {
	return moveGeneration.hasMove(this._impl);
};


/**
 * Return the list of all legal moves in the current position. An empty list is returned if the position itself is not legal
 * (see {@link Position#isLegal}).
 *
 * @returns {MoveDescriptor[]}
 */
Position.prototype.moves = function() {
	return moveGeneration.moves(this._impl);
};


/**
 * Check whether a move is legal or not, and return the corresponding {@link MoveDescriptor} if it is legal.
 *
 * Depending on the situation, the method returns:
 *   - `false` if it is not possible to move from `from` to `to` (either because the move itself is not legal, or because the underlying
 *     position is not legal).
 *   - a function that returns a {@link MoveDescriptor} otherwise. When there is only one possible move between the given squares
 *     `from` and `to` (i.e. in most cases), this function must be invoked with no argument. When there is a "move ambiguity"
 *     (i.e. squares `from` and `to` are not sufficient to fully describe a move), an argument must be passed to the this function
 *     in order to discriminate between the possible moves. A field `status` is added to the function in order to indicate whether
 *     there is a move ambiguity or not.
 *
 * A code interpreting the result returned by {@link Position#isMoveLegal} would typically look like this:
 *
 * ```
 * var result = position.isMoveLegal(from, to);
 * if(!result) {
 *   // The move "from -> to" is not legal.
 * }
 * else {
 *   switch(result.status) {
 *
 *     case 'regular':
 *       // The move "from -> to" is legal, and the corresponding move descriptor is `result()`.
 *       break;
 *
 *     case 'promotion':
 *       // The move "from -> to" is legal, but it corresponds to a promotion,
 *       // so the promoted piece must be specified. The corresponding move descriptors
 *       // are `result('q')`, `result('r')`, `result('b')` and `result('n')`.
 *       break;
 *
 *     case 'castle960':
 *       // The move "from -> to" is legal, but it corresponds either to a castling move
 *       // or to a regular king move (this case can only happen at Chess960).
 *       // The corresponding move descriptors are `result('castle')` and `result('king')`.
 *       break;
 *
 *     default:
 *       // This case is not supposed to happen.
 *       break;
 *   }
 * }
 * ```
 *
 * @param {Square} from
 * @param {Square} to
 * @returns {boolean|function}
 */
Position.prototype.isMoveLegal = function(from, to) {
	from = bt.squareFromString(from);
	to = bt.squareFromString(to);
	if(from < 0 || to < 0) {
		throw new exception.IllegalArgument('Position#isMoveLegal()');
	}
	var result = moveGeneration.isMoveLegal(this._impl, from, to);

	// No legal move.
	if(!result) {
		return false;
	}

	// Only one legal move (no ambiguity).
	else if(moveDescriptor.isMoveDescriptor(result)) {
		return makeFactory('regular', function() { return result; });
	}

	// Several legal moves -> ambiguity.
	else {
		switch(result.type) {

			case 'promotion':
				return makeFactory('promotion', function(promotion) {
					promotion = bt.pieceFromString(promotion);
					if(promotion >= 0) {
						var builtMoveDescriptor = result.build(promotion);
						if(builtMoveDescriptor) {
							return builtMoveDescriptor;
						}
					}
					throw new exception.IllegalArgument('Position#isMoveLegal()');
				});

			case 'castle960':
				return makeFactory('castle960', function(type) {
					switch(type) {
						case 'king': return result.build(false);
						case 'castle': return result.build(true);
						default: throw new exception.IllegalArgument('Position#isMoveLegal()');
					}
				});

			default: // This case is not supposed to happen.
				throw new exception.IllegalArgument('Position#isMoveLegal()');
		}
	}
};


function makeFactory(status, factory) {
	factory.status = status;
	return factory;
}


/**
 * Play the given move if it is legal.
 *
 * WARNING: when a {@link MoveDescriptor} is passed to this method, this {@link MoveDescriptor} must have been issued by one of the
 * {@link Position#moves} / {@link Position#isMoveLegal} / {@link Position#notation} methods of the current {@link Position}.
 * Trying to invoke {@link Position#play} with a {@link MoveDescriptor} generated by another {@link Position} object would result
 * in an undefined behavior.
 *
 * @param {string|MoveDescriptor} move
 * @returns {boolean} `true` if the move has been played, `false` if the move is not legal or if the string passed to the method
 *          cannot be interpreted as a valid SAN move notation (see {@link Position#notation}).
 */
Position.prototype.play = function(move) {
	if(typeof move === 'string') {
		try {
			moveGeneration.play(this._impl, notation.parseNotation(this._impl, move, false));
			return true;
		}
		catch(err) {
			if(err instanceof exception.InvalidNotation) {
				return false;
			}
			else {
				throw err;
			}
		}
	}
	else if(moveDescriptor.isMoveDescriptor(move)) {
		moveGeneration.play(this._impl, move);
		return true;
	}
	else {
		throw new exception.IllegalArgument('Position#play()');
	}
};


/**
 * Determine whether a null-move (i.e. switching the player about to play) can be play in the current position.
 *
 * A null-move is possible if the position is legal and if the current player about to play is not in check.
 *
 * @returns {boolean}
 */
Position.prototype.isNullMoveLegal = function() {
	return moveGeneration.isNullMoveLegal(this._impl);
};


/**
 * Play a null-move on the current position if it is legal.
 *
 * @returns {boolean} `true` if the move has actually been played, `false` otherwise.
 */
Position.prototype.playNullMove = function() {
	return moveGeneration.playNullMove(this._impl);
};



// -----------------------------------------------------------------------------
// Algebraic notation
// -----------------------------------------------------------------------------


/**
 * Return the standard algebraic notation corresponding to the given move descriptor.
 *
 * @param {MoveDescriptor} moveDescriptor
 * @returns {string}
 *
 *//**
 *
 * Parse the given string as standard algebraic notation and return the corresponding move descriptor.
 *
 * @param {string} move
 * @param {boolean} [strict=false] If `true`, only perfectly formatted SAN moves are accepted. If `false`, "small errors" in the input
 *        such as a missing capture character, an unnecessary disambiguation symbol... do not interrupt the parsing.
 * @returns {MoveDescriptor}
 * @throws {module:exception.InvalidNotation} If the move parsing fails or if the parsed move would correspond to an illegal move.
 */
Position.prototype.notation = function() {
	if(arguments.length === 1 && moveDescriptor.isMoveDescriptor(arguments[0])) {
		return notation.getNotation(this._impl, arguments[0]);
	}
	else if(arguments.length === 1 && typeof arguments[0] === 'string') {
		return notation.parseNotation(this._impl, arguments[0], false);
	}
	else if(arguments.length >= 2 && typeof arguments[0] === 'string' && typeof arguments[1] === 'boolean') {
		return notation.parseNotation(this._impl, arguments[0], arguments[1]);
	}
	else {
		throw new exception.IllegalArgument('Position#notation()');
	}
};

},{"./basetypes":2,"./exception":4,"./movedescriptor":7,"./private_position/attacks":11,"./private_position/fen":12,"./private_position/impl":13,"./private_position/legality":14,"./private_position/movegeneration":15,"./private_position/notation":16}],10:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


var exception = require('../exception');
var i18n = require('../i18n');


/**
 * @class
 * @classdesc Stream of tokens.
 */
var TokenStream = exports.TokenStream = function(pgnString, initialPosition) {

	// Remove the BOM (byte order mark) if any.
	if(pgnString.codePointAt(0) === 0xFEFF) {
		pgnString = pgnString.substr(1);
	}

	this._text           = pgnString;       // what is being parsed
	this._pos            = initialPosition; // current position in the string
	this._emptyLineFound = false;           // whether an empty line has been encountered while parsing the current token
	this._lineCount      = 1;               // the current line number starting at 1
	this._token          = 0;               // current token
	this._tokenValue     = null;            // current token value (if any)
	this._tokenIndex     = 0;               // position of the current token in the string

	// Space-like matchers
	this._matchSpaces = /[ \f\t\v]+/g;
	this._matchLineBreak = /\r?\n|\r/g;
	this._matchCommentLineBreak = /\r?\n|\r/g; // allow matching comment linebreaks separately

	// Token matchers
	this._matchHeaderRegular = /\[\s*(\w+)\s+"((?:[^\\"]|\\[\\"])*)"\s*\]/g;
	this._matchHeaderDegenerated = /^\[\s*(\w+)\s+"(.*)"\s*\]$/mg;
	this._matchMove = /(?:[1-9][0-9]*\s*\.(?:\.\.)?\s*)?((?:O-O-O|0-0-0|O-O|0-0|[KQRBN][a-h]?[1-8]?x?[a-h][1-8]|(?:[a-h]x?)?[a-h][1-8](?:=?[KQRBNP])?)[+#]?|--)/g;
	this._matchNag = /([!?][!?]?|\+\/?[-=]|[-=]\/?\+|=|inf|~)|\$([1-9][0-9]*)/g;
	this._matchComment = /\{((?:[^{}\\]|\\[{}\\])*)\}/g;
	this._matchBeginVariation = /\(/g;
	this._matchEndVariation = /\)/g;
	this._matchEndOfGame = /1-0|0-1|1\/2-1\/2|\*/g;

	this._matchSpaces.matchedIndex = -1;
	this._matchLineBreak.matchedIndex = -1;
	this._matchHeaderRegular.matchedIndex = -1;
	this._matchHeaderDegenerated.matchedIndex = -1;
	this._matchMove.matchedIndex = -1;
	this._matchNag.matchedIndex = -1;
	this._matchComment.matchedIndex = -1;
	this._matchBeginVariation.matchedIndex = -1;
	this._matchEndVariation.matchedIndex = -1;
	this._matchEndOfGame.matchedIndex = -1;
};


// PGN token types
var TOKEN_HEADER          = TokenStream.HEADER          = 1; // Ex: [White "Kasparov, G."]
var TOKEN_MOVE            = TokenStream.MOVE            = 2; // SAN notation or -- (with an optional move number)
var TOKEN_NAG             = TokenStream.NAG             = 3; // $[1-9][0-9]* or a key from table SPECIAL_NAGS_LOOKUP (!!, +-, etc..)
var TOKEN_COMMENT         = TokenStream.COMMENT         = 4; // {some text}
var TOKEN_BEGIN_VARIATION = TokenStream.BEGIN_VARIATION = 5; // (
var TOKEN_END_VARIATION   = TokenStream.END_VARIATION   = 6; // )
var TOKEN_END_OF_GAME     = TokenStream.END_OF_GAME     = 7; // 1-0, 0-1, 1/2-1/2 or *


/**
 * Try to match the given regular expression at the current position.
 *
 * @param {TokenStream} stream
 * @param {RegExp} regex
 * @returns {boolean}
 */
function testAtPos(stream, regex) {
	if(regex.matchedIndex < stream._pos) {
		regex.lastIndex = stream._pos;
		regex.matched = regex.exec(stream._text);
		regex.matchedIndex = regex.matched === null ? stream._text.length : regex.matched.index;
	}

	if(regex.matchedIndex === stream._pos) {
		stream._pos = regex.lastIndex;
		return true;
	}
	else {
		return false;
	}
}


/**
 * Advance until the first non-blank character.
 *
 * @param {TokenStream} stream
 */
function skipBlanks(stream) {
	var newLineCount = 0;
	while(stream._pos < stream._text.length) {
		if(testAtPos(stream, stream._matchSpaces)) {
			// Nothing to do...
		}
		else if(testAtPos(stream, stream._matchLineBreak)) {
			++stream._lineCount;
			++newLineCount;
		}
		else {
			break;
		}
	}

	// An empty line was encountered if and only if at least to line breaks were found.
	stream._emptyLineFound = newLineCount >= 2;
}

/**
 * Parse a header value, unescaping special characters.
 *
 * @param {string} rawHeaderValue
 * @returns {string}
 */
function parseHeaderValue(rawHeaderValue) {
	return rawHeaderValue.replace(/\\([\\"])/g, '$1');
}


/**
 * Parse a comment, unescaping special characters, and looking for the `[%key value]` tags.
 *
 * @param {TokenStream} stream
 * @param {string} rawComment String to parse.
 * @returns {{comment:string, tags:Object}}
 */
function parseCommentValue(stream, rawComment) {
	rawComment = rawComment.replace(/\\([{}\\])/g, '$1');

	// count number of new lines in the comments, if any
	var matches = rawComment.match(stream._matchCommentLineBreak);
	stream._lineCount += matches !== null ? matches.length : 0;

	var tags = {};

	// Find and remove the tags from the raw comment.
	var comment = rawComment.replace(/\[%([a-zA-Z0-9]+)\s+([^[\]]+)\]/g, function(match, p1, p2) {
		tags[p1] = p2;
		return ' ';
	});

	// Trim the comment and collapse sequences of space characters into 1 character only.
	comment = comment.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
	if(comment === '') {
		comment = undefined;
	}

	// Return the result
	return { comment:comment, tags:tags };
}


// Conversion table NAG -> numeric code
var SPECIAL_NAGS_LOOKUP = {
	'!!' :  3,             // very good move
	'!'  :  1,             // good move
	'!?' :  5,             // interesting move
	'?!' :  6,             // questionable move
	'?'  :  2,             // bad move
	'??' :  4,             // very bad move
	'+-' : 18,             // White has a decisive advantage
	'+/-': 16,             // White has a moderate advantage
	'+/=': 14, '+=' : 14,  // White has a slight advantage
	'='  : 10,             // equal position
	'~'  : 13, 'inf': 13,  // unclear position
	'=/+': 15, '=+' : 15,  // Black has a slight advantage
	'-/+': 17,             // Black has a moderate advantage
	'-+' : 19              // Black has a decisive advantage
};


/**
 * Try to consume 1 token.
 *
 * @return {boolean} `true` if a token could have been read, `false` if the end of the text has been reached.
 * @throws {module:exception.InvalidPGN} If the text cannot be interpreted as a valid token.
 */
TokenStream.prototype.consumeToken = function() {

	// Consume blank (i.e. meaning-less) characters
	skipBlanks(this);
	if(this._pos >= this._text.length) {
		this._tokenIndex = this._text.length;
		return false;
	}

	// Remaining part of the string
	this._tokenIndex = this._pos;

	// Match a game header (ex: [White "Kasparov, G."])
	if(testAtPos(this, this._matchHeaderRegular)) {
		this._token      = TOKEN_HEADER;
		this._tokenValue = { key: this._matchHeaderRegular.matched[1], value: parseHeaderValue(this._matchHeaderRegular.matched[2]) };
	}
	else if(testAtPos(this, this._matchHeaderDegenerated)) {
		this._token      = TOKEN_HEADER;
		this._tokenValue = { key: this._matchHeaderDegenerated.matched[1], value: this._matchHeaderDegenerated.matched[2] };
	}

	// Match a move or a null-move
	else if(testAtPos(this, this._matchMove)) {
		this._token      = TOKEN_MOVE;
		if (this._matchMove.matched[1] === '0-0') {
			this._tokenValue = 'O-O';
		} else if (this._matchMove.matched[1] === '0-0-0') {
			this._tokenValue = 'O-O-O';
		} else {
			this._tokenValue = this._matchMove.matched[1];
		}
	}

	// Match a NAG
	else if(testAtPos(this, this._matchNag)) {
		this._token      = TOKEN_NAG;
		this._tokenValue = this._matchNag.matched[2] === undefined ? SPECIAL_NAGS_LOOKUP[this._matchNag.matched[1]] :
			parseInt(this._matchNag.matched[2], 10);
	}

	// Match a comment
	else if(testAtPos(this, this._matchComment)) {
		this._token      = TOKEN_COMMENT;
		this._tokenValue = parseCommentValue(this, this._matchComment.matched[1]);
	}

	// Match the beginning of a variation
	else if(testAtPos(this, this._matchBeginVariation)) {
		this._token      = TOKEN_BEGIN_VARIATION;
		this._tokenValue = null;
	}

	// Match the end of a variation
	else if(testAtPos(this, this._matchEndVariation)) {
		this._token      = TOKEN_END_VARIATION;
		this._tokenValue = null;
	}

	// Match a end-of-game marker
	else if(testAtPos(this, this._matchEndOfGame)) {
		this._token      = TOKEN_END_OF_GAME;
		this._tokenValue = this._matchEndOfGame.matched[0];
	}

	// Otherwise, the string is badly formatted with respect to the PGN syntax
	else {
		throw new exception.InvalidPGN(this._text, this._pos, this._lineCount, i18n.INVALID_PGN_TOKEN);
	}

	return true;
};

TokenStream.prototype.skipGame = function() {
	while(this._pos < this._text.length) {
		if(testAtPos(this, this._matchEndOfGame)) {
			break;
		}
		++this._pos;
	}
};

TokenStream.prototype.currentPosition = function() {
	return this._pos;
};


TokenStream.prototype.emptyLineFound = function() {
	return this._emptyLineFound;
};


TokenStream.prototype.token = function() {
	return this._token;
};


TokenStream.prototype.tokenValue = function() {
	return this._tokenValue;
};


TokenStream.prototype.tokenIndex = function() {
	return this._tokenIndex;
};


TokenStream.prototype.invalidPGNException = function(tokenIndex) {
	var constructorArguments = [ this._text ];
	if(typeof tokenIndex !== 'number') {
		constructorArguments.push(this._tokenIndex);
	}
	Array.prototype.push.apply(constructorArguments, arguments);

	var result = Object.create(exception.InvalidPGN.prototype);
	exception.InvalidPGN.apply(result, constructorArguments);
	return result;
};

},{"../exception":4,"../i18n":6}],11:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


var bt = require('../basetypes');


// Attack directions per colored piece.
var ATTACK_DIRECTIONS = exports.ATTACK_DIRECTIONS = [
	[-17, -16, -15, -1, 1, 15, 16, 17], // king/queen
	[-17, -16, -15, -1, 1, 15, 16, 17], // king/queen
	[-17, -16, -15, -1, 1, 15, 16, 17], // king/queen
	[-17, -16, -15, -1, 1, 15, 16, 17], // king/queen
	[-16, -1, 1, 16], // rook
	[-16, -1, 1, 16], // rook
	[-17, -15, 15, 17], // bishop
	[-17, -15, 15, 17], // bishop
	[-33, -31, -18, -14, 14, 18, 31, 33], // knight
	[-33, -31, -18, -14, 14, 18, 31, 33], // knight
	[15, 17], // white pawn
	[-17, -15] // black pawn
];



// -----------------------------------------------------------------------------
// isAttacked
// -----------------------------------------------------------------------------

/**
 * Check if any piece of the given color attacks a given square.
 */
exports.isAttacked = function(position, square, attackerColor) {
	return isAttackedByNonSliding(position, square, bt.KING*2 + attackerColor) ||
		isAttackedByNonSliding(position, square, bt.KNIGHT*2 + attackerColor) ||
		isAttackedByNonSliding(position, square, bt.PAWN*2 + attackerColor) ||
		isAttackedBySliding(position, square, bt.ROOK*2 + attackerColor, bt.QUEEN*2 + attackerColor) ||
		isAttackedBySliding(position, square, bt.BISHOP*2 + attackerColor, bt.QUEEN*2 + attackerColor);
};


function isAttackedByNonSliding(position, square, nonSlidingAttacker) {
	var directions = ATTACK_DIRECTIONS[nonSlidingAttacker];
	for(var i=0; i<directions.length; ++i) {
		var sq = square - directions[i];
		if((sq & 0x88) === 0 && position.board[sq] === nonSlidingAttacker) {
			return true;
		}
	}
	return false;
}


function isAttackedBySliding(position, square, slidingAttacker, queenAttacker) {
	var directions = ATTACK_DIRECTIONS[slidingAttacker];
	for(var i=0; i<directions.length; ++i) {
		var sq = square;
		while(true) {
			sq -= directions[i];
			if((sq & 0x88)===0) {
				var cp = position.board[sq];
				if(cp === bt.EMPTY) { continue; }
				else if(cp === slidingAttacker || cp===queenAttacker) { return true; }
			}
			break;
		}
	}
	return false;
}



// -----------------------------------------------------------------------------
// getAttacks
// -----------------------------------------------------------------------------

/**
 * Return the squares from which a piece of the given color attacks a given square.
 */
exports.getAttacks = function(position, square, attackerColor) {
	var result = [];
	findNonSlidingAttacks(position, square, result, bt.KING*2 + attackerColor);
	findNonSlidingAttacks(position, square, result, bt.KNIGHT*2 + attackerColor);
	findNonSlidingAttacks(position, square, result, bt.PAWN*2 + attackerColor);
	findSlidingAttacks(position, square, result, bt.ROOK*2 + attackerColor, bt.QUEEN*2 + attackerColor);
	findSlidingAttacks(position, square, result, bt.BISHOP*2 + attackerColor, bt.QUEEN*2 + attackerColor);
	return result;
};


function findNonSlidingAttacks(position, square, result, nonSlidingAttacker) {
	var directions = ATTACK_DIRECTIONS[nonSlidingAttacker];
	for(var i=0; i<directions.length; ++i) {
		var sq = square - directions[i];
		if((sq & 0x88) === 0 && position.board[sq] === nonSlidingAttacker) {
			result.push(sq);
		}
	}
}


function findSlidingAttacks(position, square, result, slidingAttacker, queenAttacker) {
	var directions = ATTACK_DIRECTIONS[slidingAttacker];
	for(var i=0; i<directions.length; ++i) {
		var sq = square;
		while(true) {
			sq -= directions[i];
			if((sq & 0x88) === 0) {
				var cp = position.board[sq];
				if(cp === bt.EMPTY) { continue; }
				else if(cp === slidingAttacker || cp === queenAttacker) { result.push(sq); }
			}
			break;
		}
	}
}

},{"../basetypes":2}],12:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


var bt = require('../basetypes');
var exception = require('../exception');
var i18n = require('../i18n');

var impl = require('./impl');

var FEN_PIECE_SYMBOL = 'KkQqRrBbNnPp';


/**
 * Return a human-readable string representing the position. This string is multi-line,
 * and is intended to be displayed in a fixed-width font (similarly to an ASCII-art picture).
 */
exports.ascii = function(position) {

	// Board scanning
	var result = '+---+---+---+---+---+---+---+---+\n';
	for(var r=7; r>=0; --r) {
		for(var f=0; f<8; ++f) {
			var cp = position.board[r*16 + f];
			result += '| ' + (cp < 0 ? ' ' : FEN_PIECE_SYMBOL[cp]) + ' ';
		}
		result += '|\n';
		result += '+---+---+---+---+---+---+---+---+\n';
	}

	// Flags
	result += bt.colorToString(position.turn) + ' ' + castlingToString(position) + ' ' + enPassantToString(position);
	if(position.variant !== bt.REGULAR_CHESS) {
		result += ' (' + bt.variantToString(position.variant) + ')';
	}

	return result;
};


exports.getFEN = function(position, fiftyMoveClock, fullMoveNumber) {
	var result = '';

	// Board scanning
	for(var r=7; r>=0; --r) {
		var emptyCount = 0;
		for(var f=0; f<8; ++f) {
			var cp = position.board[r*16 + f];
			if(cp < 0) {
				++emptyCount;
			}
			else {
				if(emptyCount > 0) {
					result += emptyCount;
					emptyCount = 0;
				}
				result += FEN_PIECE_SYMBOL[cp];
			}
		}
		if(emptyCount > 0) {
			result += emptyCount;
		}
		if(r > 0) {
			result += '/';
		}
	}

	// Flags + additional move counters
	result += ' ' + bt.colorToString(position.turn) + ' ' + castlingToString(position) + ' ' + enPassantToString(position);
	result += ' ' + fiftyMoveClock + ' ' + fullMoveNumber;

	return result;
};


function castlingToString(position) {
	if(position.variant === bt.CHESS960) {
		var whiteFlags = '';
		var blackFlags = '';
		for(var file = 0; file < 8; ++file) {
			if(position.castling[bt.WHITE] & 1 << file) { whiteFlags += bt.fileToString(file); }
			if(position.castling[bt.BLACK] & 1 << file) { blackFlags += bt.fileToString(file); }
		}
		return whiteFlags === '' && blackFlags === '' ? '-' : whiteFlags.toUpperCase() + blackFlags;
	}
	else {
		var result = '';
		if(position.castling[bt.WHITE] & 1<<7) { result += 'K'; }
		if(position.castling[bt.WHITE] & 1<<0) { result += 'Q'; }
		if(position.castling[bt.BLACK] & 1<<7) { result += 'k'; }
		if(position.castling[bt.BLACK] & 1<<0) { result += 'q'; }
		return result === '' ? '-' : result;
	}
}


function enPassantToString(position) {
	return position.enPassant < 0 ? '-' : bt.fileToString(position.enPassant) + (position.turn===bt.WHITE ? '6' : '3');
}


exports.parseFEN = function(variant, fen, strict) {

	// Trim the input string and split it into 6 fields.
	fen = fen.replace(/^\s+|\s+$/g, '');
	var fields = fen.split(/\s+/);
	if(fields.length !== 6) {
		throw new exception.InvalidFEN(fen, i18n.WRONG_NUMBER_OF_FEN_FIELDS);
	}

	// The first field (that represents the board) is split in 8 sub-fields.
	var rankFields = fields[0].split('/');
	if(rankFields.length !== 8) {
		throw new exception.InvalidFEN(fen, i18n.WRONG_NUMBER_OF_SUBFIELDS_IN_BOARD_FIELD);
	}

	// Initialize the position
	var position = impl.makeEmpty(variant);
	position.legal = null;

	// Board parsing
	for(var r=7; r>=0; --r) {
		var rankField = rankFields[7-r];
		var i = 0;
		var f = 0;
		while(i<rankField.length && f<8) {
			var s = rankField[i];
			var cp = FEN_PIECE_SYMBOL.indexOf(s);

			// The current character is in the range [1-8] -> skip the corresponding number of squares.
			if(/^[1-8]$/.test(s)) {
				f += parseInt(s, 10);
			}

			// The current character corresponds to a colored piece symbol -> set the current square accordingly.
			else if(cp >= 0) {
				position.board[r*16 + f] = cp;
				++f;
			}

			// Otherwise -> parsing error.
			else {
				throw new exception.InvalidFEN(fen, i18n.UNEXPECTED_CHARACTER_IN_BOARD_FIELD, s);
			}

			// Increment the character counter.
			++i;
		}

		// Ensure that the current sub-field deals with all the squares of the current rank.
		if(i !== rankField.length || f !== 8) {
			throw new exception.InvalidFEN(fen, i18n.UNEXPECTED_END_OF_SUBFIELD_IN_BOARD_FIELD, i18n.ORDINALS[7-r]);
		}
	}

	// Turn parsing
	position.turn = bt.colorFromString(fields[1]);
	if(position.turn < 0) {
		throw new exception.InvalidFEN(fen, i18n.INVALID_TURN_FIELD);
	}

	// Castling rights parsing
	position.castling = variant === bt.CHESS960 ? castlingFromStringXFEN(fields[2], strict, position.board) :
		castlingFromStringFEN(fields[2], strict);
	if(position.castling === null) {
		throw new exception.InvalidFEN(fen, i18n.INVALID_CASTLING_FIELD);
	}

	// En-passant rights parsing
	var enPassantField = fields[3];
	if(enPassantField !== '-') {
		if(!/^[a-h][36]$/.test(enPassantField)) {
			throw new exception.InvalidFEN(fen, i18n.INVALID_EN_PASSANT_FIELD);
		}
		if(strict && ((enPassantField[1]==='3' && position.turn===bt.WHITE) || (enPassantField[1]==='6' && position.turn===bt.BLACK))) {
			throw new exception.InvalidFEN(fen, i18n.WRONG_RANK_IN_EN_PASSANT_FIELD);
		}
		position.enPassant = bt.fileFromString(enPassantField[0]);
	}

	// Move counting flags parsing
	var moveCountingRegExp = strict ? /^(?:0|[1-9][0-9]*)$/ : /^[0-9]+$/;
	if(!moveCountingRegExp.test(fields[4])) {
		throw new exception.InvalidFEN(fen, i18n.INVALID_MOVE_COUNTING_FIELD, i18n.ORDINALS[4]);
	}
	if(!moveCountingRegExp.test(fields[5])) {
		throw new exception.InvalidFEN(fen, i18n.INVALID_MOVE_COUNTING_FIELD, i18n.ORDINALS[5]);
	}
	return { position: position, fiftyMoveClock: parseInt(fields[4], 10), fullMoveNumber: parseInt(fields[5], 10) };
};


function castlingFromStringFEN(castling, strict) {
	var res = [0, 0];
	if(castling === '-') {
		return res;
	}
	if(!(strict ? /^K?Q?k?q?$/ : /^[KQkq]*$/).test(castling)) {
		return null;
	}
	if(castling.indexOf('K') >= 0) { res[bt.WHITE] |= 1<<7; }
	if(castling.indexOf('Q') >= 0) { res[bt.WHITE] |= 1<<0; }
	if(castling.indexOf('k') >= 0) { res[bt.BLACK] |= 1<<7; }
	if(castling.indexOf('q') >= 0) { res[bt.BLACK] |= 1<<0; }
	return res;
}


function castlingFromStringXFEN(castling, strict, board) {
	var result = [0, 0];
	if(castling === '-') {
		return result;
	}
	if(!(strict ? /^[A-H]{0,2}[a-h]{0,2}$/ : /^[A-Ha-h]*|[KQkq]*$/).test(castling)) {
		return null;
	}

	function searchQueenSideRook(color) {
		var targetRook = bt.ROOK * 2 + color;
		var targetKing = bt.KING * 2 + color;
		for(var sq = 112*color; sq < 112*color + 8; ++sq) {
			if(board[sq] === targetRook) {
				return sq % 8;
			}
			else if(board[sq] === targetKing) {
				break;
			}
		}
		return 0;
	}

	function searchKingSideRook(color) {
		var targetRook = bt.ROOK * 2 + color;
		var targetKing = bt.KING * 2 + color;
		for(var sq = 112*color + 7; sq >= 112*color; --sq) {
			if(board[sq] === targetRook) {
				return sq % 8;
			}
			else if(board[sq] === targetKing) {
				break;
			}
		}
		return 7;
	}

	if(castling.indexOf('K') >= 0) { result[bt.WHITE] |= 1 << searchKingSideRook (bt.WHITE); }
	if(castling.indexOf('Q') >= 0) { result[bt.WHITE] |= 1 << searchQueenSideRook(bt.WHITE); }
	if(castling.indexOf('k') >= 0) { result[bt.BLACK] |= 1 << searchKingSideRook (bt.BLACK); }
	if(castling.indexOf('q') >= 0) { result[bt.BLACK] |= 1 << searchQueenSideRook(bt.BLACK); }

	for(var file = 0; file < 8; ++file) {
		var s = bt.fileToString(file);
		if(castling.indexOf(s.toUpperCase()) >= 0) { result[bt.WHITE] |= 1 << file; }
		if(castling.indexOf(s              ) >= 0) { result[bt.BLACK] |= 1 << file; }
	}
	return result;
}

},{"../basetypes":2,"../exception":4,"../i18n":6,"./impl":13}],13:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


var bt = require('../basetypes');
var EMPTY = bt.EMPTY;
var INVALID = bt.INVALID;


exports.makeEmpty = function(variant) {
	return {

		// Board state
		board: [
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY
		],

		// Flags
		turn: bt.WHITE,
		castling: [0, 0],
		enPassant: -1,
		variant: variant,

		// Computed attributes
		legal: variant === bt.NO_KING,
		king: [-1, -1]
	};
};


exports.makeInitial = function() {
	return {

		// Board state
		board: [
			bt.WR, bt.WN, bt.WB, bt.WQ, bt.WK, bt.WB, bt.WN, bt.WR, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			bt.WP, bt.WP, bt.WP, bt.WP, bt.WP, bt.WP, bt.WP, bt.WP, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			bt.BP, bt.BP, bt.BP, bt.BP, bt.BP, bt.BP, bt.BP, bt.BP, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			bt.BR, bt.BN, bt.BB, bt.BQ, bt.BK, bt.BB, bt.BN, bt.BR
		],

		// Flags
		turn: bt.WHITE,
		castling: [129 /* (1 << A-file) | (1 << H-file) */, 129],
		enPassant: -1,
		variant: bt.REGULAR_CHESS,

		// Computed attributes
		legal: true,
		king: [4 /* e1 */, 116 /* e8 */]
	};
};


/**
 * Chess960 initial position, following the numbering scheme proposed by Reinhard Scharnagl (see for instance
 * https://chessprogramming.wikispaces.com/Reinhard+Scharnagl and https://chess960.net/start-positions/).
 */
exports.make960FromScharnagl = function(scharnaglCode) {
	var info = decodeScharnagl(scharnaglCode);
	var r1 = info.scheme.map(function(piece) { return piece*2 + bt.WHITE; });
	var r8 = info.scheme.map(function(piece) { return piece*2 + bt.BLACK; });
	return {

		// Board state
		board: [
			r1[0], r1[1], r1[2], r1[3], r1[4], r1[5], r1[6], r1[7], INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			bt.WP, bt.WP, bt.WP, bt.WP, bt.WP, bt.WP, bt.WP, bt.WP, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			bt.BP, bt.BP, bt.BP, bt.BP, bt.BP, bt.BP, bt.BP, bt.BP, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID, INVALID,
			r8[0], r8[1], r8[2], r8[3], r8[4], r8[5], r8[6], r8[7]
		],

		// Flags
		turn: bt.WHITE,
		castling: [info.castling, info.castling],
		enPassant: -1,
		variant: bt.CHESS960,

		// Computed attributes
		legal: true,
		king: [info.kingFile, 112 + info.kingFile]
	};
};


function decodeScharnagl(scharnaglCode) {
	var scheme = [-1, -1, -1, -1, -1, -1, -1, -1];
	var castling = 0;
	var kingFile = -1;

	function forEachEmpty(fun) {
		var emptyIndex = 0;
		for(var file = 0; file < 8; ++file) {
			if(scheme[file] >= 0) { continue; }

			fun(file, emptyIndex);
			++emptyIndex;
		}
	}

	function setAt(piece, target1, target2) {
		forEachEmpty(function(file, emptyIndex) {
			if(emptyIndex === target1 || emptyIndex === target2) {
				scheme[file] = piece;
			}
		});
	}

	// Light-square bishop
	scheme[(scharnaglCode % 4) * 2 + 1] = bt.BISHOP;
	scharnaglCode = Math.floor(scharnaglCode / 4);

	// Dark-square bishop
	scheme[(scharnaglCode % 4) * 2] = bt.BISHOP;
	scharnaglCode = Math.floor(scharnaglCode / 4);

	// Queen
	setAt(bt.QUEEN, scharnaglCode % 6, -1);
	scharnaglCode = Math.floor(scharnaglCode / 6);

	// Knights
	switch(scharnaglCode) {
		case 0: setAt(bt.KNIGHT, 0, 1); break;
		case 1: setAt(bt.KNIGHT, 0, 2); break;
		case 2: setAt(bt.KNIGHT, 0, 3); break;
		case 3: setAt(bt.KNIGHT, 0, 4); break;
		case 4: setAt(bt.KNIGHT, 1, 2); break;
		case 5: setAt(bt.KNIGHT, 1, 3); break;
		case 6: setAt(bt.KNIGHT, 1, 4); break;
		case 7: setAt(bt.KNIGHT, 2, 3); break;
		case 8: setAt(bt.KNIGHT, 2, 4); break;
		case 9: setAt(bt.KNIGHT, 3, 4); break;
		default: break;
	}

	// Rooks and king
	forEachEmpty(function(file, emptyIndex) {
		if(emptyIndex === 1) {
			scheme[file] = bt.KING;
			kingFile = file;
		}
		else {
			scheme[file] = bt.ROOK;
			castling |= 1 << file;
		}
	});

	return {
		scheme: scheme,
		castling: castling,
		kingFile: kingFile
	};
}


exports.makeCopy = function(position) {
	return {
		board    : position.board.slice(),
		turn     : position.turn,
		castling : position.castling.slice(),
		enPassant: position.enPassant,
		variant  : position.variant,
		legal    : position.legal,
		king     : position.king.slice()
	};
};

},{"../basetypes":2}],14:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


var bt = require('../basetypes');
var attacks = require('./attacks');


/**
 * Check whether the given position is legal or not.
 *
 * A position is considered to be legal if all the following conditions are met:
 *
 *  1. There is exactly one white king and one black king on the board (or more generally,
	     the number of kings on the board matches the game variant of the position).
 *  2. The player that is not about to play is not check.
 *  3. There are no pawn on rows 1 and 8.
 *  4. For each colored castle flag set, there is a rook and a king on the
 *     corresponding initial squares.
 *  5. The pawn situation is consistent with the en-passant flag if it is set.
 *     For instance, if it is set to the 'e' column and black is about to play,
 *     the squares e2 and e3 must be empty, and there must be a white pawn on e4.
 */
exports.isLegal = function(position) {
	refreshLegalFlagAndKingSquares(position);
	return position.legal;
};


/**
 * Refresh the legal flag of the given position if it is set to null
 * (which means that the legality state of the position is unknown).
 *
 * Together with the legal flag, the reference to the squares where the white and
 * black kings lie is updated by this function.
 */
var refreshLegalFlagAndKingSquares = exports.refreshLegalFlagAndKingSquares = function(position) {
	if(position.legal !== null) {
		return;
	}
	position.legal = false;

	// Condition (1)
	var whiteKingOK = refreshKingSquare(position, bt.WHITE);
	var blackKingOK = refreshKingSquare(position, bt.BLACK);
	if(!whiteKingOK || !blackKingOK) {
		return;
	}

	// Condition (2)
	if(position.king[1-position.turn] >= 0 && attacks.isAttacked(position, position.king[1-position.turn], position.turn)) {
		return;
	}

	// Condition (3)
	for(var c=0; c<8; ++c) {
		var cp1 = position.board[c];
		var cp8 = position.board[112 + c];
		if(cp1 === bt.WP || cp8 === bt.WP || cp1 === bt.BP || cp8 === bt.BP) {
			return;
		}
	}

	// Condition (4)
	var isCastlingFlagLegalFun = position.variant === bt.CHESS960 ? isCastlingFlagLegalForChess960 : isCastlingFlagLegalForRegularChess;
	for(var color=0; color<2; ++color) {
		if(!isCastlingFlagLegalFun(position, color)) {
			return;
		}
	}

	// Condition (5)
	if(position.enPassant >= 0) {
		var square2 = (6-position.turn*5)*16 + position.enPassant;
		var square3 = (5-position.turn*3)*16 + position.enPassant;
		var square4 = (4-position.turn  )*16 + position.enPassant;
		if(!(position.board[square2]===bt.EMPTY && position.board[square3]===bt.EMPTY && position.board[square4]===bt.PAWN*2+1-position.turn)) {
			return;
		}
	}

	// At this point, all the conditions (1) to (5) hold, so the position can be flagged as legal.
	position.legal = true;
};


/**
 * Detect the kings of the given color that are present on the chess board.
 */
function refreshKingSquare(position, color) {
	var target = bt.KING*2 + color;
	position.king[color] = -1;
	for(var sq=0; sq<120; sq += (sq & 0x7)===7 ? 9 : 1) {
		if(position.board[sq] === target) {

			// If the targeted king is detected on the square sq, two situations may occur:
			// 1) No king was detected on the previously visited squares: then the current
			//    square is saved, and loop over the next board squares goes on.
			if(position.king[color] < 0) {
				position.king[color] = sq;
			}

			// 2) Another king was detected on the previously visited squares: then the buffer position.king[color]
			//    is set to the invalid state (-1), and the loop is interrupted.
			else {
				position.king[color] = -1;
				return false;
			}
		}
	}
	return position.variant === bt.NO_KING || position.variant === bt.BLACK_KING_ONLY - color ? position.king[color] < 0 : position.king[color] >= 0;
}


function isCastlingFlagLegalForRegularChess(position, color) {
	var skipOO  = (position.castling[color] & 0x80) === 0;
	var skipOOO = (position.castling[color] & 0x01) === 0;
	var rookHOK = skipOO              || position.board[7 + 112*color] === bt.ROOK*2 + color;
	var rookAOK = skipOOO             || position.board[0 + 112*color] === bt.ROOK*2 + color;
	var kingOK  = (skipOO && skipOOO) || position.board[4 + 112*color] === bt.KING*2 + color;
	return kingOK && rookAOK && rookHOK;
}


function isCastlingFlagLegalForChess960(position, color) {
	var files = [];
	for(var file=0; file<8; ++file) {
		if((position.castling[color] & 1 << file) === 0) {
			continue;
		}

		// Ensure there is a rook on each square for which the corresponding file flag is set.
		if(position.board[file + 112*color] !== bt.ROOK*2 + color) {
			return;
		}
		files.push(file);
	}

	// Additional check on the king position, depending on the number of file flags.
	switch(files.length) {
		case 0: return true;

		// 1 possible castle -> ensure the king is on the initial rank.
		case 1: return position.king[color] >= 112*color && position.king[color] <= 7 + 112*color;

		// 2 possible castles -> ensure the king is between the two rooks.
		case 2: return position.king[color] > files[0] + 112*color && position.king[color] < files[1] + 112*color;

		default: return false;
	}
}

},{"../basetypes":2,"./attacks":11}],15:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


var bt = require('../basetypes');
var moveDescriptor = require('../movedescriptor');
var attacks = require('./attacks');
var legality = require('./legality');


/* eslint-disable no-mixed-spaces-and-tabs, indent */

// Displacement lookup per square index difference.
var /* const */ DISPLACEMENT_LOOKUP = [
 204,    0,    0,    0,    0,    0,    0,   60,    0,    0,    0,    0,    0,    0,  204,    0,
	 0,  204,    0,    0,    0,    0,    0,   60,    0,    0,    0,    0,    0,  204,    0,    0,
	 0,    0,  204,    0,    0,    0,    0,   60,    0,    0,    0,    0,  204,    0,    0,    0,
	 0,    0,    0,  204,    0,    0,    0,   60,    0,    0,    0,  204,    0,    0,    0,    0,
	 0,    0,    0,    0,  204,    0,    0,   60,    0,    0,  204,    0,    0,    0,    0,    0,
	 0,    0,    0,    0,    0,  204,  768,   60,  768,  204,    0,    0,    0,    0,    0,    0,
	 0,    0,    0,    0,    0,  768, 2255, 2111, 2255,  768,    0,    0,    0,    0,    0,    0,
	60,   60,   60,   60,   60,   60,   63,    0,   63,   60,   60,   60,   60,   60,   60,    0,
	 0,    0,    0,    0,    0,  768, 1231, 1087, 1231,  768,    0,    0,    0,    0,    0,    0,
	 0,    0,    0,    0,    0,  204,  768,   60,  768,  204,    0,    0,    0,    0,    0,    0,
	 0,    0,    0,    0,  204,    0,    0,   60,    0,    0,  204,    0,    0,    0,    0,    0,
	 0,    0,    0,  204,    0,    0,    0,   60,    0,    0,    0,  204,    0,    0,    0,    0,
	 0,    0,  204,    0,    0,    0,    0,   60,    0,    0,    0,    0,  204,    0,    0,    0,
	 0,  204,    0,    0,    0,    0,    0,   60,    0,    0,    0,    0,    0,  204,    0,    0,
 204,    0,    0,    0,    0,    0,    0,   60,    0,    0,    0,    0,    0,    0,  204,    0
];

// Sliding direction
var /* const */ SLIDING_DIRECTION = [
	-17,   0,   0,   0,   0,   0,   0, -16,   0,   0,   0,   0,   0,   0, -15,   0,
		0, -17,   0,   0,   0,   0,   0, -16,   0,   0,   0,   0,   0, -15,   0,   0,
		0,   0, -17,   0,   0,   0,   0, -16,   0,   0,   0,   0, -15,   0,   0,   0,
		0,   0,   0, -17,   0,   0,   0, -16,   0,   0,   0, -15,   0,   0,   0,   0,
		0,   0,   0,   0, -17,   0,   0, -16,   0,   0, -15,   0,   0,   0,   0,   0,
		0,   0,   0,   0,   0, -17,   0, -16,   0, -15,   0,   0,   0,   0,   0,   0,
		0,   0,   0,   0,   0,   0, -17, -16, -15,   0,   0,   0,   0,   0,   0,   0,
	 -1,  -1,  -1,  -1,  -1,  -1,  -1,   0,   1,   1,   1,   1,   1,   1,   1,   0,
		0,   0,   0,   0,   0,   0,  15,  16,  17,   0,   0,   0,   0,   0,   0,   0,
		0,   0,   0,   0,   0,  15,   0,  16,   0,  17,   0,   0,   0,   0,   0,   0,
		0,   0,   0,   0,  15,   0,   0,  16,   0,   0,  17,   0,   0,   0,   0,   0,
		0,   0,   0,  15,   0,   0,   0,  16,   0,   0,   0,  17,   0,   0,   0,   0,
		0,   0,  15,   0,   0,   0,   0,  16,   0,   0,   0,   0,  17,   0,   0,   0,
		0,  15,   0,   0,   0,   0,   0,  16,   0,   0,   0,   0,   0,  17,   0,   0,
	 15,   0,   0,   0,   0,   0,   0,  16,   0,   0,   0,   0,   0,   0,  17,   0
];

/* eslint-enable no-mixed-spaces-and-tabs, indent */


function isKingToMoveAttacked(position) {
	return position.king[position.turn] >= 0 && attacks.isAttacked(position, position.king[position.turn], 1-position.turn);
}


exports.isCheck = function(position) {
	return legality.isLegal(position) && isKingToMoveAttacked(position);
};


exports.isCheckmate = function(position) {
	return legality.isLegal(position) && !hasMove(position) && isKingToMoveAttacked(position);
};


exports.isStalemate = function(position) {
	return legality.isLegal(position) && !hasMove(position) && !isKingToMoveAttacked(position);
};


var hasMove = exports.hasMove = function(position) {
	function MoveFound() {}
	try {
		generateMoves(position, function(descriptor) {
			if(descriptor) { throw new MoveFound(); }
		});
		return false;
	}
	catch(err) {
		if(err instanceof MoveFound) { return true; }
		else { throw err; }
	}
};


exports.moves = function(position) {
	var res = [];
	generateMoves(position, function(descriptor, generatePromotions) {
		if(descriptor) {
			if(generatePromotions) {
				res.push(moveDescriptor.makePromotion(descriptor._from, descriptor._to, position.turn, bt.QUEEN , descriptor._optionalPiece));
				res.push(moveDescriptor.makePromotion(descriptor._from, descriptor._to, position.turn, bt.ROOK  , descriptor._optionalPiece));
				res.push(moveDescriptor.makePromotion(descriptor._from, descriptor._to, position.turn, bt.BISHOP, descriptor._optionalPiece));
				res.push(moveDescriptor.makePromotion(descriptor._from, descriptor._to, position.turn, bt.KNIGHT, descriptor._optionalPiece));
			}
			else {
				res.push(descriptor);
			}
		}
	});
	return res;
};


/**
 * Generate all the legal moves of the given position.
 */
function generateMoves(position, fun) {

	// Ensure that the position is legal.
	if(!legality.isLegal(position)) { return; }

	// For all potential 'from' square...
	for(var from=0; from<120; from += (from & 0x7)===7 ? 9 : 1) {

		// Nothing to do if the current square does not contain a piece of the right color.
		var fromContent = position.board[from];
		var movingPiece = Math.floor(fromContent / 2);
		if(fromContent < 0 || fromContent%2 !== position.turn) {
			continue;
		}

		// Generate moves for pawns
		if(movingPiece === bt.PAWN) {

			// Capturing moves
			var attackDirections = attacks.ATTACK_DIRECTIONS[fromContent];
			for(var i=0; i<attackDirections.length; ++i) {
				var to = from + attackDirections[i];
				if((to & 0x88) === 0) {
					var toContent = position.board[to];
					if(toContent >= 0 && toContent%2 !== position.turn) { // regular capturing move
						fun(isKingSafeAfterMove(position, from, to, -1), to<8 || to>=112);
					}
					else if(toContent < 0 && to === (5-position.turn*3)*16 + position.enPassant) { // en-passant move
						fun(isKingSafeAfterMove(position, from, to, (4-position.turn)*16 + position.enPassant), false);
					}
				}
			}

			// Non-capturing moves
			var moveDirection = 16 - position.turn*32;
			var to = from + moveDirection;
			if(position.board[to] < 0) {
				fun(isKingSafeAfterMove(position, from, to, -1), to<8 || to>=112);

				// 2-square pawn move
				var firstSquareOfRow = (1 + position.turn*5) * 16;
				if(from>=firstSquareOfRow && from<firstSquareOfRow+8) {
					to += moveDirection;
					if(position.board[to] < 0) {
						fun(isKingSafeAfterMove(position, from, to, -1), false);
					}
				}
			}
		}

		// Generate moves for non-sliding non-pawn pieces
		else if(movingPiece===bt.KNIGHT || movingPiece===bt.KING) {
			var directions = attacks.ATTACK_DIRECTIONS[fromContent];
			for(var i=0; i<directions.length; ++i) {
				var to = from + directions[i];
				if((to & 0x88) === 0) {
					var toContent = position.board[to];
					if(toContent < 0 || toContent%2 !== position.turn) {
						fun(isKingSafeAfterMove(position, from, to, -1), false);
					}
				}
			}
		}

		// Generate moves for sliding pieces
		else {
			var directions = attacks.ATTACK_DIRECTIONS[fromContent];
			for(var i=0; i<directions.length; ++i) {
				for(var to = from + directions[i]; (to & 0x88) === 0; to += directions[i]) {
					var toContent = position.board[to];
					if(toContent < 0 || toContent%2 !== position.turn) {
						fun(isKingSafeAfterMove(position, from, to, -1), false);
					}
					if(toContent >= 0) { break; }
				}
			}
		}

		// Generate castling moves
		if(movingPiece === bt.KING && position.castling[position.turn] !== 0) {
			fun(isCastlingLegal(position, from, 2 + 112*position.turn), false);
			fun(isCastlingLegal(position, from, 6 + 112*position.turn), false);
		}
	}
}


/**
 * Check whether the current player king is in check after moving from `from` to `to`.
 *
 * This function implements the verification steps (7) to (9) as defined in {@link #isMoveLegal}
 *
 * @param {number} enPassantSquare Index of the square where the "en-passant" taken pawn lies if any, `-1` otherwise.
 * @returns {boolean|MoveDescriptor} The move descriptor if the move is legal, `false` otherwise.
 */
var isKingSafeAfterMove = exports.isKingSafeAfterMove = function(position, from, to, enPassantSquare) {
	var fromContent   = position.board[from];
	var toContent     = position.board[to  ];
	var movingPiece   = Math.floor(fromContent / 2);
	var kingSquare    = movingPiece===bt.KING ? to : position.king[position.turn];
	var kingIsInCheck = false;

	if(kingSquare >= 0) {

		// Step (7) -> Execute the displacement (castling moves are processed separately).
		position.board[to  ] = fromContent;
		position.board[from] = bt.EMPTY;
		if(enPassantSquare >= 0) {
			position.board[enPassantSquare] = bt.EMPTY;
		}

		// Step (8) -> Is the king safe after the displacement?
		kingIsInCheck = attacks.isAttacked(position, kingSquare, 1-position.turn);

		// Step (9) -> Reverse the displacement.
		position.board[from] = fromContent;
		position.board[to  ] = toContent;
		if(enPassantSquare >= 0) {
			position.board[enPassantSquare] = bt.PAWN*2 + 1-position.turn;
		}
	}

	// Final result
	if(kingIsInCheck) {
		return false;
	}
	else {
		if(enPassantSquare >= 0) {
			return moveDescriptor.makeEnPassant(from, to, enPassantSquare, position.turn);
		}
		else {
			return moveDescriptor.make(from, to, position.turn, movingPiece, toContent);
		}
	}
};


/**
 * Delegated method for checking whether a castling move is legal or not.
 */
var isCastlingLegal = exports.isCastlingLegal = function(position, from, to) {

	// Origin and destination squares of the rook involved in the move.
	var castleFile = -1;
	var rookTo = -1;
	if(to === 2 + position.turn*112) {
		castleFile = position.variant === bt.CHESS960 ? findCastleFile(position.castling[position.turn], from % 16, -1) : 0;
		rookTo = 3 + 112*position.turn;
	}
	else if(to === 6 + position.turn*112) {
		castleFile = position.variant === bt.CHESS960 ? findCastleFile(position.castling[position.turn], from % 16, 1) : 7;
		rookTo = 5 + 112*position.turn;
	}
	else {
		return false;
	}

	// Ensure that the given underlying castling is allowed.
	if(position.variant === bt.CHESS960) {
		if(castleFile === -1) { return false; }
	}
	else {
		if((position.castling[position.turn] & 1<<castleFile) === 0) { return false; }
	}

	var rookFrom = castleFile + position.turn*112;

	// Ensure that each square on the trajectory is empty.
	for(var sq = Math.min(from, to, rookFrom, rookTo); sq <= Math.max(from, to, rookFrom, rookTo); ++sq) {
		if(sq !== from && sq !== rookFrom && position.board[sq] !== bt.EMPTY) { return false; }
	}

	// The origin and destination squares of the king, and the square between them must not be attacked.
	var byWho = 1 - position.turn;
	for(var sq = Math.min(from, to); sq <= Math.max(from, to); ++sq) {
		if(attacks.isAttacked(position, sq, byWho)) { return false; }
	}

	// The move is legal -> generate the move descriptor.
	return moveDescriptor.makeCastling(from, to, rookFrom, rookTo, position.turn);
};


function findCastleFile(castlingFlag, kingFile, offset) {
	for(var file = kingFile + offset; file >= 0 && file < 8; file += offset) {
		if((castlingFlag & 1 << file) !== 0) { return file; }
	}
	return -1;
}


/**
 * Core algorithm to determine whether a move is legal or not. The verification flow is the following:
 *
 *  1. Ensure that the position itself is legal.
 *  2. Ensure that the origin square contains a piece (denoted as the moving-piece)
 *     whose color is the same than the color of the player about to play.
 *  4. Ensure that the displacement is geometrically correct, with respect to the moving piece.
 *  5. Check the content of the destination square.
 *  6. For the sliding pieces (and in case of a 2-square pawn move), ensure that there is no piece
 *     on the trajectory.
 *
 * The move is almost ensured to be legal at this point. The last condition to check
 * is whether the king of the current player will be in check after the move or not.
 *
 *  7. Execute the displacement from the origin to the destination square, in such a way that
 *     it can be reversed. Only the state of the board is updated at this point.
 *  8. Look for king attacks.
 *  9. Reverse the displacement.
 *
 * Castling moves fail at step (4). They are taken out of this flow and processed
 * by the dedicated method `isLegalCastling()`.
 */
exports.isMoveLegal = function(position, from, to) {

	// Step (1)
	if(!legality.isLegal(position)) { return false; }

	// Step (2)
	var fromContent = position.board[from];
	var toContent   = position.board[to  ];
	var movingPiece = Math.floor(fromContent / 2);
	if(fromContent < 0 || fromContent%2 !== position.turn) { return false; }

	// Miscellaneous variables
	var displacement = to - from + 119;
	var enPassantSquare = -1; // square where a pawn is taken if the move is "en-passant"
	var isTwoSquarePawnMove = false;
	var isPromotion = movingPiece===bt.PAWN && (to<8 || to>=112);

	// Compute the move descriptor corresponding to castling, if applicable.
	var castlingDescriptor = false;
	if(movingPiece === bt.KING && position.castling[position.turn] !== 0) {
		castlingDescriptor = isCastlingLegal(position, from, to);
	}

	// Step (4)
	if((DISPLACEMENT_LOOKUP[displacement] & 1 << fromContent) === 0) {
		if(movingPiece === bt.PAWN && displacement === 151-position.turn*64) {
			var firstSquareOfRow = (1 + position.turn*5) * 16;
			if(from < firstSquareOfRow || from >= firstSquareOfRow+8) { return false; }
			isTwoSquarePawnMove = true;
		}
		else {
			return castlingDescriptor;
		}
	}

	// Step (5) -> check the content of the destination square
	if(movingPiece === bt.PAWN) {
		if(displacement === 135-position.turn*32 || isTwoSquarePawnMove) { // non-capturing pawn move
			if(toContent !== bt.EMPTY) { return false; }
		}
		else if(toContent === bt.EMPTY) { // en-passant pawn move
			if(position.enPassant < 0 || to !== (5-position.turn*3)*16 + position.enPassant) { return false; }
			enPassantSquare = (4-position.turn)*16 + position.enPassant;
		}
		else { // regular capturing pawn move
			if(toContent%2 === position.turn) { return false; }
		}
	}
	else { // piece move
		if(toContent >= 0 && toContent%2 === position.turn) { return castlingDescriptor; }
	}

	// Step (6) -> For sliding pieces, ensure that there is nothing between the origin and the destination squares.
	if(movingPiece === bt.BISHOP || movingPiece === bt.ROOK || movingPiece === bt.QUEEN) {
		var direction = SLIDING_DIRECTION[displacement];
		for(var sq=from + direction; sq !== to; sq += direction) {
			if(position.board[sq] !== bt.EMPTY) { return false; }
		}
	}
	else if(isTwoSquarePawnMove) { // two-square pawn moves also require this test.
		if(position.board[(from + to) / 2] !== bt.EMPTY) { return false; }
	}

	// Steps (7) to (9) are delegated to `isKingSafeAfterMove`.
	var descriptor = isKingSafeAfterMove(position, from, to, enPassantSquare);
	if(descriptor && isPromotion) {
		return {
			type: 'promotion',
			build: function(promotion) {
				return promotion !== bt.PAWN && promotion !== bt.KING ?
					moveDescriptor.makePromotion(descriptor._from, descriptor._to, descriptor._movingPiece % 2, promotion, descriptor._optionalPiece) :
					false;
			}
		};
	}
	else if(descriptor && castlingDescriptor) {
		return {
			type: 'castle960',
			build: function(type) {
				return type ? castlingDescriptor : descriptor;
			}
		};
	}
	else if(descriptor) {
		return descriptor;
	}
	else if(castlingDescriptor) {
		return castlingDescriptor;
	}
	else {
		return false;
	}
};


/**
 * Play the move corresponding to the given descriptor.
 */
exports.play = function(position, descriptor) {

	// Update the board.
	position.board[descriptor._from] = bt.EMPTY; // WARNING: update `from` before `to` in case both squares are actually the same!
	if(descriptor.isEnPassant()) {
		position.board[descriptor._optionalSquare1] = bt.EMPTY;
	}
	else if(descriptor.isCastling()) {
		position.board[descriptor._optionalSquare1] = bt.EMPTY;
		position.board[descriptor._optionalSquare2] = descriptor._optionalPiece;
	}
	position.board[descriptor._to] = descriptor._finalPiece;

	var movingPiece = Math.floor(descriptor._movingPiece / 2);

	// Update the castling flags.
	if(movingPiece === bt.KING) {
		position.castling[position.turn] = 0;
	}
	if(descriptor._from <    8) { position.castling[bt.WHITE] &= ~(1 <<  descriptor._from    ); }
	if(descriptor._to   <    8) { position.castling[bt.WHITE] &= ~(1 <<  descriptor._to      ); }
	if(descriptor._from >= 112) { position.castling[bt.BLACK] &= ~(1 << (descriptor._from%16)); }
	if(descriptor._to   >= 112) { position.castling[bt.BLACK] &= ~(1 << (descriptor._to  %16)); }

	// Update the en-passant flag.
	position.enPassant = -1;
	if(movingPiece === bt.PAWN && Math.abs(descriptor._from - descriptor._to)===32) {
		var otherPawn = descriptor._movingPiece ^ 0x01;
		var squareBefore = descriptor._to - 1;
		var squareAfter = descriptor._to + 1;
		if(((squareBefore & 0x88) === 0 && position.board[squareBefore] === otherPawn) ||
			((squareAfter & 0x88) === 0 && position.board[squareAfter]===otherPawn)) {
			position.enPassant = descriptor._to % 16;
		}
	}

	// Update the computed flags.
	if(movingPiece === bt.KING) {
		position.king[position.turn] = descriptor._to;
	}

	// Toggle the turn flag.
	position.turn = 1 - position.turn;
};


/**
 * Determine if a null-move (i.e. switching the player about to play) can be play in the current position.
 * A null-move is possible if the position is legal and if the current player about to play is not in check.
 */
var isNullMoveLegal = exports.isNullMoveLegal = function(position) {
	return legality.isLegal(position) && !isKingToMoveAttacked(position);
};


/**
 * Play a null-move on the current position if it is legal.
 */
exports.playNullMove = function(position) {
	if(isNullMoveLegal(position)) {
		position.turn = 1 - position.turn;
		position.enPassant = -1;
		return true;
	}
	else {
		return false;
	}
};

},{"../basetypes":2,"../movedescriptor":7,"./attacks":11,"./legality":14}],16:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


var bt = require('../basetypes');
var moveDescriptor = require('../movedescriptor');
var exception = require('../exception');
var i18n = require('../i18n');

var impl = require('./impl');
var fen = require('./fen');
var attacks = require('./attacks');
var legality = require('./legality');
var moveGeneration = require('./movegeneration');


/**
 * Convert the given move descriptor to standard algebraic notation.
 */
exports.getNotation = function(position, descriptor) {
	var res = '';

	// Castling move
	if(descriptor.isCastling()) {
		res = descriptor._to % 16 === 6 ? 'O-O' : 'O-O-O';
	}

	// Pawn move
	else if(Math.floor(descriptor._movingPiece / 2) === bt.PAWN) {
		if(descriptor.isCapture()) {
			res += bt.fileToString(descriptor._from % 16) + 'x';
		}
		res += bt.squareToString(descriptor._to);
		if(descriptor.isPromotion()) {
			res += '=' + bt.pieceToString(Math.floor(descriptor._finalPiece / 2)).toUpperCase();
		}
	}

	// Non-pawn move
	else {
		res += bt.pieceToString(Math.floor(descriptor._movingPiece / 2)).toUpperCase();
		res += getDisambiguationSymbol(position, descriptor._from, descriptor._to);
		if(descriptor.isCapture()) {
			res += 'x';
		}
		res += bt.squareToString(descriptor._to);
	}

	// Check/checkmate detection and final result.
	res += getCheckCheckmateSymbol(position, descriptor);
	return res;
};


/**
 * Return the check/checkmate symbol to use for a move.
 */
function getCheckCheckmateSymbol(position, descriptor) {
	var nextPosition = impl.makeCopy(position);
	moveGeneration.play(nextPosition, descriptor);
	return moveGeneration.isCheck(nextPosition) ? (moveGeneration.hasMove(nextPosition) ? '+' : '#') : '';
}


/**
 * Return the disambiguation symbol to use for a move from `from` to `to`.
 */
function getDisambiguationSymbol(position, from, to) {
	var attackers = attacks.getAttacks(position, to, position.turn).filter(function(sq) { return position.board[sq]===position.board[from]; });

	// Disambiguation is not necessary if there less than 2 attackers.
	if(attackers.length < 2) {
		return '';
	}

	var foundNotPined = false;
	var foundOnSameRank = false;
	var foundOnSameFile = false;
	var rankFrom = Math.floor(from / 16);
	var fileFrom = from % 16;
	for(var i=0; i<attackers.length; ++i) {
		var sq = attackers[i];
		if(sq === from || isPinned(position, sq, to)) { continue; }

		foundNotPined = true;
		if(rankFrom === Math.floor(sq / 16)) { foundOnSameRank = true; }
		if(fileFrom === sq % 16) { foundOnSameFile = true; }
	}

	if(foundOnSameFile) {
		return foundOnSameRank ? bt.squareToString(from) : bt.rankToString(rankFrom);
	}
	else {
		return foundNotPined ? bt.fileToString(fileFrom) : '';
	}
}


/**
 * Whether the piece on the given square is pinned or not.
 */
function isPinned(position, sq, aimingAtSq) {
	var kingSquare = position.king[position.turn];
	if(kingSquare < 0) {
		return false;
	}

	var vector = Math.abs(kingSquare - sq);
	if(vector === 0) {
		return false;
	}
	var aimingAtVector = Math.abs(aimingAtSq - sq);

	var pinnerQueen  = bt.QUEEN  * 2 + 1 - position.turn;
	var pinnerRook   = bt.ROOK   * 2 + 1 - position.turn;
	var pinnerBishop = bt.BISHOP * 2 + 1 - position.turn;

	// Potential pinning on file or rank.
	if(vector < 8) {
		return aimingAtVector >= 8 && pinningLoockup(position, kingSquare, sq, kingSquare < sq ? 1 : -1, pinnerRook, pinnerQueen);
	}
	else if(vector % 16 === 0) {
		return aimingAtVector % 16 !==0 && pinningLoockup(position, kingSquare, sq, kingSquare < sq ? 16 : -16, pinnerRook, pinnerQueen);
	}

	// Potential pinning on diagonal.
	else if(vector % 15 === 0) {
		return aimingAtVector % 15 !==0 && pinningLoockup(position, kingSquare, sq, kingSquare < sq ? 15 : -15, pinnerBishop, pinnerQueen);
	}
	else if(vector % 17 === 0) {
		return aimingAtVector % 17 !==0 && pinningLoockup(position, kingSquare, sq, kingSquare < sq ? 17 : -17, pinnerBishop, pinnerQueen);
	}

	// No pinning for sure.
	else {
		return false;
	}
}

function pinningLoockup(position, kingSquare, targetSquare, direction, pinnerColoredPiece1, pinnerColoredPiece2) {
	for(var sq = kingSquare + direction; sq !== targetSquare; sq += direction) {
		if(position.board[sq] !== bt.EMPTY) {
			return false;
		}
	}
	for(var sq = targetSquare + direction; (sq & 0x88) === 0; sq += direction) {
		if(position.board[sq] !== bt.EMPTY) {
			return position.board[sq] === pinnerColoredPiece1 || position.board[sq] === pinnerColoredPiece2;
		}
	}
	return false;
}


/**
 * Parse a move notation for the given position.
 *
 * @returns {MoveDescriptor}
 * @throws InvalidNotation
 */
exports.parseNotation = function(position, notation, strict) {

	// General syntax
	var m = /^(?:(O-O-O)|(O-O)|([KQRBN])([a-h])?([1-8])?(x)?([a-h][1-8])|(?:([a-h])(x)?)?([a-h][1-8])(?:(=)?([KQRBNP]))?)([+#])?$/.exec(notation);
	if(m === null) {
		throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.INVALID_MOVE_NOTATION_SYNTAX);
	}

	// Ensure that the position is legal.
	if(!legality.isLegal(position)) {
		throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.ILLEGAL_POSITION);
	}

	// CASTLING
	// m[1] -> O-O-O
	// m[2] -> O-O

	// NON-PAWN MOVE
	// m[3] -> moving piece
	// m[4] -> file disambiguation
	// m[5] -> rank disambiguation
	// m[6] -> x (capture symbol)
	// m[7] -> to

	// PAWN MOVE
	// m[ 8] -> from column (only for captures)
	// m[ 9] -> x (capture symbol)
	// m[10] -> to
	// m[11] -> = (promotion symbol)
	// m[12] -> promoted piece

	// OTHER
	// m[13] -> +/# (check/checkmate symbol)

	var descriptor = null;

	// Parse castling moves
	if(m[1] || m[2]) {
		var from = position.king[position.turn];
		if(from < 0) {
			throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.ILLEGAL_NO_KING_CASTLING);
		}

		var to = (m[2] ? 6 : 2) + position.turn*112;
		descriptor = moveGeneration.isCastlingLegal(position, from, to);
		if(!descriptor) {
			var message = m[2] ? i18n.ILLEGAL_KING_SIDE_CASTLING : i18n.ILLEGAL_QUEEN_SIDE_CASTLING;
			throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, message);
		}
	}

	// Non-pawn move
	else if(m[3]) {
		var movingPiece = bt.pieceFromString(m[3].toLowerCase());
		var to = bt.squareFromString(m[7]);
		var toContent = position.board[to];

		// Cannot take your own pieces!
		if(toContent >= 0 && toContent % 2 === position.turn) {
			throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.TRYING_TO_CAPTURE_YOUR_OWN_PIECES);
		}

		// Find the "from"-square candidates
		var attackers = attacks.getAttacks(position, to, position.turn).filter(function(sq) { return position.board[sq] === movingPiece*2 + position.turn; });

		// Apply disambiguation
		if(m[4]) {
			var fileFrom = bt.fileFromString(m[4]);
			attackers = attackers.filter(function(sq) { return sq%16 === fileFrom; });
		}
		if(m[5]) {
			var rankFrom = bt.rankFromString(m[5]);
			attackers = attackers.filter(function(sq) { return Math.floor(sq/16) === rankFrom; });
		}
		if(attackers.length===0) {
			var message = (m[4] || m[5]) ? i18n.NO_PIECE_CAN_MOVE_TO_DISAMBIGUATION : i18n.NO_PIECE_CAN_MOVE_TO;
			throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, message, m[3], m[7]);
		}

		// Compute the move descriptor for each remaining "from"-square candidate
		for(var i=0; i<attackers.length; ++i) {
			var currentDescriptor = moveGeneration.isKingSafeAfterMove(position, attackers[i], to, -1);
			if(currentDescriptor) {
				if(descriptor !== null) {
					throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.REQUIRE_DISAMBIGUATION, m[3], m[7]);
				}
				descriptor = currentDescriptor;
			}
		}
		if(descriptor === null) {
			var message = position.turn===bt.WHITE ? i18n.NOT_SAFE_FOR_WHITE_KING : i18n.NOT_SAFE_FOR_BLACK_KING;
			throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, message);
		}

		// STRICT-MODE -> check the disambiguation symbol.
		if(strict) {
			var expectedDS = getDisambiguationSymbol(position, descriptor._from, to);
			var observedDS = (m[4] ? m[4] : '') + (m[5] ? m[5] : '');
			if(expectedDS !== observedDS) {
				throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.WRONG_DISAMBIGUATION_SYMBOL, expectedDS, observedDS);
			}
		}
	}

	// Pawn move
	else if(m[10]) {
		var to = bt.squareFromString(m[10]);
		if(m[8]) {
			descriptor = getPawnCaptureDescriptor(position, notation, bt.fileFromString(m[8]), to);
		}
		else {
			descriptor = getPawnAdvanceDescriptor(position, notation, to);
		}

		// Ensure that the pawn move do not let a king in check.
		if(!descriptor) {
			var message = position.turn===bt.WHITE ? i18n.NOT_SAFE_FOR_WHITE_KING : i18n.NOT_SAFE_FOR_BLACK_KING;
			throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, message);
		}

		// Detect promotions
		if(to<8 || to>=112) {
			if(!m[12]) {
				throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.MISSING_PROMOTION);
			}
			var promotion = bt.pieceFromString(m[12].toLowerCase());
			if(promotion === bt.PAWN || promotion === bt.KING) {
				throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.INVALID_PROMOTED_PIECE, m[12]);
			}
			descriptor = moveDescriptor.makePromotion(descriptor._from, descriptor._to, descriptor._movingPiece % 2, promotion, descriptor._optionalPiece);

			// STRICT MODE -> do not forget the `=` character!
			if(strict && !m[11]) {
				throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.MISSING_PROMOTION_SYMBOL);
			}
		}

		// Detect illegal promotion attempts!
		else if(m[12]) {
			throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.ILLEGAL_PROMOTION);
		}
	}

	// STRICT MODE
	if(strict) {
		if(descriptor.isCapture() !== (m[6] || m[9])) {
			var message = descriptor.isCapture() ? i18n.MISSING_CAPTURE_SYMBOL : i18n.INVALID_CAPTURE_SYMBOL;
			throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, message);
		}
		var expectedCCS = getCheckCheckmateSymbol(position, descriptor);
		var observedCCS = m[13] ? m[13] : '';
		if(expectedCCS !== observedCCS) {
			throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.WRONG_CHECK_CHECKMATE_SYMBOL, expectedCCS, observedCCS);
		}
	}

	// Final result
	return descriptor;
};


/**
 * Delegate function for capture pawn move parsing.
 *
 * @returns {boolean|MoveDescriptor}
 */
function getPawnCaptureDescriptor(position, notation, columnFrom, to) {

	// Ensure that `to` is not on the 1st row.
	var from = to - 16 + position.turn*32;
	if((from & 0x88) !== 0) {
		throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.INVALID_CAPTURING_PAWN_MOVE);
	}

	// Compute the "from"-square.
	var columnTo = to % 16;
	if(columnTo - columnFrom === 1) { from -= 1; }
	else if(columnTo - columnFrom === -1) { from += 1; }
	else {
		throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.INVALID_CAPTURING_PAWN_MOVE);
	}

	// Check the content of the "from"-square
	if(position.board[from] !== bt.PAWN*2+position.turn) {
		throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.INVALID_CAPTURING_PAWN_MOVE);
	}

	// Check the content of the "to"-square
	var toContent = position.board[to];
	if(toContent < 0) {
		if(to === (5-position.turn*3)*16 + position.enPassant) { // detecting "en-passant" captures
			return moveGeneration.isKingSafeAfterMove(position, from, to, (4-position.turn)*16 + position.enPassant);
		}
	}
	else if(toContent % 2 !== position.turn) { // detecting regular captures
		return moveGeneration.isKingSafeAfterMove(position, from, to, -1);
	}

	throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.INVALID_CAPTURING_PAWN_MOVE);
}


/**
 * Delegate function for non-capturing pawn move parsing.
 *
 * @returns {boolean|MoveDescriptor}
 */
function getPawnAdvanceDescriptor(position, notation, to) {

	// Ensure that `to` is not on the 1st row.
	var offset = 16 - position.turn*32;
	var from = to - offset;
	if((from & 0x88) !== 0) {
		throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.INVALID_NON_CAPTURING_PAWN_MOVE);
	}

	// Check the content of the "to"-square
	if(position.board[to] >= 0) {
		throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.INVALID_NON_CAPTURING_PAWN_MOVE);
	}

	// Check the content of the "from"-square
	var expectedFromContent = bt.PAWN*2+position.turn;
	if(position.board[from] === expectedFromContent) {
		return moveGeneration.isKingSafeAfterMove(position, from, to, -1);
	}

	// Look for two-square pawn moves
	else if(position.board[from] < 0) {
		from -= offset;
		var firstSquareOfRow = (1 + position.turn*5) * 16;
		if(from >= firstSquareOfRow && from < firstSquareOfRow+8 && position.board[from] === expectedFromContent) {
			return moveGeneration.isKingSafeAfterMove(position, from, to, -1);
		}
	}

	throw new exception.InvalidNotation(fen.getFEN(position, 0, 1), notation, i18n.INVALID_NON_CAPTURING_PAWN_MOVE);
}

},{"../basetypes":2,"../exception":4,"../i18n":6,"../movedescriptor":7,"./attacks":11,"./fen":12,"./impl":13,"./legality":14,"./movegeneration":15}],17:[function(require,module,exports){
/******************************************************************************
 *                                                                            *
 *    This file is part of Kokopu, a JavaScript chess library.                *
 *    Copyright (C) 2018-2020  Yoann Le Montagner <yo35 -at- melix.net>       *
 *                                                                            *
 *    This program is free software: you can redistribute it and/or           *
 *    modify it under the terms of the GNU Lesser General Public License      *
 *    as published by the Free Software Foundation, either version 3 of       *
 *    the License, or (at your option) any later version.                     *
 *                                                                            *
 *    This program is distributed in the hope that it will be useful,         *
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the            *
 *    GNU Lesser General Public License for more details.                     *
 *                                                                            *
 *    You should have received a copy of the GNU Lesser General               *
 *    Public License along with this program. If not, see                     *
 *    <http://www.gnu.org/licenses/>.                                         *
 *                                                                            *
 ******************************************************************************/


'use strict';


var bt = require('./basetypes');
var exception = require('./exception');


/**
 * Execute the given callback on each of the 64 squares.
 *
 * @param {function(Square)} callback
 */
exports.forEachSquare = function(callback) {
	for(var rank=0; rank<8; ++rank) {
		for(var file=0; file<8; ++file) {
			callback(bt.squareToString(rank * 16 + file));
		}
	}
};


/**
 * Return the color of a square.
 *
 * @param {Square} square
 * @returns {Color}
 */
exports.squareColor = function(square) {
	square = bt.squareFromString(square);
	if(square < 0) {
		throw new exception.IllegalArgument('squareColor()');
	}
	return Math.floor(square/16) % 2 === square % 2 ? 'b' : 'w';
};


/**
 * Return the coordinates of a square.
 *
 * @param {Square} square
 * @returns {{rank: number, file: number}} The `rank` and `file` fields have the same meaning as in {@link coordinatesToSquare}.
 */
exports.squareToCoordinates = function(square) {
	square = bt.squareFromString(square);
	if(square < 0) {
		throw new exception.IllegalArgument('squareToCoordinates()');
	}
	return { rank:Math.floor(square/16), file:square%16 };
};


/**
 * Return the square corresponding to the given coordinates.
 *
 * @param {number} file `0` for file A, `1` for file B, ..., `7` for file H.
 * @param {number} rank `0` for the first rank, ..., `7` for the eighth rank.
 * @returns {Square}
 * @throws {exception.IllegalArgument} If either `file` or `rank` is not between 0 and 7 (inclusive).
 */
exports.coordinatesToSquare = function(file, rank) {
	if(file<0 || file>=8 || rank<0 || rank>= 8) {
		throw new exception.IllegalArgument('coordinatesToSquare()');
	}
	return bt.fileToString(file) + bt.rankToString(rank);
};

},{"./basetypes":2,"./exception":4}]},{},[1])(1)
});
