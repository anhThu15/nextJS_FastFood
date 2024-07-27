import FooterAdmin from "@/app/layout/admin/footerAdmin";
import axios from "axios";

export default function ProductAdmin(props){

  const deleteItem = async (id) => {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admins/productAdmin/delete_product/`+id)
    .then((res) => res.data )
    window.location.reload();
  }

    return (
        <>
        <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên & Ảnh Sản Phẩm </th>
                <th scope="col">Giá Sản Phẩm</th>
                <th scope="col">Mô Tả Sản Phẩm</th>
                <th scope="col">Danh Mục Sản Phẩm</th>
                <th scope="col">Thương Hiệu Sản Phẩm</th>
                <th scope="col">Hành Động</th>
              </tr>
            </thead>
            {props.data.map((product,index) => {
               const {  _id ,name, img, description ,price, brandId, categoryId} = product;
               
              return (
                <>
            <tbody className="table-group-divider">
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                    <div class="text-left">
                      <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${img}`} width={150} height={150} class="rounded" alt="..."/>
                      <p class="text-start fw-medium mt-2">{name}</p>
                    </div>
                    
                </td>
                <td>{price.toLocaleString()}đ</td>
                <td className="text-break" style={{width:"300px"}}>{description}</td>
                <td className="text-start">{brandId.name}</td>
                <td className="text-start">{categoryId.name}</td>
                <td>
                  <button className="btn btn-warning me-2"><i className="fa-solid fa-pen"></i></button>
                  <buton type="buton" className="btn btn-danger" onClick={() => deleteItem(_id)} ><i className="fa-solid fa-trash"></i></buton>
                </td>
              </tr>
            </tbody>
                </>
              );
            })}
        </table>
        <FooterAdmin></FooterAdmin>
        </>
    );
}