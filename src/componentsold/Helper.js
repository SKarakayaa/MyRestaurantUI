export default function IsLogin(){
    const user = JSON.parse(window.localStorage.getItem("user"))
    if(user === null)
        return false;
    return true;
}

export function GetCurrentUser(){
    const user = JSON.parse(window.localStorage.getItem("user"));
    if(user !== null)
        return user.session;
    return "";
}

export function CurrentCustomerId(){
    return 1;
}