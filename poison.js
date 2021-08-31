class poison{
    constructor(){
        this.body=createSprite(random(100,700),random(100,700))
        this.body.addImage(poisonImg)
        this.body.scale=0.2
        this.body.lifetime=50
    }
}