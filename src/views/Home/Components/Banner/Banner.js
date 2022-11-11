import React, { memo } from 'react';
import { RoeBanner } from './Items/RoeBanner';
import { KaizenBanner } from './Items/KaizenBanner';
import { OokeengaINOBanner } from './Items/OokeengaINOBanner';
import { KeyboardArrowUp, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Slider from 'react-slick';
import { useWindowDimensions } from 'hooks/useWindowDimensions';

export const Banner = memo(() => {
  const slider = React.useRef(null);
  const { width } = useWindowDimensions();

  const goNext = () => slider?.current?.slickNext();
  const goPrev = () => slider?.current?.slickPrev();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    dotsClass: '',
    arrows: false,
    appendDots: (dots) => (
      <div>
        <div className='absolute w-full justify-center md:w-7 flex md:flex-col items-center gap-4 md:top-72 md:right-24'>
          {width >= 768 ? (
            <KeyboardArrowUp className='cursor-pointer' sx={{ color: 'white', fontSize: 36 }} onClick={goPrev} />
          ) : (
            <KeyboardArrowLeft className='cursor-pointer' sx={{ color: 'white', fontSize: 36 }} onClick={goPrev} />
          )}
          <ul className='flex md:flex-col gap-4 cursor-pointer'>{dots}</ul>
          {width >= 768 ? (
            <KeyboardArrowDown className='cursor-pointer' sx={{ color: 'white', fontSize: 36 }} onClick={goNext} />
          ) : (
            <KeyboardArrowRight className='cursor-pointer' sx={{ color: 'white', fontSize: 36 }} onClick={goNext} />
          )}
        </div>
      </div>
    ),
    customPaging: (i) => <div className='h-4 w-4 rounded-full fill-dot' style={{ border: '1px solid #fff' }} />,
  };

  return (
    <Slider ref={slider} {...settings}>
      <div>
        <KaizenBanner />
      </div>
      <div>
        <OokeengaINOBanner />
      </div>
      <div>
        <RoeBanner />
      </div>
    </Slider>
  );
});
