const errors = {
    401: {
        status: "Unauthorized",
        msg: "Uh oh, you do not have access to this page."
    },
    404: {
        status: "Not Found",
        msg: "Uh oh, this resource could not be found."
    },
    500: {
        status: "Internal Server Error",
        msg: "Uh oh, something went wrong. Please try again later."
    }
}
export default function Error({code= 500, msg}){
    return <div>
        <h1>{errors[code].status}</h1>
        <p>{msg || errors[code].msg}</p>
    </div>
}