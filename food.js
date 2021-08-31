class food{
    constructor(x,y){
        this.body = createSprite(x,y,30,30)
       // this.body.debug = true
        this.body.setCollider("circle",0,0,100)
        this.body.lifetime=50
        grant=random([1,2,3,4])
        switch(grant){
            case 1:this.body.addImage(apple);
            this.body.scale=0.15
            break;
            case 2:this.body.addImage(banana);
            this.body.scale=0.1
            break;
            case 3:this.body.addImage(grape);
            this.body.scale=0.2;
            break;
            case 4: this.body.addImage(orange);
            this.body.scale=0.2
            break;
        }
    }
}