

            // init player choice
            function playerPlay(){
                let init = true;
                let welcome = "Hello, choose"
                let move = "";
                while(move != "Paper" && move != "Rock" && move != "Scissors"){
                    if (init) {
                        init = false; 
                    } else {
                        welcome = move + " is invalid, try again.";
                    }
                    var playerInput = prompt(`${welcome} Paper, Rock or Scissors? `);
                    move = playerInput ? playerInput.slice(0,1).toUpperCase() + playerInput.slice(1,).toLowerCase() : null;
                }
                return move;
            }

            // init computer choice
            function computerPlay(){
                let moves = ["paper", "rock", "scissors"];
                return moves[Math.floor(Math.random() * 10)%3];
            }
            
            // init round of game
            function playRound(playerSelection, computerSelection){
                movesEnum = {"paper":1, "rock":2, "scissors":3}
                var outcome;
                if (movesEnum[playerSelection] === movesEnum[computerSelection]) {
                    // return `This round was a tie, you've both chosen ${playerSelection}!!`;
                    outcome = "draw";
                } else if (movesEnum[playerSelection] === ((movesEnum[computerSelection] - 1) ? movesEnum[computerSelection] - 1 : 3) ){
                    // return `${playerSelection} beats ${computerSelection}!! The player has won!`;
                    outcome = "player";
                } else {
                    // return `${computerSelection} beats ${playerSelection}!! The computer has won!`;
                    outcome = "computer";
                }

                return {"playerSelection":playerSelection, "computerSelection":computerSelection, "outcome":outcome}
            }

            // scoreboard init
            var message = "Choose your move, Hero."
            var [playerScore, computerScore, drawScore] = [0,0,0];

            // scoreboard logic
            function scoreboard(currentRound){
                switch(currentRound.outcome){
                    case "draw":
                        drawScore++;
                        message = "This round is a draw."
               
                        break;
                    case "player":
                        playerScore++;
                        message = "You have won this round!"
                        
                
                        break;
                    case "computer":
                        computerScore++;
                        message = "You have lost this round."
                
                        break;
                    default:
                        break;
                }

                document.querySelector('#board-message').innerHTML = message;
                document.querySelector('#player-score').innerHTML = playerScore;
                document.querySelector('#computer-score').innerHTML = computerScore;
                document.querySelector('#draw-score').innerHTML = drawScore;

                // Scoreboard Menu :
                document.querySelectorAll('.menu-button').forEach((selection) =>{
                    selection.addEventListener('click', this.handleBoardSelect);
                })
            }

            this.handlePlayerSelect = function(e) {
                // Player Menu :
                const playerSelect = e.target.id;
                e.target.classList.add('move-selected');
                document.querySelectorAll('.move-button').forEach((button) =>{
                    if (button.id != e.target.id){
                        button.classList.add('move-disabled');
                        button.removeEventListener('click', this.handlePlayerSelect);
                    }
                    button.classList.remove('active');
                    button.removeEventListener('click', handlePlayerSelect);
                });

                // Computer Menu :
                const computerSelect = computerPlay();
                document.querySelector('#computer-'+computerSelect).classList.add('move-selected');
                document.querySelectorAll('.move-computer').forEach((button) =>{
                    if (button.id != ('computer-'+computerSelect)){
                        button.classList.add('move-disabled');
                    }
                });

                // Scoreboard Menu :
                document.querySelector('#board-menu').classList.remove('hidden');
                scoreboard(playRound(playerSelect, computerSelect));
            }

            this.handleBoardSelect = function(e) {
                console.log(e.target.id)
                if (e.target.id == "yes") {
                    document.querySelector('#board-message').innerHTML = "Make your move on the left.";

                    // Menu Init :
                    document.querySelectorAll('.move').forEach((button) =>{
                        button.classList.remove('move-selected');
                        button.classList.remove('move-disabled');
                    });

                    // Player Menu Init :
                    document.querySelectorAll('.move-button').forEach((button) => {
                        button.classList.add('active');
                    });

                    document.querySelectorAll('.active').forEach((selection) =>{
                        selection.addEventListener('click', handlePlayerSelect);
                    });

                    document.querySelector('#no').classList.remove('hidden');
                    document.querySelector('.board-score').classList.remove('hidden');

                    // Scoreboard Menu :
                    document.querySelector('#board-menu-message').innerHTML = "Play another round?";
                    document.querySelector('#board-menu').classList.add('hidden');

                }else if (e.target.id == "no") {

                    // compose game over message
                    if (playerScore > computerScore) {
                        message = "Game over, you win!";
                    } else if (playerScore < computerScore) {
                        message = "Game over, you lose!";
                    } else {
                        message = "Game over, you tied!";
                    }

                    message = message  
                    + "<br> Player : " + playerScore 
                    + "<br>Computer : " + computerScore
                    + "<br>Draw : " + drawScore;

                     // Menu Init :
                     document.querySelectorAll('.move').forEach((button) =>{
                        button.classList.remove('move-selected');
                        button.classList.remove('move-disabled');

                        button.classList.add('move-disabled');
                    });

                    document.querySelector('#no').classList.add('hidden');
                    document.querySelector('.board-score').classList.add('hidden');

                    // Scoreboard Menu :
                    //document.querySelector('#board-menu').classList.add('hidden');
                    document.querySelector('#board-menu-message').innerHTML = "Play new game?";
                    [playerScore, computerScore, drawScore] = [0,0,0];
                    scoreboard({"playerSelection":null, "computerSelection":null, "outcome":null}
                    )
                }

                
            }

            document.querySelectorAll('.active').forEach((selection) =>{
                selection.addEventListener('click', this.handlePlayerSelect);
            })
