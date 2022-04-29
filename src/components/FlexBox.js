import React,{Component} from 'react';
import '../css/FlexBox.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import FlexCard from './FlexCard.js';

class FlexBox extends Component{
    constructor(props){
        super(props);
        this.responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
              }
          };
    }
    render(){
        return(   
            <Carousel
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={{
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
  }}
  ssr={true} // means to render carousel on server-side.
  slidesToSlide={2}
  infinite={true}
  autoPlay={this.props.deviceType !== "mobile" ? true : false}
  autoPlaySpeed={3000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  deviceType={this.props.deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"

>
    
    <div style={{paddingTop:10}}>
      {/* <img src={img2}  alt="..." /> */}
      <FlexCard image={img1}/>
    </div>
    <div style={{paddingTop:10}}>
      <FlexCard image={img1}/>
    </div>
    <div style={{paddingTop:10}}>
    <FlexCard image={img1}/>
    </div>
    <div style={{paddingTop:10}}>
    <FlexCard image={img1}/>
    </div>
    
</Carousel>

        )
    }
}

export default FlexBox;