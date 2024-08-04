import taskService from "../services/tasks"

const DeleteTaskDialog = ({ isOpen, onClose, task, getAllProjectTasks }) => {
    // 提交删除任务申请
    const onClick = async () => {
        // 向后端申请删除一个项目的任务
        try {
            const params = {
                id: task.id
            }
            await taskService.deleteTask(params)
            alert('成功')
            getAllProjectTasks()
        } catch (exception) {
            if (exception.response.status === 400)
                alert('密钥缺失或错误')
            else if (exception.response.status === 401)
                alert('密钥过期')
        }
    }

    return (
        <>
            <div className="modal fade text-dark" id={"deleteTask-" + task.id} tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={"deleteTaskLabel-" + task.id}>是否删除该任务</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={onClick} data-bs-dismiss="modal">确认</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DeleteTaskDialog