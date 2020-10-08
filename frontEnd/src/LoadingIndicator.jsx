import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';


const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return ( promiseInProgress && 
        <div
            style={{
              width: '100%',
              height: '100%',
              paddingTop: 250,
              left: 0,
              position: 'fixed',
              display: 'block',
              opacity: 0.7,
              backgroundColor: '#fff',
              zIndex: 99,
              verticalAlign:'middle',
              textAlign: 'center',
            }}
          >
            {/* <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" /> */}
            <Loader type="ThreeDots" color="blue" height="100" width="100" />
        </div>
   );  
}


export default LoadingIndicator;
  