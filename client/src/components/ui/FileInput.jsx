export default function FileInput({setImage}){
    return (
        <>
            <label htmlFor= "image">Change your profile picture:</label>
            <input 
                type="file"
                name= "image"
                id= "image"
                accept= "image/*"
                onChange= {e => setImage(e.target.files[0])}
            />
        </>)
}