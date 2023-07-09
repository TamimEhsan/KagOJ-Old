import React from "react";
import "../../css/carousel.css";
import Pricing from "./Pricing";
import img from "../../resources/anindya_sir.png";
import zehady from "../../resources/zehady.jpg";
import tamim from "../../resources/tamim.jpg";
import rabib from "../../resources/rabib.png";
import anup from "../../resources/anup.png";
import masum from "../../resources/masum.jpg";
import data from "../../data2.json";
function Carousel2() {
  return (
    <div style={{ width: "100%" }}>
      {/* <Pricing/> */}
      <p class="homepage-para">
        What Guardians & Professionals 
        <br />
        think about us
      </p>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="cards-wrapper">
              <div class="card">
                <div class="card-inner">
                  <img class="img-pic" src="https://buet-edu-1.s3.amazonaws.com/auto_upload/I97my9P8SJhfh4WrtV4CTc8xNo92/1634981274604.png" alt="..." />
                  <div className="name-desg">
                    <p class="name">Guardian</p>

                    <p class="designation"></p>
                  </div>
                </div>
                <div class="card-body">
                  <p class="card-text">
                    {" "}
                    My daughter and her friends love spending time on the app. She often gets excited when she solves a tough one. She also likes comparing her statistics with her friends’ and it has since become a healthy competition
                  </p>
                </div>
              </div>
              <div class="card">
                <div class="card-inner">
                  <img class="img-pic" src="https://buet-edu-1.s3.amazonaws.com/auto_upload/I97my9P8SJhfh4WrtV4CTc8xNo92/1634981274604.png" alt="..." />
                  <div className="name-desg">
                    <p class="name">Guardian</p>

                    <p class="designation"></p>
                  </div>
                </div>
                <div class="card-body">
                  <p class="card-text">
                  It’s nice to see my son busy with something productive during his summer vacation. The interactivity seems very interesting and it seems like he’s having fun
                  </p>
                </div>
              </div>
            </div>
          </div>

          {data &&
            data.map((e) => {
              return (
                <div class="carousel-item" key={e[0].img}>
                  <div class="cards-wrapper">
                    <div class="card">
                      <div class="card-inner">
                        <img class="img-pic" src={e[0].img} alt="..." />
                        <div class="name-desg">
                          <p class="name">{e[0].name}</p>

                          <p class="designation">{e[0].desg}</p>
                        </div>
                      </div>
                      <div class="card-body">
                        <p class="card-text"> {e[0].text}</p>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-inner">
                        <img class="img-pic" src={e[1].img} alt="..." />
                        <div class="name-desg">
                          <p class="name">{e[1].name}</p>

                          <p class="designation">{e[1].desg}</p>
                        </div>
                      </div>

                      <div class="card-body">
                        <p class="card-text">{e[1].text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div class="carousel-indicators" style={{ backgroundColor: "#F5F5FA" }}>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <button
          class="carousel-control-prev btn-1"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next btn-2"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel2;
