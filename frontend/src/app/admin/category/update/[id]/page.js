"use client";
import '../../../globals.css'

export default function adminCategoryUpdate(){
  const id = useSelector((state) => state.update)
  const router = useRouter();
  const [idCategory, setIdCategory] = useState();
  useEffect(() =>{
    const getIdCategory = async () =>{
      // const name = {}
      const data =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admins/categoryAdmin/update_category/`+id)
                                .then((res) => res.data) 
      setIdCategory(data)
    }
    getIdCategory();
  },[])
  // console.log(idCategory);

// sử lý form dưới đây yup và fromik
const nameRef = useRef();

const validationSchema = Yup.object({
  name: Yup.string().required("Tên Sản Phẩm Không Được Để Trống"),
});

const [formValue, setFormValue] = useState();

const formik = useFormik({
  initialValues: idCategory || {
      name: ''
    },
    validationSchema,
    onSubmit: async (values) =>{
      setFormValue(values)
      const data = {
        name: nameRef.current.value
      }

      console.log(data);

      try {
          const result = await axios
              .post(
                  `${process.env.NEXT_PUBLIC_API_URL}/admins/categoryAdmin/delete_category/`+id ,data
                )
          if (result.status = 1) {
            alert('Thêm danh mục mới thành công ròi đó cậu ~~ giờ đi chữa lành đi')
            router.push('/admin/category');
          } else {
              alert('thất bại')
          }
      } catch (error) {
          console.log(error);
      }
    }
  })
  console.log(formik.values.name);
// kết thúc xử lý form dưới đây yup và fromik

  

    return (
        <>
        <div className="container-fluid">
            <div className="row pb-3">
              <h3><strong>Trang Cập Nhập Danh Mục Sản Phẩm #{id} </strong></h3>
              <div className="col-md">
              <form onSubmit={formik.handleSubmit} >
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Tên Danh Mục Sản Phẩm</label>
                <input type="text" class="form-control" 
                      name="name" 
                      value={formik.values.name} 
                      onChange={formik.handleChange} 
                      ref={nameRef} />
                {formik.errors.name ? (<div className='text-danger'>{formik.errors.name}</div>) : null}
              </div>
              <button type="submit" class="btn btn-warning">Cập Nhập Danh Mục Sản Phẩm Này #{id}</button>
            </form>
              </div>
              {/* <!--  thêm trc đây  --> */}
            </div>
          </div>

        </>
    );
}