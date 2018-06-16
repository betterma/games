function Cell(r,c,src){
    this.r = r;this.c=c;this.src=src;
}
function Shape(r0,c0,r1,c1,r2,c2,r3,c3,src){
    this.cells = [
        new Cell(r0,c0,src),
        new Cell(r1,c1,src),
        new Cell(r2,c2,src),
        new Cell(r3,c3,src)
    ]
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
    }
}

function T(){
    Shape.call(this,0,3,0,4,0,5,1,4,"img/T.png");
}
Object.setPrototypeOf(T.prototype,Shape.prototype);
function O(){
    Shape.call(this,0,3,0,4,1,3,1,4,"img/O.png");
}
Object.setPrototypeOf(O.prototype,Shape.prototype);
function I(){
    Shape.call(this,0,3,0,4,0,5,0,6,"img/I.png");
}
Object.setPrototypeOf(I.prototype,Shape.prototype);
function L(){
    Shape.call(this,0,3,1,3,2,3,2,4,"img/L.png");
}
Object.setPrototypeOf(L.prototype,Shape.prototype);
function TR(){
    Shape.call(this,0,4,1,3,1,4,1,5,"img/2.png");
}
Object.setPrototypeOf(TR.prototype,Shape.prototype);
