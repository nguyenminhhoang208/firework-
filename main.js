const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight -16
const color = [
    '#E37B40',
    '#46B29D',
    '#DE5B49',
    '#324D5C',
    '#F0CA4D'
]

const fireWorksArray = []
const burstFireWorkArrays = []
class FireWork{
    constructor(){
        this.x = Math.random()*1340 + 70
        this.y = Math.random()*700 + 680
        this.height =Math.random()*275 + 90
        this.size = Math.random()*1.5 + 0.5
        this.speed = Math.random()*2 + 1 
        this.color = color[Math.floor(Math.random()*(color.length))]
        this.particleArray = []
    }
    update(){
        if(this.size > 0)
        {
            this.y -= this.speed
            for (let i = 0; i < 2; i++) {
                this.particleArray.push(new Particle(this.x,this.y))
            }
            //  console.log(this.particleArray);
            
        }
        if(this.y < this.height)
        {
            this.size = 0
            // for (let i = 0; i < 5; i++) {
            //     this.burstFireWorkArray.push(new BurstFireWork(this.x,this.y))
            // }
            
        }
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
        ctx.fill()
        
    }
    
}

class Particle{
    constructor(x,y){
        this.x = x
        this.y = y
        this.speedX = Math.random()*3 -1.5
        this.speedY = Math.random()*3 -1.5
        this.size = Math.random()*3 + 1
        this.color = color[Math.floor(Math.random()*(color.length))]
    }
    update(){
            this.y -= this.speedY
            this.x -= this.speedX
            if(this.size > 0.4)this.size -= 0.35
            else this.size = 0
       
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2) 
        ctx.fill()
    }
}

class BurstFireWork {
    constructor(x,y){
        this.x = x
        this.y = y
        this.speedX = Math.random()*3 -1.5
        this.speedY = Math.random()*3 -1.5
        this.size = Math.random()*5 + 3
        this.color = color[Math.floor(Math.random()*(color.length))]
    }
    update(){
            this.y += this.speedY
            this.x += this.speedX
           if( this.size > 0.4)  this.size -= 0.1
           else this.size = 0
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2) 
        ctx.fill()
    }
}
class BurstFireWorkArray{
    constructor(){
        this.burstFireWorkArray = []
    }
    setBurstFireWorkArray(x,y){
        let array = []
        for (let i = 0; i < 50; i++) {
            const burstFireWork = new BurstFireWork(x,y)
            // console.log(burstFireWork);
            // this.burstFireWorkArray.push(burstFireWork)
            array = [...array,burstFireWork]
            // console.log(array);

        }
        this.burstFireWorkArray = [...array]
        console.log(this.burstFireWorkArray);

    }
}
function handleParticle(particleArray){
    for(let i = 0; i < particleArray.length;i++)
    {
        particleArray[i].draw()
        particleArray[i].update()
        if(particleArray[i].size == 0)
        {
            particleArray.splice(i,1)
        }
    }
}

function animateParticle(particleArray){
    // while(particleArray.length > 0)
    // {
        handleParticle(particleArray)
    // }
        // requestAnimationFrame(animateParticle)
}
function check(x) {
    return fireWorksArray.find((curr)=>{
        return Math.abs(curr.x - x) < 50
    })
}

function handleBurstFireWork() {
    for(let i = 0; i < burstFireWorkArrays.length;i++)
    {
        for(let j = 0; j < burstFireWorkArrays[i].burstFireWorkArray.length;j++)
        {
            // console.log(burstFireWorkArrays[i].burstFireWorkArray[j]);
            burstFireWorkArrays[i].burstFireWorkArray[j].draw()
            burstFireWorkArrays[i].burstFireWorkArray[j].update()
            if(burstFireWorkArrays[i].burstFireWorkArray[j].size == 0) burstFireWorkArrays[i].burstFireWorkArray.splice(j,1)
        }
        // if(burstFireWorkArrays[i] = []) burstFireWorkArrays.splice(i,1)
    }
    
}

function animateBurstFireWork() {
    ctx.clearRect(0 , 0, canvas.width,canvas.height)
    handleBurstFireWork()
    console.log(burstFireWorkArrays);
    requestAnimationFrame(animateBurstFireWork)
}
animateBurstFireWork()
function handleFireWork(){
    for (let i = 0; i < fireWorksArray.length; i++) {
        fireWorksArray[i].draw()
        fireWorksArray[i].update()
        animateParticle(fireWorksArray[i].particleArray)
        if(fireWorksArray[i].size == 0 )
        {
            // console.log(fireWorksArray[i]);
            const burstFireWorkArray = new BurstFireWorkArray()
            burstFireWorkArray.setBurstFireWorkArray(fireWorksArray[i].x,fireWorksArray[i].y)
            burstFireWorkArrays.push(burstFireWorkArray)
            console.log(burstFireWorkArray.burstFireWorkArray);
            fireWorksArray.splice(i,1)
// animateBurstFireWork()
// handleBurstFireWork()

        }
    }
    // handleBurstFireWork()

}


// canvas.addEventListener('click',()=>{
//     while(fireWorksArray.length < 20){
//         const fireWork = new FireWork()
//         if(!check(fireWork.x))
//         {
//             // for (let i = 0; i < 2; i++) {
//             //     fireWork.particleArray.push(new Particle(fireWork.x,fireWork.y))
//             // }
//             fireWorksArray.push(fireWork)
//         }
//     }
// })

function animate(){
    
    while(fireWorksArray.length < 20){
        const fireWork = new FireWork()
        if(!check(fireWork.x))
        {
            // for (let i = 0; i < 2; i++) {
            //     fireWork.particleArray.push(new Particle(fireWork.x,fireWork.y))
            // }
            fireWorksArray.push(fireWork)
        }
    }
    // ctx.clearRect(0 , 0, canvas.width,canvas.height)
    handleFireWork()
    requestAnimationFrame(animate)
}
animate()