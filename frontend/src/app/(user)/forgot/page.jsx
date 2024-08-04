'use client'
/* eslint-disable @next/next/no-img-element */
import "../../globals.css";
import Link from "next/link";
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const router = useRouter();

  return (
    <>
   <div class="container-lg mt-5">
          <div class="row">
              <div class="col">
                 <img src="https://i.pinimg.com/564x/b8/02/79/b80279f390d911825ba81757c9503dd9.jpg" alt=""></img>
              </div>
              <div class="col pt-5">
                <h2>QUÊN MẬT KHẨU HẢ ?</h2>
                <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">NHẬP ĐỊA CHỈ EMAIL </label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
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
