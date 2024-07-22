/* eslint-disable react-hooks/rules-of-hooks */
'use client';
/* eslint-disable @next/next/no-img-element */
import "../../../globals.css";
import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function down() {
//  `${process.env.NEXT_PUBLIC_API_URL}/products`
//  `${process.env.NEXT_PUBLIC_API_URL}/admins/category`
const [products, setProducts] = useState([]);
const [categorys, setCategorys] = useState([]);
const [sortOption, setSortOption] = useState('asc');

useEffect(() => {
  async function fetchProducts() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`,{ revalidate: 3600 }).then((res)=>res.data);
    setProducts(res);
  }
  
  async function fetchCategorys() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admins/category`,{ revalidate: 3600 }).then((res)=>res.data)
    setCategorys(res);
  }
  fetchProducts();
  fetchCategorys();
}, []);

const down = (products) => {
  return [...products].sort((b,a) => {
    if(sortOption === 'asc'){
      return a.price - b.price
    }else{
      return b.price - a.price
    }
  })
}

  return (
    <>
     <div class="container-fluid xich p-0 ">    
            <div class="container-fluid to" >
                <section class="container" style={{color: 'black'}}>
                    <h5 class="navBanner">
                    <CategoryCard data={categorys}></CategoryCard>
                    </h5>
                </section>
            </div>
      </div>
          <div>
            <div className="container-lg" style={{ display: 'flex' }}>
              <h2>
                <b>Kết Quả Lọc Sản Phẩm Có Giá Giảm Dần <i class="fa-solid fa-down-long" style={{color: "#FFD43B"}}></i></b>
              </h2>
              {/* <div className="que"></div> */}
            </div>
            <br />
            <div className="container-lg cate">
              <ProductCard data={down(products)} />
            </div>
          </div>
    </>
    );
  }
