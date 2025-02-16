var rgb = [255, 0 ,0];
var button_color_selection = false;

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}



function select_color_table()
{
  var table = document.getElementById("color_table"),rIndex;
  var startindex = 2;
  //f_row.style.backgroundColor = "red";
  for(var i = startindex; i < table.rows.length; i++)
  {
    table.rows[i].onclick = function()
    {
        document.getElementById("delete_color").style.color = "red";
        document.getElementById("delete_color").disabled = false;
        document.getElementById("update_color").disabled = false;
        for(var i = startindex; i < table.rows.length; i++)
          {
            var css = '#color_table tr:not(:nth-child(-n+2)):hover';
            table.rows[i].style = css;
          }
        this.style.backgroundColor = "#ddd";

    
        rIndex = this.rowIndex;
        console.log(rIndex);
        document.getElementById("row_id").innerHTML = rIndex;
        document.getElementById("color_name").value = this.cells[0].innerHTML;
        var R = parseInt(this.cells[1].innerHTML);
        var G = parseInt(this.cells[2].innerHTML);
        var B = parseInt(this.cells[3].innerHTML);
    
        var hex = rgbToHex(R,G,B);
        document.getElementById("color_adder").value = hex;
      }
  }
}


function hexTorgb(hex) 
{
  return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}


function getRGBColor()
{
    var hex = document.getElementById("color_adder").value;
    rgb = hexTorgb(hex);
}

function startsWithNumber(str) {
  return /^\d/.test(str);
}

function addColor()
{
  getRGBColor();

  var name = document.getElementById("color_name").value;
  name = name.trim();
  name = name.replace(/\s/g, '');
  if(name == "")
  {
    document.getElementById("color_info").innerHTML = "Name cannot be empty";
    return;
  }
  else if(startsWithNumber(name))
  {
    document.getElementById("color_info").innerHTML = "Name cannot start with a number";
    return;
  }
  else if(name.includes("_MyButton"))
  {
    document.getElementById("color_info").innerHTML = "Name cannot contain _MyButton";
    return;
  }
  else
  {
    document.getElementById("color_info").innerHTML = "";
  }

  var table = document.getElementById("color_table");
  
  for (var i = 1, row; row = table.rows[i]; i++) 
  {
    var col_name = row.innerText;
    col_name = col_name.split("\t");
    if(name == col_name[0])
    {
      document.getElementById("color_info").innerHTML = "Name already exists";
      return;
    }
 }
 

  var row = table.insertRow();

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  
  var cell_color = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
  cell1.innerHTML = name;
  cell2.innerHTML = rgb[0];
  cell3.innerHTML = rgb[1];
  cell4.innerHTML = rgb[2];
  cell5.style.backgroundColor = cell_color;

  reset();
}

function reset()
{
  document.getElementById("color_adder").value = "#ff0000";
  document.getElementById("color_name").value = "";
  document.getElementById("update_color").disabled = true;
  
  document.getElementById("delete_color").style.color = "rgb(182, 182, 182)";
  document.getElementById("delete_color").disabled = true;

  var table = document.getElementById("color_table"),rIndex;
  for(var i = 2; i < table.rows.length; i++)
  {
      var css = '#color_table tr:not(:nth-child(-n+2)):hover';
      table.rows[i].style = css;
  }
  document.getElementById("color_info").innerHTML = "";

  //update_color_button_table();
  //document.getElementById("add_color_button").style.display="none";

}

function delete_color()
{
  var name = document.getElementById("color_name");
  var col_select = document.getElementById("color_select");
  if(col_select.value === name.value)
    col_select.value = "random";

  var row_id = parseInt(document.getElementById("row_id").innerHTML);
  document.getElementById("color_table").deleteRow(row_id);
  reset();
}

function update_color()
{
    var table = document.getElementById("color_table");
    var row_id = parseInt(document.getElementById("row_id").innerHTML);

  
    table.rows[row_id].cells[0].innerHTML = document.getElementById("color_name").value;
    getRGBColor();
    table.rows[row_id].cells[1].innerHTML = rgb[0];
    table.rows[row_id].cells[2].innerHTML = rgb[1];
    table.rows[row_id].cells[3].innerHTML = rgb[2];

    var cell_color = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    table.rows[row_id].cells[4].style.backgroundColor = cell_color;
    reset();
    

}