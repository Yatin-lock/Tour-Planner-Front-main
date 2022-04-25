import React,{Component} from 'react';
import '../css/FlexBox.css';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';

class FlexBox extends Component{
    render(){
        return(
            <div className="flexbox-container">   
            <div className="flexbox-item item1">
             <img className="flexbox-img "src={img1} />
            </div>
            <div className="flexbox-item item2">
            <img className="flexbox-img "src={img2} />
            </div>
            <div className="flexbox-item item1">
            <img className="flexbox-img"src={img3} />
            </div>
            </div>

        )
    }
}

export default FlexBox;