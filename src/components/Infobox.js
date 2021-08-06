import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"



function Infobox({title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* {Title is coronavirus cases} */}

                <Typography className="infoBox_title"color="textSecondary">
                    <h3>{title}</h3>
                </Typography>

                {/* {cases is no of cases} */}
            <h4 className="infoBox_cases">Today's cases: {cases}</h4>
                <Typography className="infoBox_total"color="textSecondary">
                {total} total
            </Typography>
                {/* {total is the total of the cases} */}
            </CardContent>
        </Card>
    )
}

export default Infobox
