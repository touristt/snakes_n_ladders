class Ladder{
    constructor(start, end){
        this.start = [
            start, 
            (width/10)*(cells[start].x-1)+(width/20), 
            (width/10)*(cells[start].y-1)+(width/20)
        ]
        this.end = [
            end,
            (width/10)*(cells[end].x-1)+(width/20),
            (width/10)*(cells[end].y-1)+(width/20)
        ]
        this.color = colorPicker.pick()
    }
    show(){
        strokeWeight(2)
        stroke(this.color)
        const offX = 20
        const offY = 20
        const sx1 = this.start[1]-offX
        const sy1 = this.start[2]+offY
        const sx2 = this.start[1]+offX
        const sy2 = this.start[2]+offY
        const ex1 = this.end[1]-offX
        const ey1 = this.end[2]-offY
        const ex2 = this.end[1]+offX
        const ey2 = this.end[2]-offY
        line(sx1, sy1, ex1, ey1)
        line(sx2, sy2, ex2, ey2)
        const slope = (sy1 - ey1) / (sx1 - ex1)
        const stepsCount = Math.abs(ey1-sy1)/31.23
        const xDiff =  (sx1-ex1)/stepsCount;
        for (let i = 1; i < stepsCount ; i++) {
            if(sx1 != ex1)
                line(ex1+xDiff*i,slope*(xDiff*i)+ey1, ex1+xDiff*i+40,slope*(xDiff*i)+ey1)
        }
    }
}