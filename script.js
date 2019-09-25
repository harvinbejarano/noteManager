const ul = document.getElementById('list'),
      hide = document.getElementById('hide'),
      search = document.querySelector('header form input');


//****Add Note */
document.getElementById('add-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const inputText = document.getElementById('add-input');

   if (inputText.value !== '') {
        addRow(inputText.value);
        inputText.value = '';
    }
   
});

//****Edit,Remove Note */
ul.addEventListener('click',(e) => {

    if(e.target.classList[1] === 'fa-pencil-square-o'){
        const parentPar = e.target.parentNode,
                 input  = parentPar.nextElementSibling,
                 text  = parentPar.previousElementSibling;

        parentPar.style.display = "none";
        input.style.display = "block";
        input.value = text.textContent;

        input.addEventListener('keypress', (e)=>{
            if(e.keyCode === 13){
                if(input.value !== ''){
                    text.textContent = input.value;
                    input.style.display = "none";
                    parentPar.style.display = "block";
                }
                else{
                    const li = parentPar.parentNode;
                    li.parentNode.removeChild(li);
                }
            }
        });
    }

    if(e.target.classList[1] === 'fa-times'){
        const Li = e.target.parentNode.parentNode;
        const ul = Li.parentNode;
        ul.removeChild(Li);
    }
    
});

//****Hide Notes */
hide.addEventListener('click', (e)=>{
    const targetElement = e.target,
          label = targetElement.previousElementSibling;

    if(hide.checked){
        ul.style.display = 'none';
        label.textContent = 'Unhide notes';
    }
    else{
        ul.style.display = 'block';
        label.textContent = 'Hide notes';
    }
});

//****Search */
search.addEventListener('keyup',(e)=>{
   const searchChar = e.target.value.toUpperCase();
    const nodes = document.getElementsByTagName('li');
    
   Array.from(nodes).forEach(( item )=>{
       const parText = item.firstElementChild.textContent;
       if ( parText.toUpperCase().indexOf(searchChar) !== -1) { 
           item.style.display = 'block';
       }
       else {
        item.style.display = 'none';
       }
   });
   

});

function addRow(text){
    const p     = document.createElement('p'),
          pText = document.createTextNode(text),
          li    = document.createElement('li'),
          iAdd    = document.createElement('i'),
          iRemove = document.createElement('i'),
          icP     = document.createElement('p'),
          input = document.createElement('input');

    iAdd.className = "fa fa-pencil-square-o";
    iRemove.className= "fa fa-times";  
    input.classList.add('edit-note');

    p.appendChild(pText);
    li.appendChild(p);
    icP.appendChild(iAdd);
    icP.appendChild(iRemove);
    li.appendChild(icP)
    input.setAttribute('type','text');
    li.appendChild(input);
    ul.appendChild(li);
}


