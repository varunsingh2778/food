import React from 'react'

function Loading() {
    return (
        <div style={{"padding": "20%",
            "textAlign": "center",
            "top":"50px"
            }}>
            <div className="spinner-grow text-primary" role="status">
            </div>
            <div className="spinner-grow text-secondary" role="status" style={{"marginLeft":"3px"}}>
            </div>
            <div className="spinner-grow text-success" role="status" style={{"marginLeft":"3px"}}>
            </div>
            <div className="spinner-grow text-danger" role="status" style={{"marginLeft":"3px"}}>
            </div>
            <div className="spinner-grow text-warning" role="status" style={{"marginLeft":"3px"}}>
            </div>
            <div className="spinner-grow text-info" role="status" style={{"marginLeft":"3px"}}>
            </div>
        </div>
    )
}

export default Loading