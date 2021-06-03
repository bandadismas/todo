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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('ITEM:', activeItem)

    let url = 'http://127.0.0.1:8000/api/task-create/'

    if(editing === true){
      url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}/`
      setEditing(false);
    }

    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(activeItem)
    }).then((response)  => {
        fetchTasks();
        
        setActiveItem({
          id:null, 
          title:'',
          completed:false
        });
    }).catch(function(error){
      console.log('ERROR:', error)
    })
  }

  const handleChange = e => {
    var name = e.target.name
    var value = e.target.value
    console.log('Name:', name)
    console.log('Value:', value)

    setActiveItem({
        ...activeItem,
        title:value
    })
  }

    return(
        <div className="container">

          <div id="task-container">
              <div  id="form-wrapper">
                 <form id="form" onSubmit={handleSubmit}>
                    <div className="flex-wrapper">
                        <div style={{flex: 6}}>
                            <input onChange={handleChange} className="form-control" id="title" value={activeItem.title} type="text" name="title" placeholder="Add task.." />
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