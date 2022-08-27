import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import PostProvider from './contexts/PostContext';

function App() {
    return (
        <AuthProvider>
            <PostProvider>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Landing />} />
                        <Route exact path="/login" element={<Auth authRoute="login" />} />
                        <Route exact path="/register" element={<Auth authRoute="register" />} />
                        <Route exact path="/dashboard" element={<ProtectedRoute />}>
                            <Route exact path="/dashboard" element={<Dashboard />} />
                        </Route>
                        <Route exact path="/about" element={<ProtectedRoute />}>
                            <Route exact path="/about" element={<About />} />
                        </Route>
                    </Routes>
                </Router>
            </PostProvider>
        </AuthProvider>
    );
}

export default App;
