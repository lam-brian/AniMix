import img from "../images/welcome-img.png";

const Welcome = (props) => {
  return (
    <div className="welcome">
      <div>
        <h1>Welcome to MyAnimeFaves!</h1>
        <p>
          Search through our database of animes and favorite the ones you like!
        </p>
      </div>
      <div className="welcome__image">
        <img src={img} alt="umaru" />
      </div>
    </div>
  );
};

export default Welcome;
