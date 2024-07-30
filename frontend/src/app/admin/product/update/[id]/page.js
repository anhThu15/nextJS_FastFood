"use client";
import axios from 'axios';
import '../../../../globals.css'
import { useEffect, useRef, useState } from "react";

export default function adminProductUpdate({params}){
  const id = params.id
  const [brands , setBrands] = useState([])
  const [categories , setCategories] = useState([])
  const [productValue, setProductValue] = useState(null)
  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admins/categoryAdmin`);
      const data = res.data;
      setCategories(data);
    };
    const getBrand = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admins/brandAdmin`);
      const data = res.data;
      setBrands(data);
    };
    const getProductValue = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product_detail/${id}`);
      const data = res.data;
      setProductValue(data);
    };
    getCategories();
    getBrand();
    getProductValue();
  },[])
  console.log(productValue);

    return (
        <>
        <div className="container-fluid">
            <div className="row pb-3">
              <h3><strong>Trang Cập Nhập Sản Phẩm #{id} </strong></h3>
              <div className="col-md">
              <form >
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Tên Sản Phẩm</label>
                <input type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Giá Sản Phẩm</label>
                <input type="number" class="form-control"/>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Mô Tả Sản Phẩm</label>
                <textarea class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Ảnh Sản Phẩm</label>
                <input type="file" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Loại Sản Phẩm</label>
                <select className='form-control' >
                  <option value={'food'}>Food</option>
                  <option value={'topping'}>Topping</option>
              </select>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Điểm Sản Phẩm</label>
                <select className='form-control' >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
              </select>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Sản Phẩm Hot</label>
                <select className='form-control'>
                  <option value={true}>Hot</option>
                  <option value={false}>!Hot</option>
              </select>
              </div>
              <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Danh Mục Sản Phẩm</label>
              <select className='form-control'>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              </div>
              <div class="mb-3">
              <label for="exampleInputPassword1"  class="form-label">Thương Hiệu Sản Phẩm</label>
              <select className='form-control'>
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