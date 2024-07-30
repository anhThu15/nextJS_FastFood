'use client'
import FooterAdmin from "@/app/layout/admin/footerAdmin";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { take } from "@/redux/slices/updateSlice";

export default function CategoryAdmin(props){
  const dispatch = useDispatch();
  const router = useRouter()

  const deleteItem = async (id) => {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admins/categoryAdmin/delete_category/`+id)
    .then((res) => res.data )
    window.location.reload();
  }

  const updateItem = async (id) => {
    dispatch(take(id))
    router.push('/admin/category/update')
  }


    return (
        <>
        <table className="table">
            <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên Danh Mục Sản Phẩm </th>
                </tr>
            </thead>
            {props.data.map((category,index) => {
               const {  _id ,name} = category;
               
              return (
                <>
            <tbody className="table-group-divider">
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{name}</td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => updateItem(_id)}><i className="fa-solid fa-pen"></i></button>
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