class Snake{
    constructor(start, end, c1, c2){
        this.start = [
            start
        ]
        this.end = [
            end
        ]
        this.points = [
            {
                x:(width/10)*(cells[start].x-1)+(width/20), 
                y:(width/10)*(cells[start].y-1)+(width/20), 
            },
            {   
                x: (width/10)*(cells[c1].x-1)+(width/20),
                y: (width/10)*(cells[c1].y-1)+(width/20),
            },
            {   
                x: (width/10)*(cells[c2].x-1)+(width/20),
                y: (width/10)*(cells[c2].y-1)+(width/20),
            },{
                x: (width/10)*(cells[end].x-1)+(width/20),
                y: (width/10)*(cells[end].y-1)+(width/20),
            }
        ]
        this.color = colorPicker.pick()
    }
    show(){
        strokeWeight(30)
        stroke(this.color)  
        point(this.points[0].x, this.points[0].y)
        strokeWeight(10)
        noFill()
        curve(this.points[0].x, this.points[0].y, this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
        curve(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);
        curve(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y, this.points[3].x, this.points[3].y);
    }
}