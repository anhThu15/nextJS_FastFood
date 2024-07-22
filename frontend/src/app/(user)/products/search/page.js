'use client';
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import "../../../globals.css";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";

export default function SearchProducts(params) {
  console.log(params);
  const [categorys, setCategorys] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchCategorys() {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admins/category`,{ revalidate: 3600 }).then((res)=>res.data)
      setCategorys(res);
    }
    async function fetchProducts() {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search/`+ params.searchParams.keyword,{ revalidate: 3600 }).then((res)=>res.data)
      setProducts(res);
    }
    fetchProducts();
    fetchCategorys();
  }, []);

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
                <b>Kết Quả Tìm Kiếm {params.searchParams.keyword}</b>
              </h2>
              <div className="que"></div>
            </div>
            <br />
            <div className="container-lg cate">
              <ProductCard data={products} />
            </div>
          </div>
    </>
    );
  }
