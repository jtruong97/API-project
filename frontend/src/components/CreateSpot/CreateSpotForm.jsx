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
    }
    return(
        <>
            <h1 className='form-header'>Create a new Spot</h1>
            <CreateSpot spot={spot}/>
        </>
    )
}

export default CreateSpotForm;
