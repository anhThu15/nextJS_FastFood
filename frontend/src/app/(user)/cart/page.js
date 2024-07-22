'use client'
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import "../../globals.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { removeFromCart, updateCartItemQuantity } from "@/redux/slices/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart?.items) || [];
  const dispatch = useDispatch();

  const total = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

  return (
    <>
   
   <div class="container-lg" style={{display: "flex"}}>
          <h2><b>GIỎ HÀNG CỦA TÔI </b> </h2>
          <div class="que"></div>
    </div>
      
      <div class="container-lg" style={{display: "flex"}}>
        <div class="row">
        {cartItems.map((item) => (
          // <div class="col-8 ps-5">w
            <div class="card mb-3">
              <div class="row g-0">
                  <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.img}`} class=" col-md-4 img-fluid rounded-start" alt="..."></img>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{item.name}</h5>
                    <p class="card-text">Giá: {item.price.toLocaleString()}đ</p>
                    <input 
                        className="form-control"
                        min="1"
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => dispatch(updateCartItemQuantity({ _id: item._id, quantity: parseInt(e.target.value) }))}
                    />
                    <p class="card-text">Thành Tiền: {(item.price * item.quantity).toLocaleString()}đ</p>
                    <button className="btn btn-danger" onClick={() => dispatch(removeFromCart(item._id))}>
                                    Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          // </div>
        ))}

        </div>
          <div class="col-4 ps-5 ">
            <div class="card border-dark mb-3" style={{maxWidth: "18rem"}}>
              <div class="card-header">Bill  </div>
              <div class="card-body">
                <p class="card-text">Phí giao hàng: 50.0000đ</p>
                <b class="card-text">Tổng thanh toán:{(total+50000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}đ</b>
                
                <button type="button" class="btn btn-danger navBt w-100"> <Link href="/deal">Thanh Toán</Link></button>
              </div>
            </div>
          </div>
      </div>
    

    </>

    );
  }
