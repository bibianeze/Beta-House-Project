import React, { useState } from "react";
import { useGlobalContext } from "../../../Hooks/useGlobalContext";
import "../../../styles/User Styles/userpropertycardstyles.css";
import { LuSettings2 } from "react-icons/lu";
import { LiaBathSolid } from "react-icons/lia";
import { IoBedOutline } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { ImLocation } from "react-icons/im";
import { GrLink } from "react-icons/gr";
import { IoMdVideocam } from "react-icons/io";
import { AiFillPicture } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
import { formatPrice } from "../../../utils/helpers";

const UserPropertyCardComponent = () => {
  const [propertyList, setpropertyList] = useState(null);
  const { properties, isLoading } = useGlobalContext();
  console.log(properties);

  if (isLoading) {
    return <Loading/>
  }
  if(!isLoading && properties.length < 1){
    return <h1 className="text-success display-5 ">No Properties meet your search</h1>
  }

  return (
    <div>
      {/* Filter/Drop-down */}

      <div className="UserPropertiesFilter container ">
        <div className="UserPropertiesFilter1">
          <p className="UserPropertiesFilter-p">
            <LuSettings2 className="lg-4 " />Filter
          </p>
          <p className="UserPropertiesFilter-p ps-2">
            {" "}
            Showing {properties.length} results
          </p>
        </div>
        <div className="UserPropertiesFilter2 d-flex align-items-center justify-content-center ">
          <p className="UserPropertiesFilter-p">Sort by:</p>

          <select name="" id="" className="bg-white border-0 p-0 mb-3 default">
            <option value="Default">Default </option>
            <option value="Duplex">Price(Lowest-Highest)</option>
            <option value="Duplex">Price(Highest-Lowest)</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="UserPropertiesCard-Container">
        {properties.map((property) => {
          const {
            _id,
            media: { images },
            title,
            price,
            location,
            bedroom, bathroom
          } = property;

          return (
            <div key={_id}>
              <Link to={`/properties/${_id}`}>
                <div className="card shadow-sm border">
                  <div className="featured">Featured</div>

                  <div className="forSale">For sale</div>
                  <div className="properties-image">
                    <img src={images[0]} alt="Properties Image" />
                    <div className="inner-icons">
                      <GrLink className="icon" />

                      <IoMdVideocam className="icon" />

                      <AiFillPicture className="icon" />
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="card-title">{title}</div>

                    <div className="location">
                      <ImLocation />
                      <span style={{ marginLeft: "5px" }}>{location}</span>
                    </div>

                    <div className="bed-toilet">
                      <div className="bedroom">
                        <IoBedOutline className="fs-4" />
                        <span>{bedroom} bedrooms </span>
                      </div>

                      <div className="toilet">
                        <LiaBathSolid className="fs-3" />
                        <span>{bathroom} bathrooms</span>
                      </div>
                    </div>

                    <hr />

                    <div className="price-icon">
                      <div className="price">
                        <span>{formatPrice(price)}</span>
                      </div>

                      <div className="share-like-icons">
                        <HiArrowsRightLeft />
                        <CiShare2 />
                        <CiHeart />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      
    </div>
  );
};

export default UserPropertyCardComponent;
