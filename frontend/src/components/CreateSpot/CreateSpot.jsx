import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createNewSpot } from "../../store/spots"
import './CreateSpot.css'


const CreateSpot = () => {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
    const [validate, setValidate] = useState({});
    const dispatch = useDispatch();
    const nav = useNavigate();
    let currUser = useSelector(state => state.session.user)
    //console.log('USER',currUser.id)

    useEffect(()=>{
        let valObj = {};

        if(country.length == 0){
            valObj.country = 'Country field is required'
        }
        if(address.length == 0){
            valObj.address = 'Address field is required'
        }
        if(city.length == 0){
            valObj.city = 'City field is required'
        }
        if(state.length == 0){
            valObj.state = 'State field is required'
        }
        if(lat < -90 || lat > 90){
            valObj.lat = 'Latitude must be within -90 and 90'
        }
        if(lng < -180 || lng > 180){
            valObj.lng = 'Longitude must be within -180 and 180'
        }
        if(name.length > 50){
            valObj.name = 'Name must be less than 50 characters'
        }
        if(description.length == 0){
            valObj.description = 'Description is required'
        }
        if(price < 0 || !price) {
            valObj.price = 'Price per day must be a positive number'
        }
        if(name.length == 0){
            valObj.name = 'Name is required'
        }
        if(previewImage.length == 0){
            valObj.prevImg = 'At least 1 image is required'
        }

        setValidate(valObj);
    },[country, address, city, state, lat, lng, description, name, price, previewImage])


    const onSubmit = async (e) =>{
        e.preventDefault();

        let images = [{
            url: previewImage,
            preview: true
        }]
        let smallImg= [img1,img2,img3,img4]
        smallImg.map(url => {
            if(url){
                images.push({url:url, preview: true})
            }
        })

        console.log('IMAGES ARR', images) //shows arr of imgs

        let spot = {ownerId: currUser, country, address, city, state, lat, lng, description, name, price, SpotImages:images}
        console.log(spot,'SPOT') //has SpotImages with arr of urls

        if(Object.values(validate).length){ //if you have no errors
           console.error('Spot coult not be created')
        }
        let newSpot = await dispatch(createNewSpot(spot))
        if(newSpot && newSpot.id){
            nav(`/spots/${newSpot.id}`)
        }
        if(!newSpot) return
    }

    return(
        <form
            className='spot-form'
            onSubmit={onSubmit}
        >
            <h1>Create a new Spot</h1>
            <h2>Where&apos;s your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation</p>
            <label className='label-container'>
                <div className='name-container'>
                    Country
                    {'country' in validate && (<p className='val'>{validate.country}</p>)}
                </div>
                <input
                    className='input-box full-input'
                    type='text'
                    name='country'
                    value={country}
                    placeholder='Country'
                    onChange={(e) => setCountry(e.target.value)}
                />
            </label>
            <label className='label-container'>
                <div className="name-container">
                    Street Address
                    {'address' in validate && (<p className='val'>{validate.address}</p>)}
                </div>
                <input
                    className='input-box full-input'
                    type='text'
                    name='address'
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>
            <div className='city-state-container'>
                <label className='label-container city-container'>
                    <div className="name-container">
                        City
                        {'city' in validate && (<p className='val'>{validate.city}</p>)}
                    </div>
                    <input
                        className="input-box city-state-input"
                        type='text'
                        name='city'
                        value={city}
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                    />,
                </label>
                <label className='label-container state-container'>
                    <div className="name-container">
                        State
                        {'state' in validate && (<p className='val'>{validate.state}</p>)}
                    </div>
                    <input
                        className="input-box city-state-input"
                        type='text'
                        name='state'
                        value={state}
                        placeholder="STATE"
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
            </div>
            <div className='lat-lng-container lat-lng-box'>
                <label className='label-container'>
                    <div className='name-container'>
                        Latitude
                        {'lat' in validate && (<p className='val'>{validate.lat}</p>)}
                    </div>
                    <input
                        className="input-box"
                        type='text'
                        name='latitude'
                        value={lat}
                        placeholder="Latitude"
                        onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                <label className='label-container'>
                    <div className="name-container">
                        Longitude
                        {'lng' in validate && (<p className='val'>{validate.lng}</p>)}
                    </div>
                    <input
                        className="input-box"
                        type='text'
                        name='longitude'
                        value={lng}
                        placeholder="Longitude"
                        onChange={(e) => setLng(e.target.value)}
                    />
                </label>

            </div>
            <hr></hr>
            <h2>Describe your place to guests</h2>
            <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
            <label>
                <input
                    className="input-box description-box"
                    type='text'
                    name='description'
                    value={description}
                    placeholder="Please write at least 30 characters"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            {'description' in validate && (<p className='val'>{validate.description}</p>)}
            <hr></hr>
            <h2>Create a title for your spot</h2>
            <p>catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
            <label>
                <input
                    className="input-box full-input"
                    type='text'
                    name='name'
                    value={name}
                    placeholder="Name of your spot"
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            {'name' in validate && (<p className='val'>{validate.name}</p>)}
            <hr></hr>
            <h2>Set a base price for your spot</h2>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <label>
                $
                <input
                    className="input-box price-input"
                    type='text'
                    name='price'
                    value={price}
                    placeholder="Price per night (USD)"
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>
            {'price' in validate && (<p className='val'>{validate.price}</p>)}
            <hr></hr>
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot</p>
            <label>
                <input
                    className='input-box url-box'
                    type='text'
                    name='previewImage'
                    value={previewImage}
                    placeholder="Preview Image URL"
                    onChange={(e) => setPreviewImage(e.target.value)}
                />
            </label>
            {'prevImg' in validate && (<p className='val'>{validate.prevImg}</p>)}
            <label className="img-box">
                <input
                    className='input-box url-box'
                    type='text'
                    name='img1'
                    value={img1}
                    placeholder="Image URL"
                    onChange={(e) => setImg1(e.target.value)}
                />
            </label>
            <label className="img-box">
                <input
                    className='input-box url-box'
                    type='text'
                    name='img2'
                    value={img2}
                    placeholder="Image URL"
                    onChange={(e) => setImg2(e.target.value)}
                />
            </label>
            <label className="img-box">
                <input
                    className='input-box url-box'
                    type='text'
                    name='img3'
                    value={img3}
                    placeholder="Image URL"
                    onChange={(e) => setImg3(e.target.value)}
                />
            </label>
            <label className="img-box">
                <input
                    className='input-box url-box'
                    type='text'
                    name='img4'
                    value={img4}
                    placeholder="Image URL"
                    onChange={(e) => setImg4(e.target.value)}
                />
            </label>

           <hr></hr>
           <div className='button-container'>
            <button
                className='create-button'
                type='submit'
                disabled={Object.keys(validate).length > 0}
            >Create Spot</button>
           </div>
        </form>
    )
}

export default CreateSpot;
