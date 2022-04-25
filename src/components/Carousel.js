import React,{Component} from 'react';
import img1 from '../images/img1.jpg';
import '../css/Carousel.css';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
class Carousel extends Component{
    render(){
        return(
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={img1} class="d-block w-100 img-cls" alt="..." />
    </div>
    <div class="carousel-item">
      <img src={img2} class="d-block w-100 img-cls" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={img3} class="d-block w-100 img-cls" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        )
    }
}

export default Carousel;