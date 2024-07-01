let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let gameIsOn = false
let level = 0
let userChosenColour
let currentPosition = 0

//Náhodný index barvy od 0 do 3
function randomColor(){
    let randomNumber = Math.floor(Math.random()*4)
    return randomNumber
}

//přehraje zvuk na základě textu barvy
function playSound(color){
    let path = `./sounds/${color}.mp3`
    let soundToPlay = new Audio(path)
    soundToPlay.play()
}

function nextSequence(){
        level++
        updateTitle(level)
        let randomChosenColour = buttonColours[randomColor()]
        gamePattern.push(randomChosenColour)
        console.log(`gamePattern ${gamePattern}`)
        $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100)
        playSound(randomChosenColour)
}

function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed")
    
    setTimeout(()=>{
        $(`#${currentColour}`).removeClass("pressed")}
        , 100)
}

function playerMove(e){
    userChosenColour = e.target.id
    console.log(`userChosenColor ${userChosenColour}`)
    animatePress(userChosenColour)
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)
    playSound(userChosenColour)
}

function updateTitle(level){
$("#level-title").text(`Level ${level}`)
}


function checkAnswer(currentPosition){
if(gamePattern[currentPosition]===userClickedPattern[currentPosition]){
    console.log("correct")
    return true
}else{
    console.log("wrong")
    return false
}
}


//Game Logic Code
console.log(`GameIsOn  ${gameIsOn}`)

$(document).keydown(()=>{
    if (!gameIsOn){
        gameIsOn = true
        $('#new-game-btn').addClass('hidden')
        updateTitle(level)
        nextSequence()
    }

})

$('#new-game-btn').click(()=>{
    if (!gameIsOn){
        gameIsOn = true
        $('#new-game-btn').addClass('hidden')
        updateTitle(level)
        nextSequence()
    }
})


$(".btn").click((e)=>{
    if (gameIsOn){
        console.log(`gamePattern.length ${gamePattern.length}`)
    
        playerMove(e)
        if(checkAnswer(currentPosition)){
            currentPosition++
            console.log(`currentPosition ${currentPosition}`)
            
            if(currentPosition === gamePattern.length){
                currentPosition = 0
                userClickedPattern = []
                setTimeout(()=>{nextSequence()}, 1000)
                
            }
        }else{
            playSound('wrong')
            $("#level-title").text(`GAME OVER, level ${level} - Press A Key to Start`)
            $('#new-game-btn').removeClass('hidden')
            resetGame()
        }
    }

})


function resetGame(){
    gameIsOn = false
    gamePattern = []
    userClickedPattern = []
    level = 0
}