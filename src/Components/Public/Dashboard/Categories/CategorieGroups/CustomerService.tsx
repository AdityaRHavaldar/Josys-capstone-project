const CustomerService: React.FC = () => {
  return (
    <div className="w-3/5">
      <ul className="grid grid-cols-3 gap-3 pb-4">
        <li className="hover:underline cursor-pointer">
          See all in Customer service
        </li>
        <li className="hover:underline cursor-pointer">Contact us</li>
        <li className="hover:underline cursor-pointer">Services</li>
        <li className="hover:underline cursor-pointer">
          Track & manage your order
        </li>
        <li className="hover:underline cursor-pointer">Shop by phone</li>
        <li className="hover:underline cursor-pointer">How to shop</li>
        <li className="hover:underline cursor-pointer">FAQs</li>
      </ul>
    </div>
  );
};

export default CustomerService;
