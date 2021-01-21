import SecureLS from "secure-ls";
const AuthHelper = {
  GetCurrentUser: () => {
    var ls = GetSecureLS();
    return ls.get("user");
  },
  SetCurrentUser: (user) => {
    var ls = GetSecureLS();
    ls.set("user", user);
  },
  SetToken: (token) => {
    var ls = GetSecureLS();
    ls.set("token", token);
  },
  GetToken: () => {
    var ls = GetSecureLS();
    return ls.get("token");
  },
  IsLogin: () => {
    var token = window.localStorage.getItem("token");
    return token === "" ? false : true;
  },
};
const GetSecureLS = () => {
  return new SecureLS({
    encodingType: "des",
    isCompression: false,
    encryptionSecret: "myrestaurant",
  });
};
export default AuthHelper;
