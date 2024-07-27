"use client";
import useSWR from "swr";
import '../../globals.css'
import ProductAdmin from "../components/productAdmin";

export default function adminProduct(){
  const fetcher = (...args)=>fetch(...args).then((res)=>res.json())

  const {data,error,isLoading}=useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/productAdmin?page=1`, fetcher)

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

    return (
        <>
        <div className="container-fluid">
            <div className="row pb-3">
              <h3><strong>Trang Quản Lý Sản Phẩm <button type="submit" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal"><i className="fa-solid fa-plus" style={{color: "#ffffff"}}></i></button></strong></h3>
              <div className="col-md">
               <ProductAdmin data={data}></ProductAdmin>
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
                <input type="file" class="form-control" />
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