/*
===========================================================================
* HTML5 Game - Shady puzzle
* Created by - Yogesh Kumar
* Version - 1.0
* Date - 01-April-2013
* browser - IE9+, FF3.6+,Chrome10+
* Website - http://www.bluejson.com
* Requires jquery-1.9.0.js or higher
* Copyright (c) 2012 Yogesh Kumar (http://www.bluejson.com)
===========================================================================
*/

/*
 *	Temp Comments
 *	1) timer
 *	2) start button
 *	3) restart button
 *	4) show solution button
 *	5) check solution button
 */
(function($) {
	$.fn.extend({
		shadyPuzzle: function (settings) {
			settings = jQuery.extend({
				maxHeight:400,
				maxWidth:400,
				height:null,
                                width:null,
				cellHeight:null,
				cellWidth:null,
				startX:0,
				startY:0,
				autoResize:true,
				color:"#000",
				hintColor:"#86CA6E",
				hint:0,
				moves:0,
				border:{
					color:"#000",
					width:1,
					type:"solid"
				},
				userSolution:null,
				readonly:false,
				timer:null,
				help: {
					isShow:false,
					headText:"How To Play Shady Puzzle?",
					helpText:[
						"Left Click once to shade the box",
						"Left Click again to cross out the box",
						"Left Click again to clear the box",
						"Click on check to see if you got the right answer (crosses count as blanks)",
						"Click on 'Restart' to restart puzzle again",
						"Click on 'Show' if you give up and you want to see the solution"
					]
				},
                                difficulty:[
					{
						name:"Very Easy",
						size:4,
						bestTime:"00:17"
					},
					{
						name:"Easy",
						size:5,
						bestTime:"00:51"
					},
					{
						name:"Normal",
						size:6,
						bestTime:"01:19"
					},
					{
						name:"Hard",
						size:7,
						bestTime:"02:01"
					},
					{
						name:"Very Hard",
						size:8,
						bestTime:"03:53"
					}
				],
				themes:null,
				isAjax:false,
				currentAjaxRequest:null,
				cacheAjaxRequest:[],
				ajax:{
					type:"POST",
					url:"shady_puzzle.py",
					data:{},
					cache:false,
					beforeSend:function(obj,st) {
						
					},
					success:function(data,textStatus,obj) {
						
					},
					complete:function(obj,textStatus) {
						
					},
					error:function(obj,textStatus,err) {
						
					}
				}
			}, settings);
			return new $.shadyPuzzleGame(this, settings);			// create new object for each shady puzzle game.
		}
	});
	$.shadyPuzzleGame = function(thisObj,opt) {
		var gObj = {
			version:"1.0",					// version of shady puzzle.
			author:"Yogesh Kumar",				// author name.
			website:"www.bluejson.com",			// website name.
			obj: {
				$this: $(thisObj),			// create container object.
                                $can:null,
                                context:null
			},
			id: {},
			cl: {},
                        opt:opt,
			event:{
				canvasClick:function() {
					
				}
			},
			func:
			{
				// main function to create game
				init:function() {
				    gObj.func.createCanvas();
				},
				createCanvas:function() {
                                    gObj.obj.$can=$(document.createElement("canvas")).css({width:gObj.opt.width,height:gObj.opt.height});
                                    gObj.obj.$can.appendTo(gObj.obj.$this);
                                    gObj.obj.context = gObj.obj.$can[0].getContext("2d");
				},
				resetCanvas: function() {
					
				},
				getSolution:function() {
					
				},
				checkSolution:function() {
					
				},
				getRandomPuzzle:function() {
					
				}
			}
		};
		// calling main function to create message bar
		gObj.func.init();
	};
})(jQuery);