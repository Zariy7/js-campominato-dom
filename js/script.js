let genBtn = document.getElementById('Generate');

genBtn.addEventListener('click', gridGen);

function gridGen(){
    let diffString = document.getElementById('Difficulty').value;
    let diffValue;

    //SECOND BONUS
    switch (diffString){
        case 'Easy':
            diffValue = 10;
            break;
        case 'Medium':
            diffValue = 9;
            break;
        case 'Hard':
            diffValue = 7;
            break;
        default:
            break;
    }

    let grid = document.getElementById('Grid');
    grid.innerHTML = ``;
    let bombsArray = [];
    bombsArray = bombGen((diffValue*diffValue));
    console.log(bombsArray);

    //ROW CREATION
    for(let i=0; i<diffValue; i++){
        let newRow = document.createElement('div');
        newRow.classList.add("everything-center");
        grid.appendChild(newRow);

        //COLUMN CREATION
        for(let j=0; j<diffValue; j++){
            let newCol = document.createElement('div');
            newCol.classList.add("basic", "everything-center", "standard-square");
            
            let z = ((i+1)*diffValue)-(diffValue-(j+1));
            newCol.textContent = z;

            if(bombsArray.includes(z)){
                newCol.classList.add("hidden-bomb");
            }

            bombSort(bombsArray, z, newCol);
            newRow.appendChild(newCol);
        }
    }
}

//GENERATES AN ARRAY OF 16 ELEMENTS WITH NO REPETITIONS WITHIN ITSELF.
function bombGen (valueMax){
    let array = [];
    let randomNumber;
    let i = 0;

    do{
        randomNumber = Math.floor(Math.random() * valueMax) +1;

        if(!array.includes(randomNumber)){
            array[i]=randomNumber;
            i++;
        }
    }while(i<16);

    return array;
}

//USER CLICKS ON BOMB
function bombClick (){
    //ALL BOMBS GET REVEALED UPON CLICKING
    let allBombs = document.getElementsByClassName('hidden-bomb');
    for(let i = 0; i<allBombs.length; i++){
        allBombs[i].classList.toggle("basic");
        allBombs[i].classList.toggle("danger");
    }
    
    //SQUARES ARE NOT CLICKABLE ANYMORE UPON CLICKING A BOMB
    let allSquares = document.getElementsByClassName('standard-square');
    for(let i = 0; i<allSquares.length; i++){
        allSquares[i].removeEventListener('click', bombClick);
        allSquares[i].removeEventListener('click', safeClick);
    }
}

//USER CLICKS ON SAFE SPOT
function safeClick (){
    this.classList.toggle("safe");
    this.classList.toggle("basic");
}

//DISTINGUISHES CLICKING ON A BOMB FROM CLICKING ON A SAFE SPOT.
function bombSort (array, index, square){
    //USER CLICKS ON BOMB
    if(array.includes(index)){
        square.addEventListener('click', bombClick);
    }
    //USER CLICKS ON SAFE SQUARE
    else{
        square.addEventListener('click', safeClick);
    }
}