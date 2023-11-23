import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useState, useContext, useEffect} from "react";
import Address from "../../components/selectAddress/Address";
import {toast} from "react-toastify";
import * as authService from "../../services/auth"
import AuthContext from "../../context/authProvider";

const Register = () => {
    const {setAuth} = useContext(AuthContext);
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const [hiddenRePassword, setHiddenRePassword] = useState(true)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [address, setAddress] = useState("")
    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [ward, setWard] = useState("")
    const [resetAddress,setResetAddress] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const notify = (message, type) => {
        const toastType = type === "success" ? toast.success : toast.error
        return toastType(message);
    }
    // Set state for navigation register success
    useEffect(() => {
        if (location.state?.toastMessage !== '') {
            notify(location.state?.toastMessage, 'success');
            navigate(location.pathname, {replace: true, state: {}});
        }
    }, []);

    const validationPassword = (oldPass, newPass) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        // Use a regular expression to enforce password strength rules
        const isStrong = passwordRegex.test(password)
        !isStrong && notify("Mật khẩu ít nhất 6 ký tự và báo gồm chữ in hoa, chữ thường, và số!", "error")
        if (oldPass !== newPass) notify("Mật khẩu không trùng khớp, vui lòng nhập lại!", "error");
    }

    const validAddress = () => {
        const arrayAddress = address !== "" ? address.split(",") : []
        if (arrayAddress.length >= 4) {
            setProvince(arrayAddress[3].trim())
            setDistrict(arrayAddress[2].trim())
            setWard(arrayAddress[1].trim())
        } else
            notify("Địa chỉ không được để trống!", "error")
    }

    // handle call api register
    const handleSubmit = async (e) => {
        e.preventDefault();
        validationPassword(password, rePassword);
        validAddress();
        // fetch register
        const registerResponse = await authService.register(name, email, password, province, district, ward, address)
        console.log(registerResponse)
        console.log({name, email, password, province, district, ward, address})
        // check output and display error if has error
        if (registerResponse?.status === 200) {
            setAuth({name, email, password, province, district, ward, address})
            localStorage.setItem('auth',JSON.stringify({name, email, password, province, district, ward, address}));
            navigate('/login', {state: {toastMessage: "Đăng Ký Thành Công!"}});
        } else {
            if (registerResponse?.response?.status === 409) {
                notify("Email đã tồn tại, vui lòng đăng ký bằng email khác!", "error")
            } else {
                console.log(registerResponse?.response)
                notify("Đăng ký thất bại!", "error")
            }
        }
    }


    return (
        <div className="mx-auto grid grid-cols-12">
            <div className="col-span-12  lg:col-span-7 ">
                <form action="" onSubmit={(e) => {
                    handleSubmit(e)
                }} className="pb-12 w-[90%] mx-auto pl-5 pr-5">
                    <h1 className="pt-12 text-4xl text-primaryColor font-bold text-center">Đăng Ký</h1>
                    <div className="w-[400px] h-[200px] mb-9 overflow-hidden mx-auto">
                        <img className="w-full h-full object-cover"
                             src={require('../../assets/images/logoTransparent.png')} alt=""/>
                             </div>
                    <div className="block md:flex md:justify-between">
                        <div className="w-full md:w-[45%] ">
                            <div className="w-full mb-4">
                                <label className="block text-[18px] font-bold text-textBoldColor mb-2"
                                       htmlFor="inputEmail">Email</label>
                                <input className="block w-full pl-4 pr-10 py-3 shadow rounded-xl outline-none"
                                       id="inputEmail"
                                       type="email"
                                       placeholder="email@gmail.com"
                                       pattern=".+@gmail\.com"
                                       title="Vui lòng nhập đúng địa chỉ email với đuôi @gmail.com"
                                       required
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="w-full mb-4">
                                <label className="block text-[18px] font-bold text-textBoldColor mb-2"
                                       htmlFor="inputFullName">Họ Và Tên</label>
                                <input className="block w-full pl-4 pr-10 py-3 shadow rounded-xl outline-none"
                                       id="inputFullName"
                                       type="text"
                                       placeholder="Họ và tên"
                                       required
                                       value={name}
                                       onChange={(e) => setName((e.target.value))}
                                />

                            </div>
                            <div className="relative w-full mb-4">
                                <label className="block text-[18px] font-bold text-textBoldColor mb-2"
                                       htmlFor="inputPassword">Mật Khẩu</label>
                                <div className="w-full">
                                    <input className="block w-full pl-4 pr-10 py-3 shadow rounded-xl outline-none"
                                           id="inputPassword"
                                           type={hiddenPassword ? "password" : "text"}
                                           placeholder="Mật khẩu"
                                           required
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           max={15}
                                    />

                                    {
                                        hiddenPassword ?
                                            <FontAwesomeIcon onClick={() => setHiddenPassword(!hiddenPassword)}
                                                             icon={faEyeSlash}
                                                             className="absolute bottom-4 right-4 hover:cursor-pointer"/> :
                                            <FontAwesomeIcon onClick={() => setHiddenPassword(!hiddenPassword)}
                                                             icon={faEye}
                                                             className="absolute bottom-4 right-4 hover:cursor-pointer"/>
                                    }
                                </div>
                            </div>
                            <div className="relative w-full mb-4">
                                <label className="block text-[18px] font-bold text-textBoldColor mb-2"
                                       htmlFor="inputRePassword">Nhập Lại Mật Khẩu</label>
                                <div className="w-full">
                                    <input className="block w-full pl-4 pr-10 py-3 shadow rounded-xl outline-none"
                                           id="inputRePassword"
                                           type={hiddenRePassword ? "password" : "text"} placeholder="Nhập lại mật khẩu"
                                           required
                                           value={rePassword}
                                           onChange={(e) => setRePassword(e.target.value)}
                                           max={15}
                                    />

                                    {
                                        hiddenRePassword ?
                                            <FontAwesomeIcon onClick={() => setHiddenRePassword(!hiddenRePassword)}
                                                             icon={faEyeSlash}
                                                             className="absolute bottom-4 right-4 hover:cursor-pointer"/> :
                                            <FontAwesomeIcon onClick={() => setHiddenRePassword(!hiddenRePassword)}
                                                             icon={faEye}
                                                             className="absolute bottom-4 right-4 hover:cursor-pointer"/>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-[45%] ">
                            {/* Address */}
                            <Address setAddress={setAddress} setResetAddress={setResetAddress} />

                            <div className="w-full mb-4">
                                <label className="block text-[18px] font-bold text-textBoldColor mb-2"
                                       htmlFor="inputAdress">Địa Chỉ</label>
                                <textarea
                                    className="block w-full h-[100px] pl-4 pr-10 py-3 shadow rounded-xl outline-none"
                                    id="inputAdress"
                                    placeholder="địa chỉ"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" mt-5">
                        <button
                            className=" w-full px-4 py-3 text-xl font-bold text-white bg-primaryColor rounded-2xl shadow-primaryColor hover:shadow-lg hover:opacity-90">Đăng
                            Ký
                        </button>
                    </div>
                    <div className=" mt-5 text-center">
                        <p className="">Đã Có Tài Khoản! <Link to="/login"
                                                               className=" text-primaryColor">Đăng Nhập</Link></p>
                    </div>
                </form>
            </div>
            <div className="h-full hidden md:block lg:block  lg:col-span-5">
                <img
                    className="w-full h-full object-cover"
                    src="https://img.freepik.com/fotos-premium/diseno-hogar-moderno-fondo-jardin-cielo_741910-5826.jpg?w=2000"
                    alt="ảnh nhà"/>
            </div>
        </div>
    )
}

export default Register;