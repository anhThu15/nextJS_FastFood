/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import "./globals.css";
import axios from "axios";

export default async function Home() {
  const like = await axios.get('http://localhost:3000/random').then((res)=>res.data)
  return (
    <>
    </>                
  );
}
