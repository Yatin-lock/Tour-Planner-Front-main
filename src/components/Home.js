import React from 'react';
import Nav from './Nav';
import Carousel from './Carousel';
import Map from './Map';
import ContactUs from './ContactUs';
import FlexBox from './FlexBox';


function Home(){
    return(
        <div style={{width:"80%",margin:"auto"}}>
    <Nav/>
     {/* <Carousel/> */}
     <FlexBox/>
     <Map />
     <ContactUs/>
        </div>
    )
}

export default Home;