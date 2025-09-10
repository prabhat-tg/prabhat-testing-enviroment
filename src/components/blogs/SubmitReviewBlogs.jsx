"use client";

import React, { useEffect, useState } from "react";
import styles from "./blogsCSS/submitReview.module.css";
import { postData } from "@/src/services/apiMethods";
import { useParams } from "next/navigation";
import Image from "next/image";
import TG_InputField from "../ui/inputs/TG_InputField";

const SubmitReviewBlogs = ({ isMobile, translation, title }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [getReviews, setGetReviews] = useState([]);

  const params = useParams();
  const blogId = params?.id;
  const blogSlug = params?.slug || "";
  const formattedTitle = blogSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // const intlPhoneRegex = /^\+?\d{8,15}$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  const validateField = (name, value) => {
    const updatedErrors = { ...errors };

    if (name === "name") {
      if (!value.trim()) {
        updatedErrors.name =
          translation?.signin?.nameIsRequired || "Name is required";
      } else if (!/^[A-Za-z\s]+$/.test(value.trim())) {
        updatedErrors.name =
          translation?.signin?.nameIsValid || "Name must contain only alphabet";
      } else {
        delete updatedErrors.name;
      }
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!value.trim()) {
        updatedErrors.email =
          translation?.signin?.emailIsRequired || "Email is required.";
      } else if (!emailRegex.test(value.trim())) {
        updatedErrors.email =
          translation?.signin?.emailIsValid ||
          "Enter a valid email like example@mail.com";
      } else {
        delete updatedErrors.email;
      }
    }

    if (name === "phone") {
      if (!value.trim()) {
        updatedErrors.phone =
          translation?.signin?.mobileIsRequired || "Mobile number is required.";
      } else if (!phoneRegex.test(value.trim())) {
        updatedErrors.phone =
          translation?.signin?.mobileIsValid ||
          "Enter a valid 10-digit mobile number.";
      } else {
        delete updatedErrors.phone;
      }
    }

    if (name === "comment") {
      if (!value.trim()) {
        updatedErrors.comment =
          translation?.signin?.commentIsRequired || "Comment is required.";
      } else {
        delete updatedErrors.comment;
      }
    }

    setErrors(updatedErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Mobile number is invalid";
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "Comment is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await postData(`api/review_store`, {
          blog: blogId,
          ...formData,
        });

        if (response.success) {
          setFormData({ name: "", email: "", phone: "", comment: "" });
          setSuccess(true);
          setTimeout(() => setSuccess(false), 10000);
          getAllReviews(); // refresh reviews
        }
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const getAllReviews = async () => {
    try {
      if (!blogId) return;
      const response = await postData(`api/get_blog_review`, { id: blogId });
      setGetReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (blogId) getAllReviews();
  }, [blogId]);

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-section-gray">
      <div className="container">
        {isMobile && (
          <div className="pb-4">
            <h2 className="border-b-3 inline-block border-secondary pb-1 text-lg font-bold leading-6 text-black md:text-2xl">
              {translation.blogs.writeYourCommentAbout} {formattedTitle}
            </h2>
          </div>
        )}

        <div
          className={`p-4 md:pb-[32px] ${
            getReviews?.length < 1 && styles.form_container_get_Reviews
          } ${styles.form_container}`}
        >
          <div className={styles.form_section}>
            {!isMobile && (
              <div className="pb-4">
                <h2 className="border-b-3 inline-block border-secondary pb-1 text-lg font-bold leading-6 text-black md:text-2xl">
                  {translation.blogs.writeYourCommentAbout} {title}
                </h2>
              </div>
            )}

            {success && (
              <div className={styles.success_message}>
                {translation.blogs.reviewHasBeenSubmitted}
              </div>
            )}

            <form onSubmit={handleSubmit}>
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
              <div className="mb-4">
                <TG_InputField
                  name="comment"
                  id="comment"
                  type="textarea"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder={translation.blogs.enterText}
                  label={translation.blogs.writeComment}
                  error={errors.comment}
                  rows={4}
                />
              </div>
              <div className="text-center">
                <button type="submit" className={styles.submit_button}>
                  {translation.buttons.submit}
                </button>
              </div>
            </form>
          </div>

          {/* Reviews Section */}
          {(getReviews?.length > 0 || !isMobile) && (
            <div className={styles.review_section}>
              <div
                className={
                  showAllReviews ? styles.reviews_scroll_container : ""
                }
              >
                {getReviews.length > 0 ? (
                  getReviews
                    .slice(0, showAllReviews ? getReviews.length : 4)
                    .map((review) => {
                      const isExpanded = expandedReviews[review.id];
                      const isLong = review.comment?.length > 100;

                      return (
                        <div key={review.id} className={styles.review_card}>
                          <div className={styles.review_header}>
                            <div className={styles.avatar}>
                              {review.name?.charAt(0) || "U"}
                            </div>
                            <div className={styles.reviewer_name}>
                              {review.name || "Unknown"}
                            </div>
                          </div>
                          <p className={styles.review_content}>
                            {isExpanded || !isLong
                              ? review.comment
                              : `${review.comment?.slice(0, 100)}...`}
                            {isLong && (
                              <span
                                className={styles.see_more}
                                onClick={() => toggleExpand(review.id)}
                              >
                                {isExpanded
                                  ? translation.blogs.showLess
                                  : translation.blogs.showMore}
                              </span>
                            )}
                          </p>
                        </div>
                      );
                    })
                ) : (
                  <div className="w-full">
                    <Image
                      src={
                        isMobile
                          ? "https://images.tractorgyan.com/uploads/119699/685509fe9ea3b-Review-Image-Mob.webp"
                          : "https://images.tractorgyan.com/uploads/119689/685503d591575-Review-Image-(1).webp"
                      }
                      alt="Review Image"
                      width={isMobile ? 729 : 774}
                      height={isMobile ? 417 : 451}
                    />
                  </div>
                )}
              </div>

              {getReviews.length > 4 && (
                <div className="pt-2 text-center">
                  <button
                    className={styles.submit_button}
                    onClick={() => setShowAllReviews(!showAllReviews)}
                  >
                    {showAllReviews
                      ? translation.blogs.showLess
                      : translation.blogs.showMore}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubmitReviewBlogs;
