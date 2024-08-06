'use client'
/* eslint-disable @next/next/no-img-element */
import "../../globals.css";
import Link from "next/link";
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter();
  const emailRef = useRef('')

  const randomPass = (length) =>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  }  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(emailRef.current.value);
    try {
      const data = {
        email: emailRef.current.value,
        passwordNew: randomPass(5)
      }

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/forgotPassword`,data).then((res) => res.data)

      if(res){
        alert('check mail đi ạ !')
        router.push('/login')
      }else{
        alert('đói quá')
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
   <div class="container-lg mt-5">
          <div class="row">
              <div class="col">
                 <img src="https://i.pinimg.com/564x/b8/02/79/b80279f390d911825ba81757c9503dd9.jpg" alt=""></img>
              </div>
              <div class="col pt-5">
                <h2>QUÊN MẬT KHẨU HẢ ?</h2>
                <form onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">NHẬP ĐỊA CHỈ EMAIL </label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        ref={emailRef}
                    />
                  </div>
                <h6 class="text-start mt-3"><Link href="/login">Quay Lại Trang Đăng Nhập</Link></h6>
                  <button type="submit" class="btn btn-warning w-100 rounded-pill mt-3" >Lấy Lại Mật Khẩu</button>
                </form>
                <h6 class="text-center mt-3">Bạn chưa có tài khoản? <Link href="/sigin">ĐĂNG KÝ</Link></h6>
              </div>
          </div>
      </div>

    </>
    );
  }
