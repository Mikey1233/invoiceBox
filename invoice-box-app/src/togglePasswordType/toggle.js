import openEye from "../assets/openEye.svg";
import closedEye from "../assets/closedEye.svg";
const togglePasswordType = (check, ref,imgref,setOpenPassword) => {
    if (check) {
      ref.current.type = "password";
      setOpenPassword(false);
      imgref.current.src = closedEye

    } else {
      ref.current.type = "text";
      setOpenPassword(true);
      imgref.current.src = openEye
    }
  };
  export default togglePasswordType