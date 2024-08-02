import TodoTaskDialog from "./TodoTaskDialog"

const TodoTasks = ({ user }) => {
    return (
        <>
            <div className="card-title text-center">
                todo
            </div>
            <div className="text-center">
                <button className="btn btn-primary btn-sm mb-2" data-bs-toggle="modal" data-bs-target="#createTask">
                    创建一个任务
                </button>
                <TodoTaskDialog />
            </div>
            <div className="card-text text-center">
                你可以通过点击按钮来创建个性化的任务
            </div>
        </>
    )
}
export default TodoTasks