const TaskCalendar = ({ task }) => {
    console.log(task);


    if (task.status === true) {
        // 已完成的任务
        return (
            <div className="col-md mt-2 mb-2 ms-4 me-4">
                <div className="card row item-container rounded bg-success">
                    <div className="card-body">
                        <div className="card-title text-center">
                            任务
                        </div>
                        <div className="text-center">
                            <div className="col">
                                截止日期
                            </div>
                            <div className="col">
                                {task.ddl.toString().replace('T', ' ').replace('.000Z', '')}
                            </div>
                            <div className="row">
                                <div className="col">
                                    任务内容
                                </div>
                                <div className="col">
                                    {task.content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        //未完成的任务
        return (
            <div className="col-md mt-2 mb-2 ms-4 me-4">
                <div className="card row item-container rounded bg-warning">
                    <div className="card-body">
                        <div className="card-title text-center">
                            任务
                        </div>
                        <div className="text-center">
                            <div className="col">
                                截止日期
                            </div>
                            <div className="col">
                                {task.ddl.toString().replace('T', ' ').replace('.000Z', '')}
                            </div>
                            <div className="row">
                                <div className="col">
                                    任务内容
                                </div>
                                <div className="col">
                                    {task.content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default TaskCalendar