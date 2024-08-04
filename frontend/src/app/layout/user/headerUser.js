'use client'
import { useDispatch, useSelector } from "react-redux";
import "../../globals.css";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { logout } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

export const metadata = {
  title: 'AsianFood',
  description: '...',
}

export default function HeaderUser(){
  // const user = useSelector((state) => state.user )
  // const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    if (token) {
        setIsLoggedIn(true);
    }

    const getUser = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/detailuser`, {
          headers: {
              Authorization: `Bearer ${token?.split('=')[1]}`,
          },
      });
      const data = await res.json();
      setUser(data);
  };
    
  getUser();
  }, []);

  const deleteUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
      {
        method: 'GET',
        credentials: 'include', // Đảm bảo gửi cookie cùng với yêu cầu
      }
    )
    const data = await res.json();
    if(data){
      router.push('/login')
    }else{
      alert('lỗi ')
    }
  }



    return (
        <>
        <title>{metadata.title}</title>
        <div className="container-fluid p-0 " >
        <div className="container-xl">
            <nav className="navbar navbar-expand-lg bg-body" style={{backgroundColor: "#e3f2fd"}}>
                <div className="container-fluid ">
                  <Link className="navbar-brand" href="/"><img src="/images/logo.png" alt="" width="150px"></img></Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <Link className="nav-link" aria-current="page" href="/products"><h4  className="navH4">Thực Đơn</h4></Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#"><h4 className="navH4" >Khuyến Mãi</h4></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#"><h4 className="navH4" >Dịch Vụ Tiệc</h4></a>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/map"><h4 className="navH4" >Hệ Thống Nhà Hàng</h4></Link>
                      </li>
                    </ul>
                    <ul className="navbar-nav me-0 mb-2 mb-lg-0">
                        <li className="nav-item ">
                            <div class="dropdown">
                              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="fa-regular fa-user"></i> 
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <Link className="dropdown-item" href={isLoggedIn ? '/' : '/login'}>
                                      {isLoggedIn ? `hé lô ông già ${user.name}` : "Đăng Nhập"}
                                  </Link>
                                </li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><button className="dropdown-item" onClick={deleteUser}>Đăng Xuất</button></li>
                              </ul>
                            </div>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link btn btn-outline-dark" href="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
                        </li>
                        <li>
                          <button className="btn btn-outline-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i class="fa-solid fa-magnifying-glass"></i></button>
                        </li>
                    </ul>
                  </div>
                </div>
            </nav>
        </div>
        <div class="container-fluid xich p-0 ">
            <div class="container-fluid to" style={{backgroundColor: '#202124'}}>
                <section class="container" style={{color: 'white'}}>
                    <h5 class="navBanner">
                       <b>Đặt Ngay</b>
                       <b><i class="fa-solid fa-truck-fast"></i> Giao Hàng </b>  
                       <b><i class="fa-solid fa-boxes-stacked"></i> hoặc Mang đi</b>
                       <b><button type="button" class="btn btn-danger navBt">Bắt Đầu Đặt Hàng</button></b>
                    </h5>
                </section>
                    <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                      <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Bộ Lọc</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                      </div>
                      <div class="offcanvas-body">
                          <strong className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Tìm Kiếm Theo Tên :</strong>
                          <form action="/products/search" class="d-flex mt-2" role="search">
                            <input class="form-control me-2" name="keyword" placeholder="Hôm nay bạn muốn ăn gì nè ?" aria-label="Search"/>
                            <button class="btn btn-outline-danger" type="submit">Tìm</button>
                          </form>
                          <hr/>
                          <div className="col">
                              <div class="card">
                                <div class="card-header">
                                  <strong className="offcanvas-title mb-2" id="offcanvasWithBothOptionsLabel">Lọc Theo Giá Tiền :</strong>
                                </div>
                                <div class="card-body">
                                  <form className="input-group" action="/products/range">
                                    <label className="input-group-text">Từ</label>
                                    <input className="form-control" name="x" min={10000} max={10000000} step={5000} type="number"/>
                                    <label className="input-group-text">Đến</label>
                                    <input className="form-control" name="y" min={10000} max={10000000} step={5000} type="number"/>
                                    <button class="btn btn-dark ms-2" type="submit">Tìm</button>
                                  </form>
                                </div>
                              </div>
                              <div class="card mt-3">
                                <div class="card-header">
                                  <strong className="offcanvas-title mb-2" id="offcanvasWithBothOptionsLabel">Sắp Xếp :</strong>
                                </div>
                                <div class="card-body">
                                   <Link href="/products/hot" className="w-50 btn btn-outline-dark">Sản Phẩm Hot</Link>
                                   <Link href="/products/rating" className="w-50 btn btn-dark">Sản Phẩm Nổi Bật</Link>
                                   <div className="m-2"></div>
                                   <Link href="/products/up" className="w-50 btn btn-dark">Giá: Tăng Dần</Link>
                                   <Link href="/products/down" className="w-50 btn btn-outline-dark">Giá: Giảm Dần</Link>
                                   <div className="m-2"></div>
                                   <Link href="/products/az" className="w-50 btn btn-outline-dark">Tên: A-Z</Link>
                                   <Link href="/products/za" className="w-50 btn btn-dark">Tên: Z-A</Link>
                                </div>
                              </div>
                          </div>
                      </div>
                    </div>
            </div>
          </div>
          </div>
        </>
    );
}