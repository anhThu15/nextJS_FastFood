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
  const [user, setUser] = useState(null);
  useEffect(() =>{
    const getUser = async () => {
       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admins/user/${id}`)
                              .then((res) => res.data)
       setUser(res)
       setValue('name', res.name);
       setValue('email', res.email);
       setValue('phone', res.phone);
       setValue('password', res.password);
       setValue('permission_user', res.permission_user);
      } 
      if(id){
       getUser();
      }
  },[id, setValue])
  // console.log(idCategory);
  // xử lý form 

  const onSubmit = async (data) =>{
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admins/user/update_user/${id}`,data)
                             .then((res)=>res.data)
      if (res) {
        alert('thành công ròi đi chữa lãnh hoy ~~~')
        router.push('/admin/user');
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
                <label for="exampleInputEmail1" class="form-label fw-bold">Tên Khách Hàng</label>
                <input type="text" class="form-control" {...register('name', { required: 'Tên Khách Hàng là bắt buộc' })} />
                {errors.name && <div className="text-danger">{errors.name.message}</div>}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Email Khách Hàng</label>
                <input type="email" class="form-control" {...register('email', { required: 'Email Khách hàng là bắt buộc' })} />
                {errors.email && <div className="text-danger">{errors.email.message}</div>}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Số Điện Thoại Khách Hàng</label>
                <input type="number" class="form-control" {...register('phone', { required: 'Số Điện Thoại Khách hàng là bắt buộc' })} />
                {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label" >Mật Khẩu Khách Hàng</label>
                <input type="password" class="form-control" {...register('password', { required: 'Mật Khẩu Khách hàng là bắt buộc' })} />
                {errors.password && <div className="text-danger">{errors.password.message}</div>}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Quyền Khách Hàng</label>
                <select class="form-control"  {...register('permission_user', { required: 'Quyền Khách hàng là bắt buộc' })}  >
                  <option value={'user'}>Người Dùng</option>
                  <option value={'admin'}>Chủ</option>
                </select>
                {errors.permission_user && <div className="text-danger">{errors.permission_user.message}</div>}
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