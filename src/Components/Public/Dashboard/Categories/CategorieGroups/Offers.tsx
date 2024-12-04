const Offers: React.FC = () => {
  return (
    <div className="w-3/5">
      <ul className="grid gap-2 pb-4">
        <li className="hover:underline cursor-pointer">All Offers</li>
        <li className="hover:underline cursor-pointer">New lower price</li>
        <li className="hover:underline cursor-pointer">Our lowest price</li>
      </ul>
    </div>
  );
};

export default Offers;
