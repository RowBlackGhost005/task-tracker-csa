import React from 'react';

import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';

import { TaskProvider } from './context/TaskContext';

import CreateTaskPage from './pages/CreateTaskPage';
import TaskListPage from './pages/TaskListPage';
import TaskDetailsPage from './pages/TaskDetailPage';
import Header from './components/Header';

function App() {
  return (

    <main>
      <TaskProvider>
        <Router>

          <Header/>

          <Routes>
            <Route path='/' element={<TaskListPage/>}/>
            <Route path='/create' element={<CreateTaskPage/>}/>
            <Route path="/task/:id" element={<TaskDetailsPage />} />
          </Routes>

        </Router>
      </TaskProvider>
    </main>
  );
}

export default App;
