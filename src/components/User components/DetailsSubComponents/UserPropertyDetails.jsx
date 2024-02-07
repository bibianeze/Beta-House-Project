import React, { useState, useEffect } from "react";
import "../../../styles/User Styles/UserPropertyDetails.css";
import PropdetailImgExtra from "../../../assets/images/propDetailExtra.png";
import MapImg from "../../../assets/images/map.png";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../../Hooks/useGlobalContext";

// Head
import { FaHeart, FaShower } from "react-icons/fa";
import { LuCopyPlus } from "react-icons/lu";
import { FiShare2 } from "react-icons/fi";
import { TfiPrinter } from "react-icons/tfi";
import { GoDotFill, GoClock } from "react-icons/go";
import {
  PiArrowSquareUpRight,
  PiGarageDuotone,
  PiHouseSimpleBold,
} from "react-icons/pi";

// Details Icons
import { LiaBedSolid } from "react-icons/lia";
import { BiCalendarStar } from "react-icons/bi";
import { FaWhatsappSquare } from "react-icons/fa";

import UserPropertyDetailForm from "./UserPropertyDetailForm";
import UserPropertyDetailsRelated from "./UserPropertyDetailsRelated";
import UserShare from "../../UserShare";
import axios from "axios";
import Loading from "../../Loading";
import { formatPrice } from "../../../utils/helpers";

