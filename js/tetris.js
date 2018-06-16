var games = {
        score:0,
        level:1,
        lines:0,
        CN: 10,
        RN: 20,
        offset: 10, //游戏主页面的内边距
        size: 35,   //每个格子的大小35*35
        shape: null, //保存主角图形
        pg: null,  //保存游戏界面
        timer: null, //定时器
        wall: [],

        start: function () {
            //游戏启动
            document.querySelector("#score").innerText = this.score;
            document.querySelector("#level").innerText = this.level;
            document.querySelector("#lines").innerText = this.lines;

            //创建一个数组（墙）

            for (var r = 0; r <= 20; r++) {
                this.wall[r] = new Array(10);
            }
            games.pg = document.getElementById("playground");
            games.shape = new O();
            games.paintShape();
            this.timer = setInterval(this.move.bind(this), 500);

            document.onkeydown = function (ev) {
                switch (ev.keyCode) {
                    case 37:
                        this.left();
                        break;
                    case 39:
                        this.right();
                        break;
                }
            }.bind(this);

            // document.onclick = function(){
            //     clearInterval(this.timer);
            // }.bind(this);
            // document.ondblclick = function(){
            //     this.timer = setInterval(this.move.bind(this), 500);
            // }.bind(this);

            document.getElementById("left").onclick = function (ev) {
                        this.left();
            }.bind(this);

            document.getElementById("right").onclick = function (ev) {
                        this.right();
            }.bind(this);

            document.getElementById("status").onclick = function(e){
                if(this.timer) {
                    e.target.src="img/pause.png";
                    clearInterval(this.timer);
                    this.timer=null;
                }else {
                    this.timer=setInterval(this.move.bind(this), 500);
                    e.target.src="img/play.png";
                }
                // if(e.target.src=="img/play.png"){
                //     e.target.src="img/pause.png";
                // }
                // if(e.target.src=="img/pause.png"){
                //     e.target.src="img/play.png";
                // }
            }.bind(this);

        },
        stop:function(){
            clearInterval(this.timer);
            alert("您的分数为"+this.score);
        },
        //这个方法用来画图形
        paintShape: function () {
            var frag = document.createDocumentFragment("frag");
            var len = this.shape.cells.length;
            var cells = this.shape.cells;
            for (var i = 0; i < len; i++) {
                this.paintCell(cells[i], frag);
                document.querySelector("#playground").appendChild(frag);
            }
        },

        //向下移动
        move: function () {
            //出界 或者 下方对应墙数组有货 就停止下落（嵌入墙中）
            if (!this.canDown()) {
                // 游戏结束的条件：不能下落，而且位于最上面
                 if(this.shape.cells[0].r<=1){
                    this.stop();
                 }
                // console.log("不能继续下落了");

                //落入墙数组中
                for (var i = 0; i < this.shape.cells.length; i++) {
                    var a = this.shape.cells[i].r;
                    var b = this.shape.cells[i].c;
                    this.wall[a][b] = this.shape.cells[i];
                };

                this.deleteFullRow();

                document.querySelector("#score").innerText = this.score;
                document.querySelector("#level").innerText = this.level;

                var ary = ["new I()", "new O()", "new T()", "new L()","new TR()"];
                var n = Math.floor(Math.random() * 5);
                this.shape = eval(ary[n]);
            }


            this.shape.move();//下移
            this.paint();     //重绘
            this.paintWall(); //绘制已定
        },
        //左移动
        left: function () {
            if (!this.canLeft()) {
                console.log("不能继续左移了");
                return 0;
            }
            this.shape.left();
            this.paint();          //重绘
            this.paintWall();      //绘制已定

        },
        //右移动
        right: function () {
            if (!this.canRight()) {
                console.log("不能继续右移了");
                return 0;
            }
            this.shape.right(); //左移
            this.paint();           //重绘
            this.paintWall();      //绘制已定
        },

        //判断是否能继续下落
        canDown: function () {
            // 是否要出界
            var a = !!(this.shape.cells[3].r != 19);
            //是否每个小格下一次地方，对应的墙数组有货
            var b = true;

            for (var i = 0; i < this.shape.cells.length; i++) {
                var cell = this.shape.cells[i];
                if ((!games.wall[cell.r])||games.wall[cell.r + 1][cell.c] != undefined) {
                    b = false;
                    break;
                }
            }
            return a && b;
        },
        //判断是否能左移
        canLeft: function () {
            var a;
            for (var i = 0; i < this.shape.cells.length; i++) {
                var cell = this.shape.cells[i];
                if (cell.c == 0 || this.wall[cell.r][cell.c-1] != undefined) {
                    a = false;
                    break;
                } else {
                    a = true;
                }
            }
            return a;
        },
        canRight: function () {
            var a;
            for (var i = 0; i < this.shape.cells.length; i++) {
                var cell = this.shape.cells[i];
                if (cell.c == 9 || this.wall[cell.r][cell.c+1] != undefined) {
                    a = false;
                    break;
                } else {
                    a = true;
                }
            }
            return a;
        },
        //重绘一切
        paint: function () {
            //清除掉img
            var reg = /<img [^>]+>/g;
            this.pg.innerHTML = this.pg.innerHTML.replace(reg, "");
            this.paintShape();
        },
        //在图形不能下落之后，下次清除之前，绘制背景
        paintWall: function () {
            for (var i = this.RN-1; i >= 0; i--) {
                for (var j = 0; j < this.CN; j++) {
                    if(this.wall[i][j] != undefined) {
                        var frag = document.createDocumentFragment("frag");
                        this.paintCell(this.wall[i][j], frag);
                        this.pg.appendChild(frag);
                    }
                }
            }
        },
        paintCell: function (cell, frag) {
            var img = document.createElement("img");
            img.src = cell.src;
            img.style.padding = "1px";
            img.style.position = "absolute";
            img.style.top = cell.r * this.size + this.offset + "px";
            img.style.left = cell.c * this.size + this.offset + "px";
            frag.appendChild(img);
        },

        //判断这一行是否全空
        isEmptyRow:function(r){
                if(String(this.wall[r]).indexOf(",,,,,,,,,")!=-1){
                    return true;
                }
                return false;
        },
        //判断这一行是否为满
        isFullRow: function (r) {
                if(String(this.wall[r]).search(/^,|,,|,$/)!=-1){
                    return false;
                }
                return true;
        },
        //删除满的行
        deleteFullRow: function () {
            //反向遍历数组
            // for(var k=0;k<2;k++){
                        //主要实现区
                        for (var i = 19; i > 0; i--) {
                            //第i行是满行
                            if (this.isFullRow(i)) {
                                //从i往上遍历数组
                                for (var j = i; j > 0; j--) {
                                    //把第i-1行赋值给i行
                                    this.wall[j] = this.wall[j - 1];
                                    //要改变每个cell的r
                                    for(var k=0;k<10;k++){
                                        if(this.wall[j][k]!=undefined)
                                            this.wall[j][k].r++;
                                    }
                                    this.wall[j-1] = new Array(10);
                                    //直到第i-2行是全空结束
                                    if(this.isEmptyRow(j-1)){
                                        continue;
                                    }
                                }
                                this.score+=10;
                                this.level+=1;
                            }
                        }
            // }
        }
    };

    games.start();


//主要问题在于：在一行满了以后，数组改变了，但是背景没有重绘
