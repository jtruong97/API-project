import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createNewSpot } from "../../store/spots"


const CreateSpot = () => {
    let spot; //={country:'', address:'', city:'', state:'', lat:'', lng:'', description:'', name:'', price:''};
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [previewImage, setPreviewImage] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
    const [validate, setValidate] = useState({});
    const dispatch = useDispatch();
    const nav = useNavigate();

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
        if(price < 0) {
            valObj.price = 'Price per day must be a positive number'
        }
        if(previewImage.length == 0){
            valObj.prevImg = 'At least 1 image is required'
        }

        setValidate(valObj);
    },[country, address, city, state, lat, lng, description, name, price, previewImage, img1, img2, img3, img4])


    const onSubmit = async (e) =>{
        e.preventDefault();
        console.log({
            country, address, city, state, lat, lng, description, name, price, previewImage, img1, img2, img3, img4
        })

        if(Object.values(validate).length === 0 ){ //if you have no errors
            spot = await dispatch(createNewSpot({
                country, address, city, state, lat, lng, description, name, price, spotImages: [previewImage, img1, img2, img3, img4]
            })) //*** spotImg arr is 0 ***
        }
        if(!spot) return
        nav(`/spots/${spot.id}`)
    }

    return(
        <form
            className='spot-form'
            onSubmit={onSubmit}
        >
            <h1>Creat a new Spot</h1>
            <h2>Where&apos;s your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation</p>
            <label>
                Country
                <input
                    type='text'
                    name='country'
                    value={country}
                    placeholder='Country'
                    onChange={(e) => setCountry(e.target.value)}
                />
            </label>
            {'country' in validate && (<p>{validate.country}</p>)}
            <label>
                Street Address
                <input
                    type='text'
                    name='address'
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>
            {'address' in validate && (<p>{validate.address}</p>)}
            <label>
                City
                <input
                    type='text'
                    name='city'
                    value={city}
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                />
            </label>
            {'city' in validate && (<p>{validate.city}</p>)}
            <label>
                State
                <input
                    type='text'
                    name='state'
                    value={state}
                    placeholder="STATE"
                    onChange={(e) => setState(e.target.value)}
                />
            </label>
            {'state' in validate && (<p>{validate.state}</p>)}
            <label>
                Latitude
                <input
                    type='text'
                    name='latitude'
                    value={lat}
                    placeholder="Latitude"
                    onChange={(e) => setLat(e.target.value)}
                />
            </label>
            {'lat' in validate && (<p>{validate.lat}</p>)}
            <label>
                Longitude
                <input
                    type='text'
                    name='longitude'
                    value={lng}
                    placeholder="Longitude"
                    onChange={(e) => setLng(e.target.value)}
                />
            </label>
            {'lng' in validate && (<p>{validate.lng}</p>)}
            <hr></hr>
            <h2>Describe your place to guests</h2>
            <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
            <label>
                <input
                    type='text'
                    name='description'
                    value={description}
                    placeholder="Please write at least 30 characters"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            {'description' in validate && (<p>{validate.description}</p>)}
            <hr></hr>
            <h2>Create a title for your spot</h2>
            <p>catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
            <label>
                <input
                    type='text'
                    name='name'
                    value={name}
                    placeholder="Name of your spot"
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            {'name' in validate && (<p>{validate.name}</p>)}
            <hr></hr>
            <h2>Set a base price for your spot</h2>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <label>
                $
                <input
                    type='text'
                    name='price'
                    value={price}
                    placeholder="Price per night (USD)"
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>
            {'price' in validate && (<p>{validate.price}</p>)}
            <hr></hr>
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot</p>
            <label>
                <input
                    type='text'
                    name='previewImage'
                    value={previewImage}
                    placeholder="Preview Image URL"
                    onChange={(e) => setPreviewImage(e.target.value)}
                />
            </label>
            {'prevImg' in validate && (<p>{validate.prevImg}</p>)}
            <label>
                <input
                    type='text'
                    name='img1'
                    value={img1}
                    placeholder="Image URL"
                    onChange={(e) => setImg1(e.target.value)}
                />
            </label>
            <label>
                <input
                    type='text'
                    name='img2'
                    value={img2}
                    placeholder="Image URL"
                    onChange={(e) => setImg2(e.target.value)}
                />
            </label>
            <label>
                <input
                    type='text'
                    name='img3'
                    value={img3}
                    placeholder="Image URL"
                    onChange={(e) => setImg3(e.target.value)}
                />
            </label>
            <label>
                <input
                    type='text'
                    name='img4'
                    value={img4}
                    placeholder="Image URL"
                    onChange={(e) => setImg4(e.target.value)}
                />
            </label>

           <hr></hr>
           <button
            type='submit'
            disabled={Object.keys(validate).length > 0}
           >Create Spot</button>
        </form>
    )
}

export default CreateSpot;
