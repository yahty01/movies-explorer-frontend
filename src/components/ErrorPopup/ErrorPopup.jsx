import errorImage from '../../images/error.svg';
import './ErrorPopup.scss';

const ErrorMessage = ({ errorMessage }) => {
  return (
    <>
      {errorMessage && (
        <div className='error-popup'>
          <img src={errorImage} className='error-popup__image' alt={errorMessage} />
          <p className='error-popup__message'>{errorMessage}</p>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
