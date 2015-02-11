/*
===========================================================================
* HTML5 Game - Shady puzzle
* Created by - Yogesh Kumar
* Version - 1.0
* Date - 01-April-2013
* browser - IE9+, FF3.6+,Chrome10+
* Website - http://www.bluejson.com
* Requires jquery-1.9.0.js or higher
* Copyright (c) 2013 Yogesh Kumar (http://www.bluejson.com)
===========================================================================
*/

/*
 *    Temp Comments
 *    1) timer
 *    2) start button
 *    3) restart button
 *    4) show solution button
 *    5) check solution button
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
                gx: 5,                  // grid x size
                gy: 5,                  // grid y size
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
            return new $.shadyPuzzleGame(this, settings);            // create new object for each shady puzzle game.
        }
    });
    $.shadyPuzzleGame = function(me,opt) {
        var gObj = {
            version:"1.0",                    // version of shady puzzle.
            author:"Yogesh Kumar",            // author name.
            website:"www.bluejson.com",       // website name.
            obj: {
                $me: $(me),                   // create container object.
                $canvas: null,
                context: null
            },
            id: {},
            cl: {},
            evnt:{
                canvasClick:function(e) {
                    var x,y,i,j,action;
                    if (e.pageX != undefined && e.pageY != undefined) {
                        x = e.pageX;
                        y = e.pageY;
                        i=-1;
                        j=-1;
                        canvasOffset = gObj.func.getOffset(this);
                        x -= canvasOffset.left;
                        y -= canvasOffset.top;
                        if(x<opt.cellWidth*(opt.gx+1))
                            i=Math.floor(x/opt.cellW);
                        if(y<opt.cellH*(opt.gy+1))
                            j=Math.floor(y/opt.cellH);
                        if(i>0 && j>0)
                        {
                            opt.moveObj.html(++opt.m);
                            if(opt.cellArr[i][j]==0)
                            {
                                action=0;
                                opt.cellArr[i][j]=1;
                                gObj.obj.context.fillRect(i*opt.cellW+2,j*opt.cellH+2,opt.cellW-3,opt.cellH-3);
                            }
                            else if(opt.cellArr[i][j]==1)
                            {
                                action=1;
                                opt.cellArr[i][j]=2;
                                gObj.obj.context.clearRect(i*opt.cellW+2,j*opt.cellH+2,opt.cellW-3,opt.cellH-3);
                                gObj.obj.context.beginPath();
                                gObj.obj.context.moveTo(i*opt.cellW+3,j*opt.cellH+3);
                                gObj.obj.context.lineTo((i+1)*opt.cellW-2,(j+1)*opt.cellH-2);
                                
                                gObj.obj.context.moveTo((i+1)*opt.cellW-2,j*opt.cellH+3);
                                gObj.obj.context.lineTo(i*opt.cellW+3,(j+1)*opt.cellH-2);
                                
                                gObj.obj.context.lineWidth = 1;
                                gObj.obj.context.strokeStyle = 'black';
                                gObj.obj.context.stroke();
                                
                            }
                            else if(opt.cellArr[i][j]==2)
                            {
                                action=2;
                                opt.cellArr[i][j]=0;
                                gObj.obj.context.clearRect(i*opt.cellW+2,j*opt.cellH+2,opt.cellW-3,opt.cellH-3);
                            }
                            //opt.isChecked = true;
                            console.log(i,j,action);
                        }
                    }
                }
            },
            func:
            {
                // main function to create game
                init:function() {

                    gObj.func.createCanvas();
                },
                createCanvas:function() {
                    gObj.obj.$canvas = $(document.createElement("canvas")).attr({width:opt.width,height:opt.height});
                    gObj.obj.$canvas[0].addEventListener("click", gObj.evnt.canvasClick, false);
                    gObj.obj.context = gObj.obj.$canvas[0].getContext("2d");
                    gObj.obj.$canvas.appendTo(gObj.obj.$me.empty());
                },
                resetCanvas: function() {
                    
                },
                getSolution:function() {
                    
                },
                checkSolution:function() {
                    
                },
                getRandomPuzzle:function() {
                    
                },
                getOffset:function(el){
                    var x = 0,y = 0;
                    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                        x += el.offsetLeft - el.scrollLeft;
                        y += el.offsetTop - el.scrollTop;
                        el = el.offsetParent;
                    }
                    return { top: y, left: x };
                }
            }
        };
        // calling main function to create message bar
        gObj.func.init();
    };
})(jQuery);