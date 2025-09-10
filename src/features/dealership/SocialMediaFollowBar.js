'use client';

import Image from 'next/image';
import Link from 'next/link';

const SocialMediaFollowBar = ({isMobile}) => {
  const socialIcons = [
    {
      name: 'facebook',
      ellipse: false,
      whiteBorder: true,
      imgUrl: 'https://images.tractorgyan.com/uploads/120236/6883586b7ef3c-facebook-icon.webp',
      link: 'https://www.facebook.com/shreejimotors', // replace with actual URL
    },
    {
      name: 'linkedin',
      ellipse: true,
      whiteBorder: false,
      imgUrl: 'https://images.tractorgyan.com/uploads/120237/6883589b0fea1-green-linkedin-icon.webp',
      link: 'https://www.linkedin.com/company/shreejimotors', // replace with actual URL
    },
    {
      name: 'instagram',
      ellipse: true,
      whiteBorder: false,
      imgUrl: 'https://images.tractorgyan.com/uploads/120238/688358b661a5a-green-instagram-icon.webp',
      link: 'https://www.instagram.com/shreejimotors', // replace with actual URL
    },
    {
      name: 'twitter',
      ellipse: true,
      whiteBorder: false,
      imgUrl: 'https://images.tractorgyan.com/uploads/120239/688358ca95818-green-twitter-icon.webp',
      link: 'https://www.twitter.com/shreejimotors', // replace with actual URL
    },
    {
      name: 'youtube',
      ellipse: true,
      whiteBorder: false,
      imgUrl: 'https://images.tractorgyan.com/uploads/120240/688358e204b6f-green-youtube-icon.webp',
      link: 'https://www.youtube.com/@shreejimotors', // replace with actual URL
    },
  ];

  return (
    <section className='pb-0'>
      <div className="container">

    <div
      className="flex flex-wrap items-center justify-center gap-4 py-5 rounded-lg bg-green-dark-gradient"
     
    >
    <h2 className="text-white text-sm sm:text-base md:text-lg font-semibold text-center w-full sm:w-auto ">
  Follow Shree Ji Motors On Social Media
</h2>


      

      {socialIcons.map(({ name, ellipse, whiteBorder, imgUrl, link }) => (
        <Link
          key={name}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={`
            w-10 h-10 sm:w-12 sm:h-12 
            rounded-full 
            ${whiteBorder ? 'border-2 border-white' : ''} 
            ${ellipse ? 'relative' : ''} 
            flex items-center justify-center
          `}
        >
          {ellipse && (
            <Image
              src="https://images.tractorgyan.com/uploads/120246/68849df0d2a29-white-ellipse.webp"
              alt="Ellipse"
              fill
              className="absolute object-contain"
            />
          )}
          <Image
            src={imgUrl}
            alt={name}
            width={24}
            height={24}
            className="z-10 w-5 h-5 sm:w-6 sm:h-6 object-contain"
          />
        </Link>
      ))}
    </div>
      </div>
    </section>
  );
};

export default SocialMediaFollowBar;
