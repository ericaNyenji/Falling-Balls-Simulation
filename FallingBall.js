//By clearing the canvas with ctx.clearRect(0, 0, canvas.width, canvas.height) at the beginning of each frame, you ensure that the previous frame's content is removed, and only one ball is visible at a time. This creates the illusion of a single ball falling through the canvas, and you don't see a buildup of multiple balls.

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// Option 1: Drawing using shapes - directly to the canvas
// ctx.fillStyle = 'orange'
// ctx.fillRect(50, 100, 150, 150)
// ctx.strokeStyle = 'blue'
// ctx.lineWidth = 4
// ctx.strokeRect(50, 100, 150, 150)
// // also: fillText, strokeText, ctx.font

// // Option 2: Drawing using paths - not drawn directly
// ctx.beginPath()
// // e.g triangle
// ctx.fillStyle = 'red'
// ctx.moveTo(100, 100) // starting point
// ctx.lineTo(100, 200) // side 1
// ctx.lineTo(200, 200) // side 2
// ctx.lineTo(100, 100) // side 3
// ctx.fill() // or ctx.stroke()

// array of circle objects,,,Each object represents a falling ball 
const circles = [{
    x: 200,
    y: 0,
    vy: 0,// vertical velocity 
    r: 20,
    c: 'red'//color
}
,
{
    x: 100,
    y: 100,
    vy: 0,
    r: 15,
    c: 'blue'
},
]

let last = performance.now()

function gameloop(){
    let dt = performance.now() - last
    last = performance.now()
    draw()
    update(dt)
    requestAnimationFrame(gameloop)
}

gameloop()

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    for (const circle of circles){
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
        ctx.fillStyle = circle.c
        ctx.fill()
    }   
}

function update(dt){//update the position and velocity of each circle, and handle bouncing behavior.
    
    for (const circle of circles){
        circle.vy += 0.0001 * dt//The velocity increment is proportional to the time passed (dt) since the last frame. This increases the speed at which the ball falls downward.
        circle.y += circle.vy * dt//Here, the vertical position (y) of the circle is updated based on its vertical velocity and the time passed (dt). This line controls the ball's vertical movement.
        if (circle.y >= canvas.height - circle.r) //checks if the circle has reached or passed the lower edge of the canvas. //When the center of the ball is at or below this threshold, it means the ball has touched or gone beyond the lower edge.
            circle.vy *= -1//When the circle reaches the lower edge, this line reverses the direction of the vertical velocity (vy). This reversal causes the ball to bounce, effectively changing its direction and simulating a bounce.
    }
}
// It continues to do so because the animation loop (requestAnimationFrame()) keeps running, and the code applies the same logic in each frame. 

canvas.addEventListener('click', function(e){//I THINK THIS IS EVENT DELEGATION BECAUSE THIS EXTRA CIRCLES WILL BEHAVE THE SAME WAY AS THE PREVIOUS CIRCLES
    console.log(e)
    circles.push({
        x: e.offsetX,
        y: e.offsetY,
        vy: 0,
        r: 10 + Math.random() * 10,
        c: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    })
})

