import taskService from "../services/tasks"

const ModifyTaskStatusDialog = ({ isOpen, onClose, task, getAllProjectTasks }) => {
    // 修改任务状态
    const onClick = async () => {    
        // 向后端申请修改任务状态
        try {
            const params = {
                id: task.id
            }
            const body = {
                status: !task.status
            }
            console.log(task);
            
            await taskService.update(params, body)
            alert('成功')
            getAllProjectTasks()
        } catch (exception) {
            console.log(exception);
            if (exception.response.status === 400)
                alert('密钥缺失或错误')
            else if (exception.response.status === 401)
                alert('密钥过期')
        }
    }

    return (
        <>
            <div className="modal fade text-dark" id={"finishTask-" + task.id} tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={"finishTaskLabel-" + task.id}>是否修改任务状态(完成/未完成)</h5>
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
export default ModifyTaskStatusDialog