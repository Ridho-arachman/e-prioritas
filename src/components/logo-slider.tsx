"use client";
import Image from "next/image";
import Slider from "react-infinite-logo-slider";

const InfiniteLogoSlider = () => {
  return (
    <Slider
      width="250px"
      duration={40}
      pauseOnHover={true}
      blurBorders={true}
      blurBorderColor={"oklch(97% 0.014 254.604)"}
    >
      <Slider.Slide>
        <Image
          width={100}
          height={100}
          src="/logo.svg"
          alt="any"
          className="w-36"
        />
      </Slider.Slide>
      <Slider.Slide>
        <Image
          width={100}
          height={100}
          src="/logo-kelurahan.png"
          alt="any2"
          className="w-36"
        />
      </Slider.Slide>
      <Slider.Slide>
        <Image
          width={100}
          height={100}
          src="/logo.svg"
          alt="any3"
          className="w-36"
        />
      </Slider.Slide>
      <Slider.Slide>
        <Image
          width={100}
          height={100}
          src="/logo-full.svg"
          alt="any4"
          className="w-36"
        />
      </Slider.Slide>
    </Slider>
  );
};

export default InfiniteLogoSlider;
