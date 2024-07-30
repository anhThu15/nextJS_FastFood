'use client'
import useSWR from "swr";
import CategoryAdmin from "../components/categoryAdmin";
import '../../globals.css'
import { useRef, useState } from "react";

import * as Yup from 'Yup'
import { useFormik } from 'formik';
import { useRouter } from "next/navigation";
import axios from "axios";

export default function adminCategory(){
  // xử lý from
  const nameRef = useRef();
  const router = useRouter();
  
  const validationSchema = Yup.object({
    name: Yup.string().required("Tên Sản Phẩm Không Được Để Trống")
  });
  
  const [formValue, setFormValue] = useState();
  
  const formik = useFormik({
    initialValues:{
        name: ''
      },
      validationSchema,
      onSubmit: async (values) =>{
        setFormValue(values)
        const data = {
          name: nameRef.current.value
        }

        console.log(data);

        try {
            const result = await axios
                .post(
                    `${process.env.NEXT_PUBLIC_API_URL}/admins/categoryAdmin/add_category`,data
                  )
            if (result.status = 1) {
              alert('Thêm danh mục mới thành công ròi đó cậu ~~ giờ đi chữa lành đi')
              router.push('/admin/category');
            } else {
                alert('thất bại')
            }
        } catch (error) {
            console.log(error);
        }
      }
    })
  // kết thúc xử lý form 


  const fetcher = (...args)=>fetch(...args).then((res)=>res.json())
  
  const {data,error,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/categoryAdmin`, fetcher)
  
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
              <h3><strong>Trang Quản Lý Danh Mục <button type="submit" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal"><i className="fa-solid fa-plus" style={{color: "#ffffff"}}></i></button></strong></h3>
              <div className="col-md">
                <CategoryAdmin data={data}></CategoryAdmin>
              </div>
              {/* <!--  thêm trc đây  --> */}
            </div>
          </div>

          {/* <!-- model dưới đây  --> */}
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
    
          {/* <!-- Modal Header --> */}
          <div class="modal-header">
            <h4 class="modal-title">Thêm Danh Mục Sản Phẩm</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
    
          {/* <!-- Modal body --> */}
          <div class="modal-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Tên Danh Mục Sản Phẩm</label>
                <input type="text" class="form-control" 
                      name="name" 
                      value={formik.values.name} 
                      onChange={formik.handleChange} 
                      ref={nameRef} />
                {formik.errors.name ? (<div className='text-danger'>{formik.errors.name}</div>) : null}
              </div>
              <button type="submit" class="btn btn-warning">Thêm Danh Mục Mới</button>
            </form>
          </div>
    
          {/* <!-- Modal footer --> */}
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
    
        </div>
      </div>
    </div>

        </>
    );
}