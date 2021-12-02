import React,{useState, useEffect} from 'react';
import { BiPlusCircle,BiX,BiEditAlt } from "react-icons/bi";
import {checklist} from '../checklist.png';

import './Todo.css';

const getLocalData = () =>{
const lists=localStorage.getItem("mylist");
if(lists){
    return JSON.parse(lists);
}
else{
    return [];
}
}

const Todo = () => {
    const[InputData,setInputData] = useState("");
    const [Items,setItems]=useState(getLocalData());
    const [Edit, setEdit] = useState("");
    const [Toggle,setToggle]=useState(false);


    const addItems = ()=>
    {
        if(!InputData)
        {
alert("Todo is empty!");
        }
        else if(InputData && Toggle)
        {
            setItems(Items.map((curElem) => {
                if(curElem.id === Edit){
                    return {...curElem, name:InputData}
                }
                return curElem;
            }));

            setInputData("");
            setEdit("");
            setToggle(false);
        }
    else{
        const myInput={
            id : new Date().getTime().toString(),
            name:InputData,
        };
        setItems([...Items, myInput])
        setInputData("");
    }
};


const deleteItems =(index) =>{
    const updatedItems = Items.filter((curElem) => {
        return curElem.id !== index;
    });
    setItems(updatedItems);
};


const removeAll = ()=>
{
setItems([]);
};

const editItems= (index) =>{
const edit_todo_items = Items.find((curElem)=>{
    return curElem.id === index;
})
setInputData(edit_todo_items.name);
setEdit(index);
setToggle(true);
}

useEffect(() => {
    localStorage.setItem("mylist",JSON.stringify(Items))
                } ,[Items]);



    return (
        <div className="main_div">
            <div className="child_div">
        <figure>
        <img src={checklist} alt="todolist" />
            <h3>Todo List</h3>
        </figure>

            <div className="addItems">
             <input className="form_controls" type="text" placeholder="Add Items 📝"
             value={InputData } onChange={(event) => setInputData(event.target.value)}/>

             {Toggle ? (<BiEditAlt className="edit-btnn" onClick={addItems}/>) :
             (< BiPlusCircle className="add-btnn" onClick={addItems}/>)}
            </div>

<div className="showItems">

        {
            Items.map(( curElem) => {
                return (
                    <div className="eachItems" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="todo-btn">
                    <BiEditAlt className="edit-btn" onClick={()=> editItems(curElem.id)}/>

                    <BiX className="del-btn" onClick={() => deleteItems(curElem.id)}/>

                   </div>
                </div>
                );
            })}

            </div>

        <div className="show">
            <button className="btn" data-sm-link-text="Remove All" onClick={removeAll}> <span>Clear List</span></button>
        </div>

        </div>
        </div>

    );
};

export default Todo;

