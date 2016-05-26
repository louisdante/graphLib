// Add your JavaScript below!

// Global variables
var chartColors = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#4472C4', '#70AD47', '#1F4E79', '#843C0C', '#525252', '#7F6000'];

var chartData = [];
var chartLabels = [];

// This function puts the data input values into the chartData array
var collectData = function(){
    chartData = [];
    
    // This part puts the native input value into the array
    var firstInputValue = document.getElementById('input0').value;
    
    chartData.push(firstInputValue);
    
    var childsNr = document.getElementById('extraInputs').childNodes;
    
    for (var a = 0; a < childsNr.length; a++) { 
        
        // This part give the additional inputs an unique id
        var inputArea = document.getElementById('extraInputs');
        var inputDiv = inputArea.children[a];
        var inputElement = inputDiv.children[1];
        var inputId = 'input' + (a+1);
        
        inputElement.id = inputId;
                
        // This part puts addition input values in the array
        var inputValue = document.getElementById(inputId).value;
        
        chartData.push(inputValue);
    }
}; 

// This function puts the data name input values into the chartLabels array
var collectLabels = function(){
    chartLabels = [];
    
    // This part puts the native input value into the array
    var firstInputValue = document.getElementById('name0').value;
    
    chartLabels.push(firstInputValue);
    
    var childsNr = document.getElementById('extraInputs').childNodes;
    
    for (var b = 0; b < childsNr.length; b++) { 
        
        // This part give the additional inputs an unique id
        var inputArea = document.getElementById('extraInputs');
        var inputDiv = inputArea.children[b];
        var inputElement = inputDiv.children[0];
        var inputId = 'name' + (b+1);
        
        inputElement.id = inputId;
                
        // This part puts addition input values in the array
        var inputValue = document.getElementById(inputId).value;
        
        chartLabels.push(inputValue);
    }
};

// This function calculates the data total for the chart
function getTotal(){
    var myTotal = 0;
    for (var c = 0; c < chartData.length; c++) { 
        myTotal += +chartData[c];
    }
    return myTotal;
}

// This function calculates the length of the legend in the canvas
function legendLength(){
    var labels = 0;
    for (var d = 0; d < chartLabels.length; d++){
        labels += 20; 
    }
    return labels;
}

// This function creates the chart
var genChart = function() {
    collectLabels();
    collectData();
    
    for (var i = 0; i < chartData.length; i++) {
        var inputsID = 'input' + i;
        var namesID = 'name' + i;
        var inputs = document.getElementById(inputsID);
        var names = document.getElementById(namesID);
        if(inputs.value === '' || names.value === '' || isNaN(inputs.value)) {
            var canvas = document.getElementById('chartArea');
            var ctx = canvas.getContext("2d");
            
            ctx.clearRect(0,0, canvas.width, canvas.height);
            alert('Some of the inputs are not filled in correctly.');
            break;
        }
        
        else {
            var canvas = document.getElementById('chartArea');
            var ctx = canvas.getContext("2d");
            
            ctx.clearRect(0,0, canvas.width, canvas.height);
            
            // This part creates the pie chart
            var dataTotal = getTotal();
            var lastEnd = 1.5*Math.PI;
            
            for (var e = 0; e < chartData.length; e++) {
                ctx.fillStyle = chartColors[e];
                ctx.beginPath();
                ctx.moveTo(150, 150);
                ctx.arc(150, 150, 125, lastEnd, lastEnd+(Math.PI*2*(chartData[e]/dataTotal)),false);
                ctx.lineTo(150, 150);
                ctx.fill();
                ctx.lineWidth= 2;
                ctx.strokeStyle = '#FFFFFF';
                ctx.stroke();
                lastEnd += Math.PI*2*(chartData[e]/dataTotal);
            }
            
            // This part creates the legend    
            var labelStart = ((300 - legendLength())/2) + 5;
            
            for (var f = 0; f < chartLabels.length; f++) {
                ctx.fillStyle = chartColors[f];
                ctx.fillRect(350, labelStart, 10, 10);
                ctx.fillStyle = '#000000';
                ctx.fillText(chartLabels[f], 370, labelStart + 8);
                labelStart += 20;
            }
        }
    }
};

// This function clears the chartarea
var clearChart = function(){
    
    document.getElementById('max').innerHTML = null;
    
    // This part clears the chart canvas
    var canvas = document.getElementById('chartArea');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);
        
    // This part clears the extra inputs
    var inputArea = document.getElementById('extraInputs');
    inputArea.innerHTML = null;
    
    // This part clears all the arrays
    chartData = [];
    chartLabels = [];
    
    // This part clears the firstInput value to null
    var firstName = document.getElementById('name0');
    var firstData = document.getElementById('input0');
    firstName.value = null;
    firstData.value = null;
};

// This function adds extra input areas

var idnr = 0;

var add = function(){
    if (document.getElementById('extraInputs').childNodes.length < 9){
    
    document.getElementById('max').innerHTML = null;
    
    // This parts makes the unique id for the div
    idnr = idnr += 1;
    
    var divIdText = 'div';
    
    var divId = divIdText + idnr;


    // This part places a div
    var inputArea = document.getElementById('extraInputs');
    var div = document.createElement('div');
    div.id = divId;
    inputArea.appendChild(div);
    
    // This function adds the input and button in the div
    var inputs = function(){
        var place = document.getElementById(divId);

        // Name
        var inputName = document.createElement('input');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('class', 'names');
        inputName.setAttribute('placeholder', 'Data name');
        
        // Input
        var inputData = document.createElement('input');
        inputData.setAttribute('type', 'number');
        inputData.setAttribute('class', 'inputs');
        inputData.setAttribute('placeholder', 'Data');
        inputData.setAttribute('min', '0');
        
        // Button
        var del = document.createElement('button');
        del.setAttribute('onclick', 'del()');
        del.setAttribute('class', 'remove');
        del.innerHTML = 'X';
        
        place.appendChild(inputName);
        place.appendChild(inputData);
        place.appendChild(del);
    };

    inputs();
    }
    
    else {
        document.getElementById('max').innerHTML = '*Max. 10 data inputs';
        document.getElementById('add').setAttribute('disabled', 'true');
    }
};

// This function deletes the extra input
var del = function (){
    
    document.getElementById('max').innerHTML = null;
    document.getElementById('add').removeAttribute('disabled');
    
    // This part removes the input and button elements 
    var inputArea = document.getElementById('extraInputs');
    var child = event.target.parentNode;
    inputArea.removeChild(child); 
};