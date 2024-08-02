import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import InitialPage from './InitialPage'
import LoginPage from './LoginPage'
import TaskPage from './TaskPage'
import ViewPage from './ViewPage'

const Navbar = () => (
    <Router>
        <>
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <div className="container">
                    <a href="#" className="navbar-brand">敏捷看板</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navmenu">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/init" className="nav-link">主页</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">登录界面</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/tasks" className="nav-link">任务界面</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/views" className="nav-link">视图界面</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                <Routes>
                    <Route path="/init" element={<InitialPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/tasks" element={<TaskPage />} />
                    <Route path="/views" element={<ViewPage />} />
                </Routes>
            </div>
        </>
    </ Router>
)
export default Navbar