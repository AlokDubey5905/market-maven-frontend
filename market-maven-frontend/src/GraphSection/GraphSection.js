import React from 'react'
import SectorDoughChart from './SectorDoughChart'
import TopGainers from './TopGainers'
import './SectorDoughChart.css'

const GraphSection = ({sector}) => {
  return (
    <div >

  <SectorDoughChart sector={sector} />

    <TopGainers sector={sector} />
    </div>
  )
}

export default GraphSection