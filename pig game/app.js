var scores,roundscore,acitveplayer,playing;

function initialize()
{
playing = 1;
scores = [0,0];
roundscore = 0;
activeplayer = 0;

document.querySelector(".dice").style.display = "none";
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById("name-0").textContent = 'Player 1';
document.getElementById("name-1").textContent = 'Player 2';
document.querySelector('.player-' + '0' + '-panel').classList.remove('winner');
document.querySelector('.player-' + '1' + '-panel').classList.remove('winner');
document.querySelector('.player-' + '0' + '-panel').classList.remove('active');
document.querySelector('.player-' + '1' + '-panel').classList.remove('active');
document.querySelector('.player-' + '0' + '-panel').classList.add('active');
}

initialize();




function next_player() {
    document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
    
        activeplayer === 0 ? activeplayer = 1 : activeplayer = 0;
    
        document.querySelector('.player-' + activeplayer + '-panel').classList.add('active');
        
        roundscore = 0;
        document.querySelector("#current-0").textContent = '0';
        document.querySelector("#current-1").textContent = '0';

        document.querySelector(".dice").style.display = "none";


}



document.querySelector('.btn-roll').addEventListener("click" , function() {

   
    if(playing == 1)
    {
        var dice = Math.ceil(Math.random()*6);
    var x = document.querySelector(".dice");
    x.style.display = "block";
    x.src = 'dice-' + dice + '.png'; 
    var tot_score_1 , tot_score_0;



    if(dice !== 1)
    {
        roundscore += dice;
        document.querySelector("#current-" + activeplayer).textContent = roundscore;
    }
    else
    {
     next_player();
    }
    }

});

document.querySelector(".btn-hold").addEventListener('click' , function() {
    
    if(playing == 1)
    {
        scores[activeplayer] += roundscore;
    document.querySelector('#score-' + activeplayer).textContent = scores[activeplayer];
    if(scores[activeplayer]>=10)
    {
        document.getElementById("name-" + activeplayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
    playing = 0;
    }
    else
    {
        next_player();

    }
    }

   
    
  
});

document.querySelector('.btn-new').addEventListener('click' , initialize);


