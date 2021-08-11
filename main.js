document.querySelector(".control-buttons span").onclick = function () {
    
    let yourName = prompt("عطـينا أسـمك لأسـبـاب أمـنية : ");

    if (yourName == null || yourName == "") {

        document.querySelector(".name span").innerHTML = 'لقيـط';
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    document.querySelector(".control-buttons").remove();

    document.getElementById("start").play();


};

let i;

let win = 0;
 
let duration = 2000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffel(orderRange);


blocks.forEach((block,index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', function (){

        flipBlock(block);
    });

});

function flipBlock(selectedBlock) {
 
    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    
    
    
    if (allFlippedBlocks.length === 2) {

        stopClicking();

        checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);

    }
}

function stopClicking() {

    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

    blocksContainer.classList.remove('no-clicking');

    }, duration);

}

function checkMatchedBlocks (firstBlock, secondBlock) {

    let triesElemnt = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

        win = win + 1;

        if (win === 10){

            endGameWin();

        }

    } else {

        triesElemnt.innerHTML = parseInt(triesElemnt.innerHTML) +1;

        setTimeout(()=> {
  
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        },duration);
        
        if (i<11) {

        i = i+1;

        document.getElementById('fail-'+i).play();

        }else{
            i = 1;
            document.getElementById('fail-1').play();
        }

    }

let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('has-match'));

if (parseInt(triesElemnt.innerHTML) === 10){

    
    setTimeout(()=> {

       endGame();
    
    },3000);


    
}
}

function shuffel(array) {

    let current = array.length,
        temp , 
        random;

    while (current > 0) {

        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;
    }
    return array;
}

function endGame() {
    
    // Music
    
    document.getElementById('final-fail').play(); 

    document.getElementById("start").pause();

    // stop the clicking
    
    blocksContainer.classList.add('no-clicking');

    //create popup div

    let lastDiv = document.createElement('div');

    // create replay a

    let replayA = document.createElement('a');

    //back to html

    replayA.href = "/index.html"

    // create loss text 

    let lastDivText = document.createTextNode(" خـسـرت مـتـل الـنعـجـة");

     // create replay text 

     let ReplayText = document.createTextNode("جرب مرتلخر");
     
     //append text to last div

     lastDiv.appendChild(lastDivText);

     //append text to a 

    replayA.appendChild(ReplayText);

    //add class on div

    lastDiv.className = 'popuplose';

    //add class on span

    replayA.className = 'replay';

    //append to body

    document.body.appendChild(lastDiv);
    document.body.appendChild(replayA);

}
function endGameWin() {
    
    // Music
    
    document.getElementById('final-success').play(); 

    document.getElementById("start").pause();
    
    document.getElementById("success").pause();



    // stop the clicking
    
    blocksContainer.classList.add('no-clicking');

    //create popup div

    let lastDiv = document.createElement('div');

    // create replay a

    let replayA = document.createElement('a');

    //back to html

    replayA.href = "/index.html"

    // create loss text 

    let lastDivText = document.createTextNode(" حـلال ع ربـك ولاك");

     // create replay text 

     let ReplayText = document.createTextNode("بـتـحـب تـجـرب مرتلـخر ؟");
     
     //append text to last div

     lastDiv.appendChild(lastDivText);

     //append text to a 

    replayA.appendChild(ReplayText);

    //add class on div

    lastDiv.className = 'popupwin';

    //add class on span

    replayA.className = 'replay';

    //append to body

    document.body.appendChild(lastDiv);
    document.body.appendChild(replayA);

}