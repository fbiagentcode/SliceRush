export default function FileInput({setImage}){
    return (
        <div className= "text-grey-50 flex flex-col items-center justify-center ">
            <label htmlFor= "image">Change your profile picture:</label>
            <input 
                className= "text-md py-2 px-4 bg-grey-100 rounded-lg text-center"
                type="file"
                name= "image"
                id= "image"
                accept= "image/*"
                onChange= {e => setImage(e.target.files[0])}
            />
        </div>)
}