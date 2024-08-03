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
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  // const emailRef = useRef('');
  // const passwordRef = useRef('');
  const router = useRouter();
  const dispatch = useDispatch();
  // const handleSubmit = async  (e) =>{
  //   e.preventDefault();
  //   try {
  //     const data = {
  //       email: emailRef.current.value,
  //       password : passwordRef.current.value
  //     }
  //     // console.log(data);
      
  //     const userData = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`,data)
  //     // console.log(userData);
      
  //     if(userData.data.status === 1){
  //       dispatch(login(userData))
  //       alert('đăng nhập thành công')
  //       router.push('/');
  //     }else{
  //       alert('sai ròi ')
  //     }
      
  //   }catch (error) {
  //     console.error('Login failed:', error);
  //   }
    
  // };
  // const user = useSelector((state) => state.user)
  // console.log(user.data.data.name);
  
  const formik = useFormik({
    initialValues: {
        email: '',
        password: '',
    },
    validationSchema: Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
        password: Yup.string().required('Bắt buộc'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
        try {
            const res = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: values.email, password: values.password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Đăng nhập thất bại');
            }
            // Lưu token vào cookie
            const data = await res.json();
            // localStorage.setItem('token', data.token);
            document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;
            // Chuyển trang theo role
            const token = data.token;
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.permission_user === 'admin') {
                window.location.href=('http://localhost:3001/admin');
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            setFieldError('general', error.message);
        } finally {
            setSubmitting(false);
        }
    },
});


  return (
    <>
   <div class="container-lg mt-5">
          <div class="row">
              <div class="col">
                 <img src="https://i.pinimg.com/564x/b8/02/79/b80279f390d911825ba81757c9503dd9.jpg" alt=""></img>
              </div>
              <div class="col pt-5">
                <h2>ĐĂNG NHẬP</h2>
                <form onSubmit={formik.handleSubmit}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">ĐỊA CHỈ EMAIL</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">MẬT KHẨU</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
                  </div>
                <h6 class="text-start mt-3"><Link href="/sigin">Quên Mật Khẩu ?</Link></h6>
                  <button type="submit" class="btn btn-warning w-100 rounded-pill mt-3" disabled={formik.isSubmitting} >ĐĂNG NHẬP</button>
                    {formik.errors.general ? (
                      <div className="text-danger mt-2">{formik.errors.general}</div>
                    ) : null}
                </form>
                <h6 class="text-center mt-3">Bạn chưa có tài khoản? <Link href="/sigin">ĐĂNG KÝ</Link></h6>
              </div>
          </div>
      </div>

    </>
    );
  }
