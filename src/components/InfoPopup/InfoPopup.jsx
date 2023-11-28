import infoImage from '../../images/success.svg';
import './InfoPopup.scss';

const InfoPopup = ({ infoMessage }) => {
  return (
    <>
      {infoMessage && (
        <div className='info-popup'>
          <img src={infoImage} className='info-popup__image' alt={infoMessage} />
          <p className='info-popup__message'>{infoMessage}</p>
        </div>
      )}
    </>
  );
};

export default InfoPopup;
