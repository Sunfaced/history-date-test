import React, { useState, useEffect } from "react";
import "./Main.scss";
import bgImage from "../../assets/Ellipse.png";

import { correctTimelineData } from "../../data/newData"; 
import Slider from "../Footer/Slider/Slider";

const Main = ({ data, changeIndex, currentIndex, timeLineLength }) => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    // Создаем массив точек на основе timeLineLength + 1
    const positions = ['left', 'top-left', 'top-right', 'right', 'bottom-right', 'bottom-left'];
    const newPoints = Array.from({ length: timeLineLength + 1 }, (_, index) => ({
      id: index + 1,
      position: positions[index]
    }));
    setPoints(newPoints);
    console.log(newPoints);
  }, [timeLineLength]);

  return (
    <>
    <main className="main">
      <div className="main__content">
        <div className="points-container">
          <hr className="main__content-vertical-line" />
          <hr className="main__content-horizontal-line" />
          {points.map((point) => (
            <div 
              key={point.id} 
              className={`circle-point ${point.position} ${currentIndex === point.id - 1 ? 'active' : ''}`}
              onClick={() => changeIndex(point.id - 1)}
            >
              <div className="point-number">{point.id}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="main__content-titles">
        <h2 className="main__content-title">{data.firstYear}</h2>
        <h2 className="main__content-title">{data.secondYear}</h2>
      </div>
    </main>
    <Slider timeLineLength={timeLineLength} currentIndex={currentIndex} changeIndex={changeIndex} info={data.info} />
    </>
  );
};

export default Main;
