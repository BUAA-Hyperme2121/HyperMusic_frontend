export function selectLabel() {
    console.log("select");
}
export function getJWT() {
    console.log("getHWT!");
    if (localStorage.getItem("loginInfo") == null) {
        
        return -1;
      }
      else {
        let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
        return jwt;
      }
}