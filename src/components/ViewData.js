import React from 'react'

export default function ViewData(props) {
  // Add the default values when creating Edit function
  const { data } = props;

  return(
    <div>
      <h2>Stock Data</h2>
      <h4>{data.name}</h4>
      Bid: {data.bid}<br />
      Ask: {data.ask}<br />
      Earnings Date: {data.earningsDate}
    </div>
  )
}