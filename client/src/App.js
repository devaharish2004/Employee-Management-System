import './App.css';
import {useState} from 'react';
import Axios from 'axios';

function App() {

  
  const[name,setName] = useState("");
  const[age,setAge] = useState(0);
  const[country,setCountry] = useState("");
  const[department,setDepartment] = useState("");
  const[role,setRole] = useState("");
  const[salary,setSalary] = useState(0);

  const[employeeList,setEmployeeList] = useState([]);

  const addemployee = () => {
    Axios.post("http://localhost:3001/addemployee",{
      name:name,
      age:age,
      country:country,
      department:department,
      role:role,
      salary:salary,
    }).then(()=>{
      alert("Added! Click the Show employees Button to view all the Employees");
      setName("");
      setAge(0);
      setCountry("");
      setDepartment("");
      setRole("");
      setSalary(0);
    })
  };

  const getemployee = () => {
    Axios.get("http://localhost:3001/getemployee").then((response)=>{
      setEmployeeList(response.data);
    })
  }

  const deleteEmployee = (id) => {             
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
        setEmployeeList(employeeList.filter((val)=>{
          return(val.id != id);
        }))
    })
  }




  return (
    <div className="App bg-gradient-to-r from-pink-500 via-purple-600 to-pink-700">
      <div className="title bg-gradient-to-r from-pink-500 via-purple-600 to-pink-700 text-slate-50 pt-4 lg:text-xl text-lg">
        Employee Management System - Created by Devaharish M
      </div>


      <div className="information flex flex-col mt-12 gap-8 lg:gap-12 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-700">
        
        <div classname = "information_div">
        <label className='mr-4'>Name : </label>
        <input type = "text" placeholder = "Name" value={name} onChange={(event)=>{
          setName(event.target.value);
        }}/>
        </div>
        
        <div classname = "information_div">
        <label className="mr-8">Age : </label>
        <input type = "number" placeholder = "Age (in numbers)" value = {age} onChange={(event)=>{
          setAge(event.target.value);
        }}/>
        </div>
        
        <div classname = "information_div">
        <label className='mr-2'>Country : </label>
        <input type = "text" placeholder = "Country" value = {country} onChange={(event)=>{
          setCountry(event.target.value);
        }}/>
        </div>
        
        <div classname = "information_div">
        <label>Department : </label>
        <input type = "text" placeholder = "Department" value = {department} onChange={(event)=>{
          setDepartment(event.target.value);
        }}/>
        </div>
        
        <div classname = "information_div">
        <label className='mr-8'>Role : </label>
        <input type = "text" placeholder = "Role" value = {role} onChange={(event)=>{
          setRole(event.target.value);
        }}/>
        </div>
        
        <div classname = "information_div">
        <label className='mr-4'>Salary : </label>
        <input type = "number" placeholder = "Salary (in numbers)" value = {salary} onChange={(event)=>{
          setSalary(event.target.value);
        }}/>
        </div>
        
        <button type = "submit" className= "bg-blue-700 hover:bg-blue-800 w-48 pt-4 pb-4 rounded lg:mt-4 mt-12" onClick={addemployee}>Add Employee</button>
        <button type = "submit" className= "bg-blue-700 hover:bg-blue-800 w-48 pt-4 pb-4 rounded lg:mt-4 mt-12" onClick={getemployee}>Show all Employees</button>

      </div>

      <div>
      {employeeList.map((val,key)=>{           
        return( 
        <div className='employeediv mt-28 bg-slate-900 text-slate-50 pb-4 pt-4 ml-12 mr-12 lg:ml:48 lg:mr-12'>
          <div>
          <h3>Name : {val.name}</h3>
          <h3>Age : {val.age}</h3>
          <h3>Country : {val.country}</h3>
          <h3>Department : {val.department}</h3>
          <h3>Role : {val.role}</h3>
          <h3>Salary : {val.salary}</h3>
          </div>
          <div className='mt-4'>
            <button type = "submit" className= "bg-blue-700 hover:bg-blue-800 w-48 pt-4 pb-4 rounded" onClick={()=>{deleteEmployee(val.id)}}>Delete</button>
          </div>
        </div> 
        )
      })}
      </div>

    </div>
  );
}

export default App;
