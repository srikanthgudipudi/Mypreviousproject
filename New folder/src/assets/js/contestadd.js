  
  
  
  function addFields(){ 
            var number = document.getElementById("winnersselect").value;
            var container = document.getElementById("container");
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            for (i=1;i<=number;i++){
               
                if(i==1)
                container.appendChild(document.createTextNode(i+"st Prize "));
                
                else if(i==2)
                 container.appendChild(document.createTextNode(i+"nd Prize "));
                 else if(i==3)
                 container.appendChild(document.createTextNode(i+"rd Prize "));
                 else if(i>=4)
                 container.appendChild(document.createTextNode(i+"th Prize "));
                var input = document.createElement("input");
                input.type = "text";
                input.className = "form-control";
                
                input.id="prizeId"+i;
                input.name="prizes[]"
           container.appendChild(input);
                container.appendChild(document.createElement("br"));
            }
        }