const boxes=Array.from(document.getElementsByClassName("box"));
const play=document.getElementById("play");
const restartBtn=document.getElementById("restartBtn");
const spaces=[];
const O_TEXT='0';
const X_TEXT='X';
var count=0;
let currentPlayer; 
let gameLive = true;
const drawBoard=()=>{ 
    boxes.forEach((box, index) => { //taking each box and index of each box
        let styleString=''; //to add borders we take empty styleString
        if(index<3) { //box is on the top 
            styleString+=`border-bottom:3px solid var(--purple);`;
        }
        if(index%3===0) {//we are on left
            styleString+=`border-right:3px solid var(--purple);`;
        }
        if(index%3===2) {//we are on right
            styleString+=`border-left:3px solid var(--purple);`;
        }
        if(index>5) { //box is at the bottom
            styleString+=`border-top:3px solid var(--purple);`;
        }
        box.style=styleString; 
        box.addEventListener('click',boxClicked);//whether box is clicked/not
    });
};
const boxClicked=(e)=> {
    const id=e.target.id;//getting id of the element
    count++;//increments the count value
    console.log("count"+count)//counting the number of times box have been clicked
    
    if(!spaces[id] && gameLive == true) {//if nothing in spaces
        spaces[id]=currentPlayer;
        e.target.innerText=currentPlayer;//setting inner box to current player
        
        if(playerHasWon()){//handling if player has won
            gameLive = false;
            play.innerText=`${currentPlayer} has won!`;
            return;
        }
        if(count==9){ //if count is 9 returns draw
            play.innerText="Draw!";
        }
        currentPlayer=currentPlayer===O_TEXT ? X_TEXT : O_TEXT; /*if current player=O then X otherwise we set O */
        
    }

};
const playerHasWon=()=>{ //checking if player has won (conditions)
    if(spaces[0]===currentPlayer){
        if(spaces[1]===currentPlayer && spaces[2] === currentPlayer) {
            console.log(`${currentPlayer} wins up top`);
            return true;
        }
        if(spaces[3]===currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins up left`);
            return true;

        }
        if(spaces[4]===currentPlayer && spaces[8] === currentPlayer) {
            console.log(`${currentPlayer} wins up diagonally`);
            return true;
        }
    } if(spaces[8]===currentPlayer){
        if(spaces[2]===currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins up top`);
            return true;
        }
        if(spaces[6]===currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins up left`);
            return true;

        }
        
    } if(spaces[4]===currentPlayer){
        if(spaces[3]===currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins up middle`);
            return true;
        }
        if(spaces[1]===currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins up straight`);
            return true;

        }
       
    }if(spaces[2]===currentPlayer){
        if(spaces[4]===currentPlayer && spaces[6]===currentPlayer){
            console.log(`${currentPlayer} wins diagonally`);
            return true;
        }
    }
};

const restart =()=>{
    spaces.forEach((space,index)=>{ //wipe out each space
        spaces[index]=null;
        count=0;
    });
    boxes.forEach(box=>{
        box.innerText='';//wipe out text 
    });
    play.innerText="Let's Play!";
    currentPlayer=O_TEXT;//reset current player 
    gameLive= true;

};
restartBtn.addEventListener('click',restart);//listening for click event for restart
restart();
drawBoard();