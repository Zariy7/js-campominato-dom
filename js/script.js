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
        newRow.classList.add("d-flex", "align-items-center", "justify-content-center");
        grid.appendChild(newRow);

        //COLUMN CREATION
        for(let j=0; j<diffValue; j++){
            let newCol = document.createElement('div');
            newCol.classList.add("custom-col", "d-flex", "align-items-center", "justify-content-center", "mx-1", "my-1");
            newCol.textContent = ((i+1)*diffValue)-(diffValue-(j+1));
            newRow.appendChild(newCol);
        
            //FIRST BONUS
            newCol.addEventListener('click', function(){
                newCol.classList.toggle("clicked-col");
                newCol.classList.toggle("custom-col");
                console.log(newCol.textContent);
            })
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