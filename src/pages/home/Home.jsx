
import TitlePart from "../../components/titlePart/TitlePart";
import Categories from "../../components/categories/Categories";
import React, {useEffect} from "react";
import SlideShow from "../../components/slideShow/SlideShow";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const notify = (message, type) => {
        const toastType = type === "success" ? toast.success : toast.error
        return toastType(message);
    }

    useEffect(() => {
        if (location.state?.toastMessage !== '') {
            notify(location.state?.toastMessage, 'success');
            navigate(location.pathname, {replace: true, state: {}});
        }
    }, []);


    return (
        <div className="">
            <div className="max-w-[1200px] mx-auto px-10 mt-4 text-center">
                <img className="w-full h-[300px] object-cover"
                     src="https://png.pngtree.com/background/20230527/original/pngtree-modern-highquality-exterior-render-of-a-modern-house-with-glass-windows-picture-image_2766516.jpg"
                     alt="introduce"/>
            </div>
            {/*categories*/}
            <TitlePart title="Danh Mục" subTitle="Lựa Chọn Nhanh Chóng"
                       subDesc="Khám phá đa dạng vô tận: Danh mục định hình thế giới"/>

            <Categories/>
            {/*    */}


            <SlideShow typeSlide='space' typeSpace="Top Rate" titlePart="Không Gian Nổi Trội"/>

            {/**/}
            {/*<div className="h-[300px] w-full mb-100 bg-cover bg-fixed bg-center bg-[url('https://e.khoahoc.tv/photos/image/2016/02/25/thien-nhien-650.jpg')]" >*/}
            {/*    /!*<img className="w-full h-full " src="" alt="" />*!/*/}
            {/*</div>*/}
            {/*feedback*/}

            <SlideShow typeSlide='feedback' titlePart="Phản Hồi Của Khách Hàng" background={true}/>


        </div>
    )
}

export default Home;
