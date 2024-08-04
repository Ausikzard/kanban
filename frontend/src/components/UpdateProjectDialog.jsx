import { useState, useEffect } from "react"
import projectService from "../services/projects"

const UpdateProjectDialog = ({ isOpen, onClose, project, getAllProjects}) => {
    const [title, setTitle] = useState(project.title)
    const [important, setImportant] = useState(project.important)

    // 提交任务申请
    const onClick = async () => {
        // 向后端申请一个项目的任务
        try {
            const params = {
                id: project.id
            }
            const body = {
                title,
                important
            }
            const data = await projectService.update(params, body)
            alert('成功')
            getAllProjects()
        } catch (exception) {
            if (exception.response.status === 400)
                alert('密钥缺失或错误')
            else if (exception.response.status === 401)
                alert('密钥过期')
        }
    }

    return (
        <>
            <div className="modal fade text-dark" id={"updateProject-" + project.id} tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={"updateProjectLabel-" + project.id}>修改一个项目</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="projectForm ">
                                <div className="input-title d-flex full-width my-2">
                                    <label htmlFor="title" className="me-3 col-sm-3 text-strat">项目名称: </label>
                                    <input
                                        type="text"
                                        className="form-control w-50"
                                        id="title"
                                        placeholder="请输入内容"
                                        value={title}
                                        onChange={({ target }) => setTitle(target.value)}
                                    />
                                </div>
                                <div className="input-important d-flex full-width my-2">
                                    <label htmlFor="important" className="me-3 col-sm-3 text-strat">重要性:(数字越大越重要)</label>
                                    <select id="important" className="form-select w-50" value={important} onChange={(event) => { setImportant(event.target.value) }}>
                                        <option value="">请选择...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
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
export default UpdateProjectDialog