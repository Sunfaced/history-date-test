import React, { useState} from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import { correctTimelineData } from './data/newData';
// Import styles
import './styles/main.scss';


function Timeline() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const timeLineLength = correctTimelineData.length - 1;


  return (
    <div className="border-container">
      <Header />
      <Main timeLineLength={timeLineLength} currentIndex={currentIndex} changeIndex={setCurrentIndex} data={correctTimelineData[currentIndex]}/>
    </div>
  );
}

export default Timeline; 