'use client'
import FooterAdmin from "@/app/layout/admin/footerAdmin";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { take } from "@/redux/slices/updateSlice";
import Link from "next/link";

export default function UserAdmin(props){

  const deleteItem = async (id) => {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admins/user/delete_user/`+id)
    .then((res) => res.data )
    window.location.reload();
  }


    return (
        <>
        <table className="table">
            <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên Khách Hàng</th>
                  <th scope="col">Email Khách Hàng</th>
                  <th scope="col">Số Điện Thoại Khách Hàng</th>
                  <th scope="col">Quyền Khách Hàng</th>
                  <th scope="col"></th>
                </tr>
            </thead>
            {props.data.map((user,index) => {
               const {  _id ,name, email, phone, password, permission_user} = user;
               
              return (
                <>
            <tbody className="table-group-divider">
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>0{phone}</td>
                  <td>{permission_user}</td>
                  <td>
                    <Link className="btn btn-warning me-2" href={`/admin/user/update/${_id}`}><i className="fa-solid fa-pen"></i></Link>
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