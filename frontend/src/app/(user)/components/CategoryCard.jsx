import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function CategoryCard(props){
    return(
        <>
        {props.data.map((cate) =>{
            const {  _id ,name} = cate;
            return (
                <>
                    <Link href={`/category/${_id}`}  class="fw-bold me-5 nav-link ">{name}</Link>
                </>
            );
        })}
        </>
    );
}