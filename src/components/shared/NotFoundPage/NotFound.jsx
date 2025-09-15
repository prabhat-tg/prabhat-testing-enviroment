import Image from "next/image";
import Link from "next/link";
import TG_LinkButton from "../../ui/buttons/TgLinkButton";
export default function
    ({ currentLang, translation }) {
    return (
        <section className="pt-2.5">
            <div className="container">
                <div className="flex md:flex-row flex-col-reverse items-center md:gap-10 mx-auto md:py-10 md:max-w-6xl">
                    <div className="max-md:text-center">
                        <p className="text-black text-sm md:text-base">Page Not Found</p>
                        <h1 className="mt-3 md:mt-4 font-semibold md:text-[32px] text-3xl leading-snug">
                            <span className="text-green-lightest">Sorry!</span>{" "}
                            <span>this page</span>
                            <br />
                            <span>isn’t available!</span>
                        </h1>
                        <p className="mt-3 md:mt-4 max-w-xl text-black text-sm md:text-base">
                            Please confirm if you have entered the correct URL or try going back to
                            home to start afresh!
                        </p>
                        <div className="mt-3 md:mt-4">
                            <TG_LinkButton
                                variant="primary"
                                title={currentLang === "hi" ? "होम पेज पर जाएं" : "Go to Homepage"}
                                href="/"
                                className='bg-green-lightest max-md:mx-auto rounded-lg w-[220px] md:w-[262px]'
                            >
                                {currentLang === "hi" ? "होम पेज पर जाएं" : "Go to Homepage"}
                            </TG_LinkButton>
                        </div>
                        <p className="mt-3 md:mt-4 text-black text-sm">
                            If the problem still persists, please{" "}
                            <Link href="/our-contacts" className="pr-1 text-blue-link underline underline-offset-2">
                                contact us
                            </Link>
                            to report an issue with the website.
                        </p>
                    </div>
                    <div className="relative mx-auto w-full max-w-[520px]">
                        <Image
                            src="https://images.tractorgyan.com/uploads/120801/68b051a9d44ee-page-not-found.webp"
                            height={500}
                            width={500}
                            alt={currentLang === "hi" ? "पेज नहीं मिला" : "Page not found illustration"}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

