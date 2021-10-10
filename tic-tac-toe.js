window.addEventListener("load", (event)=> {
    let p1_points = 0;
    let p2_points = 0;
    //let fboard = ["","","","","","","","",""];
    //let full = false;
    let reset = 0;
    let rows_columns  = document.querySelectorAll("#board > div");
    let winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,5,6]];
    var win = document.getElementById("status");
    let newGame =  document.querySelector(".btn");
    let X_O = -1;

    //Create the square boxes for rows and columns
    rows_columns.forEach((rowColumn)=> {
        rowColumn.classList.add("square");
        rowColumn.innerHTML = " ";
    }); 
    //Events that take place after every click of a row or column
    rows_columns.forEach((rowColumn)=> {
        rowColumn.onclick = (event)=>{
            //Add an X or O appropriately when a row/column is clicked
            if (X_O == -1 && rowColumn.innerHTML == ' ' || X_O == 1 && rowColumn.innerHTML == ' '){ //Disallows overwriting/cheating
                rowColumn.classList.add("X");
                rowColumn.innerHTML = 'X';
                X_O = 0;
            }
            else{
                if (rowColumn.innerHTML == ' ') // Disallows overwriting/cheating
                {
                rowColumn.classList.add("O");
                rowColumn.innerHTML = 'O';
                X_O = 1;
                }
            }
            //Check if there is a winner after every click
            result();
        }
        //Add hover effect
        rowColumn.onmouseover = (event)=>{
            rowColumn.style.transition = "all .3s ease-in-out"
            rowColumn.classList.add("hover");
        }
        //Remove hover effect
        rowColumn.onmouseout = (event)=>{
            rowColumn.classList.remove("hover");
        }
        let result =()=>{
            for (let i = 0; i < winningCombos.length; i++){
                winningCombos[i].forEach(i2 => {
                    if (rows_columns[i2].classList.contains("X")){ //Check if player 1 has achieved 'i' amount of winning variables from the list.
                        p1_points++;
                    }
                    else if (rows_columns[i2].classList.contains("O")){ //Check if player 2 has achieved 'i' amount of winning variables from the list.
                        p2_points++;
                    }
                });
                if (p1_points >= 3){
                    var win = document.getElementById("status"); //Get object of status id
                    win.classList.add("you-won"); //Add you-won id
                    win.innerHTML = "Congratulations! X is the Winner!"; //Change text
                    rows_columns.forEach((rowcol)=>{
                        rowcol.onclick = (event) => {
                            event.preventDefault(); //Prevent anymore onclick events once the player wins
                        }
                    })
                }else if (p2_points == 3){
                    var win = document.getElementById("status"); //Get object of status id
                    win.classList.add("you-won"); //Add you-won id
                    win.innerHTML = "Congratulations! O is the Winner!"; //Change text
                    rows_columns.forEach((rowcol)=>{
                        rowcol.onclick = (event) => {
                            event.preventDefault(); //Prevent anymore onclick events once the player wins
                        }
                    })
                }
                //restart point variables
                p1_points = reset;
                p2_points = reset;
            }
        }
        
    });
    newGame.addEventListener('click', (event) => {
        //event.returnValue=true;
        location.reload(); //Reload document
    })
});

