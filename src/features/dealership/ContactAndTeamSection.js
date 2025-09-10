'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import TG_InputField from '@/src/components/ui/inputs/TG_InputField';
import TG_SelectField from '@/src/components/ui/inputs/TG_SelectField';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';

const teamMembers = [
  { name: 'John Doe', role: 'Sales Manager', avatar: 'https://images.tractorgyan.com/uploads/120251/6884a7f4134d3-team-1.webp' },
  { name: 'Jane Doe', role: 'Customer Support', avatar: 'https://images.tractorgyan.com/uploads/120252/6884a8078358b-team-2.webp' },
  { name: 'Raj Kumar', role: 'Marketing Head', avatar: 'https://images.tractorgyan.com/uploads/120251/6884a7f4134d3-team-1.webp' },
  { name: 'Anjali Mehra', role: 'Tech Lead', avatar: 'https://images.tractorgyan.com/uploads/120252/6884a8078358b-team-2.webp' },
];

const states = ['Maharashtra', 'Punjab', 'Haryana', 'Gujarat', 'Uttar Pradesh'];
const cities = ['Mumbai', 'Pune', 'Ludhiana', 'Ahmedabad', 'Lucknow'];

const ContactAndTeamSection = ({ translation }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    selectState: '',
    selectCity: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.mobile) errors.mobile = 'Mobile is required';
    if (!formData.selectState) errors.selectState = 'State is required';
    if (!formData.selectCity) errors.selectCity = 'City is required';
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    console.log('Form submitted:', formData);
    setFormData({ name: '', mobile: '', selectState: '', selectCity: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goToPrev = () => setCurrentIndex(prev => (prev <= 1 ? teamMembers.length - 2 : prev - 2));
const goToNext = () => setCurrentIndex(prev => (prev >= teamMembers.length - 2 ? 0 : prev + 2));

  return (
    <section>
      <div className="container">
        <div className="py-4 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-lg p-2 sm:p-8 border border-[#D3DAE0] shadow-main">
                
  <TittleAndCrumbs title="Have More Questions?Contact Us" />

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TG_InputField id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder={translation.enquiryForm.enterName} label={translation.enquiryForm.name} required error={formErrors.name} />
                    <TG_InputField id="userMobile" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} placeholder="xxxxxxxxxx" required maxLength={10} label={translation.enquiryForm.mobile} prefix="+91" error={formErrors.mobile} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TG_SelectField id="selectState" name="selectState" label={translation.enquiryForm.selectState} value={formData.selectState} onChange={handleChange} options={states.map(state => ({ label: state, value: state }))} placeholder="Select State" error={formErrors.selectState} />
                    <TG_SelectField id="selectCity" name="selectCity" label={translation.placeholder.selectCity} value={formData.selectCity} onChange={handleChange} options={cities.map(city => ({ label: city, value: city }))} placeholder="Select City" error={formErrors.selectCity} />
                  </div>
                  <div>
                    <TG_InputField id="message" name="message" type="textarea" value={formData.message} onChange={handleChange} placeholder="Enter Text" label="Write your message" rows={4} />
                  </div>
                  <div className="flex justify-center pt-2">
                    <TG_Button type="submit">Submit Enquiry</TG_Button>
                  </div>
                </form>
              </div>

            {/* Our Team Custom Slider */}
<div className="bg-white rounded-lg p-6 sm:p-8 border border-[#D3DAE0] shadow-main">
 
    <TittleAndCrumbs title="Our Team" />
  <div className="flex justify-center">
    {teamMembers.slice(currentIndex, currentIndex + 2).map((member, index) => (
      <div key={index} className="text-start mx-2">
        <Image src={member.avatar} alt={member.name} width={290} height={337} className="rounded-2xl mb-4 w-72 h-80" />
        <h4 className="font-medium text-xl sm:text-xl text-black">{member.name}</h4>
        <p className="font-normal mt-1 text-sm sm:text-sm text-black">{member.role}</p>
      </div>
    ))}
  </div>
  <div className="mt-6 flex justify-center items-center gap-3">
    <button onClick={goToPrev} className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-sliderIcon" aria-label="Previous">
      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <div className="flex gap-2">
      {Array.from({ length: Math.ceil(teamMembers.length / 2) }).map((_, index) => (
        <button key={index} onClick={() => setCurrentIndex(index * 2)} className={`w-2 h-2 rounded-full transition ${currentIndex / 2 === index ? 'bg-primary scale-125 border border-primary' : 'bg-white border border-gray-light'}`} />
      ))}
    </div>
    <button onClick={goToNext} className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-sliderIcon" aria-label="Next">
      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>




            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactAndTeamSection;
