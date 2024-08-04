import { useState} from "react"
import taskService from "../services/tasks"

const UpdateTaskDialog = ({ isOpen, onClose, task, getAllProjectTasks }) => {
    const [content, setContent] = useState(task.content)
    const [ddl, setDDL] = useState(task.ddl)

    // 提交任务申请
    const onClick = async () => {
        // 向后端申请一个项目的任务
        try {
            const params = {
                id: task.id
            }
            const body = {
                content: content,
                ddl: ddl
            }
            const data = await taskService.update(params, body)
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
            <div className="modal fade text-dark" id={"updateTask-" + task.id} tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={"updateTaskLabel-" + task.id}>修改一个任务</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="taskForm ">
                                <div className="input-content d-flex full-width my-2">
                                    <label htmlFor="content" className="me-3 col-sm-3 text-strat">任务内容: </label>
                                    <input
                                        type="text"
                                        className="form-control w-50"
                                        id="content"
                                        placeholder="请输入内容"
                                        value={content}
                                        onChange={({ target }) => setContent(target.value)}
                                    />
                                </div>
                                <div className="input-ddl d-flex full-width my-2">
                                    <label htmlFor="ddl" className="me-3 col-sm-3 text-strat">截止日期: </label>
                                    <input
                                        type="datetime-local"
                                        className="form-control w-50"
                                        id="ddl"
                                        value={ddl}
                                        onChange={({ target }) => setDDL(target.value)}
                                    />
                                </div>
                            </form>
                            <div className="input-attachment d-flex full-width my-2">
                                <form action="/api/files/upload" method="post" encType="multipart/form-data">
                                    <input type="file" name="attachment" />
                                    <button type="submit">上传文件</button>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                            <button type="button" className="btn btn-primary" onClick={onClick}>提交</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateTaskDialog