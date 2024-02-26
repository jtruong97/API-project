import CreateSpot from "./CreateSpot";

const CreateSpotForm = () => {
    const spot = {
        country:'',
        address:'',
        city:'',
        state:'',
        lat:'',
        lng:'',
        description:'',
        name:'',
        price:'',
       SpotImages:[]
    //    previewImage:'',
    //    img1: '',
    //    img2: '',
    //    img3: '',
    //    img4: '',
    }
    let buttonName = 'Create Spot'
    return(
        <>
            <h1 className='form-header'>Create a New Spot</h1>
            <CreateSpot spot={spot} buttonName={buttonName}/>
        </>
    )
}

export default CreateSpotForm;
