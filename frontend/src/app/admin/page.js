/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import "./globals.css";
import axios from "axios";
import ProductCard from "./components/productCard";

export default async function Home() {
  const like = await axios.get('http://localhost:3000/random').then((res)=>res.data)
  return (
    <>
     <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="/images/Asian Food.png" className="d-block " style={{width: "100%", height: "500px"}} alt="..."></img>
                  </div>
                  <div className="carousel-item">
                    <img src="/images/Asian Food 2.png" className="d-block " style={{width: "100%", height: "500px"}} alt="..."></img>
                  </div>
                  <div className="carousel-item">
                    <img src="/images/banner1.png" className="d-block " style={{width: "100%", height: "500px"}} alt="..."></img>
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

        <div className="container-lg mt-5" style={{display: "flex"}}>
            <h2><b>DANH MỤC MÓN ĂN </b> </h2>
            <div className="que"></div>
          </div>
              <div className="container-lg cate ">
                <div className="codinh" data-aos="zoom-in-right" style={{paddingLeft: "20px", paddingBottom: "20px"}}>
                  <div className="card" style={{width: "300px "}}>
                    <img src="/images/logo.png" className="card-img-top" alt="..."></img>
                      <div className="card-body">
                        <a href="#" className="btn">Món Mới</a>
                      </div>
                    </div>
                </div>
                <div className="codinh" data-aos="zoom-in-right" style={{paddingLeft: "20px"}}>
                  <div className="card" style={{width: "300px "}}>
                    <img src="https://i.pinimg.com/564x/da/50/39/da5039c1c834bd8e0b95485a9e19a8ab.jpg" className="card-img-top" alt="..."></img>
                      <div className="card-body">
                        <a href="#" className="btn">Bánh Mì</a>
                      </div>
                    </div>
                </div>
                <div className="codinh" data-aos="zoom-in-right" style={{paddingLeft: "20px"}}>
                  <div className="card" style={{width: "300px "}}>
                    <img src="https://i.pinimg.com/736x/fa/88/d1/fa88d1a20e828e8a153b825d41f424c7.jpg" className="card-img-top" alt="..."></img>
                      <div className="card-body">
                        <a href="#" className="btn">Cà Phê</a>
                      </div>
                    </div>
                </div>
                <div className="codinh" data-aos="zoom-in-right" style={{paddingLeft: "20px"}}>
                  <div className="card" style={{width: "300px "}}>
                    <img src="https://i.pinimg.com/564x/71/be/38/71be38e661f54b84d359cf5bb4250624.jpg" className="card-img-top" alt="..."></img>
                      <div className="card-body">
                        <a href="#" className="btn">Phở</a>
                      </div>
                    </div>
                </div>
                <div className="codinh" data-aos="zoom-in-right" style={{paddingLeft: "20px"}}>
                  <div className="card" style={{width: "300px "}}>
                    <img src="https://i.pinimg.com/564x/30/1a/c8/301ac81dc7b8316c8a8794d8d725a936.jpg" className="card-img-top" alt="..."></img>
                      <div className="card-body">
                        <a href="#" className="btn">Xôi</a>
                      </div>
                    </div>
                </div>
                <div className="codinh" data-aos="zoom-in-right" style={{paddingLeft: "20px"}}>
                  <div className="card" style={{width: "300px "}}>
                    <img src="https://i.pinimg.com/564x/3f/6a/df/3f6adfe26e251551e211bc10aa6dad82.jpg" className="card-img-top" alt="..."></img>
                      <div className="card-body">
                        <a href="#" className="btn">Cơm Tấm</a>
                      </div>
                    </div>
                </div>
              </div>
              {/* < />!-- danh muc --> */}
  
                {/* < />!-- có thể bạn sẽ thích --> */}
                <div className="container-lg mt-5" style={{display: "flex"}}>
                  <h2><b>Có Thể Bạn Sẽ Thích </b> </h2>
                  <div className="que"></div>
                </div>
                
                  <div className="container-lg cate " data-aos="fade-up"
                    data-aos-anchor-placement="bottom-bottom">
                     <ProductCard data={like}></ProductCard>
                  </div>
                </>
                
              );
                }
