import React from 'react'

export const Card = () => {
  return (
    <div><div className="card mt-3" style={{"width": "18rem"}}>
    <img className="card-img-top " src="https://cdn.pixabay.com/photo/2017/07/28/14/29/macarons-2548827_1280.jpg" alt=""/>
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Food description.</p>
      <div className="d-flex justify-content-between">
              <select className="form-select rounded" style={{ width: "48%" }}>
                {[...Array(5).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <select className="form-select rounded" style={{ width: "48%" }}>
                <option value="half">Half</option>
                <option value="quarter">Quarter</option>
                <option value="full">Full</option>
              </select>
            </div>
     Total price
            <div>
  
            </div>
  
  
    </div>
  </div>
  </div>
  )
}
