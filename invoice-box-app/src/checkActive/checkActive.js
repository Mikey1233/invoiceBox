
import { useEffect } from 'react';
import { auth } from '../config/firebaseConfig'; // Adjust path to your Firebase configuration
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

function useAuthRedirect(path) {
    const navigate = useNavigate();

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate(`/${path || ''}`); // Redirect to home page if user is signed in
      }
    });

    return unsubscribe;
  }, [navigate]); // Include navigate as a dependency for cleanup
}

export default useAuthRedirect;
