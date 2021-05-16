/**
* Solicita o nome do cliente
*/


const nameInput = (name) => {  
  if(!name){
    const nameElement = document.getElementById('name');
    nameElement.innerHTML=name;    
  }
};

const nameButtonElement = document.getElementById('nameButton');
const nameInputElement = document.getElementById('nameInput');

nameButtonElement.addEventListener('click',() => {
  const name = nameInputElement.value;
  nameInput(name);

  const remove = document.getElementById('nameScreen');  
  document.body.removeChild(remove);// Remove a tela inicial que solicita o nome
})



/**
* COLETANDO BOTÕES
*/

const buttonClassLineElement = document.getElementsByClassName('number');
const buttonClassLineElementArray = Array.from(buttonClassLineElement);
var valueTotal = 0;
let value = [];
buttonClassLineElementArray.forEach((button) => {   
  button.addEventListener('click',()=>{    
    value.push(button.innerText);    //Pega valor do butão
    valueTotal = concatArrayValue(value);    //Concatena todos valores
    valueTotal = parseFloat(valueTotal); //Transforma em Number
    setValue(valueTotal); // SETANDO VALOR FRONT-END    
  });
});

/**
* UNINDO VALORES DOS BOTÕES
*/

concatArrayValue = (value) => { 
  const total = value.join(''); // JUNTA TODOS VALORES DO ARRAY
  return total;
};

/**
* CONFIGURANDO BOTÃO 'LIMPAR'
*/

const clearElement = document.getElementById('clear');

//LIMPA O VALORTOTAL E O ARRAY DE AGRUPAMENTO
clearElement.addEventListener('click',() => {
  valueTotal = null;
  value = [];
  setValue(valueTotal);// SETA VALOR = 0 NO FRONT-END
  withdrawElement.innerText = ' '; 
});

/**
* SETAR VALOR NO FRONT-END
*/
const valueInputElement = document.getElementById("valueInput");
setValue = (value) =>{
  valueInputElement.value = valueTotal;
}

/**
  -CONFIGURANDO BOTÃO 'COMFIRMAR'
  -LÓGICA DO PROGRAMA
  -SETANDO RESULTADO NO FRONT-END
*/

const confirm = document.getElementById('confirm');
confirm.addEventListener('click',() => {
  //CRIADO UM OBJ DE OBJETOS PARA AS NOTAS
  //AMOUNTNOTES - QUANTIDADE DE NOTAS
  //OVERNOTES - SOBRA DO TOTAL
  const notes = {
    Total: valueTotal,
    notes100: {
      amountNotes : 0,
      overNotes: 0
    },
    notes50: {
      amountNotes : 0,
      overNotes: 0
    },
    notes20: {
      amountNotes : 0,
      overNotes: 0
    },
    notes10: {
      amountNotes : 0,
      overNotes: 0
    }
  }
  notesValid = true;  // validação da entrada com saida
  notes.notes100 = amountNotes(notes.Total,100,notesValid);
  notes.notes50 = amountNotes(notes.notes100.overNotes,50,notesValid);
  notes.notes20 = amountNotes(notes.notes50.overNotes,20,notesValid);
  notes.notes10 = amountNotes(notes.notes20.overNotes,10, notesValid); 
  
  if(notes.notes10.notesValid){
    withdrawNotes(notes);
  }
});

//RETORNA QUANTIDADE DE NOTAS E SOBRA DO TOTAL
function amountNotes(value, notes, notesValid){
  var amountNotes = parseInt(value/notes);
  var overNotes = parseInt(value%notes);

  //CASO SOBRAR DINHEIRO É PQ O VALOR É INDISPONÍVEL
  // PARA RETIRADA
  if(notes == 10){ 
    if(overNotes != 0){
      alert('Erro de notas indisponíveis');      
      notesValid = false;
    }
  }
  
  return {
    amountNotes: amountNotes,
    overNotes: overNotes,
    notesValid: notesValid
  }
}

//-SETANDO RESULTADO NO FRONT-END
const withdrawElement = document.getElementById("withdraw");

//CRIA STRING COM TODAS AS NOTAS PARA EXIBIÇÃO
function withdrawNotes(notes){ 
  var stringNotes = '';

  stringNotes = drawNotes(stringNotes,notes.notes100.amountNotes,100);
  stringNotes = drawNotes(stringNotes,notes.notes50.amountNotes,50);
  stringNotes = drawNotes(stringNotes,notes.notes20.amountNotes,20);
  stringNotes = drawNotes(stringNotes,notes.notes10.amountNotes,10);

  //AJUSTE FINO PARA RETIRAR ',' DO FINAL  
  const stringNotesModulated = stringNotes.substring(0,stringNotes.length-2);  
  withdrawElement.innerText = stringNotesModulated;

  //ARRAY COM NOTAS PARA FUTUROS UPDATES
  const ArrayNotes = stringNotesModulated.split(', ');  
}

// CONCATENA AS NOTAS EM UMA STRING PARA EXIBIÇÃO
drawNotes = (String, notes, value) =>{
  var count = 0;
  while(count < notes){
    count ++;
    String = String + `$ ${value}, `;
  }

  return String;
}