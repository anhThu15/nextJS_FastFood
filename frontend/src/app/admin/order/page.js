'use client'
import useSWR from "swr";
import CategoryAdmin from "../components/categoryAdmin";
import '../../globals.css'
import {useState } from "react";

import * as Yup from 'Yup'
import { useFormik } from 'formik';
import { useRouter } from "next/navigation";
import axios from "axios";
import OrderAdmin from "../components/orderAdmin";

export default function adminOrder(){
  // xử lý from
  const router = useRouter();

  const fetcher = (...args)=>fetch(...args).then((res)=>res.json())
  
  const {data,error,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/order`, fetcher)
  
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
        <div className="container-fluid">
            <div className="row pb-3">
              <h3><strong>Trang Quản Lý Đơn Hàng </strong></h3>
              <div className="col-md">
                <OrderAdmin data={data}></OrderAdmin>
              </div>
              {/* <!--  thêm trc đây  --> */}
            </div>
          </div>

        

        </>
    );
}