export class MinArray {    
    
    constructor(){
        this.arr = [];
    };              
    
    Pop = () => {
        return this.arr.shift();
    }

    Insert = (cell) => {
        if (!cell.isInReach || this.arr.includes(cell)) return;
        this.arr.unshift(cell);        
         for (let i = 0; i < this.arr.length - 1; i++){
             if(this.arr[i].weight < this.arr[i + 1].weight){
                 break;     
             }
             let temp = this.arr[i];
             this.arr[i] = this.arr[i + 1];
             this.arr[i + 1] = temp;
         }
    }
    
    GetCount = () => {
       return this.arr.length;
    }
}

export default MinArray;
