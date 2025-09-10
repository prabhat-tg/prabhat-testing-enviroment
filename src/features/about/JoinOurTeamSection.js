import Image from "next/image";
import Link from "next/link";
import React from "react";

const JoinOurTeamSection = ({ isMobile }) => {
    return (
        <>
            {isMobile ? (<>
                <section className="w-full py-1 px-5">
                    <div className="relative rounded-xl overflow-hidden  flex items-center justify-center min-h-[198px]">
                        {/* Background image */}
                        <Image
                            src="https://images.tractorgyan.com/uploads/120191/6881c3560c7d2-join-our-team-mobile-background.webp"

                            alt="Join Our Team Background"
                            fill
                            title="Join Our Team Background"
                            className="object-fill object-center "
                        />

                        {/* Overlay content */}
                        <div className="relative z-10 text-center px-2">
                            <h2 className="text-white font-bold text-xl  mb-3">
                                Join our team
                            </h2>
                            <p className="text-white text-xs font-medium  mx-auto mb-3">
                                and contribute to supporting the <br /> farmers of India
                            </p>
                            <Link href="/career">
                                <button className="px-4 py-1 text-sm bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all">
                                    Explore Careers
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </>) :
                (
                    <>
                        <section className="w-full py-1 px-4 sm:px-8 md:px-16 lg:px-24 relative">
                            <div className="relative rounded-xl overflow-hidden min-h-[260px] flex items-center">
                                {/* Background image */}
                                <Image
                                    src="https://images.tractorgyan.com/uploads/120825/68b28eeee4103-Frame-1000006124.webp"
                                    alt="Join Our Team Background"
                                    fill
                                    title="Join Our Team Background"
                                    className="object-cover object-center"
                                />

                                {/* Left Illustration */}
                                <div className="relative z-10 w-28 md:w-48 lg:w-56 ml-6 md:ml-12">
                                    <Image
                                        src="https://images.tractorgyan.com/uploads/120824/68b286a04d1d6-undraw_team_page_re_cffb-1.webp"
                                        alt="Team Illustration"
                                        title="Team Illustration"
                                        width={200}
                                        height={200}
                                        className="w-full h-auto"
                                    />
                                </div>

                                {/* Overlay content */}
                                <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center -ml-8 md:-ml-48">
                                    <h2 className="text-white font-bold text-3xl mb-3">
                                        Join our team
                                    </h2>
                                    <p className="text-white text-2xl font-medium max-w-xl mx-auto mb-6">
                                        and contribute to supporting the farmers of India
                                    </p>
                                    <Link href="/career">
                                        <button className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all">
                                            Explore Careers
                                        </button>
                                    </Link>
                                </div>

                            </div>

                        </section>

                    </>
                )
            }
        </>

    );
};

export default JoinOurTeamSection;
