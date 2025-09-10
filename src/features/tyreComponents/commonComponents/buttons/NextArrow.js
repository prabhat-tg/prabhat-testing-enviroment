import Image from "next/image";

export const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="next-arrow absolute bottom-[-4rem] right-[42%] h-7 w-7 translate-x-1/2 transform cursor-pointer overflow-hidden rounded-full"
      onClick={onClick}
    >
      <Image
        src="https://images.tractorgyan.com/uploads/113917/6699f70b8b797-carousleRightArrow.webp"
        alt="next-button-icon"
        title="next-button-icon"
        height={50}
        width={50}
        className="h-full w-full"
      />
    </div>
  );
};
