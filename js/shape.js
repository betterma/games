function Cell(r,c,src){
    this.r = r;this.c=c;this.src=src;
}
function Shape(r0,c0,r1,c1,r2,c2,r3,c3,src,status,orig){
    this.cells = [
        new Cell(r0,c0,src),
        new Cell(r1,c1,src),
        new Cell(r2,c2,src),
        new Cell(r3,c3,src)
    ];
    this.status=status;
    this.orig = orig;
    this.status_order = 0;
}
Shape.prototype = {
    move:function(){
        for(var i=0;i<this.cells.length;i++){
            this.cells[i].r++;
        }
    },
    left:function(){
        for(var i=0;i<this.cells.length;i++){
            this.cells[i].c--;
        }
    },
    right:function(){
        for(var i=0;i<this.cells.length;i++){
            this.cells[i].c++;
        }
    },
    spin:function(){
    		var a = this.orig;
    		var len = this.status.length;
	    			this.cells[0].c = this.cells[a].c + this.status[this.status_order].c0;
	    			this.cells[0].r = this.cells[a].r + this.status[this.status_order].r0;
	    			this.cells[1].c = this.cells[a].c + this.status[this.status_order].c1;
	    			this.cells[1].r = this.cells[a].r + this.status[this.status_order].r1;
	    			this.cells[2].c = this.cells[a].c + this.status[this.status_order].c2;
	    			this.cells[2].r = this.cells[a].r + this.status[this.status_order].r2;
	    			this.cells[3].c = this.cells[a].c + this.status[this.status_order].c3;
	    			this.cells[3].r = this.cells[a].r + this.status[this.status_order].r3;
	    	this.status_order ++;
	    	if(this.status_order == len){
	    		this.status_order = 0;
	    	}
    }
}
function status(r0,c0,r1,c1,r2,c2,r3,c3){
	this.r0 = r0;
	this.c0 = c0;
	this.r1 = r1;
	this.c1 = c1;
	this.r2 = r2;
	this.c2 = c2;
	this.r3 = r3;
	this.c3 = c3;
}
function T(){
    Shape.call(this,0,3,0,4,0,5,1,4,"img/T.png",
    [
    new status(-1,0,0,0,1,0,0,-1),
    new status(0,1,0,0,0,-1,-1,0),
    new status(1,0,0,0,-1,0,0,1),
    new status(0,-1,0,0,0,1,1,0),
    ],1);
}
Object.setPrototypeOf(T.prototype,Shape.prototype);

function O(){
    Shape.call(this,0,3,0,4,1,3,1,4,"img/O.png",[
    	new status(0,-1,0,0,1,-1,1,0)
    ],1);
}
Object.setPrototypeOf(O.prototype,Shape.prototype);
function I(){
    Shape.call(this,0,3,0,4,0,5,0,6,"img/I.png",[
    	new status(-2,0,-1,0,0,0,1,0),
    	new status(0,-2,0,-1,0,0,0,1)
    ],2);
}
Object.setPrototypeOf(I.prototype,Shape.prototype);


function L(){
    Shape.call(this,0,3,1,3,2,3,2,4,"img/L.png",[
    	new status(0,-2,0,-1,0,0,-1,0),
    	new status(2,0,1,0,0,0,0,-1),
    	new status(0,2,0,1,0,0,1,0),
    	new status(-2,0,-1,0,0,0,0,1)	
    ],2);
}
Object.setPrototypeOf(L.prototype,Shape.prototype);

function TR(){
    Shape.call(this,0,4,1,3,1,4,1,5,"img/2.png",[
    	new status(0,-1,1,0,0,0,-1,0),
    	new status(1,0,0,1,0,0,0,-1),
    	new status(0,1,-1,0,0,0,1,0),
    	new status(-1,0,0,-1,0,0,0,1)
    ],2);
}
Object.setPrototypeOf(TR.prototype,Shape.prototype);
