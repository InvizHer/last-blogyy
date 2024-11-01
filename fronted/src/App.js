import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PostEditor from './pages/PostEditor';
import PostView from './pages/PostView';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/editor" element={
              <PrivateRoute>
                <PostEditor />
              </PrivateRoute>
            } />
            <Route path="/editor/:id" element={
              <PrivateRoute>
                <PostEditor />
              </PrivateRoute>
            } />
            <Route path="/post/:slug" element={<PostView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
