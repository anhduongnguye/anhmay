import { Link } from "react-router-dom";

function Contact({company}) {
  return (
    <div className="flex border border-gray-300 rounded-3xl gap-x-5 mt-4">
      <div className="w-40 aspect-square overflow-hidden rounded-3xl">
        <img src={company.logo} alt="image.alt" className="w-full h-full object-cover object-center" />
      </div>
      <div className="flex flex-1 flex-col justify-around">
        <h1>Tên: {company.name}</h1>
        <h1>Số diện thoại: {company.phone}</h1>
        <h1>Zalo: {company.zalo}</h1>
        <h1>
          <a href={company.facebook} target="blank">Facebook: Cơ khí Nguyễn May</a>
        </h1>
      </div>
    </div>
  );
}



export default Contact;