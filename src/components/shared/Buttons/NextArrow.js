import Image from "next/image";
export const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute bottom-[-4rem] right-[42%] h-7 w-7 cursor-pointer rounded-full"
      onClick={onClick}
    >
      <Image
        width={28}
        height={28}
        src="https://images.tractorgyan.com/uploads/113917/6699f70b8b797-carousleRightArrow.webp"
        alt="Next"
        title="Next"
        className="scroll-btn right relatedRightModel"
      />
    </div>
  );
};
