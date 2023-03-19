import * as React from 'react';


type SnackbarProps={
    isShow:boolean
    message:string
}
const Snackbar:React.FC<SnackbarProps> = ({ isShow,message }) => {
  const [show, setShow] = React.useState(isShow);

  React.useEffect(()=>{setShow(isShow)},[isShow])

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>

      {show && (
        <div className="fixed bottom-0 w-full p-4">
          <div
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm p-2.5 shadow-lg animate-slide-up inline-block"
            style={{ maxWidth: '100%', width: 'fit-content' }}
            onAnimationEnd={handleClose}
          >
            <div className="flex items-center justify-between">
              <div>{message}</div>
              <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M14.348,5.652c-0.389-0.39-1.021-0.39-1.41,0L10,8.59L6.062,4.652c-0.39-0.39-1.021-0.39-1.41,0 c-0.39,0.39-0.39,1.021,0,1.41L8.59,10l-3.938,3.938c-0.39,0.39-0.39,1.021,0,1.41c0.39,0.39,1.021,0.39,1.41,0L10,11.41l3.938,3.938 c0.39,0.39,1.021,0.39,1.41,0c0.39-0.39,0.39-1.021,0-1.41L11.41,10l3.938-3.938C14.738,6.673,14.738,6.042,14.348,5.652z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Snackbar;