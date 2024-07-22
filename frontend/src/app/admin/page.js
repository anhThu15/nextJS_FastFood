/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import "../globals.css";
import axios from "axios";
import Link from "next/link";

export default async function Home() {
  return (
    <>
          {/* <!--  hết meu đầu  --> */}
          <div className="container-fluid">
            <div className="row pb-3">
              <h3> <strong>Trang Quản Lý</strong> </h3>
              <div className="col-3" data-aos="flip-left" data-aos-duration="3000">
                <div className="card text-center">
                  <div className="card-body">
                    <p className="card-text"><i className="fa-solid fa-box fa-2xl" style={{color: "#FFD43B"}}></i></p>
                    <h5 className="card-title">Sản Phẩm</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link href="/admin/product" className="btn btn-warning">Quản Lý Sản Phẩm  </Link>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card text-center" data-aos="flip-left" data-aos-duration="3000">
                  <div className="card-body">
                    <p className="card-text"><i className="fa-solid fa-list fa-2xl"></i></p>
                    <h5 className="card-title">Danh Mục</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link href="/admin/category" className="btn btn-warning">Quản Lý Danh Mục</Link>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card text-center" data-aos="flip-left" data-aos-duration="3000">
                  <div className="card-body">
                    <p className="card-text"><i className="fa-regular fa-copyright fa-2xl" style={{color: "#ff0505"}}></i></p>
                    <h5 className="card-title">Thương Hiệu</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link href="/admin/brand" className="btn btn-warning">Quản Lý Thương Hiệu</Link>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card text-center" data-aos="flip-left" data-aos-duration="3000">
                  <div className="card-body">
                    <p className="card-text"><i className="fa-solid fa-cart-shopping fa-2xl" style={{color: "#63E6BE"}}></i></p>
                    <h5 className="card-title">Đơn Hàng</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link href="/admin/order" className="btn btn-warning">Quản Lý Đơn Hàng</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pt-3"  data-aos="fade-up-right" data-aos-duration="3000">
                <div className="card text-center">
                  <div className="card-header">
                    <b>Tổng Đơn Hàng</b> 
                  </div>
                  <div className="card-body">
                    <div id="myChart" style={{maxWidth: '100%', height:'400px'}}></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pt-3"  data-aos="fade-up-left" data-aos-duration="3000">
                <div className="card text-center">
                  <div className="card-header">
                    <b>Số Khách Mua Hàng</b>
                  </div>
                  <div className="card-body">
                    <div id="myChart2" style={{maxWidth: '100%', height:'400px'}}></div>
                  </div>
                </div>
              </div>
              <div className="col pt-3" data-aos="flip-up" >
                <div className="card text-center">
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tên Sản Phẩm</th>
                          <th scope="col">Giá Sản Phẩm</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row"></th>
                          <td colspan="2"></td>
                          <td><a href="#" className="btn ">Xem thêm  </a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* <!--  thêm trc đây  --> */}
            </div>
          </div>
    </>                
  );
}
