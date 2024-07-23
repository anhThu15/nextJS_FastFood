// 'use client'
import { useDispatch, useSelector } from "react-redux";
import "../../globals.css";
import Link from "next/link";
import React from 'react';

export const metadata = {
  title: 'AsianFood',
  description: '...',
}

export default function HeaderAmin(){
    return (
        <>
        <title>{metadata.title}</title>
        <div className="container-fluid" >
      <div className="row">
        <div className="col-md-2 p-0 collapse collapse-horizontal show" style={{minHeight: "100vh", backgroundColor: "#202124"}} id="moMenu">
          <strong className="text-center d-block p-3" style={{color: "white"}}> 
            <img src="images/logo.png" width="80px" alt=""/>
            <br/>
            Asian-Food Admin
           </strong>
           <div className="list-group ms-2 me-2">
            <a href="product.html" className="list-group-item list-group-item-action" aria-current="true">
              Tổng Quan
            </a>
            <a href="product_admin.html" className="list-group-item list-group-item-action">Sản Phẩm</a>
            <a href="#" className="list-group-item list-group-item-action">Danh Mục</a>
            <a href="#" className="list-group-item list-group-item-action">Tài Khoản </a>
            <a href="#" className="list-group-item list-group-item-action">Thương Hiệu</a>
            <a href="index.html" className="list-group-item list-group-item-action" aria-disabled="true">Quay về Trang Chủ</a>
          </div>
        </div>
        <div className="col-md p-0">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <button className="btn btn-secondary ms-1" type="button" data-bs-toggle="collapse" data-bs-target="#moMenu" aria-expanded="false" aria-controls="moMenu">
              =
            </button>
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="d-flex" role="search">
                  <input className="form-control " type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-warning" type="submit">Search</button>
                </form>
                <ul className="navbar-nav ms-auto mb-2 me-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Xin Chào, Anh Thư
                    </a>
                    <ul className="dropdown-menu ">
                      <li><a className="dropdown-item" href="#">Tìm rì ?</a></li>
                      <li><a className="dropdown-item" href="#">Ai biếc ?</a></li>
                      <li><hr className="dropdown-divider"/></li>
                      <li><a className="dropdown-item" href="#">Đăng Xuất</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
        </>
    );
}