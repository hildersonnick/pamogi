import classes from './Departments.module.css'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';

const dashboardTabDepartments = () => {
    const [projects, setProjects] = useState()
    const [subprojects, setSubprojects] = useState()
    const [tasks, setTasks] = useState()
    const unique_id = uuid();
    const small_id = unique_id.slice(0,8)

    useEffect(() => {
        const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)

        async function getProjects() {
          const data = await supabase.from('projects_sample').select()
          setProjects(data.data)
        }

        async function getSubprojects() {
            const data = await supabase.from('subproject_sample').select()
            setSubprojects(data.data)
        }

          async function getSubsubprojects() {
            const data = await supabase.from('subsubproject_sample').select()
            setTasks(data.data)
          }

      
        getProjects()
        getSubprojects()
        getSubsubprojects()
    
      },[])


    if(projects != undefined && subprojects != undefined && tasks != undefined){
        return(
            <div>
              <div>
              <select className={classes['select']}>
                {projects.map((projects, i) => {
                    return(
                        <option key={projects.id}>{projects.title}</option>
                    )
                })}
            </select>
              </div>
            <div className={classes['list']}>
              {subprojects.map((subprojects, i) => {
                  return(
                      <div key={subprojects.id} className={classes['list-item']}>
                          <div className={classes['list-item-title']}>
                              {subprojects.title}
                              <hr className={classes['hr']} />
                          </div>
                          <div className={classes['list-item-tasks']}>
                              {tasks.map((tasks, i) => {
                                  if(tasks.parent == subprojects.index){
                                      return(
                                          <div key={tasks.id} className={classes['list-item-task']}>
                                              {tasks.title}
                                          </div>
                                      )
                                  }
                              })}
                          </div>
                      </div>
                  )
              })}
            </div>
            </div>
        )
    }

}

export default dashboardTabDepartments