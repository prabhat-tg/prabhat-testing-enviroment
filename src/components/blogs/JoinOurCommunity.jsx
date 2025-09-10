"use client";
import React from "react";
import Image from "next/image";
import styles from "./blogsCSS/join_our_community.module.css";

const JoinOurCommunity = () => {
  const socialPlatforms = [
    {
      name: "Google News",
      icon: "/static_images/blogs/google-news-tractorgyan.png",
      followers: null,
      link: "#",
      buttonText: "Click To Follow The TractorGyan Blog On",
      className: styles.googleNews,
      iconClassName: styles.googleNewsIcon,
    },
    {
      name: "Instagram",
      icon: "https://images.tractorgyan.com/uploads/117999/67b46cae03911-Instagram.webp",
      followers: "45.7K",
      followersLabel: "Followers",
      link: "#",
      buttonText: "Follow TractorGyan on",
      className: styles.instagram,
      iconClassName: styles.instagramIcon,
    },
    {
      name: "Youtube",
      icon: "https://images.tractorgyan.com/uploads/118002/67b46ff35f214-Youtube.webp",
      followers: "235K",
      followersLabel: "Subscribers",
      link: "#",
      buttonText: "Subscribe TractorGyan",
      className: styles.youtube,
      iconClassName: styles.youtubeIcon,
    },
    {
      name: "Facebook",
      icon: "https://images.tractorgyan.com/uploads/117998/67b46c43e3416-Facebook.webp",
      followers: "628K",
      followersLabel: "Followers",
      link: "#",
      buttonText: "Follow TractorGyan on",
      className: styles.facebook,
      iconClassName: styles.facebookIcon,
    },
    {
      name: "Twitter",
      icon: "https://images.tractorgyan.com/uploads/118001/67b46fb47e1b7-X.webp",
      followers: "985",
      followersLabel: "Followers",
      link: "#",
      buttonText: "Follow TractorGyan on",
      className: styles.twitter,
      iconClassName: styles.twitterIcon,
    },
    // {
    //   name: "WhatsApp",
    //   icon: "/whatsapp.svg",
    //   followers: "45.7K",
    //   followersLabel: "Followers",
    //   link: "#",
    //   buttonText: "Follow TractorGyan on",
    //   className: styles.whatsapp,
    //   iconClassName: styles.whatsappIcon,
    // },
    {
      name: "Linked In",
      icon: "https://images.tractorgyan.com/uploads/118000/67b46f6e496ca-Linkedin.webp",
      followers: "235K",
      followersLabel: "Subscribers",
      link: "#",
      buttonText: "Follow TractorGyan on",
      className: styles.linkedIn,
      iconClassName: styles.linkedInIcon,
    },
  ];

  return (
    <div className={styles.communityContainer}>
      <h2 className={styles.communityTitle}>Join our Community</h2>
      <div className={styles.platformsGrid}>
        {socialPlatforms?.map((platform, index) => (
          <a
            key={index}
            href={platform.link}
            className={`${styles.platformCard} ${
              platform?.name === "Google News" ? styles.google_news_head : ""
            } ${platform.className}`}
          >
            {platform?.name != "Google News" && (
              <div className={styles.platformContent}>
                <div className={styles.platformIconWrapper}>
                  <div
                    className={`${styles.platformIcon} ${platform.iconClassName}`}
                  >
                    <Image
                      src={platform.icon}
                      alt={platform.name}
                      title={platform.name}
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
                <div className={styles.platformInfo}>
                  <div className={styles.platformButtonText}>
                    {platform.buttonText}
                  </div>
                  <div className={styles.platformName}>{platform.name}</div>
                </div>
                {/* {platform.followers && (
                  <div className={styles.platformFollowers}>
                    <div className={styles.followersCount}>
                      {platform.followers}
                    </div>
                    <div className={styles.followersLabel}>
                      {platform.followersLabel}
                    </div>
                  </div>
                )} */}
              </div>
            )}
            {platform?.name === "Google News" && (
              <div className={styles.Google_news_img_container}>
                <Image
                  src={platform.icon}
                  width={260}
                  height={75}
                  alt="google news icon"
                />
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default JoinOurCommunity;
