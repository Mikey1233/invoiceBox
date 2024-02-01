  import {signInWithPopup} from 'firebase/auth';
  import { auth,googleProvider } from '../config/firebaseConfig';
  
  const googleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      
    } catch (err) {
      console.log(err);
    }
  };
  export default googleAuth