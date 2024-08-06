'use client'
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import "../../globals.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Deal() {
  const router = useRouter();
  // const user = useSelector((state) => state.user )
  const cartItems = useSelector((state) => state.cart?.items) || [];
  const total = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

  const addressRef = useRef('')
  const id_userRef = useRef('')
  const nameRef = useRef([])
  const priceRef = useRef([])
  const quantityRef = useRef([])

  const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
  const tokenValue = token?.split('=')[1];
  if (!tokenValue) {
      console.log(tokenValue);
      
  }
  const [user, setUser] = useState({});
  useEffect(() => {
      const getUser = async () => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/detailuser`, {
              headers: {
                  Authorization: `Bearer ${tokenValue}`,
              },
          });
          const data = await res.json();
          setUser(data);
      };
      getUser();
  }, [tokenValue]);
  



  const handleOrder = async (e) =>{
    e.preventDefault();
    
    try{
      
      const arrSP = cartItems.map((e,index) =>  ({
          name: nameRef.current.value,
          price: priceRef.current.value,
          quantity: quantityRef.current.value
        })
      ) 

      const data = {
        id_user: id_userRef.current.value,
        address: addressRef.current.value,
        day : new Date().toLocaleString('en-US'),
        total : total,
        orderDetail:[arrSP]
      }

      console.log(data);

      const orderData = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/add_orders`,data)
      console.log(orderData);

      if(orderData.data.status === 1){
        alert('Đơn Hàng Đang Được Xử Lý')
        router.push('/');
      }else{
        alert('Thất Bại ')
      }

    }catch (error) {
      console.error('order failed:', error);
    }

  }

  console.log(cartItems);
  return (
    <>
   <div class="container-lg mt-5" style={{display: "flex"}}>
        <div class="row w-100">
          <div class="col-8 ps-5">
             <h3 class="text-center"><i class="fa-solid fa-lock"></i> THÔNG TIN ĐẶT HÀNG</h3>
             <div class="vung ">
                <h4 class="ps-2" >THỜI GIAN GIAO HÀNG:</h4>
                <p class="ps-2" >Giao Ngay</p>
             </div>
             <div class="vung ">
            <h4 class="ps-2" >THÊM THÔNG TIN CHI TIẾT:</h4>
            <form action="">
              <div class="mb-3">
                <p class="form-control">{user.name}</p>
              </div>
              <div class="mb-3">
                <p class="form-control">0{user.phone}</p>
              </div>
              <div class="mb-3">
                <p class="form-control">{user.email}</p>
              </div>
            </form>
           </div>
           <div class="vung">
              <h4 class="ps-2" >ĐƯỢC GIAO ĐẾN:</h4>
              <form action="" onSubmit={handleOrder}>
                <div class="mb-3">
                  <input type="text" placeholder="địa chỉ" ref={addressRef} class="form-control"></input>
                  <input type="hidden" placeholder="địa chỉ" ref={id_userRef} value={user._id} class="form-control"></input>
                  {/* danh sách cart */}
                  {cartItems.map((e) =>{
                  return (
                    <>
                    <input type="hidden" placeholder="địa chỉ" ref={nameRef} value={e.name} class="form-control"></input>
                    <input type="hidden" placeholder="địa chỉ" ref={priceRef} value={e.price} class="form-control"></input>
                    <input type="hidden" placeholder="địa chỉ" ref={quantityRef} value={e.quantity} class="form-control"></input>
                    </>
                      );
                  })}

                </div>
                <button type="submit" class="btn btn-warning w-100 rounded-pill"><b>THANH TOÁN</b></button>
              </form>
          </div>
         </div>
          <div class="col-4 ps-5 mt-5 " >
            {/* <br><br> */}
            <div class="card border-dark mb-3" style={{maxWidth: "18rem"}}>
              <div class="card-header">TÓM TẮT ĐƠN HÀNG </div>
              <div class="card-body">
                <b class="card-text">Có Những Món: </b>
                {cartItems.map((e) =>{
                  return <p class="card-text">{e.name} -- {e.price.toLocaleString()}đ</p>
                })}
              </div>
              {/* <hr> */}
              <div class="card-body">
                <p class="card-text">Phí giao hàng: 50.000đ</p>
                <b class="card-text">Tổng thanh toán: {(total+50000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    

    </>

    );
  }
