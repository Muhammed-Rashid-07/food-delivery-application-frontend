import React, { useState, useEffect } from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import Card from '../Card'
import Carousal from '../Carousal'
import axios from 'axios';


/* steps to gather data from backend. 
1. created an api in backend which gets the data from database.
2. in frontend fetching data from that api.
3. */

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const inputHandler = (e) => {
    let lowercase = e.target.value.toLowerCase();
    setSearch(lowercase)
  }

  //url to gather data from backend
  const baseUrl = "http://localhost:5000/api/foodData";



  //to get data from backend
  let foodItems = []
  const foodData = async () => {
    await axios.post(baseUrl).then((result) => {
      foodItems = result.data;
    }
    )
    setFoodCat(foodItems[1]);
    setFoodItem(foodItems[0]);
  }


  useEffect(() => {
    foodData();
  })

  return (
    <div>
      <div><Navbar /></div>
      <div><Carousal /></div>
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner" id='carousal'>
          <div className="carousel-item active" style={{ zIndex: "1" }}>
            <img style={{ filter: "brightness(40%)", "height": "600px" }} src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-…" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <div className="d-flex mb-3 justify-content-center" role="search">
                <input className="form-control me-2 bg-dark" type="search" placeholder="Search" aria-label="Search" value={search} onChange={inputHandler} />
                {/*<button className="btn btn-outline-success bg-dark" type="submit">Search</button>*/}
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container'>
        {
          foodCat !== [] ? foodCat.map((data) => {
            return (
              <div className='row'>
                <div className='fs-3 m-3' key={data._id}>{data.CategoryName}</div>
                <hr style={{ "width": "80%" }} />
                {
                  foodItem !== [] ? foodItem.filter((items) =>
                    items.CategoryName === data.CategoryName && items.name.toLowerCase().includes(search.toLowerCase())).map(filterData => {
                      return (
                        <div key={filterData._id} className="col-12 col-md-6 col-lg-3">
                          <Card food={filterData} options={filterData.options[0]}></Card>
                        </div>

                      )
                    }) :
                    <div>hi</div>
                }


              </div>
            )
          }) : " "
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}
