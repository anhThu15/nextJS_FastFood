/* eslint-disable @next/next/no-img-element */
"use client";
import useSWR from 'swr';
import "../../../globals.css";
import Link from "next/link";
import axios from "axios";
import ProductCard from "@/app/(user)/components/ProductCard";
import CategoryCard from "@/app/(user)/components/CategoryCard";


const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductsByCate({ params}) {
  const { data: sp, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}//productByCate/${params.id}`, fetcher,
    {
      refreshInterval: 6000,
    }
  );
  const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/category`, fetcher, 
    {
    refreshInterval: 6000,
  });
  
  if (error || categoriesError) return <div>Lỗi load dữ liệu.</div>;
  if (isLoading || categoriesLoading) return <div className="custom-loader">Đang tải</div>;

  
  return (
<>
     <div class="container-fluid xich p-0 ">
            <div class="container-fluid to" >
                <section class="container" style={{color: 'black'}}>
                    <h5 class="navBanner">
                    <CategoryCard data={categories}></CategoryCard>
                    </h5>
                </section>
            </div>
      </div>

            <div className="container-lg cate">
              <ProductCard data={sp} />
            </div>

          </>
    );
  }
