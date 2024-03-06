/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const Service = ({ services }) => {
  return (
    <div className="service-content">
      <div className="service-card">
        <h2>{services.service}</h2>
        <p>{services.description}</p>
        <div className="service-details">
          <p>
            <strong>Price:</strong> {services.price}
          </p>
          <p>
            <strong>Provider:</strong> {services.provider}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Services = () => {
  const [serviceList, setServiceList] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/data/service",
        {
            method:"GET"
        }
      );

      if(response.ok){
      const serviceData= await response.json();
      setServiceList(
        serviceData.response
      )
      }
      
    } catch (error) {
      console.log(`error fetching services data ${error}`);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      {serviceList.map((service, index) => (
        <Service key={index} services={service} />
      ))}
    </>
  );
};
