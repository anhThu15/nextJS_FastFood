import FooterAdmin from "@/app/layout/admin/footerAdmin";

export default function ProductAdmin(props){

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
                <td className="text-center">{brandId.name}</td>
                <td className="text-center">{categoryId.name}</td>
                <td>
                  <button className="btn btn-warning me-2"><i className="fa-solid fa-pen"></i></button>
                  <buton className="btn btn-danger"><i className="fa-solid fa-trash"></i></buton>
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