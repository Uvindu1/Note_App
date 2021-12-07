//-------veriable----
var form = document.getElementById('add-frm');
var ntitel =document.getElementById('n-title');
var items =document.getElementById('items');
var nbody = document.getElementById('n-body');
var tableDiv = document.getElementById('tbl-div');
var search = document.getElementById('srch');
var reset =document.getElementById('reset');

var nodeCount = 0;
var newNode = '';
var isUpdate=false;
var record='';
var note='';
var body='';

//-----Event------
window.onload= updateTabel;
form.addEventListener('submit',addNode);
search.addEventListener('keyup',addSerch);
//node ekak remove kirima
items.addEventListener('click',rempveNode);
//node eka viwe and update
items.addEventListener('click',viweNUpdateNode);
//reset
reset.addEventListener('click',resetbtn);

//-----Function-----

//serch bar
function addSerch(e){
    //lowercase kirima
    var searchTxt = e.target.value.toLowerCase();
    
    //give the vaule 
    var list = items.getElementsByClassName('item');
    
    // convert to array in list (mehema karanna hethuwa list kiyana ekata avith thiyenne HTML collection ekaka eken weda karanna amaruii)
    var listArray = Array.from(list);
    
    //for Each loop ekaka gathhe array eke sema elimant ekkkatama adalawa anonimas(namak nethi function) ekak karala balanna
                    // mehi 'represent' kiyana perameeter eken karanne forEach loop eke ena eka eka elimant eka represent kirimaii
    listArray.forEach(function(represent){
        var nodeTitle = represent.firstChild.textContent;
        //match
        if(nodeTitle.toLowerCase().indexOf(searchTxt)!=-1){//mehi sidu karanne fast node eka lowercase karala indexOf ekn match karal gelapena ekak thibenam 1 out put eka weii.. match wena ekak neththam -1 out kara,mehi karanne -1 nowenam yannna 
            represent.style.display='';//thiyana eka penna
        } 
        else{
            represent.style.display='none';
        }
    }) 

}

//update tabale
function updateTabel(){
    if(nodeCount>0){
        tableDiv.style.display='';
        
            //update node
            if(isUpdate){//isUpdate kiyana eka ture the beluwa
                note.firstChild.textContent = ntitel.value;
                note.lastChild.textContent = nbody.value
                //reset update and note counteed
                isUpdate=false;
                nodeCount--;
            }
            //add new node
            else{
                items.appendChild(newNode);
            }
        }        
    else{
        tableDiv.style.display='none';
    }
}

//create node--
function addNode(e){
    //stop inetial beheviya
    e.preventDefault();
    //validetion
    if(ntitel.value =='' || nbody.value==''){
        alert("please enter the value");
    }
    else{
        //create the node
        //new tr
        var tr= document.createElement('tr');
        tr.className='item';

        //new tr for titel and bode
        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(ntitel.value));

        var span =document.createElement('span');
        span.className='note-body';
        span.appendChild(document.createTextNode(nbody.value));
        td1.appendChild(span);

        //new td for viwe button
        td2=document.createElement('td');
        td2.className='btcellv';
        var btn1 = document.createElement('button');
        btn1.appendChild(document.createTextNode('viwe'));
        btn1.setAttribute('id','vw');
        td2.appendChild(btn1);
        
        //create td3 for delete
        var td3=document.createElement('td');
        td3.className='btcelld';
        var btn2 =document.createElement('button');
        btn2.appendChild(document.createTextNode('Delrte'));
        btn2.setAttribute('id','del');
        td3.appendChild(btn2);
        console.log(td3);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        nodeCount++;
        newNode = tr;
        //update or insert node in tabale

        updateTabel();
    }
    //reset auto
    resetbtn();
}

//remove node in table
function rempveNode(e){
    if(e.target.id === 'del'){
        if(confirm('are you sure ?')){
        var removenode = e.target.parentElement.parentElement;
        items.removeChild(removenode);

        //update table
        nodeCount--;
        if(nodeCount==0){
            updateTabel();

        }
        }
    }
}

function viweNUpdateNode(e){
    if(e.target.id  ==='vw'){
        record =e.target.parentElement.parentElement;
        note = record.firstChild;
        ntitel.value=note.firstChild.textContent;
        nbody.value=note.lastChild.textContent;
        isUpdate=ture;
 

    }
}


function resetbtn(e){
    ntitel.value='';
    nbody.value='';
    isUpdate=false;
    newNode='';

}