import axios from 'axios';

const exampleOne = () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  
  interface TODO {
    id: number;
    title: string;
    completed: boolean;
  }
  
  axios.get(url).then((response) => {
    const todo = response.data as TODO;
  
    const ID = todo.id;
    const title = todo.title;
    const finished = todo.completed;
  
    logTodo(ID, title, finished)
  })
  
  const logTodo = (ID: number, title: string, finished: boolean) => {
    console.log(`
      The Todo with ID: ${ID}
      has a title of: ${title}
      Is it finished: ${finished}
    `)
  }
}

exampleOne()
