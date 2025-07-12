import FaceFrownIcon from "@heroicons/react/24/solid/FaceFrownIcon";

function NotFoundPage() {
  const style404 = {
  fontSize: '150px',
  color: '#008B62',
  textShadow: 
   '1px 1px 1px #00593E,2px 2px 1px #00593E,3px 3px 1px #00593E,4px 4px 1px #00593E,5px 5px 1px #00593E, 6px 6px 1px #00593E,7px 7px 1px #00593E, 8px 8px 1px #00593E, 25px 25px 8px rgba(0,0,0, 0.2)'
  }
  return (
    <div className="hero h-screen bg-base-200">
      <div className="hero-content text-accent text-center">
        <div className="max-w-md">
          <span style={style404}>404</span>
          <h1 className="text-5xl  font-bold">این مسیر انتهایی ندارد</h1>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
