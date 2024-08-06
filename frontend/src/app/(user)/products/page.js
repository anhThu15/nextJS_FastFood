'use client';
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import "../../globals.css";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const brand = await axios.get('http://localhost:3000/admins/brandAdmin',{ revalidate: 3600 }).then((res)=>res.data);
      const productsData = await Promise.all(
        brand.map(async (br) => {
          const products = await axios.get(`http://localhost:3000/products/food/${br._id}`,{ revalidate: 3600 }).then((res) => res.data);
          return { brand: br.name, products };
        })  
      );
      setProducts(productsData);
    }
    
    async function fetchCategorys() {
      const res = await axios.get('http://localhost:3000/admins/categoryAdmin',{ revalidate: 3600 }).then((res)=>res.data)
      setCategorys(res);
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
    {products.map((data) => {
        const { brand, products } = data;
        return (
          <>

          <div key={products._id}>
            <div className="container-lg" style={{ display: 'flex' }}>
              <h2>
                <b>DANH MỤC MÓN ĂN CỦA {brand}</b>
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
      })}
    </>
    );
  }
