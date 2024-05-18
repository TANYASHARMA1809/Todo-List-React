import React, { useState,useEffect } from 'react'
import './App.css'
//import { TodoProvider } from './contexts/TodoContext'
import { TodoForm, TodoItem } from './components';
import { TodoProvider } from './contexts';

function App() {

const [todos,setTodos]=useState([]);
//todos in useState is a array..holding all the todo
// we will use constructor..inside which we will use previous todo
const addTodo=(todo)=>{
    setTodos((prev)=>[{id: Date.now(), ...todo}, ...prev])
}
//phle previous array ki state lo..map lgaya,sari values ke liye..ab hr ek todo pr jao
const updatedTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id === id ? todo:prevTodo)))
    // or instead of above one..we can do this so 
    // prev.map((eachVal)=>{
    //     if(eachVal.id === id){
    //         todo
    //     }
    // })
}

const deleteTodo =(id)=>{
    setTodos((prev) => prev.filter((todo) => todo.id !== id ) )
    // filter..sari value lkr aao,sirf vo value na lo jiski id dere hai, jo jo match nhi krega vo aata jayega..upr wle statement k according
}

//window local storage..setItem and getItem..key:value pair..string format mai store hojati hia
//covert krna pdta hai using json
//konsa esa method hai jo query krskta hia local storage..ya function bnade or vo sari values lkr aao or todos mai add krdo
//this is useEffect method

const toggleComplete =(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=> prevTodo.id ===id ? {...prevTodo, completed: !prevTodo.completed}  :  prevTodo))
    //sare todo ko ...prev ki help se bula lia..fr completed ko overwrite krdia
}

useEffect(()=>{
    //localStorage ko directly render krskte hai
    //localStorage string mai value dega
    //JSON.parse is js methos used to convert into JSON
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length>0){
        setTodos(todos)
    }
},[])

useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
    
},[todos])

  return (
    <TodoProvider value={{todos,addTodo,updatedTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[url('https://images.unsplash.com/photo-1516617442634-75371039cb3a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] min-h-screen  py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-4xl font-bold text-center mb-8 mt-2 ">What is your main goal for today...set todos 😎</h1>
                    <div className="mb-4">
                       
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=> (
                            <div key={todo.id} className='w-full'>
                                
                                <TodoItem todo={todo}/>

                            </div>
                        ))}

                    </div>
                </div>
            </div>
            </TodoProvider>
  )
}

export default App
