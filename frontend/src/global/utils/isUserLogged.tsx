


export default function isUserLogged(){

    const jwtToken = localStorage.getItem("jwtToken");

    return (jwtToken !== "" && jwtToken != null) ? true : false

}