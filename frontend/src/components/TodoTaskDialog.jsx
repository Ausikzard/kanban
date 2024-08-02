import { useState } from "react"

const TodoTaskDialog = ({ isOpen, onClose }) => {
    const [content, setContent] = useState('')
    const [ddl, setDDL] = useState('')
    const [important, setImportant] = useState('')


    return (
        <div className="modal fade text-dark" id="createTask" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createTaskLabel">创建一个新任务</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="taskForm ">
                            <div className="input-content d-flex full-width my-2">
                                <label htmlFor="content" className="me-3 col-sm-3 text-strat">内容: </label>
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
                                <label htmlFor="ddl" className="me-3 col-sm-3 text-strat">ddl: </label>
                                <input
                                    type="date"
                                    className="form-control w-50"
                                    id="ddl"
                                    value={ddl}
                                    onChange={({ target }) => setDDL(target.value)}
                                />
                            </div>
                            <div className="input-important d-flex full-width my-2">
                                <label htmlFor="important" className="me-3 col-sm-3 text-strat">重要性: </label>
                                <select id="exampleSelect" class="form-select w-50">
                                    <option value="option1">选项 1</option>
                                    <option value="option2">选项 2</option>
                                    <option value="option3">选项 3</option>
                                    <option value="option4">选项 4</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                        <button type="button" className="btn btn-primary">保存更改</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TodoTaskDialog