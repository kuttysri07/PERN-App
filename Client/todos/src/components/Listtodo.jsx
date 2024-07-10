
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Edittodo from './Edittodo';


const Listtodo = () => {

    const [todos,setTodos]=useState([])


    async function deleteTodo(id){
        try {
            const deleteTodo=await fetch(`http://localhost:5000/todos/${id}`,{
                method:"DELETE"
            });
           setTodos( todos.filter(todo=>{
                return (todo.todo_id !== id)
           }))
            console.log(deleteTodo);

        } catch (err) {
            console.log(err.message);
        }
    }


async function getTodos(){
    try {
        const response=await fetch("http://localhost:5000/todos");
        const jsonData= await response.json()
        setTodos(jsonData)
       
    } catch (err) {
        console.error(err.message);
    }

}

useEffect(()=>{
    getTodos()
},[])
console.log(todos)
  return (
    <div>
        <table className="table">
  <thead>
    <tr>
     
      <th scope="col">Description</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {todos.map(todo=>{
       return(
       <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td><Edittodo todo={todo}/></td>
            <td className='btn btn-danger' onClick={()=> deleteTodo(todo.todo_id)} >Delete</td>
      </tr>) 
    })}
  </tbody>
</table>
    </div>
  )
}

export default Listtodo