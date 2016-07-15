/**
* cycle2d
* 
* Cute little method to cycle values of an 1d array in 2d manner, while
* wrapping the virtual 2d edges.
* Beware! The given array is modified, clone it if you want to work on a copy.
* Vertical scrolling is much more performant than horizontal scrolling. 
* If you need realtime wrapped image scroll effects, you better offset draw the 
* same image multiple times on a canvas, this is much faster than working on
* the array representation.
* If you want to use this method with arrays that contain multiple items per
* virtual pixel you have to multiply the x and cols paramter with the amount
* of items per pixel. ie: your array contains non concatted r, g, b, a
* values you need to multiply with 4 otherwise you will cycle through the
* color channels, looks funny, i guess.
*
* The Params
* arr: 1 dimesional Array that can be treated as 2d rectangle reprensentation 
* x: integer -n ... 0 ... +n specify x offset
* y: integer -n ... 0 ... +n specify y offset
* cols: optional integer 1 ... arr.length defines the number of columns.
* Assuming square if no value given. If the cols parameter is 1 the array is 
* practically treated as 1 dimensional and the x parameter will have no effect 
* at all. 
*
* 1 2 3                  3 1 2   x o o
* 4 5 6  -> x:1,y:0 ->   6 4 5   x o o
* 7 8 9                  9 7 8   x o o
*
* 1 2 3                  4 5 6   o o o
* 4 5 6  -> x:0,y:-1 ->  7 8 9   o o o
* 7 8 9                  1 2 3   x x x
*
* 1 2 3                  8 9 7   x x x
* 4 5 6  -> x:-1,y:1 ->  2 3 1   o o x
* 7 8 9                  5 6 4   o o x
*/
function cycle2d(arr,x,y,cols){
  if(!arr || !arr.length) throw "not a valid array";
  var arr_length, rows, i, args;
  x = x||0; y = y||0;
  arr_length = arr.length;
  cols = cols||Math.sqrt(arr_length);  
  rows = arr_length/cols;
  if(y>0){ // DOWN (remove top, insert bottom)
    while(y-->0) arr.push.apply(arr,arr.splice(0,cols));
  }else if(y<0){ // UP  (remove bottom, insert top)
    while(y++<0) arr.unshift.apply(arr,arr.splice(arr_length-cols,cols));      
  } 
  if(x>0){ // Right (remove left, insert right)    
    while(x-->0){
      for(i=0;i<rows;i++){
        args = [i*cols+cols-1,0];
        args.push.apply(args,arr.splice(i*cols,1));
        arr.splice.apply(arr,args);
      }
    }
  }else if(x<0){ // Left (remove right, insert left)  
    while(x++<0){
      for(i=0;i<rows;i++){
        args = [i*cols,0];
        args.push.apply(args,arr.splice(i*cols+cols-1,1));
        arr.splice.apply(arr,args);
      }
    }
  } 
}
