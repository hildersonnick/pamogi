import classes from './Overview.module.css'
import Progress from './components/Progress'
import Chart from './components/Chart'

const dashboardTabOverview = () => {

    return(
        <div className={classes['overview_card-container']}>
            <div className={classes['overview_card']}>
                <div className={classes['overview_card_view']}>
                    <p className={classes["card-view_section-title"]}>Team Progress</p>
                    <Progress filler={60} dept={"Marketing"} background={"#0b5400"} fillerColor={"#00d30a"} />
                    <Progress filler={40} dept={"HR"} background={"#004d96"} fillerColor={"#0083ff"} />
                    <Progress filler={65} dept={"Research"} background={"#8e8000"} fillerColor={"#b3c400"} />
                    <Progress filler={30} dept={"Sales"} background={"#7f00db"} fillerColor={"#ac00fc"} />
                </div>
                <div className={classes['overview_card_view']}>
                </div>
            </div>
            <div className={classes['overview_card']}>
            <div className={classes['overview_card_view-tall']}>
                    <p className={classes["card-view_section-title"]}>Task update</p>
                   
                </div>
            </div>
            <div className={classes['overview_card']}>
              
            </div>
        </div>
    )
}

export default dashboardTabOverview