'use client';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import Image from 'next/image';
import TractorQuestionsSearchBar from './TractorQuestionsSearchBar';
import TractorQuestionCard from './TractorQuestionCard';
import TG_InputField from '@/src/components/ui/inputs/TG_InputField';
import { useState } from 'react';
import { postData } from '@/src/services/apiMethods';
import TG_SelectField from '@/src/components/ui/inputs/TG_SelectField';

const TractorAddQuestions = ({ translation, isMobile, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: '',
    questions: '',
    category: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const phoneRegex = /^[6-9]\d{9}$/;

  const questionCategories = [
    { value: 'a', label: 'a' },
    { value: 'b', label: 'b' },
    { value: 'c', label: 'c' },
    { value: 'd', label: 'd' },
    { value: 'e', label: 'e' },
  ];

  const handleCategoryChange = e => {
    const selectedValue = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: selectedValue,
    }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const updatedErrors = { ...errors };

    if (name === 'name') {
      if (!value.trim()) {
        updatedErrors.name = translation?.signin?.nameIsRequired || 'Name is required';
      } else if (!/^[A-Za-z\s]+$/.test(value.trim())) {
        updatedErrors.name = translation?.signin?.nameIsValid || 'Name must contain only alphabet';
      } else {
        delete updatedErrors.name;
      }
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!value.trim()) {
        updatedErrors.email = translation?.signin?.emailIsRequired || 'Email is required.';
      } else if (!emailRegex.test(value.trim())) {
        updatedErrors.email =
          translation?.signin?.emailIsValid || 'Enter a valid email like example@mail.com';
      } else {
        delete updatedErrors.email;
      }
    }

    if (name === 'phone') {
      if (!value.trim()) {
        updatedErrors.phone = translation?.signin?.mobileIsRequired || 'Mobile number is required.';
      } else if (!phoneRegex.test(value.trim())) {
        updatedErrors.phone =
          translation?.signin?.mobileIsValid || 'Enter a valid 10-digit mobile number.';
      } else {
        delete updatedErrors.phone;
      }
    }

    if (name === 'comment') {
      if (!value.trim()) {
        updatedErrors.comment = translation?.signin?.commentIsRequired || 'Comment is required.';
      } else {
        delete updatedErrors.comment;
      }
    }

    setErrors(updatedErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Mobile number is invalid';
    }

    if (!formData.comment.trim()) {
      newErrors.comment = 'Comment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await postData(`api/review_store`, {
          ...formData,
        });

        if (response.success) {
          setFormData({ name: '', email: '', phone: '', comment: '' });
          setSuccess(true);
          setTimeout(() => setSuccess(false), 10000);
        }
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Image
          src={`https://staging.tractorgyan.com/smm/icons/iconreview-01.png`}
          className="h-8 w-8"
          width={30}
          height={35}
          alt="review icon"
          title="review icon"
        />
        <h2 className="text-lg font-bold text-black md:text-2xl">Write Your Questions</h2>
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-4">
            <TG_InputField
              name="name"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder={translation.blogs.enterName}
              label={translation.blogs.name}
              error={errors.name}
            />
          </div>
          <div className="mb-4">
            <TG_InputField
              name="email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={translation.blogs.enterEmail}
              label={translation.blogs.email}
              error={errors.email}
            />
          </div>
          <div className="mb-4">
            <TG_InputField
              name="phone"
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="xxxxxxxxxx"
              label={translation.blogs.mobile}
              error={errors.phone}
              prefix="+91"
            />
          </div>
          <div className="mb-6">
            <TG_SelectField
              id="category"
              label={`Select Category`}
              value={formData.category}
              onChange={handleCategoryChange}
              options={questionCategories}
              placeholder={`Select Category`}
              fallback={translation.buttons.Loading}
            />
          </div>
          <div className="mb-3">
            <TG_InputField
              name="question"
              id="question"
              type="textarea"
              value={formData.question}
              onChange={handleChange}
              placeholder={`enter your question`}
              label={`Write Your Question`}
              error={errors.question}
              rows={4}
            />
          </div>
          <div className="flex gap-4">
            <TG_Button>Submit</TG_Button>
            <TG_Button variant="outline" onClick={onCancel}>
              Cancel
            </TG_Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default TractorAddQuestions;
