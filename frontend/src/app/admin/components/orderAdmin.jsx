'use client'
import axios from "axios";
import Link from "next/link";

export default function OrderAdmin(props){

  const deleteItem = async (id) => {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admins/order/delete_order/`+id)
    .then((res) => res.data )
    window.location.reload();
  }


    return (
        <>
        <table className="table">
            <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên Khách Đặt Hàng </th>
                  <th scope="col">Địa Chỉ Khách Đặt Hàng </th>
                  <th scope="col">Tổng Tiền Khách Đặt Hàng </th>
                  <th scope="col">Ngày Lên Đơn Khách Đặt Hàng </th>
                  <th scope="col">Trạng Thái Đơn Khách Đặt Hàng </th>
                  <th scope="col"></th>
                </tr>
            </thead>
            {props.data.map((order,index) => {
               const {  _id , address, status, total, id_user ,orderDetail, day} = order;
               
              return (
                <>
            <tbody className="table-group-divider">
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{id_user.name}</td>
                  <td>{address}</td>
                  <td>{total}</td>
                  <td>{day}</td>
                  <td>{status}</td>
                  <td>
                    <Link href={`/admin/order/${_id}`} className="btn btn-warning me-2" ><i class="fa-solid fa-eye"></i></Link>
                    <buton className="btn btn-danger" onClick={() => deleteItem(_id)} ><i className="fa-solid fa-trash"></i></buton>
                  </td>
                </tr>
            </tbody>
                </>
              );
            })}
        </table>
        {/* <FooterAdmin></FooterAdmin> */}
        </>
    );
}