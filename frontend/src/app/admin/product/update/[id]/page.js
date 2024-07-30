"use client";
import axios from 'axios';
import '../../../../globals.css'
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function adminProductUpdate({params}){
  const id = params.id
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
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
      //Du lieu chi tiet san pham show ra form
      // Đặt giá trị ban đầu cho form
      setValue('name', data.name);
      setValue('price', data.price);
      setValue('description', data.description);
      setValue('type', data.type);
      setValue('rating', data.rating);
      setValue('hot', data.hot);
      setValue('brandId', data.brandId);
      setValue('categoryId', data.categoryId);
    };
    if (id) {
      getProductValue();
    }
    getCategories();
    getBrand();
  },[id, setValue])
  // console.log(productValue);

  // xử lý form 
  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (data.img[0]) {
      formData.append('img', data.img[0]);
    }

    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admins/productAdmin/update_product/${id}`,formData)
    const result = res.data;
    if (!result.error) {
      router.push('/admin/product');
    } else {
      // Xử lý hiển thị lỗi
      console.error(result.error);
    }
  };

    return (
        <>
        <div className="container-fluid">
            <div className="row pb-3">
              <h3><strong>Trang Cập Nhập Sản Phẩm #{id} </strong></h3>
              <div className="col-md">
              <form onSubmit={handleSubmit(onSubmit)} >
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Tên Sản Phẩm</label>
                <input type="text" class="form-control" {...register('name', { required: 'Tên sản phẩm là bắt buộc' })} />
                {errors.name && <div className="text-danger">{errors.name.message}</div>}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label fw-bold" >Giá Sản Phẩm</label>
                <input type="number" class="form-control" {...register('price', { required: 'Giá sản phẩm là bắt buộc' })}/>
                {errors.price && <div className="text-danger">{errors.price.message}</div>}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label fw-bold">Mô Tả Sản Phẩm</label>
                <textarea class="form-control"  {...register('description', { required: 'Mô tả sản phẩm là bắt buộc' })} />
                {errors.description && <div className="text-danger">{errors.description.message}</div>}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label fw-bold">Ảnh Sản Phẩm</label><br/>
                <img src={`http://localhost:3000/images/${productValue?.img}`} className=' img-fluid mb-3' width='200px' />
                <input type="file" class="form-control" {...register('img')} />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label fw-bold">Loại Sản Phẩm</label>
                <select className='form-control' {...register('type', { required: 'Giá sản phẩm là bắt buộc' })} >
                  <option value={'food'}>Food</option>
                  <option value={'topping'}>Topping</option>
                </select>
                {errors.type && <div className="text-danger">{errors.type.message}</div>}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label fw-bold">Điểm Sản Phẩm</label>
                <select className='form-control' {...register('rating', { required: 'Giá sản phẩm là bắt buộc' })}  >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
              </select>
              {errors.rating && <div className="text-danger">{errors.rating.message}</div>}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label fw-bold">Sản Phẩm Hot</label>
                <select className='form-control' {...register('hot', { required: 'Giá sản phẩm là bắt buộc' })}>
                  <option value={true}>Hot</option>
                  <option value={false}>!Hot</option>
                </select>
                {errors.hot && <div className="text-danger">{errors.hot.message}</div>}
              </div>
              <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label fw-bold">Danh Mục Sản Phẩm</label>
                <select className='form-control' {...register('categoryId', { required: 'Giá sản phẩm là bắt buộc' })}>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && <div className="text-danger">{errors.categoryId.message}</div>}
              </div>
              <div class="mb-3">
              <label for="exampleInputPassword1"  class="form-label fw-bold">Thương Hiệu Sản Phẩm</label>
                <select className='form-control' {...register('brandId', { required: 'Giá sản phẩm là bắt buộc' })}>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                {errors.brandId && <div className="text-danger">{errors.brandId.message}</div>}
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