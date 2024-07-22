'use client';
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import "../../globals.css";
import Link from "next/link";
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Sigin() {
  const nameRef = useRef('');
  const emailRef = useRef('');
  const phoneRef = useRef('');
  const passwordRef = useRef('');
  const router = useRouter();
  const handleSigin = async (e) => {
    e.preventDefault();
    // console.log(nameRef.current.value, emailRef.current.value, phoneRef.current.value, passwordRef.current.value);
    try{
      const data = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        password: passwordRef.current.value
      }

      const siginData = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/sigin`,data)
      // console.log(siginData.data.user);

      if(siginData.data.status === 1){
        alert('đăng ký thành công')
        router.push('/login');
      }else{
        alert('lỗi r nhé làm lợi đi ')
      }


    }catch(error){
      console.error('Login failed:', error);
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
                <h2>ĐĂNG KÝ</h2>
                <form onSubmit={handleSigin}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">HỌ TÊN</label>
                    <input type="text" class="form-control" ref={nameRef} id="name"></input>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">ĐỊA CHỈ EMAIL</label>
                    <input type="email" class="form-control" ref={emailRef}></input>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">SỐ ĐIỆN THOẠI</label>
                    <input type="number" class="form-control" ref={phoneRef}></input>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"  >MẬT KHẨU</label>
                    <input type="password" class="form-control" ref={passwordRef} ></input>
                  </div>
                  <button type="submit" class="btn btn-warning w-100 rounded-pill">ĐĂNG KÝ</button>
                </form>
                <h6 class="text-center mt-3">Trở lại trang đăng nhập  <Link href="/login">ĐĂNG NHẬP</Link></h6>
              </div>
          </div>
      </div>

    </>
    );
  }
