import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useCart } from './ContextReducer'
import {decodeToken} from 'react-jwt'


export default function Card(props) {
  const { name, img } = props.food;
  const priceRef = useRef();
  let options = props.options;
  let dispatch = useDispatch();
  let data = useCart();
  let id = props.food._id;
  let priceOptions = Object.keys(options)
  
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    let id = decodeToken(token)
    setSize(priceRef.current.value)
  })

  //states to track qty and size of the pizza
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('')


  const handleAddtoCart = async () => {
    /************************** add to cart update             *****************************/
    let food = [];
    console.log("productId:",id);
    /********************    adding items to database.     ***********************/
    let result = await fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({productId: id, name: name, img: img,price: parseFloat(finalPrice), size: size, qty: qty })
    })
    const json = await result.json();
    console.log("json", json);
    if (json.success) {
      console.log("success")
    }
    for (const item in data) {
      if (data[item].id === id) {
        food = data[item];
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        console.log(food.size)
        await dispatch({ type: "UPDATE", id: id, price: finalPrice, qty: qty })
        return
      }
      else if (food !== size) {
        await dispatch({ type: "ADD", id: id, name: name, img: img, price: finalPrice, qty: qty, size: size });
        return
      }
      await dispatch({ type: "ADD", id: id, name: name, img: img, price: finalPrice, qty: qty, size: size })
    }




  }



  let finalPrice = qty * parseInt(options[size])




  return (
    <div className='me-5'>
      <div className="card m-4 bg-dark" style={{ "width": "16rem", "color": "whitesmoke" }}>
        <img src={img} style={{ "height": "150px" }} className="card-img-top" alt="foodimage" />
        <div className="card-body">
          <h5 className="card-title" style={{ "textAlign": "center" }}>{name}</h5>
          <div>
            <select className='ms-5 mb-2 h-100 bg-light rounded' onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>
            <select className='m-2 h-100 bg-light rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <h5 style={{ "textAlign": "center" }}>Rs {finalPrice}</h5>
          </div>
          <hr>
          </hr>
          <Link className="btn btn ms-5 " style={{ "background-color": "#1F8A70" }} onClick={handleAddtoCart}>Add to cart</Link>
        </div>
      </div>

    </div>
  )
}
