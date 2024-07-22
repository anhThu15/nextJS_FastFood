'use client';
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import "../globals.css";
import useSWR from "swr";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const fetcher = (...args)=>fetch(...args).then((res)=>res.json())
  const {data:like,error,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/random`, fetcher)
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
