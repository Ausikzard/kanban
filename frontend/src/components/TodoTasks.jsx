import CreateProjectDialog from "./CreateProjectDialog"

const TodoTasks = ({ user, getAllProjects}) => {
    return (
        <>
            <div className="card-title text-center">
                todo
            </div>
            <div className="text-center">
                <button className="btn btn-primary btn-sm mb-2" data-bs-toggle="modal" data-bs-target="#createProject">
                    创建一个项目
                </button>
                <CreateProjectDialog user={user} getAllProjects={getAllProjects}/>
            </div>
            <div className="card-text text-center">
                你可以通过点击按钮来创建个性化的项目,并在项目中分配各种各样的任务
            </div>
        </>
    )
}
export default TodoTasks