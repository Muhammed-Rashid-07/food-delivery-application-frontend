import React from 'react'
import { Link } from 'react-router-dom';
import { useCart, useDispatch } from '../ContextReducer'

function Cart() {
    let data = useCart();
    let dispatch = useDispatch();
    //cart empty
    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 text-center fs-3 ">Card's Empty</div>
            </div>
        )
    }
    const handleCheckout = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/orderData",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({order_data: data,
                    order_date: new Date().toISOString,
                    email: userEmail})
            })
        if(response.status===200){
            dispatch({type:"DROP"})
        }
    }
    //total price logic
    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    return (
        <div className='container mt-5'>
            <h2>My Cart🛒</h2>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">img</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Size</th>
                        <th scope="col">Amount</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index) => {
                        return (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <th scope="row"><img src={food.img} style={{ "height": "50px", "width": "px" }} alt="" /></th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td><button type='button' className='btn p-0'><img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" style={{ "width": "30px", "height": "30px" }} alt="delete" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>
                            </tr>
                        )
                    })}

                </tbody>

            </table>
            <h3 className='me-5' style={{ "margin-left": "auto" }}>Total : ₹{totalPrice}/-</h3>
            <Link className='btn btn bg-success' onClick={handleCheckout}>checkout</Link>
        </div>
    )
}

export default Cart
