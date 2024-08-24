import React from 'react'
import {Chart} from "react-google-charts"

export const Analysis = ({title,data,pie}) => {
    const chartData = [
        ['Task', 'Hours per Day'],
        ...data,
      ];
      let options;
      if(pie){
        options = {
          title: title,
          pieHole: 0.4,
      }
    }
      else{
        options = {
          title: title,
          is3D:true,
        }
    }
     
    
  return (
    <div style={{height:"500px",width:"100%"}}>
        <Chart
        chartType="PieChart"
        width="100%"
        height="100%"
        data={chartData}
        options={options}
      />
    </div>
  )
}

