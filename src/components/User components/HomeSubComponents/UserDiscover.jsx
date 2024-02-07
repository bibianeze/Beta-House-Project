import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../Hooks/useGlobalContext';
// import Carousel from 'react-multi-carousel';
import Slider from "react-slick";
import 'react-multi-carousel/lib/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../styles/User Styles/UserDiscover.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import axios from 'axios';
import Loading from "../../Loading"
import { formatPrice } from "../../../utils/helpers";

const CustomPrevArrow = (props) => (
    <div
      className="custom-arrow custom-prev-arrow"
      onClick={props.onClick}
    >
      <FaLongArrowAltLeft size="40px"/>
    </div>
  );
  
  const CustomNextArrow = (props) => (
    <div
      className="custom-arrow custom-next-arrow"
      onClick={props.onClick}
    >
      <FaLongArrowAltRight size="40px"/>
    </div>
  );


const UserDiscover = () => {
    const {properties, BASE_URL} = useGlobalContext()
    const [discover, setDiscover] = useState(properties);
    const [isLoading, setIsLoading] = useState(true);

    const getProperties = async ()=>{
      try {
        const {data} = await axios(`${BASE_URL}/property`)
        setDiscover(data.properties.slice(0,7))
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        
      }   
    }
      useEffect(() => {
        getProperties();
      }, []);

    

        const settings = {
          // dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
        //   slidesToScroll: 4,
          initialSlide: 1,
          className: "center",
          centerPadding: "60px",
          swipeToSlide: true,
      afterChange: function(index) {
        // console.log(
        //   Slider Changed to: ${index + 1}, background: #222; color: #bada55
        // );
      },
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 425,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 320,
              settings: {
                slidesToShow: 1 ,
                slidesToScroll: 1
              }
            }
          ]
        };

        // const formatPrice = (price) => {
        //   const usd = new Intl.NumberFormatOptions("en-US", {
        //     style: currency,
        //     currency:"USD"
        //   })
        //   return usd(price)
        // }
        if (isLoading) {
          return <Loading/>
        }

  return (
    <section className='userdiscover-cover mt-5 '>
        <h1 className='text-center discoverH1' >Discover Our Popular Properties</h1>
            {/* <CustomPrevArrow/> */}
            <Slider {...settings} className=' mt-5 '>
            {discover.map((dis)=>{
                const {_id, media: {images}, title, location, price, bedroom, bathroom, squareFeet} = dis ;
                return (
                  <div className="cards" key={_id}>
                    <img src={images[0]} alt={title} />
                    <div className="card-bottom">
                      <h4>{title}</h4>
                      <h4>{formatPrice(price)}</h4>
                      <div className="features">
                        <p>{bedroom}</p>
                        <div className="userdiscover-line"></div>
                        <p>{bathroom}</p>
                        <div className="userdiscover-line"></div>
                        <p>{squareFeet}</p>
                      </div>
                      <div className="location">
                        <MdLocationOn size={22} />
                        <span>{location}</span>
                      </div>
                    </div>
                  </div>
                );
            })}
            </Slider>
            {/* <CustomNextArrow/> */}
    </section>
  )
}
// }
export default UserDiscover