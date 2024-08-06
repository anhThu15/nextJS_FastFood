'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Render({currentItems}){
  const deleteItem = async (id) => {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admins/productAdmin/delete_product/`+id)
    .then((res) => res.data )
    window.location.reload();
  }
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
            { currentItems && currentItems.map((product,index) => {
               const {  _id ,name, img, description ,price, brandId, categoryId} = product;
               
              return (
                <>
            <tbody className="table-group-divider">
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                    <div class="text-left">
                      <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${img}`} width={150} height={150} class="rounded" alt="..."/>
                      <p class="text-start fw-medium mt-2">{name}</p>
                    </div>
                    
                </td>
                <td>{price.toLocaleString()}đ</td>
                <td className="text-break" style={{width:"300px"}}>{description}</td>
                <td className="text-start">{brandId.name}</td>
                <td className="text-start">{categoryId.name}</td>
                <td>
                  <Link className="btn btn-warning me-2" href={`/admin/product/update/${_id}`} ><i className="fa-solid fa-pen"></i></Link>
                  <buton type="buton" className="btn btn-danger" onClick={() => deleteItem(_id)} ><i className="fa-solid fa-trash"></i></buton>
                </td>
              </tr>
            </tbody>
                </>
              );
            })}
        </table>
        </>
    );
}

export default function ProductAdmin({ itemsPerPage }){

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admins/productAdmin`);
      const data = await res.json();
      setItems(data); // Cập nhật state `items` với dữ liệu từ API
    };

    fetchData();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, items, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Render currentItems={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="btn btn-outline-warning"
        pageLinkClassName="page-link"
        previousClassName="btn btn-outline-warning"
        previousLinkClassName="page-link"
        nextClassName="btn btn-outline-warning"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="btn btn-outline-warning"
        breakLinkClassName="page-link"
        containerClassName="btn-group"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );



}