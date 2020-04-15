var Employees = new Array();
var last_id = 0 ;
var msg  = "Inavlid values : \n"; 
var emp_id;
var index;
		
		function Update()
		{	
            var employee = validation();
            if ( msg == "Inavlid values : \n")
            {
                if (emp_id != "")
                {
                    employee.ID = emp_id;
                    document.getElementById(employee.ID).innerHTML = "<td> <input type = 'radio' name = 'selectedRow' value= "+employee.ID+" onchange= 'HighlightSelcetedRow()'>"+employee.Name+" </td> <td>"+employee.Birthdate+"</td>"; 
                    Employees[index] = employee; 
                    document.getElementById(employee.ID).style.background = 'black'; 
                    document.getElementById(employee.ID).style.color = 'RosyBrown';                
                }
                else
                {
                    employee.ID = last_id ; 
                    last_id +=1;
                    Employees.push(employee);
                    document.getElementById('employeeList').innerHTML +=
                    "<tr id = "+employee.ID+"> <td> <input type = 'radio' name = 'selectedRow' value = "+employee.ID+" onchange= 'HighlightSelcetedRow()' >"+employee.Name+" </td> <td>"+employee.Birthdate+"</td></tr>";
                }
                
                let i = { Name:employee.Name, NationalID:employee.NationalID, Height:employee.Height, Weight:employee.Weight, Birthdate:employee.Birthdate};
                window.localStorage.setItem( employee.ID  , JSON.stringify(i)) ;
                ShowHideSection("mnPg"); 
            }
            else
            {
                alert (msg);
                msg = "Inavlid values : \n";
            }
        }	
	    

		function Read(id)
		{
            emp_id = id;
            for (var i=0; i<Employees.length; i++)
            {
                if (Employees[i].ID==id)
                {
                    index = i;
                return Employees[i];
                }
            }
		}


		function ShowHideSection(str)
		{
			var frm = document.getElementById('infoForm');
			var mainPg = document.getElementById('mainPage');
			if ( str == "Add")
			{
				frm.style.display = "block";
                mainPg.style.display = "none";
                document.getElementById('RowID').value = "";
                emp_id = "";
			}
            else if ( str == "mnPg")
			{
				frm.style.display = "none";
				mainPg.style.display = "block";
                frm.reset();
                var radios = document.getElementsByName('selectedRow');
                for (var i=0; i<radios.length; i++)
                {
                    radios[i].checked = false;
                    document.getElementById(radios[i].value).style.background = 'black';
                document.getElementById(radios[i].value).style.color = 'RosyBrown';
                }
                document.getElementById('edit_btn').hidden = true;
                    document.getElementById('delete_btn').hidden = true;
                document.getElementById('RowID').value = "";
                emp_id = "";
            }
            else
            {
                frm.style.display = "block";
                mainPg.style.display = "none";
                var employee = new Object();
                employee.ID = str ;
                employee = Read(employee.ID);
                document.getElementById('name').value = employee.Name;
                document.getElementById('natId').value = employee.NationalID;
                document.getElementById('height').value = employee.Height;
                document.getElementById('weight').value = employee.Weight;
                document.getElementById('bd').value = employee.Birthdate;
            }
		}


        function validation ()
        {
            var employee = new Object();
            if(document.getElementById('name').value.length <1 || document.getElementById('name').value.length >100)
				{ msg += "The length of name must be within (1-100) characters \n";}
			else
			employee.Name = document.getElementById('name').value;


		    if (document.getElementById('natId').value < 1 || document.getElementById('natId').value>1000000000)
				{ msg  += "The NationalID must be within range (1-1000000000) \n" ; }
			else
			{
                if (emp_id != "")
                {
                    var exist = true, check = true;
				for (var i=0; i<Employees.length-1; i++)
					{
				    if (Employees[i].ID==emp_id)
						{i++;}
				    if (Employees[i].NationalID == document.getElementById('natId').value)
				    {exist = false;
					msg  += "The NationalID is related with other employee \n";
					check = false;
					break;}
				    }
				    if (Employees[Employees.length-1].NationalID ==document.getElementById('natId').value 
				    	&& Employees[Employees.length-1].ID!=emp_id && check)
				    	{exist = false; 
					    msg  += "The NationalID is related with other employee \n";}
				if (exist)
				    employee.NationalID = document.getElementById('natId').value;
                }
                else
                {
                    var valid =true;
				for (var i=0; i<Employees.length; i++)
					{if (Employees[i].NationalID == document.getElementById('natId').value)
                    {msg += "The NationalID is related with other employee \n";
                    valid = false;
					break;}}
					if (valid)
                employee.NationalID = document.getElementById('natId').value;}
                }

		    if (document.getElementById('height').value <1 || document.getElementById('height').value>300)
			{msg += "The height must be within range (1-300)cm \n";}
		    else
			employee.Height = document.getElementById('height').value;

		    if (document.getElementById('weight').value<1 || document.getElementById('weight').value>400)
			{msg += "The weight must be within range (1-400)kg \n";}
		    else 
			employee.Weight = document.getElementById('weight').value;


		    if (document.getElementById('bd').value =="")
		    	{msg += "You must enter birthdate "; valid = false;}
		    else
		    { var today = new Date() , bd = new Date(document.getElementById('bd').value);

		        if (today.getFullYear() - bd.getFullYear() <18)
		    	   msg += "The age must be greater than or equal 18 years";
		        else
                 employee.Birthdate = document.getElementById('bd').value ; 
            }

            return employee;          
        }
        

        function Remove(id)
        {
            for (var i=0;i<Employees.length;i++)
            if (Employees[i].ID == id)
            {Employees.splice(i,1);
            document.getElementById(id).remove();
                break;} 
                localStorage.removeItem(id);
                if (Employees.length==0)
                {
                    document.getElementById('edit_btn').hidden = true;
                    document.getElementById('delete_btn').hidden = true;
                }
                document.getElementById('RowID').value="";
                emp_id = "";

        }


        function HighlightSelcetedRow()
        {
            var radios = document.getElementsByName('selectedRow');
            for (var i=0; i<radios.length; i++)
            {
                var row_ID = radios[i].value; 
                if (radios[i].checked)
                    {document.getElementById(row_ID).style.background = 'gray';
                    document.getElementById(row_ID).style.color = 'black';
                    document.getElementById('edit_btn').hidden = false;
                    document.getElementById('delete_btn').hidden = false;
                    document.getElementById('RowID').value = row_ID; 
                    }
                else
                {document.getElementById(row_ID).style.background = 'black';
                document.getElementById(row_ID).style.color = 'RosyBrown';}
            }
        }


        function GetEmployees()
        {
            var keys = Object.keys(localStorage);
            for ( var i=0; i<keys.length; i++)
            {
                if (keys[i] > last_id)
                last_id = keys[i];
               let emp = JSON.parse(localStorage.getItem(keys[i]));
               var e = new Object();
               e.ID = keys[i];
               e.Name = emp.Name;
               e.NationalID = emp.NationalID;
               e.Height = emp.Height;
               e.Weight = emp.Weight;
               e.Birthdate = emp.Birthdate;
               Employees.push(e);              
            }
            last_id +=1;
        }

        function FillList()
        {
            GetEmployees();
            for (var i=0; i<Employees.length; i++)
            {
                document.getElementById('employeeList').innerHTML +=
                "<tr id = "+Employees[i].ID+"> <td> <input type = 'radio' name = 'selectedRow' value = "+
                Employees[i].ID+" onchange= 'HighlightSelcetedRow()' >"+Employees[i].Name+" </td> <td>"+Employees[i].Birthdate+"</td></tr>";
            }
            
        }



