export default function IsLogin(){
    const user = JSON.parse(window.localStorage.getItem("user"))
    if(user === null)
        return false;
    return true;
}

export function CurrentCustomerId(){
    return 1;
}