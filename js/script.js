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

            bombSort(bombsArray, z, newCol);
            newRow.appendChild(newCol);
        }
    }
}

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

function bombSort (array, index, square){
    if(array.includes(index)){
        square.addEventListener('click', function(){
            square.classList.toggle("danger");
            console.log('BOOM!');
        })
    }
    else{        
        square.addEventListener('click', function(){
            square.classList.toggle("safe");
            console.log('No boom.');
        })
    }
}