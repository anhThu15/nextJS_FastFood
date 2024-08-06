'use client';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';


export default function Info() {
    // Lấy token từ cookie ở browser
    const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    const tokenValue = token?.split('=')[1];
    if (!tokenValue) {
        window.location.href = '/login';
    }
    
    // Lấy thông tin user bằng token
    const [user, setUser] = useState({});
    const [firt, setFirt] = useState(false);
    const [second, setSecond] = useState(false);
    const {register,handleSubmit,formState: { errors }} = useForm();

    const submit = async (data)=>{
        const form ={
            email: user.email,
            passwordNew: data.pass
        }
        // console.log(form);
        
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/changePassword`,form).then((res) => res.data)

        if(res){
            alert('Đổi thành công ròi đó')
        }else{
            alert('đổi k dc ròi')
        }
    };
        

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/detailuser`, {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                },
            });
            const data = await res.json();
            setUser(data);
        };
        getUser();
    }, [tokenValue]);
    

    useEffect(() =>{
        const timer = setTimeout(() => {
            setFirt(true)
        },3000)

        const timer2 = setTimeout(() => {
            setSecond(true)
        },5000)

        return () => {
            clearTimeout(timer)
            clearTimeout(timer2)
        }
    },[])


    return (
        <div className='container' style={{paddingBottom:"100px"}}>
            <h2>Thông tin cá nhân</h2>
            {firt && <div className="alert alert-warning "  role="alert">
              Ê muốn đổi mật khẩu không ?  Nhìn Xuống Dưới !
            </div> }
            <div>
                <p><strong>_id:</strong> {user._id}</p>
                <p><strong>Tên:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            {second &&
            <>
            <div className="alert alert-success "  role="alert">
              Đổi ở đây nha ní
            </div>
            <form action="" className=' form-control w-25' onSubmit={handleSubmit(submit)}>
                <input type="text" className=' form-control' placeholder='Mật Khẩu Mới'
                {...register("pass", {
                    required: "không đổi thì thôi đừng có nhấn =))))",
                    minLength: {
                        value: 5,
                        message: "Phải hơn 5 Ký Tự",
                      },
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: "Phải có ít nhất 1 chữ và 1 số ",
                      },
                    })}
                    />
                {errors.pass && <span className='text-danger'>{errors.pass.message}</span>}    
                <br />
                <button type='submit' className='form-control btn btn-warning' >Đổi</button>
            </form>
            </> 
             
            }
            
        </div>
    );
}

