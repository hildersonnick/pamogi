import { useEffect, useState } from 'react'
import classes from './Progress.module.css'

function Progress({filler, dept, background, fillerColor}) {

    const [progress, setProgress] = useState(50)

    useEffect(() => {
        setProgress(filler)
    })

  return (
    <div className={classes["progress_container"]}>
      <p className={classes["div1"]}>{dept}</p>
      <div className={classes["progress"]} style={{backgroundColor: background}}>
      <div
        className={classes['progress-bar']}
        style={{backgroundColor: fillerColor, width: `${progress}%`}}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {progress}%
      </div>
    </div>
    </div>
  )
}

export default Progress


