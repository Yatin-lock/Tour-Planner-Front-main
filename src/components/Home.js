import React from 'react';
import Nav from './Nav';
import Carousel from './Carousel';
import Map from './Map';
import ContactUs from './ContactUs';
import FlexBox from './FlexBox';


function Home(){
    return(
        <div>
     <Nav />
     {/* <Carousel/> */}
     <FlexBox/>
     <Map />
     <ContactUs/>
        </div>
    )
}

export default Home;