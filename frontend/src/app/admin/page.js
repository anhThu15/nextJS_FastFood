'use client'
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import "../globals.css";
import axios from "axios";
import Link from "next/link";
import Table from "./components/chart";
import Table2 from "./components/chart2";
import OrderAdmin from "./components/orderAdmin";
import useSWR from "swr";

export default  function  Home() {

  const fetcher = (...args)=>fetch(...args).then((res)=>res.json())
  
  const {data,error,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/orderSort`, fetcher)
  
  if (error) return <div>Lỗi tải dữ liệu</div>
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
          {/* <!--  hết meu đầu  --> */}
          <div className="container-fluid">
            <div className="row pb-3">
              <h3> <strong>Trang Quản Lý</strong> </h3>
              <div className="col-3" data-aos="flip-left" data-aos-duration="3000">
                <div className="card text-center">
                  <div className="card-body">
                    <p className="card-text"><i className="fa-solid fa-box fa-2xl" style={{color: "#FFD43B"}}></i></p>
                    <h5 className="card-title">Sản Phẩm</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link href="/admin/product" className="btn btn-warning">Quản Lý Sản Phẩm  </Link>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card text-center" data-aos="flip-left" data-aos-duration="3000">
                  <div className="card-body">
                    <p className="card-text"><i className="fa-solid fa-list fa-2xl"></i></p>
                    <h5 className="card-title">Danh Mục</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link href="/admin/category" className="btn btn-warning">Quản Lý Danh Mục</Link>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card text-center" data-aos="flip-left" data-aos-duration="3000">
                  <div className="card-body">
                    <p className="card-text"><i className="fa-regular fa-copyright fa-2xl" style={{color: "#ff0505"}}></i></p>
                    <h5 className="card-title">Thương Hiệu</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link href="/admin/brand" className="btn btn-warning">Quản Lý Thương Hiệu</Link>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card text-center" data-aos="flip-left" data-aos-duration="3000">
                  <div className="card-body">
                    <p className="card-text"><i className="fa-solid fa-cart-shopping fa-2xl" style={{color: "#63E6BE"}}></i></p>
                    <h5 className="card-title">Đơn Hàng</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link href="/admin/order" className="btn btn-warning">Quản Lý Đơn Hàng</Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6 pt-3"  data-aos="fade-up-right" data-aos-duration="3000">
                <div className="card text-center ">
                  <div className="card-body">
                  <Table></Table>
                  </div>
                </div>
                <OrderAdmin data={data}></OrderAdmin>
              </div>

              <div className="col-md-6 pt-3"  data-aos="fade-up-left" data-aos-duration="3000">
                <div className="card text-center">
                  <div className="card-header">
                    <b>Thông Tin Tổng Quan</b>
                  </div>
                  <div className="card-body">
                        <Table2></Table2>
                  </div>
                </div>
              </div>

              {/* <!--  thêm trc đây  --> */}

            </div>
          </div>
    </>                
  );
}
