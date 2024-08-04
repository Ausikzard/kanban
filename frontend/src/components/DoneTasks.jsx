import DisplayProject from "./DisplayProject"

const DoneTasks = ({ user, userProjects, getAllProjects }) => {
      // 过滤出四个重要度的项目
      const FirstProjects = userProjects.filter((project) => project.important === 1 && project.status === true)
      const SecondProjects = userProjects.filter((project) => project.important === 2 && project.status === true)
      const ThirdProjects = userProjects.filter((project) => project.important === 3 && project.status === true)
      const FourthProjects = userProjects.filter((project) => project.important === 4 && project.status === true)
  
      return (
          <>
              <div className="card-title text-center">
                  done
              </div>
              <div className="card-text text-center mb-2">
                  你已经完成的任务
              </div>
              <div>
                  {FourthProjects.map(userProject => <DisplayProject project={userProject} getAllProjects={getAllProjects} key={userProject.id} projectStatus={true}/>)}
                  {ThirdProjects.map(userProject => <DisplayProject project={userProject} getAllProjects={getAllProjects} key={userProject.id} projectStatus={true}/>)}
                  {SecondProjects.map(userProject => <DisplayProject project={userProject} getAllProjects={getAllProjects} key={userProject.id} projectStatus={true}/>)}
                  {FirstProjects.map(userProject => <DisplayProject project={userProject} getAllProjects={getAllProjects} key={userProject.id} projectStatus={true}/>)}
              </div>
          </>
      )
}
export default DoneTasks