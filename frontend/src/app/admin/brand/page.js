'use client'
import useSWR from "swr";
import BrandAdmin from "../components/brandAdmin";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function adminBrand(){
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const fetcher = (...args)=>fetch(...args).then((res)=>res.json())
  
  const {data,error,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/brandAdmin`, fetcher)
  
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
    const onSubmit = async (data) =>{
      try {
        // console.log(data);
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        if (data.img[0]) {
          formData.append('img', data.img[0]);
        }
        // console.log(formData);

        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admins/brandAdmin/add_brand`,formData)
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
              <h3><strong>Trang Quản Lý Thương Hiệu <button type="submit" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal"><i className="fa-solid fa-plus" style={{color: "#ffffff"}}></i></button></strong></h3>
              <div className="col-md">
               <BrandAdmin data={data} ></BrandAdmin>
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
            <h4 class="modal-title">Thêm Thương Hiệu Sản Phẩm</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
    
          {/* <!-- Modal body --> */}
          <div class="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Tên Thương Hiệu Sản Phẩm</label>
                <input type="text" class="form-control"  {...register('name', { required: 'Tên danh mục là bắt buộc' })} />
                {errors.name && <div className="text-danger">{errors.name.message}</div>}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Ảnh Thương Hiệu Sản Phẩm</label>
                <input type="file" class="form-control"  {...register('img', { required: 'Hình danh mục là bắt buộc' })} />
                {errors.img && <div className="text-danger">{errors.img.message}</div>}
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