"use client";
import useSWR from 'swr';
/* eslint-disable @next/next/no-img-element */
import "../../../globals.css";
import Link from "next/link";
import axios from "axios";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Products_detail({ params}) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  console.log(cart);
  const id = params.id
  const { data: sp, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/product_detail/${id}`, fetcher,
    {
      refreshInterval: 6000,
    }
  );

  if (error) return <div>Lỗi load dữ liệu.</div>;
  if (isLoading) return (
    <>
     <div className="loader">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
        <div className="bar8"></div>
        <div className="bar9"></div>
      </div>
    </>
    );

  return (
    <>
    <div className="container-lg">
          <div className="row">
              <div className="col ps-5 mt-2">
                <nav aria-label="breadcrumb" >
                  <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><Link style={{textDecoration: "none"}} href="/"><b style={{color: "black"}}>Trang Chủ</b></Link></li>
                    <li className="breadcrumb-item"><Link style={{textDecoration: "none"}} href="/products"><b style={{color: "black"}}>Thực Đơn</b></Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{sp.name}</li>
                  </ol>
                </nav>
                 <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${sp.img}`} className="img-fluid" alt=""></img>
              </div>
              <div className="col pt-5 ps-5" >
                <div className="card shadow p-3 mb-5 bg-body-tertiary rounded h-100 " style={{width: "28rem"}}>
                  <h3 className="card-header">
                    <b>Giới Thiệu Món Ăn</b>
                  </h3>
                  <div className="card-body">
                    <h3 className="card-title"><b>{sp.name}</b> </h3>
                    <p >Đến Từ: {sp.brandId.name}</p>
                    <p >Loại Món: {sp.categoryId.name}</p>
                    <p className="card-text">{sp.description} </p>
                    <section >
                      <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" className="btn btn-outline-danger rounded-pill"><b style={{fontSize: "20px"}}>-</b></button>
                        <input className="btn btn-outline rounded-pill" min="1" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                        <button type="button" className="btn btn-outline-warning rounded-pill"><b style={{fontSize: "20px"}}>+</b></button>
                      </div>
                      <br></br>
                      <br></br>
                      <button onClick={() => dispatch(addToCart({ item: sp, quantity: quantity }))} className="btn btn-warning rounded-pill" style={{height: "40px"}}>THÊM VÀO GIỎ <strong>({sp.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}  )</strong> </button>
                    </section>
                  </div>
                </div>
              </div>
          </div>
          {/* <br> */}
          <div className="container-xl ps-5 pt-2">
            <h4 className="card-header"><b>Các món khác</b></h4>
            <div className="col-6">
              <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="row">
                      <div className="col-4">
                        <div className="card" style={{width: "210px"}}>
                          <img src="https://i.pinimg.com/736x/3e/46/0f/3e460f504e2bd4baa21e19d96565918a.jpg" style={{width: "200px", height: "200px"}} className="card-img-top" alt="..."></img>
                          <div className="card-body">
                            <h5 className="card-title">Coca cola</h5>
                            <p className="card-text">Giá tiền</p>
                            <a href="#" className="btn btn-warning w-100 rounded-pill">THÊM</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="card" style={{width: "210px"}}>
                          <img src="https://i.pinimg.com/736x/d0/aa/82/d0aa8272b584a29eb27a34426da62105.jpg" style={{width: "200px", height: "200px"}} className="card-img-top" alt="..."></img>
                          <div className="card-body">
                            <h5 className="card-title">Coca cola</h5>
                            <p className="card-text">Giá tiền</p>
                            <a href="#" className="btn btn-warning w-100 rounded-pill">THÊM</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="card" style={{width: "210px"}}>
                          <img src="https://i.pinimg.com/564x/b0/2e/f4/b02ef494e7b5a6d6a247adfff0059689.jpg" style={{width: "200px", height: "200px"}} className="card-img-top" alt="..."></img>
                          <div className="card-body">
                            <h5 className="card-title">Coca cola</h5>
                            <p className="card-text">Giá tiền</p>
                            <a href="#" className="btn btn-warning w-100 rounded-pill">THÊM</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="row">
                      <div className="col-4">
                        <div className="card" style={{width: "210px"}}>
                          <img src="https://i.pinimg.com/736x/3e/46/0f/3e460f504e2bd4baa21e19d96565918a.jpg" style={{width: "200px", height: "200px"}} className="card-img-top" alt="..."></img>
                          <div className="card-body">
                            <h5 className="card-title">Coca cola</h5>
                            <p className="card-text">Giá tiền</p>
                            <a href="#" className="btn btn-warning w-100 rounded-pill">THÊM</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="card" style={{width: "210px"}}>
                          <img src="https://i.pinimg.com/736x/d0/aa/82/d0aa8272b584a29eb27a34426da62105.jpg" style={{width: "200px", height: "200px"}} className="card-img-top" alt="..."></img>
                          <div className="card-body">
                            <h5 className="card-title">Coca cola</h5>
                            <p className="card-text">Giá tiền</p>
                            <a href="#" className="btn btn-warning w-100 rounded-pill">THÊM</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="card" style={{width: "210px"}}>
                          <img src="https://i.pinimg.com/564x/b0/2e/f4/b02ef494e7b5a6d6a247adfff0059689.jpg" style={{width: "200px", height: "200px"}} className="card-img-top" alt="..."></img>
                          <div className="card-body">
                            <h5 className="card-title">Coca cola</h5>
                            <p className="card-text">Giá tiền</p>
                            <a href="#" className="btn btn-warning w-100 rounded-pill">THÊM</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- <div className="carousel-item">
                    <img src="https://i.pinimg.com/564x/b0/2e/f4/b02ef494e7b5a6d6a247adfff0059689.jpg" className="d-block " style="width: 200px; height:200px ; " alt="...">
                  </div> --> */}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" style={{backgroundColor: "whitesmoke"}}>
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next" style={{backgroundColor: "whitesmoke"}}>
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
      </div>

    </>
    );
  }
