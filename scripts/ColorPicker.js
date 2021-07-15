class ColorPicker{
    constructor(){
        this.colors = [
            [244,67,54],
            [233,30,99],
            [156,39,176],
            [0,188,212],
            [33,150,243],
            [0,150,136],
            [76,175,80],
            [205,220,57],
            [255,235,59],
            [255,152,0], 
        ]
        this.picked = new Set();
    }

    pick(){
        while(this.picked.size != this.colors.length){
            const r = Math.floor(Math.random()*this.colors.length)
            if(!this.picked.has(r)){
                this.picked.add(r)
                return this.colors[r]
            } 
        }
        return [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)]
    }
}