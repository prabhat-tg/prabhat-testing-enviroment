import Image from "next/image";

export const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="prev-arrow absolute bottom-[-4rem] left-[42%] h-7 w-7 -translate-x-1/2 transform cursor-pointer overflow-hidden rounded-full"
      onClick={onClick}
    >
      <Image
        src="https://images.tractorgyan.com/uploads/113917/6699f70b8b797-carousleRightArrow.webp"
        alt="previous-button-icon"
        title="previous-button-icon"
        height={50}
        width={50}
        className="h-full w-full rotate-180"
      />
    </div>
  );
};
