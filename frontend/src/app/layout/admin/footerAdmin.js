import "../../globals.css";
import Link from "next/link";

export default function FooterAdmin(){
    return (
        <>
            <div class="btn-toolbar mb-3 float-end" role="toolbar" aria-label="Toolbar with button groups">
              <div class="btn-group me-2" role="group" aria-label="First group">
                <button type="button" class="btn btn-outline-warning">1</button>
                <button type="button" class="btn btn-outline-warning">2</button>
                <button type="button" class="btn btn-outline-warning">3</button>
                <button type="button" class="btn btn-outline-warning">4</button>
              </div>
            </div>
        </>
    );
}