import React from 'react'
import { Link } from 'react-router-dom'

function AdminCard() {
  return (
    <div>
      <div class="card" style={{"width":"18rem"}}>
        <img class="card-img-top" src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-%E2%80%A6" alt="Cardimagecap"/>
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <Link href="#" class="btn btn-primary">Go somewhere</Link>
          </div>
      </div>
    </div>
  )
}

export default AdminCard
