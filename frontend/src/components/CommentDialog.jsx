import { useState, useEffect } from "react"
import taskService from "../services/tasks"

const CommentDialog = ({ isOpen, onClose, task, getAllProjectTasks }) => {
    const [commentText, setCommentText] = useState('')
    // 提交评论任务申请
    const onClick = async () => {
        // 向后端申请评论一个项目的任务
        try {
            const params = {
                id: task.id
            }
            const body = {
                comments: task.comments.concat(commentText)
            }
            await taskService.update(params, body)
            setCommentText('')
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
            <div className="modal fade text-dark" id={"commentTask-" + task.id} tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={"commentTaskLabel-" + task.id}>任务评论</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {task.comments.map((comment, index) => <p className="modal-title" key={index}>{comment}</p>)}
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            <div className="input-content d-flex full-width my-2">
                                <label htmlFor="content" className="me-3 col-sm-3 text-strat">任务内容: </label>
                                <input
                                    type="text"
                                    className="form-control w-50"
                                    id="comment"
                                    placeholder="请输入内容"
                                    value={commentText}
                                    onChange={({ target }) => setCommentText(target.value)}
                                />
                                <button type="button" className="btn btn-primary" onClick={onClick}>提交评论</button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CommentDialog