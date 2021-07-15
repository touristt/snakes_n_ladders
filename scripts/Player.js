class Player{
    constructor(){
        this.pos = 1;
        this.color = colorPicker.pick()
        this.trail = [
            
        ]
    }
    show(){
        stroke(this.color)
        if(!this.trail.length){
            this.trail.push({
                x:(width/10)*(cells[this.pos].x-1)+(width/20), 
                y:(width/10)*(cells[this.pos].y-1)+(width/20)
            })
        }
        if(this.trail.length > 3){
            this.trail.shift()
        }
        strokeWeight(1)
        noFill()
        beginShape()
        for (let i = 0; i < this.trail.length; i++) {
            curveVertex(this.trail[i].x,this.trail[i].y)
        }
        curveVertex((width/10)*(cells[Math.min(this.pos,100)].x-1)+(width/20),(width/10)*(cells[Math.min(this.pos,100)].y-1)+(width/20))
        endShape()
        if(this.pos > 100) return
        fill(...this.color)
        noStroke()
        ellipse(
            (width/10)*(cells[this.pos].x-1)+(width/20), 
            (width/10)*(cells[this.pos].y-1)+(width/20), 
            40+noise(Math.random(), Math.random())*20,
            40+noise(Math.random(), Math.random())*20) 

    }
}
