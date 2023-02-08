import classes from './Overview.module.css'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';

const dashboardTabDepartments = () => {
    const [projects, setProjects] = useState()
    const unique_id = uuid();
    const small_id = unique_id.slice(0,8)

    useEffect(() => {
        const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)

        async function getProjects() {
          const users = await supabase.from('projects_sample').select()
          setProjects(users.data)
          console.log(projects)
        }
      
        getProjects()
    
      },[])


    if(projects != undefined){
        return(
            <div>
                {projects.map((project, i) => {
                    return(
                        <div key={project.id}>
                            <p>{project.title}</p>
                        </div>
                    )
        })}
            </div>
        )
    }

}

export default dashboardTabDepartments



