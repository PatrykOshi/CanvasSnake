

function remove(){
    var element = document.getElementById("howManyGlasses").value;
    var x = parseInt(element);

    if(x == 0){
        document.getElementById("howManyGlasses").innerHTML = "0";
    }
    else{
        x --;
        document.getElementById("howManyGlasses").innerHTML = (x);
    }
}

function add(){
    var element = document.getElementById("howManyGlasses").value;
    var x = parseInt(element);

    x++;
    document.getElementById("howManyGlasses").innerHTML = (x);

}