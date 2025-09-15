export default function DisclaimerCard({
    title = "Disclaimer",
    subtitle = "Subtitle about the disclaimer",
    body = `All data and information is provided “as is” for informational purposes only, and is not intended for trading purposes or financial, investment, tax, legal, accounting or other advice. Please consult your broker or financial representative to verify pricing before executing any trade.`,
    subBody = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    className = "",
}) {
    return (
        <div
            className={[
                // soft peach gradient
                "rounded-xl p-4 shadow-main",
                "bg-gradient-to-b from-[#FFFDFC] via-[#FFF2E8] to-[#FFE7D6]",
                "border border-[#F4E6DB]",
                className,
            ].join(" ")}
            role="note"
            aria-label="Disclaimer"
        >
            <h3 className="mb-2 font-semibold text-black text-base"> {title} </h3>

            <p className="mb-2 font-normal text-black text-xs leading-relaxed">
                {body}
            </p>

            <p className="mb-2 font-semibold text-black text-xs">
                {subtitle}
            </p>

            <p className="text-black text-xs leading-relaxed">
                {subBody}
            </p>
        </div>
    );
}
