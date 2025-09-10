'use client';
import { useState } from 'react';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import TractorAddQuestions from './TractorAddQuestion';
import TractorQuestionsSearchBar from './TractorQuestionsSearchBar';

const TractorQuestionWrapper = ({ translation, isMobile }) => {
  const [isShowQuestionBox, setIsShowQuestionBox] = useState(false);

  const handleAddQuestion = () => {
    setIsShowQuestionBox(true);
  };

  return (
    <>
      <div className="mt-8 flex justify-between space-x-4">
        <TG_Button onClick={handleAddQuestion}>Add Question</TG_Button>
        <TractorQuestionsSearchBar translation={translation} />
      </div>

      {isShowQuestionBox && (
        <div className="relative mb-6 mt-6 w-full rounded-xl border border-gray-light bg-transparent px-4 py-3 md:w-[50%]">
          <TractorAddQuestions
            translation={translation}
            isMobile={isMobile}
            onCancel={() => setIsShowQuestionBox(false)}
          />
        </div>
      )}
    </>
  );
};

export default TractorQuestionWrapper;
