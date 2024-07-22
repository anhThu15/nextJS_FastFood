import "../../globals.css";
import Link from "next/link";

export default function FooterUser(){
    return (
        <>
        <footer>
                    <div class="container-fluid mt-5 "  >
                      <div class="row" style={{backgroundColor: "#333333"}}>
                        <div class="col hop">
                          <a href=""><img src="/images/tw-removebg-preview.png" width="20px" alt=""></img></a>
                          <a href=""><img src="/images/dc-removebg-preview.png" width="50px" alt="" ></img></a>
                          <a href=""><img src="/images/fb.png" width="20px" alt=""></img></a>
                        </div>
                        <div>
                           <p style={{color: "white" , fontsize: "13px"}} class="mt-3 ms-5">
                            Copyright 2023 Bensussen Deutsch & Associates, LLC. All rights reserved. Use of this site is subject to the BDA Terms of Use.
                            
                            This site is operated by BDA, LLC. All logos, trademarks and brands are property of their respective owners.
                           </p>
                           <p style={{color: "white" , fontsize: "13px"}}  class="mt-3 ms-5">
                            © 2023 Sony Interactive Entertainment Inc.
                            and  are registered trademarks or trademarks of Sony Interactive Entertainment Inc.
                           </p>
                        </div>
                      </div>
                    </div>
          </footer>
        
        
        </>
    );
}