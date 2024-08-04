import { useState, useEffect } from "react"
import taskService from "../services/tasks"

const DoingTaskDialog = ({ isOpen, onClose, project, getAllProjectTasks }) => {
    const [content, setContent] = useState('')
    const [ddl, setDDL] = useState('')

    // 提交任务申请
    const onClick = async () => {
        // 向后端申请一个项目的任务
        try {
            const taskObject = {
                content: content,
                ddl: new Date(ddl),
                projectId: project.id
            }
            await taskService.create(taskObject)
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
            <div className="modal fade text-dark" id={"createTask-" + project.id} tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={"createTaskLabel-" + project.id}>创建一个新任务</h5>
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
export default DoingTaskDialog