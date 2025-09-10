import TG_Button from '@/src/components/ui/buttons/MainButtons';
import Image from 'next/image';
import TractorQuestionsSearchBar from './TractorQuestionsSearchBar';
import TractorQuestionCard from './TractorQuestionCard';
import TractorAddQuestions from './TractorAddQuestion';
import TractorQuestionWrapper from './TractorQuestionWrapper';

const TractorQuestionListing = ({ translation, isMobile }) => {
  return (
    <>
      <section className="mt-[-16px]">
        <div>
          <Image
            src="https://images.tractorgyan.com/uploads/banner_images/faq-desktop-banner.jpg"
            width={980}
            height={250}
            title="tractor ask question banner"
            alt="tractor ask question"
            className="max-h-[271px] w-full rounded-xl"
          />
        </div>
        <div>
          <TractorQuestionWrapper translation={translation} isMobile={isMobile} />
          <div className="mt-6">
            <TractorQuestionCard translation={translation} isMobile={isMobile} />
          </div>
        </div>
      </section>
    </>
  );
};
export default TractorQuestionListing;
