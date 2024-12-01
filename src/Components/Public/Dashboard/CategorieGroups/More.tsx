const More: React.FC = () => {
  return (
    <div className="w-3/5">
      <ul className="grid grid-cols-3 gap-3 pb-4">
        <li className="hover:underline cursor-pointer">Currently at IKEA</li>
        <li className="hover:underline cursor-pointer">Join IKEA Family</li>
        <li className="hover:underline cursor-pointer">Bulk orders</li>
        <li className="hover:underline cursor-pointer">Our stores</li>
        <li className="hover:underline cursor-pointer">Swedish Restaurant</li>
        <li className="hover:underline cursor-pointer">
          Download the IKEA app
        </li>
        <li className="hover:underline cursor-pointer">Design your room</li>
        <li className="hover:underline cursor-pointer">Sustainable living</li>
        <li className="hover:underline cursor-pointer">
          Design your space with AI-powered IKEA Kreativ
        </li>
      </ul>
    </div>
  );
};

export default More;
