import React from 'react'
import TodoTasks from './TodoTasks'
import DoingTasks from './DoingTasks'
import DoneTasks from './DoneTasks'

const TaskPage = ({ user }) => {
  return (
    <>
      <section className='p-5'>
        <div className="container">
          <div className="row g-4">
            <div className="col-md">
              <div className="card bg-secondary text-light">
                <div className="card-body">
                  <TodoTasks user={user} />
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card bg-dark text-light">
                <div className="card-body">
                  <DoingTasks user={user} />
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card bg-black text-light">
                <div className="card-body">
                  <DoneTasks user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default TaskPage
