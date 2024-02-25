import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createNewSpot, updateExistingSpot } from "../../store/spots"

import './CreateSpot.css'


const CreateSpot = ({spot, buttonName}) => {
    let currUser = useSelector(state => state.session.user)
    // const reviews = useSelector(state => {return state.reviewState})

    const [country, setCountry] = useState(''|| spot.country);
    const [address, setAddress] = useState('' || spot.address);
    const [city, setCity] = useState('' ||spot.city);
    const [state, setState] = useState('' || spot.state);
    const [lat, setLat] = useState('' || spot.lat);
    const [lng, setLng] = useState('' || spot.lng);
    const [description, setDescription] = useState('' || spot.description);
    const [name, setName] = useState('' || spot.name);
    const [price, setPrice] = useState('' || spot.price);
    const [previewImage, setPreviewImage] = useState(spot.previewImage || '');

    let imgArr = []
    if(spot.SpotImages){
        spot.SpotImages.map((image) => {
            imgArr.push(image.url)
        })
    }
    const [img1, setImg1] = useState(imgArr[1] || '');
    const [img2, setImg2] = useState(imgArr[2] || '');
    const [img3, setImg3] = useState(imgArr[3] || '');
    const [img4, setImg4] = useState(imgArr[4] || '');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const nav = useNavigate();
    const {spotId} = useParams();

    if(!spot)return
    let checkSpot= Object.values(spot)

    const onSubmit = async (e) =>{
        e.preventDefault();
        setErrors({});

        //errors
        if(!country){
            setErrors(prevErrors => ({
                ...prevErrors,
                country:'Country is required'
            }))
        }
        if(!address){
            setErrors(prevErrors => ({
                ...prevErrors,
                address:'Address is required'
            }))
        }
        if(!city){
            setErrors(prevErrors => ({
                ...prevErrors,
                city:'City is required'
            }))
        }
        if(!state){
            setErrors(prevErrors => ({
                ...prevErrors,
                state:'State is required'
            }))
        }
        if(lat < -90 || lat > 90){
            setErrors(prevErrors => ({
                ...prevErrors,
                lat:'Latitude must be within -90 and 90'
            }))
        }
        if(lng < -180 || lng > 180){
            setErrors(prevErrors => ({
                ...prevErrors,
                lng:'Longitude must be within -180 and 180'
            }))
        }
        if(description.length < 30){
            setErrors(prevErrors => ({
                ...prevErrors,
                description:'Description needs a minimum of 30 characters'
            }))
        }
        if(!name){
            setErrors(prevErrors => ({
                ...prevErrors,
                name:'Name is required'
            }))
        }
        if(!price){
            setErrors(prevErrors => ({
                ...prevErrors,
                price:'Price is required'
            }))
        }if(price < 0){
            setErrors(prevErrors => ({
                ...prevErrors,
                price:'Price must be positive'
            }))
        }
        if(!previewImage){
            setErrors(prevErrors => ({
                ...prevErrors,
                previewImage: 'Preview image is required'
            }))
        }

        const imgVal = [img1, img2, img3, img4];
        imgVal.forEach((imgVal, index) => {
            if (imgVal && !imgVal.endsWith('.png') && !imgVal.endsWith('.jpg') && !imgVal.endsWith('.jpeg')) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [`img${index + 1}`]: 'Image URL must end in .png, .jpg, or .jpeg'
                }));
            }
        });
        if(!previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg')){
            setErrors(prevErrors => ({
                ...prevErrors,
                previewImage: 'Preview image must end in .png, .jpg, or ,jpeg'
            }))
            throw new Error("Error: Could not create a new spot")
        }


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

        spot = {ownerId: currUser, country, address, city, state, lat, lng, description, name, price, SpotImages:images}

        if(!checkSpot[0]){ //new spot
            let newSpot = await dispatch(createNewSpot(spot))
                .catch(async(res) => {
                    const data = await res.json();
                    if(data?.errors){
                        setErrors(data.errors)
                    }
                })
            if(newSpot && newSpot.id){
                nav(`/spots/${newSpot.id}`)
            }
            if(!newSpot) return null
        }
        if(checkSpot[0]){ //updating
            let updateSpot = await dispatch(updateExistingSpot(spot, spotId))
            if(updateSpot && updateSpot.id){
                nav(`/spots/current`)
            }
            if(!updateSpot) return
        }
    }

    return(
        <form
            className='spot-form'
            onSubmit={onSubmit}
        >
            <h2>Where&apos;s your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation</p>
            <label className='label-container'>
                <div className='name-container'>
                    Country
                    { errors.country && (<span className='val'>{errors.country}</span>)}
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
                    {errors.address && (<span className='val'>{errors.address}</span>)}
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
                        {errors.city && (<span className='val'>{errors.city}</span>)}
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
                        {errors.state && (<span className='val'>{errors.state}</span>)}
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
                        {errors.lat && (<span className='val'>{errors.lat}</span>)}
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
                        {errors.lng && (<span className='val'>{errors.lng}</span>)}
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
            {errors.description && (<span className='val'>{errors.description}</span>)}
            <hr></hr>
            <h2>Create a title for your spot</h2>
            <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
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
            {errors.name && (<span className='val'>Name is required</span>)}
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
            {errors.price && (<span className='val'>{errors.price}</span>)}
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
            {'previewImage' in errors && (<span className='val'>{errors.previewImage}</span>)}
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
            {'img1' in errors && (<span className='val'>{errors.img1}</span>)}
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
            {'img2' in errors && (<span className='val'>{errors.img2}</span>)}
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
            {'img3' in errors && (<span className='val'>{errors.img3}</span>)}
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
            {'img4' in errors && (<span className='val'>{errors.img4}</span>)}

           <hr></hr>
           <div className='button-container'>
            <button
                className='create-button'
                type='submit'
                disabled={Object.keys(errors).length > 0}
            >{buttonName}</button>
           </div>
        </form>
    )
}

export default CreateSpot;
