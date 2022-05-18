let score=0;
let timeStart=180;
let timeText=document.querySelector('.time-game');
let intervalTime;
function Canvas(canvas,xPost,yPost,color){
    this.canvas=canvas;
    this.xPost=xPost;
    this.yPost=yPost;
    this.color=color;
    this.ctx=canvas.getContext('2d');
    this.ctxH=this.canvas.height/5;
    // draw canvas
    this.drawCanvas=function(){
        this.ctx.save();
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle=this.color;
        this.ctx.fillRect(this.xPost,this.yPost,this.canvas.width,this.ctxH);
        this.ctx.restore();
        this.yPost+=2;
        // cek kondisi block
        if (this.yPost==this.canvas.height) {
            this.yPost=-50;
            score-=5;
        }
    };
    // render canvas
    this.renderCanvas=function(){
      return  setInterval(() => {
            this.drawCanvas();
        }, 200);
        // return interval;
    };
    this.actionUsers=function(){
        (this.yPost>0)? score+=5 : '';
       this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
       this.yPost=-40;
    };
}
// block
let blockA=new Canvas(document.querySelector('#blockA'),0,0,'lightgreen');
let blockB=new Canvas(document.querySelector('#blockB'),0,-60,'lightyellow');
let blockC=new Canvas(document.querySelector('#blockC'),0,-100,'lightblue');
let blockD=new Canvas(document.querySelector('#blockD'),0,-20,'white');
// key piano
let keyA=document.querySelector('.keyA');
let keyB=document.querySelector('.keyB');
let keyC=document.querySelector('.keyC');
let keyD=document.querySelector('.keyD');
keyA.addEventListener('click',function(){
    blockA.actionUsers();
   let audioA=document.querySelector('#audioA');
   audioA.src='nada/B.mp3';
   audioA.autoplay=true;
   audioA.load();
});
keyB.addEventListener('click',function(){
    blockB.actionUsers();
    let audioB=document.querySelector('#audioB');
    audioB.src='nada/Bb.mp3';
    audioB.autoplay=true;
    audioB.load();
});
keyC.addEventListener('click',function(){
    blockC.actionUsers();
    let audioC=document.querySelector('#audioC');
    audioC.src='nada/Gb.mp3';
    audioC.autoplay=true;
    audioC.load();
 });
 keyD.addEventListener('click',function(){
     blockD.actionUsers();
    let audioD=document.querySelector('#audioD');
    audioD.src='nada/Eb.mp3';
    audioD.autoplay=true;
    audioD.load();
 });
 let intervalA,intervalB,intervalC,intervalD;
// play game
let btnPlay=document.querySelector('.btn-play-game');
let textPlay=document.querySelector('.text-play');
btnPlay.addEventListener('click',function(){
    if (textPlay.textContent=='Play') {
        textPlay.textContent='Pause';
        document.querySelector('#font-game').setAttribute('class','fa-solid fa-pause');
        intervalA=blockA.renderCanvas();
        intervalB=blockB.renderCanvas();
        intervalC=blockC.renderCanvas();
        intervalD=blockD.renderCanvas();
        document.querySelector('#audio-game').autoplay=true;
        document.querySelector('#audio-game').load();
       intervalTime= setInterval(() => {
            timeStart-=1;
            timeText.textContent="Time "+timeStart;
            if (timeStart==0 && score<100) {
                document.querySelector('.game-over-modal').style.display='block';
                clearInterval(intervalA);
                clearInterval(intervalB);
                clearInterval(intervalC);
                clearInterval(intervalD);
                document.querySelector('#audio-game').autoplay=false;
                timeStart=0;
            }
         }, 1000);
        return;
    }
    clearInterval(intervalA);
    clearInterval(intervalB);
    clearInterval(intervalC);
    clearInterval(intervalD);
    clearInterval(intervalTime);
    textPlay.textContent='Play';
    document.querySelector('#font-game').setAttribute('class','fa-solid fa-play');
    document.querySelector('#audio-game').autoplay=false;
    document.querySelector('#audio-game').load();

})
// modal game
let gameModal=document.querySelector('.game-modal');
let song=document.querySelector('#song');
let btnStartGame=document.querySelector('.btn-start-game');
song.addEventListener('change',function(){
   btnStartGame.removeAttribute('disabled');
});
btnStartGame.addEventListener('click',function(){
    document.querySelector('#audio-game').src=song.value;
    gameModal.style.display='none';
    let counterTime=document.querySelector('#counter-time');
    let counter=3;
    setInterval(() => {
        counterTime.textContent=counter--;
        if (counterTime.textContent<0) {
            document.querySelector('.counter-time').style.display='none';
        }
    }, 1000);
})
// score game
let textScore=document.querySelector('.text-score');
setInterval(() => {
    textScore.textContent='Score anda \t'+score+'%';
    if (score<0) {
        document.querySelector('.game-over-modal').style.display='block';
        clearInterval(intervalA);
        clearInterval(intervalB);
        clearInterval(intervalC);
        clearInterval(intervalD);
        document.querySelector('#audio-game').autoplay=false;
    document.querySelector('#audio-game').load();
    } else if(score>=100) {
        document.querySelector('.game-win-modal').style.display='block';
        clearInterval(intervalA);
        clearInterval(intervalB);
        clearInterval(intervalC);
        clearInterval(intervalD);
        document.querySelector('#audio-game').autoplay=false;
    document.querySelector('#audio-game').load();
    }
    
}, 1000);
// mulai ulang game
let btnWin=document.querySelector('.btn-game-win');
let btnOver=document.querySelector('.btn-game-over');
btnWin.addEventListener('click',function(){window.location.reload() });
btnOver.addEventListener('click',function(){window.location.reload()});
// keyboard handler
window.addEventListener('keypress',function(event){
    if (event.key=="d"||event.key=='D') {
        blockA.actionUsers();
        let audioA=document.querySelector('#audioA');
        audioA.src='nada/B.mp3';
        audioA.autoplay=true;
        audioA.load();
    }
    else if(event.key=='f'||event.key=='F'){
        blockB.actionUsers();
        let audioB=document.querySelector('#audioB');
        audioB.src='nada/Bb.mp3';
        audioB.autoplay=true;
        audioB.load();
    }
    else if (event.key=='j'||event.key=='J'){
        blockC.actionUsers();
        let audioC=document.querySelector('#audioC');
        audioC.src='nada/Eb.mp3';
        audioC.autoplay=true;
        audioC.load();
    }
    else if (event.key=='k'||event.key=='K'){
        blockD.actionUsers();
        let audioD=document.querySelector('#audioD');
        audioD.src='nada/Gb.mp3';
        audioD.autoplay=true;
        audioD.load();
    }
})
/**
 * penaturan untuk timer game
 * * */






















