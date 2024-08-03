'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import useSWR from "swr";


export default function DetailOrder({params}){
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const id = params.id
const router = useRouter();
const status = useRef('')
const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(status.current.value);
    const statusValue = {
        status : status.current.value
    }
    // console.log(statusValue);
    
    try{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admins/order/update_order/`+id,statusValue)
    const data = res.data
        if(data){
            alert('thành công chuyển trạng thái ròi đó ')
            router.push('/admin/order')
        }else{
            alert('thất bại')
        }
    }catch(e){
        console.log(e);
    }
};

const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/order/${id}`, fetcher,
    {
      refreshInterval: 6000,
    }
  );

  if (error) return <div>Lỗi load dữ liệu.</div>;
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
    return(
        <>
            <div className="card m-5 ">
              <div className="card-header fw-bold">
                Order chi tiết của khách nè #{id}
              </div>
              <form className=" form-control card-body" onSubmit={handleSubmit}>
                <h5 className="card-title">Địa Chỉ: {data.address}</h5>
                <h5 className="card-title">Tổng Tiền: {data.total}</h5>
                <h5 className="card-title">Người Đặt Hàng: {data.id_user.name}</h5>
                <h5 className="card-title">Đơn Đặt Hàng: {data.orderDetail._id}</h5>
                <h5 className="card-title">Trạng Thái:  <br />
                    <select name="" id="" className=" form-control" ref={status} style={{width: 200}} >
                        <option value="wait">Chờ Xử Lý</option>
                        <option value="ship">Giao Hàng</option>
                        <option value="done">Đã Nhận Được Hàng</option>
                    </select>
                </h5>
                <button type="submit" className="btn btn-warning">Đổi Trạng Thái</button>
              </form>
            </div>
        </>
    );
}