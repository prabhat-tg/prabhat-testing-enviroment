"use client";
import WhatsAppTopButton from "@/src/features/tyreComponents/commonComponents/WhatsAppTopButton";
import { useState } from "react";

const ClickHereClient = ({ translation, currentLang, isMobile }) => {
    const [isShow, setIsShow] = useState(false);

    const handleClick = () => {
        setIsShow(true);
    };

    const handleClose = () => {
        setIsShow(false);
    };

    return (
        <>
            <span onClick={handleClick} className="text-blue-link cursor-pointer">
                {translation?.buttons?.clickHere || 'Click Here'}
            </span>

            {isShow && (
                <WhatsAppTopButton
                    defaultEnquiryType={"Tractor"}
                    translation={translation}
                    currentLang={currentLang}
                    isMobile={isMobile}
                    openEnquiryForm={true}
                    onClose={handleClose}
                />
            )}
        </>
    );
};
export default ClickHereClient;
