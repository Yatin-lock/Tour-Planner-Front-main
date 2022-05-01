import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Axios from 'axios';
import '../css/Location.css'
import LocationCard from './LocationCard';
import LoginToCont from '../Error/LoginToCont';
import LoginNav from './LoginNav';
function Location() {
    const params = useParams();
    const [location, setLocation] = useState({});
    const [loadedData, setloadedData] = useState(false);
    const getLoc = () => {
        Axios({
            method: "POST",
            withCredentials: true,
            data: {
                id: params.id
            },
            url: "http://localhost:4000/getLoc"
        })
            .then((res) => {
                setLocation(res.data.data.loc)
                setloadedData(true);
                console.log(location);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [curUser, setUser] = useState("test");
    async function getUser() {
        await Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/getUser"
        })
            .then(res => {
                setisLoggedIn(res.data.loggedIn);
                setUser(res.data.user);
            })
            .catch(err => {
                console.log(err);
                setisLoggedIn(false);
            })
    }
    useEffect(() => {
        getUser()
        getLoc();
    }, [])
    return (
        <div>
            <LoginNav user={curUser}></LoginNav>
            {!isLoggedIn && <LoginToCont />}
            <div className="row col-lg-11 col-sm-12">
                {isLoggedIn && loadedData && <LocationCard name={location.name} description={location.description} id={location.id} user={location.user} url={location.url} />}
            </div>
        </div>
    )
}

export default Location