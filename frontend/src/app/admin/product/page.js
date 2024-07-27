"use client";
import useSWR from "swr";
import '../../globals.css'
import ProductAdmin from "../components/productAdmin";
import { useEffect, useRef, useState } from "react";

// xử lý form 
import * as Yup from 'Yup'
import { useFormik } from 'formik';
import { useRouter } from "next/navigation";
import axios from "axios";

export default function adminProduct(){
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [brands, setBrand] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admins/category`);
      const data = await res.json();
      setCategories(data);
    };
    const getBrand = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admins/brand`);
      const data = await res.json();
      setBrand(data);
    };
    getCategories();
    getBrand();
  },[])

// sử lý form dưới đây yup và fromik
const nameRef = useRef();
const priceRef = useRef();
const descriptionRef = useRef();
const categoryRef = useRef();
const brandRef = useRef();
const imageRef = useRef(null);

const validationSchema = Yup.object({
  name: Yup.string().required("Tên Sản Phẩm Không Được Để Trống"),
  price: Yup.string().required("Giá Tiền Không Được Để Trống"),
  img: Yup.string().required("Ảnh Không Được Để Trống"),
  description: Yup.string().required("Mô Tả Không Được Để Trống"),
});

const [formValue, setFormValue] = useState();

const formik = useFormik({
  initialValues:{
      name: '',
      price: '',
      img: '',
      description: '',
      categoryId: '',
      brandId:'',
    },
    validationSchema,
    onSubmit: async (values) =>{
      setFormValue(values)

       const data = new FormData();
       data.append('name', nameRef.current.value);
       data.append('price', priceRef.current.value);
       data.append('description', descriptionRef.current.value);
       data.append('categoryId', categoryRef.current.value);
       data.append('brandId', brandRef.current.value);
       data.append('img', imageRef.current.files[0]);

      //  for (let pair of data.entries()) {
      //   console.log(pair[0] + ': ' + pair[1]);
      // }
      // console.log(imageRef.current.files[0].name);

      try {
          const result = await axios
              .post(
                  `${process.env.NEXT_PUBLIC_API_URL}/admins/productAdmin/add_product`,data
                )
          if (result.status = 1) {
            alert('Thêm món ăn mới thành công ròi đó cậu ~~ giờ đi chữa lành đi')
            router.push('/admin/product');  
          } else {
              alert('thất bại')
          }
      } catch (error) {
          console.log(error);
      }
    }
  })
// kết thúc xử lý form dưới đây yup và fromik


  const fetcher = (...args)=>fetch(...args).then((res)=>res.json())

  const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/productAdmin?page=3`, fetcher)

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
              <h3><strong>Trang Quản Lý Sản Phẩm <button type="submit" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal"><i className="fa-solid fa-plus" style={{color: "#ffffff"}}></i></button></strong></h3>
              <div className="col-md">
               <ProductAdmin data={data}></ProductAdmin>
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
            <h4 class="modal-title">Thêm Sản Phẩm</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
    
          {/* <!-- Modal body --> */}
          <div class="modal-body">
            <form onSubmit={formik.handleSubmit} >
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Tên Sản Phẩm</label>
                <input type="text" class="form-control" 
                      name="name" 
                      value={formik.values.name} 
                      onChange={formik.handleChange} 
                      ref={nameRef} />
                {formik.errors.name ? (<div className='text-danger'>{formik.errors.name}</div>) : null}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Giá Sản Phẩm</label>
                <input type="number" class="form-control"
                      name="price" 
                      value={formik.values.price} 
                      onChange={formik.handleChange} 
                      ref={priceRef}  />
                {formik.errors.price ? (<div className='text-danger'>{formik.errors.price}</div>) : null}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Mô Tả Sản Phẩm</label>
                <textarea class="form-control" 
                      name="description" 
                      value={formik.values.description} 
                      onChange={formik.handleChange} 
                      ref={descriptionRef} />
                {formik.errors.description ? (<div className='text-danger'>{formik.errors.description}</div>) : null}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Ảnh Sản Phẩm</label>
                <input type="file" class="form-control" 
                      name="img" 
                      value={formik.values.img} 
                      onChange={formik.handleChange} 
                      ref={imageRef}/>
                 {formik.errors.img ? (<div className='text-danger'>{formik.errors.img}</div>) : null}
              </div>
              <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Danh Mục Sản Phẩm</label>
              <select className='form-control' id="category"
                      name="category" 
                      value={formik.values.category} 
                      onChange={formik.handleChange} 
                      ref={categoryRef} >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              </div>
              <div class="mb-3">
              <label for="exampleInputPassword1"  class="form-label">Thương Hiệu Sản Phẩm</label>
              <select className='form-control' id="brand" 
                      name="brand" 
                      value={formik.values.brand} 
                      onChange={formik.handleChange} 
                      ref={brandRef}>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              </div>
              <button type="submit" class="btn btn-warning">Thêm Món Mới</button>
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