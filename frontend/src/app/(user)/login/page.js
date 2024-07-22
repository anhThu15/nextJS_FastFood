'use client'
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import "../../globals.css";
import Link from "next/link";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async  (e) =>{
    e.preventDefault();
    try {
      const data = {
        email: emailRef.current.value,
        password : passwordRef.current.value
      }
      // console.log(data);
      
      const userData = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`,data)
      // console.log(userData);
      
      if(userData.data.status === 1){
        dispatch(login(userData))
        alert('đăng nhập thành công')
        router.push('/');
      }else{
        alert('sai ròi ')
      }
      
    }catch (error) {
      console.error('Login failed:', error);
    }
    
  };
  // const user = useSelector((state) => state.user)
  // console.log(user.data.data.name);
  
  return (
    <>
   <div class="container-lg mt-5">
          <div class="row">
              <div class="col">
                 <img src="https://i.pinimg.com/564x/b8/02/79/b80279f390d911825ba81757c9503dd9.jpg" alt=""></img>
              </div>
              <div class="col pt-5">
                <h2>ĐĂNG NHẬP</h2>
                <form onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">ĐỊA CHỈ EMAIL</label>
                    <input type="email" class="form-control" ref={emailRef} id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">MẬT KHẨU</label>
                    <input type="password" class="form-control" ref={passwordRef} id="exampleInputPassword1"></input>
                  </div>
                <h6 class="text-start mt-3"><Link href="/sigin">Quên Mật Khẩu ?</Link></h6>
                  <button type="submit" class="btn btn-warning w-100 rounded-pill mt-3">ĐĂNG NHẬP</button>
                </form>
                <h6 class="text-center mt-3">Bạn chưa có tài khoản? <Link href="/sigin">ĐĂNG KÝ</Link></h6>
              </div>
          </div>
      </div>

    </>
    );
  }
