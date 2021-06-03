import React, {useState, useEffect} from 'react';
import './App.css';


export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [activeItem, setActiveItem] = useState({
    id:null, 
    title:'',
    completed:false,
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchTasks()
  }, []);

  const fetchTasks = () => {
    console.log('Fetching...')

    fetch('http://127.0.0.1:8000/api/task-list/')
    .then(response => response.json())
    .then(data => 
      setTodoList(data)
      );
  }

    return(
        <div className="container">

          <div id="task-container">
              <div  id="form-wrapper">
                 <form id="form">
                    <div className="flex-wrapper">
                        <div style={{flex: 6}}>
                            <input  className="form-control" id="title" value={activeItem.title} type="text" name="title" placeholder="Add task.." />
                         </div>

                         <div style={{flex: 1}}>
                            <button id="submit" className="btn" type="submit" name="Add">Submit</button>
                          </div>
                      </div>
                </form>
             
              </div>

              <div  id="list-wrapper">         
                    {todoList.map(function(task, index){
                      return(
                          <div key={index} className="task-wrapper flex-wrapper">

                            <div style={{flex:7}}>

                                {task.completed === false ? (
                                    <span>{task.title}</span>

                                  ) : (

                                    <strike>{task.title}</strike>
                                  )}
  
                            </div>

                            

                          </div>
                        )
                    })}
              </div>
          </div>
          
        </div>
      )        
}