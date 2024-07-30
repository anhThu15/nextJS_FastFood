"use client";
import useSWR from "swr";
import '../../../globals.css'
import ProductAdmin from "../../components/productAdmin";
import { useEffect, useRef, useState } from "react";

// xử lý form 
import * as Yup from 'Yup'
import { useFormik } from 'formik';
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";

export default function adminProductUpdate(){
  const id = useSelector((state) => state.update)
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [brands, setBrand] = useState([]);
  const [productValue, setProductValue] = useState([]);
  const [file, setFile] = useState(null);
  useEffect(() => {
    const getProductValue = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product_detail/`+id);
      const data = await res.json();
      setProductValue(data);
    };
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
    getProductValue();
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
const typeRef = useRef();
const ratingRef = useRef();
const hotRef = useRef();

const validationSchema = Yup.object({
  name: Yup.string().required("Tên Sản Phẩm Không Được Để Trống"),
  price: Yup.string().required("Giá Tiền Không Được Để Trống"),
  img: Yup.string().required("Ảnh Không Được Để Trống"),
  description: Yup.string().required("Mô Tả Không Được Để Trống"),
});

const [formValue, setFormValue] = useState();

const formik = useFormik({
  enableReinitialize: true, 
  initialValues: productValue ||{
      name: '',
      price: '',
      description: '',
      type:'',
      rating:'',
      hot:'',
      categoryId: {
        _id:'',
        name: ''
      },
      brandId:{
        _id:'',
        name: ''
      }
    },
    validationSchema,
    onSubmit: async (values) =>{
      setFormValue(values)

      //  const data = new FormData();
      //  data.append('name', nameRef.current.value);
      //  data.append('price', priceRef.current.value);
      //  data.append('description', descriptionRef.current.value);
      //  data.append('categoryId', categoryRef.current.value);
      //  data.append('brandId', brandRef.current.value);
      //  data.append('img', imageRef.current.files[0]);

      //  for (let pair of data.entries()) {
      //   console.log(pair[0] + ': ' + pair[1]);
      // }
      // console.log(imageRef.current.files[0].name);

      try {


          // const formData = new FormData();
          // Object.keys(values).forEach((key) => {
          //   formData.append(key, values[key]);
          // });
          // if (file) {
          //   formData.append('img', file);
          // }


          // const result = await axios
          //     .post(
          //         `${process.env.NEXT_PUBLIC_API_URL}/admins/productAdmin/add_product`,data
          //       )
          // if (result.status = 1) {
          //   alert('Thêm món ăn mới thành công ròi đó cậu ~~ giờ đi chữa lành đi')
          //   router.push('/admin/product');  
          // } else {
          //     alert('thất bại')
          // }
      } catch (error) {
          console.log(error);
      }
    }
  })
// kết thúc xử lý form dưới đây yup và fromik
console.log(formik.values?.brandId?.name);
  

    return (
        <>
        <div className="container-fluid">
            <div className="row pb-3">
              <h3><strong>Trang Cập Nhập Sản Phẩm #{id} </strong></h3>
              <div className="col-md">
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
                      ref={imageRef}/>
                 {/* {formik.errors.img ? (<div className='text-danger'>{formik.errors.img}</div>) : null} */}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Loại Sản Phẩm</label>
                <select className='form-control' 
                        name="type"
                        value={formik.values.type} 
                        onChange={formik.handleChange} 
                        ref={typeRef} >
                  <option value={'food'}>Food</option>
                  <option value={'topping'}>Topping</option>
              </select>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Điểm Sản Phẩm</label>
                <select className='form-control' 
                        name="rating"
                        value={formik.values.rating} 
                        onChange={formik.handleChange} 
                        ref={ratingRef} >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
              </select>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Sản Phẩm Hot</label>
                <select className='form-control' 
                        name="hot"
                        value={formik.values.hot} 
                        onChange={formik.handleChange} 
                        ref={hotRef} >
                  <option value={true}>Hot</option>
                  <option value={false}>!Hot</option>
              </select>
              </div>
              <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Danh Mục Sản Phẩm</label>
              <select className='form-control'
                      name="categoryId" 
                      value={formik.values?.categoryId?.name} 
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
              <select className='form-control'
                      name="brandId" 
                      value={formik.values?.brandId?.name} 
                      onChange={formik.handleChange} 
                      ref={brandRef}>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              </div>
              <button type="submit" class="btn btn-warning">Cập Nhập Món Này #{id}</button>
            </form>
              </div>
              {/* <!--  thêm trc đây  --> */}
            </div>
          </div>

        </>
    );
}