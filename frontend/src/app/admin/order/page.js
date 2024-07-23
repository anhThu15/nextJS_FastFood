export default function adminOrder(){
    return (
        <>
        <div className="container-fluid">
            <div className="row pb-3">
              <h3><strong>Trang Quản Lý Khách Hàng <button type="submit" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal"><i className="fa-solid fa-plus" style={{color: "#ffffff"}}></i></button></strong></h3>
              <div className="col-md">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Tên & Ảnh Sản Phẩm </th>
                      <th scope="col">Giá Sản Phẩm</th>
                      <th scope="col">Mô Tả Sản Phẩm</th>
                      <th scope="col">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>
                        <button className="btn btn-warning me-2"><i className="fa-solid fa-pen"></i></button>
                        <buton className="btn btn-danger"><i className="fa-solid fa-trash"></i></buton>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
            <h4 class="modal-title">Thêm Sản Phẩm</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
    
          {/* <!-- Modal body --> */}
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Tên Sản Phẩm</label>
                <input type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Giá Sản Phẩm</label>
                <input type="number" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Mô Tả Sản Phẩm</label>
                <input type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Ảnh Sản Phẩm</label>
                <input type="text" class="form-control" />
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