const UserPropertyDetails = () => {
  const [liked, setliked] = useState(false);
  const [share, setShare] = useState(false);
  const { propertyId } = useParams();
  const { properties, BASE_URL } = useGlobalContext();
  const url = `${BASE_URL}/property/${propertyId}`
  const [isLoading, setIsLoading] = useState({})
  const [property, setProperty] = useState({})
  const [similar, setSimilar] = useState([])


  const handleLiked = () => {
    setliked(!liked);
  };
  const handleShare = () => {
    setShare(!share);
  };

  const getProperty = async () =>{
    try {
      const {data} = await axios (url)
      setProperty(data.property)
      setSimilar(data.similarProperties)
      setIsLoading(false)
    } catch (error) {
    console.log(error);
    }
  }

  useEffect(()=>{
    window.scroll({
      top: 0,
      behavior: "smooth",
    })
    getProperty()
  }, [propertyId])
  if(isLoading){
    return <Loading/>
  }

  return (
    <div>
      <div className="UserPropertyDetailsContainer overflow-x-hidden container w-100 py-5">
        <div className="UserPropertyDetailsWrapper w-100 ">
          <div className="d-flex justify-content-between">
            <div>
              <h2 className="fs fs-3">{property.title}</h2>
              <p>{property.location}</p>
              <div className="d-flex  gap-lg-3 gap-2 flex-wrap  align-items-center  ">
                {property.propertyStatus === "available" && (
                  <p className="text-danger">
                    <GoDotFill />
                    For Sale
                  </p>
                )}

                <p>
                  <GoClock /> 7 Months Ago
                </p>
                <p>
                  <PiArrowSquareUpRight /> {property.squareFeet} sqft
                </p>
              </div>
            </div>

            <div className="d-flex flex-column gap-4 align-items-end ">
              <div className="d-flex gap-2 align-items-center">
                <button
                  className="border bg-white rounded"
                  onClick={handleLiked}
                >
                  <FaHeart
                    className={liked ? " fs-3 p-2  text-danger" : "fs-3 p-2"}
                  />
                </button>
                <div>
                  <button className="rounded border-0" onClick={handleShare}>
                    <FiShare2 className="border p-2 fs-2 rounded" />
                  </button>
                  {share ? <UserShare title={property.title} /> : null}
                </div>
                <button className="border bg-white rounded">
                  <TfiPrinter
                    className="border p-2 fs-2 rounded"
                    onClick={window.print}
                  />
                </button>
              </div>

              <p className="fw-bold UserPropertyDetPrice">
                {formatPrice(property.price)}
              </p>
            </div>
          </div>

          <div className="UserPropertyDetailsImages w-100 d-flex flex-lg-row flex-column gap-3 ">
            <div className="main flex-grow-1 ">
              <img
                src={property.media.images[0]}
                alt="propertydetail Image"
                className="w-100 h-100 object-fit-cover  "
              />
            </div>

            <div className="UserPropertyDetailsExtraImg d-md-flex d-none flex-lg-column flex-md-row gap-2 h-100 position-relative  ">
              <img
                src={property.media.images[1]}
                alt=""
                className="flex-grow-1 object-fit-cover  "
              />
              <img
                src={property.media.images[2]}
                alt=""
                className="flex-grow-1 object-fit-cover "
              />
            </div>
          </div>

          <div className="d-flex flex-lg-row flex-column w-100 gap-4 ">
            <div className="UserPropertyDetailsInfo mt-5 d-flex flex-column">
              <div className="UserPropertyDetailsDetail">
                <h3>Details</h3>

                <div className="my-4 d-grid UserPropertyDetailList">
                  <div className="d-flex gap-2">
                    <LiaBedSolid className="p-2 fs-1 border rounded" />
                    <p className="d-flex flex-column ">
                      <span className="fw-bold">Bed</span>
                      <span>{property.bedroom}</span>
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <FaShower className="p-2 fs-1 border rounded" />
                    <p className="d-flex flex-column ">
                      <span className="fw-bold">Baths</span>
                      <span>{property.bathroom}</span>
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <BiCalendarStar className="p-2 fs-1 border rounded" />
                    <p className="d-flex flex-column ">
                      <span className="fw-bold">Year</span>
                      <span>2022</span>
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <PiGarageDuotone className="p-2 fs-1 border rounded" />
                    <p className="d-flex flex-column ">
                      <span className="fw-bold">Garages</span>
                      <span>{property.garage && "garage"}</span>
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <PiArrowSquareUpRight className="p-2 fs-1 border rounded" />
                    <p className="d-flex flex-column ">
                      <span className="fw-bold">Lot area (sqft)</span>
                      <span> {property.squareFeet}</span>
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <PiHouseSimpleBold className="p-2 fs-1 border rounded" />
                    <p className="d-flex flex-column ">
                      <span className="fw-bold">Type</span>
                      <span>{property.type}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="UserPropertyDetailsOverview mt-5">
                <h3>Overview</h3>

                <p className="mt-3 lh-lg">
                  Welcome to the Comfortable Villa Green located at 178
                  Broadway, Brooklyn. This charming bungalow presents an
                  exceptional opportunity for those seeking a tranquil and
                  stylish retreat in the heart of the city. Nestled amidst the
                  vibrant neighborhood of Brooklyn, this bungalow offers the
                  perfect blend of modern convenience and classic charm. The
                  exterior features a picturesque design with a cozy porch,
                  where you can enjoy your morning coffee while taking in the
                  sights and sounds of the surrounding greenery. Step inside to
                  discover a thoughtfully designed interior that boasts an
                  abundance of natural light and a seamless flow between living
                  spaces. The open-concept layout creates an inviting
                  atmosphere, perfect for both relaxing evenings and
                  entertaining guests. The living room is adorned with large
                  windows that frame views of the lush garden, providing a sense
                  of serenity within the bustling city.
                </p>
              </div>

              <div className="UserPropertyDetailLocation mt-5 ">
                <div className="d-flex gap-4  justify-content-between ">
                  <h3>Location</h3>

                  <p>{property.location}</p>
                </div>

                <img src={MapImg} alt="" className="rounded mt-3 w-100" />
              </div>

              {property.propertyType === "house" && (
                <div className="UserPropertyDetailsFeatures shadow-sm rounded p-2 mt-5  ">
                  <h3 className="p-2">Features</h3>

                  <ul className="d-grid border border-white p-4 rounded-3 gap-1">
                    <li>Air Conditioning</li>
                    <li>Dryer</li>
                    <li>Gym</li>
                    <li>Lawn</li>
                    <li>MIcrowave</li>
                    <li>Outdoor Shower</li>
                    <li>Refrigerator</li>
                    <li>Swimming Pool</li>
                    <li>TV Cable</li>
                    <li>Washer</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="UserPropertyDetailsFormWrapper mt-5 p-2 shadow-sm align-self-start rounded">
              <UserPropertyDetailForm property={property} />
            </div>
          </div>

          <div className="mt-5">
            <UserPropertyDetailsRelated similar={similar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPropertyDetails;
