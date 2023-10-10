import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import axios from 'axios';
import config from '../../config/config';
import { useParams } from 'react-router-dom';
import "./ListingDetail.css";
import Footer from "../Footer/Footer";
import { PiSmileySadBold } from "react-icons/pi";

export default function ListingDetailPage() {

    const [property, setProperty] = useState(null);
    const {property_id} = useParams();

    const fetchListing = async() => {
        try {
            const response = await axios.get(`${config.backendPoint}/real-estate-data`);
            const data = response.data.listings;

            setProperty(data.find((ele) => ele.property_id === Number(property_id)));

        } catch (error) {
            setProperty(null);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchListing();
    }, []);

  return (
    <>
    <Header />
    <div className="detail-page-container">
      {property ? (
        <>
          <div className="image-container">
            <img
              src="/assets/real-estate-detail.jpg"
              alt={"property-detail"}
            />
          </div>

          <div className="property-details">
            {" "}
            <h1>{property.property_name}</h1>
            <div>
              {`${property.description}`} Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Delectus, obcaecati pariatur
              laborum soluta voluptatum nostrum aut illo consectetur
              molestiae. Tempora, sequi recusandae dolore necessitatibus
              temporibus molestiae rerum corrupti, nulla maiores repudiandae
              enim perspiciatis odit, natus accusantium quidem blanditiis
              delectus eum repellat saepe? Numquam quibusdam asperiores
              tenetur fugiat quam consectetur quidem?
            </div>
            <div className="agent-details">
              <h2 className="agent-details-header">Contact</h2>
              <div className="agent-details-content">
                <span className="title">Agent Name: </span>
                <span>Vishal Panchal</span>
                <span className="title">Email:</span>
                <span>vishal65.p@gmail.com</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="error-message">
          <p>Details Unavailable at the moment!</p> <PiSmileySadBold />
        </div>
      )}
    </div>
    <Footer />
  </>
    );
}
