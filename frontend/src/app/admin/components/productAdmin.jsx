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
            <tbody className="table-group-divider">
              <tr>
                <th scope="row">1</th>
                <td>
                    <div class="text-left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREWbkohh1OFk3hqMiQj09MzeWN4jiJhcRp2A&s" width={150} height={150} class="rounded" alt="..."/>
                      <p class="text-start fw-medium mt-2">Start aligned text on all viewport sizes.</p>
                    </div>
                    
                </td>
                <td>Otto</td>
                <td className="text-break" style={{width:"300px"}}>ss</td>
                <td className="text-center">Otto</td>
                <td className="text-center">Otto</td>
                <td>
                  <button className="btn btn-warning me-2"><i className="fa-solid fa-pen"></i></button>
                  <buton className="btn btn-danger"><i className="fa-solid fa-trash"></i></buton>
                </td>
              </tr>
            </tbody>
        </table>
        </>
    );
}