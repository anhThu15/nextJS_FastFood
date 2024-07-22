import Link from "next/link";
import "../../../app/globals.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

/* eslint-disable @next/next/no-img-element */
export default function ProductCard(props){
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    return(
        <>
        {props.data.map((product) =>{
            const {  _id ,name, img, price, rating} = product;
            return (
                <>
                <div className="codinh" style={{paddingLeft: "20px", paddingBottom: "20px"}}>
                <div className="card" style={{width: "300px "}}>
                <div className="zoom">
                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${img}`} className="card-img-top" alt="..."></img>
                </div>
                <div className="card-body">
                <h5 className="card-title" style={{height:"50px"}} >
                    <p className="nav-link">{name} - {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}  </p>
                </h5>
                <div className="d-flex" style={{height:"30px"}}>
                    {[...Array(Math.floor(product.rating))].map((i)=>{
                        return (<> <i class="fa-solid fa-star" style={{color: "#FFD43B"}}></i> </>);
                    })}
                    {[...Array(5 - Math.floor(product.rating))].map((i)=>{
                        return (<> <i class="fa-regular fa-star" style={{color: "#FFD43B"}}></i> </>);
                    })}
                   
                </div>
                <div className="d-flex">
                    <Link  href={`/products/${_id}`}  className="btn btn-outline-danger w-100 rounded-pill me-2">Chi Tiết</Link>
                    <button onClick={() => dispatch(addToCart({ item: product, quantity: 1 }))} className="btn btn-danger w-100 rounded-pill">THÊM</button>
                </div>
                </div>
                </div>
                </div>
                </>
            );
        })}
        </>
    );
}