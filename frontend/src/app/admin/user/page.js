'use client'
import useSWR from "swr";
import UserAdmin from "../components/userAdmin";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function adminUser(){
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const fetcher = (...args)=>fetch(...args).then((res)=>res.json())
  
  const {data,error,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/user`, fetcher)
  
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

    // xử lý form
    const onSubmit = async (data) => {
      try {
        // console.log(data);
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admins/user/add_user`,data)
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
              <h3><strong>Trang Quản Lý Khách Hàng <button type="submit" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal"><i className="fa-solid fa-plus" style={{color: "#ffffff"}}></i></button></strong></h3>
              <div className="col-md">
                <UserAdmin data={data}></UserAdmin>
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
            <h4 class="modal-title">Thêm Khách Hàng</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
    
          {/* <!-- Modal body --> */}
          <div class="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Tên Khách Hàng</label>
                <input type="text" class="form-control" {...register('name', { required: 'Tên Khách hàng là bắt buộc' })} />
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
              <button type="submit" class="btn btn-warning">Gửi</button>
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