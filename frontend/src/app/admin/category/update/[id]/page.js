"use client";
import { useRouter } from 'next/navigation';
import '../../../../globals.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function adminCategoryUpdate({params}){
  const id = params.id
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  useEffect(() =>{
    const getCategory = async () => {
       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admins/categoryAdmin/${id}`)
                              .then((res) => res.data)
       setCategory(res)
       setValue('name', res.name);
      } 
      if(id){
       getCategory();
      }
  },[id, setValue])
  // console.log(idCategory);
  // xử lý form 

  const onSubmit = async (data) =>{
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admins/categoryAdmin/update_category/${id}`,data)
                             .then((res)=>res.data)
      if (res) {
        alert('thành công ròi đi chữa lãnh hoy ~~~')
        router.push('/admin/category');
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
              <h3><strong>Trang Cập Nhập Danh Mục Sản Phẩm #{id} </strong></h3>
              <div className="col-md">
              <form onSubmit={handleSubmit(onSubmit)}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Tên Danh Mục Sản Phẩm</label>
                <input type="text" class="form-control" {...register('name', { required: 'Tên danh mục là bắt buộc' })} />
                {errors.name && <div className="text-danger">{errors.name.message}</div>}
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