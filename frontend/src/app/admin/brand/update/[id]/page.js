"use client";
import { useRouter } from 'next/navigation';
import '../../../../globals.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function adminBrandUpdate({params}){
  const id = params.id
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const [brand, setBrand] = useState(null);
  useEffect(() =>{
    const getBrand = async () => {
       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admins/brandAdminDetail?id=${id}`)
                              .then((res) => res.data)
       setBrand(res)
       setValue('name', res.name);
      } 
      if(id){
       getBrand();
      }
  },[id, setValue])
  // console.log(idCategory);
  // xử lý form 

  const onSubmit = async (data) =>{
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      if (data.img[0]) {
        formData.append('img', data.img[0]);
      }

      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admins/brandAdmin/update_brand/${id}`,formData)
                             .then((res)=>res.data)
      if (res) {
        alert('thành công ròi đi chữa lãnh hoy ~~~')
        router.push('/admin/brand');
      } else {
        // Xử lý hiển thị lỗi
        console.error(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  }


    return (
        <>
        <div className="container-fluid">
            <div className="row pb-3">
              <h3><strong>Trang Cập Nhập Thương Hiệu Sản Phẩm #{id} </strong></h3>
              <div className="col-md">
              <form onSubmit={handleSubmit(onSubmit)}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Tên Thương Hiệu Sản Phẩm</label>
                <input type="text" class="form-control" {...register('name', { required: 'Tên danh mục là bắt buộc' })} />
                {errors.name && <div className="text-danger">{errors.name.message}</div>}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label fw-bold">Ảnh Sản Phẩm</label><br/>
                <img src={`http://localhost:3000/images/${brand?.img}`} className=' img-fluid mb-3' width='200px' />
                <input type="file" class="form-control" {...register('img')} />
              </div>
              <button type="submit" class="btn btn-warning">Cập Nhập Danh Mục Sản Phẩm Này #{id}</button>
            </form>
              </div>
              {/* <!--  thêm trc đây  --> */}
            </div>
          </div>

        </>
    );
}