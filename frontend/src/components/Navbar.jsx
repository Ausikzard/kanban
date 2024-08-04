import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import MainPage from './MainPage'
import TaskPage from './TaskPage'
import ViewPage from './ViewPage'

const Navbar = ({ user, setLoggingUser }) => {
    const userBar = () => {
        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <div className="container">
                    <a href="#" className="navbar-brand">{user.username}, 欢迎使用看板</a>
                    <Link
                        to="/"
                        className="btn btn-primary btn-sm "
                        onClick={() => setLoggingUser(null)}
                    >
                        退出账号
                    </Link>
                </div>
            </nav>
        )
    }

    return (
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
                                    <Link to="/" className="nav-link">主页</Link>
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
                {user !== null && userBar()}
                <div>
                    <Routes>
                        <Route path="/" element={<MainPage setLoggingUser={setLoggingUser}/>} />
                        <Route path="/tasks" element={<TaskPage user={user} setLoggingUser={setLoggingUser}/>} />
                        <Route path="/views" element={<ViewPage user={user} />} />
                    </Routes>
                </div>
            </>
        </ Router>
    )
}



export default Navbar