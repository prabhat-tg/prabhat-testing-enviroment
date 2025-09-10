import React from 'react';
import Image from 'next/image';
import TG_Button from '@/src/components/ui/buttons/MainButtons';

const TractorQuestionCard = ({ isMobile }) => {
  return (
    <div className="space-y-6">
      <div className="relative w-full rounded-xl border border-gray-light bg-transparent">
        <div className="px-3 py-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-lg font-bold text-black md:text-2xl">
                What types of brakes are used in tractors?
              </h1>
              <p className="text-gray-medium mt-1 text-sm font-medium">Asked By : Chotu Khirdar</p>
            </div>

            {!isMobile && (
              <div className="text-gray-500 flex items-center space-x-8 text-sm">
                <div className="flex items-end space-x-1">
                  <div className="flex items-center space-x-1">
                    <Image
                      src={`https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp`}
                      width={18}
                      height={18}
                      alt="show eye icon small"
                      title="show eye icon small"
                      className="h-3 w-5"
                    />
                    <span className="text-md font-bold text-black">651,324</span>
                  </div>
                  <span className="text-xs text-black">views</span>
                </div>
                <div className="flex items-end space-x-1">
                  <div className="items-base flex space-x-2">
                    <Image
                      src={`https://images.tractorgyan.com/uploads/120265/68872ff6ae287-like-thumb-icon.webp`}
                      width={18}
                      height={18}
                      alt="show eye icon small"
                      title="show eye icon small"
                      className="h-4 w-4"
                    />
                    <span className="text-md font-bold text-black">5,034</span>
                  </div>
                  <span className="text-xs text-black">Likes</span>
                </div>
                <button className="text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                  <div className="flex items-end space-x-1">
                    <div className="flex items-center space-x-1">
                      <Image
                        src={`https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp`}
                        width={18}
                        height={18}
                        alt="show eye icon small"
                        title="show eye icon small"
                        className="h-3 w-5"
                      />
                      <span className="text-md font-bold text-black"></span>
                    </div>
                    <span className="text-xs text-black">Share</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 px-3">
          <div className="mb-4 rounded-xl bg-green-lighter px-4 py-4">
            <p className="mb-1 text-xs text-gray-description">Latest Answer: By Chotu Khirdar</p>
            <p className="text-md font-medium leading-relaxed text-black">
              Student Doctor Network brings together thousands of current and future healthcare
              students and professionals into one community. This section is all about...
              <span className="text-blue-600 cursor-pointer hover:underline"> more</span>
            </p>
            <p className="mb-1 mt-1 text-xs text-gray-description">Replied 1 month ago</p>
          </div>

          <div className="mb-0 flex items-center justify-between space-x-3 md:justify-start">
            <button className="flex items-center space-x-2 rounded-md border border-primary px-8 py-2 text-black transition-colors md:px-4">
              <Image
                src={
                  'https://images.tractorgyan.com/uploads/120264/68872fd63412a-enter-arrow-icon.webp'
                }
                width={14}
                height={12}
                title="enter-arrow-icon"
                alt="enter-arrow-icon"
                className="h-3 w-3"
              />
              <span>Reply</span>
            </button>
            <button className="w-full rounded-md border border-primary px-4 py-2 text-black transition-colors md:w-fit">
              View all Answers
            </button>
          </div>

          {isMobile && (
            <div className="text-gray-500 mt-6 flex items-center justify-between text-sm">
              <div className="flex items-end space-x-1">
                <div className="flex items-center space-x-1">
                  <Image
                    src={`https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp`}
                    width={18}
                    height={18}
                    alt="show eye icon small"
                    title="show eye icon small"
                    className="h-3 w-5"
                  />
                  <span className="text-sm font-bold text-black">651,324</span>
                </div>
                <span className="text-xs text-black">views</span>
              </div>
              <div className="flex items-end space-x-1">
                <div className="items-base flex space-x-2">
                  <Image
                    src={`https://images.tractorgyan.com/uploads/120265/68872ff6ae287-like-thumb-icon.webp`}
                    width={18}
                    height={18}
                    alt="show eye icon small"
                    title="show eye icon small"
                    className="h-4 w-4"
                  />
                  <span className="text-sm font-bold text-black">5,034</span>
                </div>
                <span className="text-xs text-black">Likes</span>
              </div>
              <button className="text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center space-x-1">
                    <Image
                      src={`https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp`}
                      width={18}
                      height={18}
                      alt="show eye icon small"
                      title="show eye icon small"
                      className="h-3 w-5"
                    />
                    <span className="text-md font-bold text-black"></span>
                  </div>
                  <span className="text-xs text-black">Share</span>
                </div>
              </button>
            </div>
          )}

          {/* Comment Section */}
          <div className="pt-4">
            <label className="text-md mb-2 block text-black">Add your comment</label>
            <textarea
              className="w-full resize-none rounded-md border border-gray-light px-3 py-2 outline-none focus:border-primary focus:border-transparent focus:ring-1 focus:ring-primary"
              rows={4}
              placeholder="Write your comment here..."
            />
            <div className="mt-4">
              <TG_Button>Add Answer</TG_Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full rounded-xl border border-gray-light bg-transparent">
        <div className="px-3 py-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-lg font-bold text-black md:text-2xl">
                What types of brakes are used in tractors?
              </h1>
              <p className="text-gray-medium mt-1 text-sm font-medium">Asked By : Chotu Khirdar</p>
            </div>

            {!isMobile && (
              <div className="text-gray-500 flex items-center space-x-8 text-sm">
                <div className="flex items-end space-x-1">
                  <div className="flex items-center space-x-1">
                    <Image
                      src={`https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp`}
                      width={18}
                      height={18}
                      alt="show eye icon small"
                      title="show eye icon small"
                      className="h-3 w-5"
                    />
                    <span className="text-md font-bold text-black">651,324</span>
                  </div>
                  <span className="text-xs text-black">views</span>
                </div>
                <div className="flex items-end space-x-1">
                  <div className="items-base flex space-x-2">
                    <Image
                      src={`https://images.tractorgyan.com/uploads/120265/68872ff6ae287-like-thumb-icon.webp`}
                      width={18}
                      height={18}
                      alt="show eye icon small"
                      title="show eye icon small"
                      className="h-4 w-4"
                    />
                    <span className="text-md font-bold text-black">5,034</span>
                  </div>
                  <span className="text-xs text-black">Likes</span>
                </div>
                <button className="text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                  <div className="flex items-end space-x-1">
                    <div className="flex items-center space-x-1">
                      <Image
                        src={`https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp`}
                        width={18}
                        height={18}
                        alt="show eye icon small"
                        title="show eye icon small"
                        className="h-3 w-5"
                      />
                      <span className="text-md font-bold text-black"></span>
                    </div>
                    <span className="text-xs text-black">Share</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 px-3">
          <div className="mb-4 rounded-xl bg-green-lighter px-4 py-4">
            <p className="mb-1 text-xs text-gray-description">Latest Answer: By Chotu Khirdar</p>
            <p className="text-md font-medium leading-relaxed text-black">
              Student Doctor Network brings together thousands of current and future healthcare
              students and professionals into one community. This section is all about...
              <span className="text-blue-600 cursor-pointer hover:underline"> more</span>
            </p>
            <p className="mb-1 mt-1 text-xs text-gray-description">Replied 1 month ago</p>
          </div>

          <div className="mb-0 flex items-center justify-between space-x-3 md:justify-start">
            <button className="flex items-center space-x-2 rounded-md border border-primary px-8 py-2 text-black transition-colors md:px-4">
              <Image
                src={
                  'https://images.tractorgyan.com/uploads/120264/68872fd63412a-enter-arrow-icon.webp'
                }
                width={14}
                height={12}
                title="enter-arrow-icon"
                alt="enter-arrow-icon"
                className="h-3 w-3"
              />
              <span>Reply</span>
            </button>
            <button className="w-full rounded-md border border-primary px-4 py-2 text-black transition-colors md:w-fit">
              View all Answers
            </button>
          </div>

          {isMobile && (
            <div className="text-gray-500 mt-6 flex items-center justify-between text-sm">
              <div className="flex items-end space-x-1">
                <div className="flex items-center space-x-1">
                  <Image
                    src={`https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp`}
                    width={18}
                    height={18}
                    alt="show eye icon small"
                    title="show eye icon small"
                    className="h-3 w-5"
                  />
                  <span className="text-sm font-bold text-black">651,324</span>
                </div>
                <span className="text-xs text-black">views</span>
              </div>
              <div className="flex items-end space-x-1">
                <div className="items-base flex space-x-2">
                  <Image
                    src={`https://images.tractorgyan.com/uploads/120265/68872ff6ae287-like-thumb-icon.webp`}
                    width={18}
                    height={18}
                    alt="show eye icon small"
                    title="show eye icon small"
                    className="h-4 w-4"
                  />
                  <span className="text-sm font-bold text-black">5,034</span>
                </div>
                <span className="text-xs text-black">Likes</span>
              </div>
              <button className="text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center space-x-1">
                    <Image
                      src={`https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp`}
                      width={18}
                      height={18}
                      alt="show eye icon small"
                      title="show eye icon small"
                      className="h-3 w-5"
                    />
                    <span className="text-md font-bold text-black"></span>
                  </div>
                  <span className="text-xs text-black">Share</span>
                </div>
              </button>
            </div>
          )}

          {/* Comment Section */}
          <div className="pt-4">
            <label className="text-md mb-2 block text-black">Add your comment</label>
            <textarea
              className="w-full resize-none rounded-md border border-gray-light px-3 py-2 outline-none focus:border-primary focus:border-transparent focus:ring-1 focus:ring-primary"
              rows={4}
              placeholder="Write your comment here..."
            />
            <div className="mt-4">
              <TG_Button>Add Answer</TG_Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full rounded-xl border border-gray-light bg-transparent">
        <div className="px-3 py-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-lg font-bold text-black md:text-2xl">
                What types of brakes are used in tractors?
              </h1>
              <p className="text-gray-medium mt-1 text-sm font-medium">Asked By : Chotu Khirdar</p>
            </div>

            {!isMobile && (
              <div className="text-gray-500 flex items-center space-x-8 text-sm">
                <div className="flex items-end space-x-1">
                  <div className="flex items-center space-x-1">
                    <Image
                      src={`https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp`}
                      width={18}
                      height={18}
                      alt="show eye icon small"
                      title="show eye icon small"
                      className="h-3 w-5"
                    />
                    <span className="text-md font-bold text-black">651,324</span>
                  </div>
                  <span className="text-xs text-black">views</span>
                </div>
                <div className="flex items-end space-x-1">
                  <div className="items-base flex space-x-2">
                    <Image
                      src={`https://images.tractorgyan.com/uploads/120265/68872ff6ae287-like-thumb-icon.webp`}
                      width={18}
                      height={18}
                      alt="show eye icon small"
                      title="show eye icon small"
                      className="h-4 w-4"
                    />
                    <span className="text-md font-bold text-black">5,034</span>
                  </div>
                  <span className="text-xs text-black">Likes</span>
                </div>
                <button className="text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                  <div className="flex items-end space-x-1">
                    <div className="flex items-center space-x-1">
                      <Image
                        src={`https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp`}
                        width={18}
                        height={18}
                        alt="show eye icon small"
                        title="show eye icon small"
                        className="h-3 w-5"
                      />
                      <span className="text-md font-bold text-black"></span>
                    </div>
                    <span className="text-xs text-black">Share</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 px-3">
          <div className="mb-4 rounded-xl bg-green-lighter px-4 py-4">
            <p className="mb-1 text-xs text-gray-description">Latest Answer: By Chotu Khirdar</p>
            <p className="text-md font-medium leading-relaxed text-black">
              Student Doctor Network brings together thousands of current and future healthcare
              students and professionals into one community. This section is all about...
              <span className="text-blue-600 cursor-pointer hover:underline"> more</span>
            </p>
            <p className="mb-1 mt-1 text-xs text-gray-description">Replied 1 month ago</p>
          </div>

          <div className="mb-0 flex items-center justify-between space-x-3 md:justify-start">
            <button className="flex items-center space-x-2 rounded-md border border-primary px-8 py-2 text-black transition-colors md:px-4">
              <Image
                src={
                  'https://images.tractorgyan.com/uploads/120264/68872fd63412a-enter-arrow-icon.webp'
                }
                width={14}
                height={12}
                title="enter-arrow-icon"
                alt="enter-arrow-icon"
                className="h-3 w-3"
              />
              <span>Reply</span>
            </button>
            <button className="w-full rounded-md border border-primary px-4 py-2 text-black transition-colors md:w-fit">
              View all Answers
            </button>
          </div>

          {isMobile && (
            <div className="text-gray-500 mt-6 flex items-center justify-between text-sm">
              <div className="flex items-end space-x-1">
                <div className="flex items-center space-x-1">
                  <Image
                    src={`https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp`}
                    width={18}
                    height={18}
                    alt="show eye icon small"
                    title="show eye icon small"
                    className="h-3 w-5"
                  />
                  <span className="text-sm font-bold text-black">651,324</span>
                </div>
                <span className="text-xs text-black">views</span>
              </div>
              <div className="flex items-end space-x-1">
                <div className="items-base flex space-x-2">
                  <Image
                    src={`https://images.tractorgyan.com/uploads/120265/68872ff6ae287-like-thumb-icon.webp`}
                    width={18}
                    height={18}
                    alt="show eye icon small"
                    title="show eye icon small"
                    className="h-4 w-4"
                  />
                  <span className="text-sm font-bold text-black">5,034</span>
                </div>
                <span className="text-xs text-black">Likes</span>
              </div>
              <button className="text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center space-x-1">
                    <Image
                      src={`https://images.tractorgyan.com/uploads/119237/6834163253ac2-views-icon_small.webp`}
                      width={18}
                      height={18}
                      alt="show eye icon small"
                      title="show eye icon small"
                      className="h-3 w-5"
                    />
                    <span className="text-md font-bold text-black"></span>
                  </div>
                  <span className="text-xs text-black">Share</span>
                </div>
              </button>
            </div>
          )}

          {/* Comment Section */}
          <div className="pt-4">
            <label className="text-md mb-2 block text-black">Add your comment</label>
            <textarea
              className="w-full resize-none rounded-md border border-gray-light px-3 py-2 outline-none focus:border-primary focus:border-transparent focus:ring-1 focus:ring-primary"
              rows={4}
              placeholder="Write your comment here..."
            />
            <div className="mt-4">
              <TG_Button>Add Answer</TG_Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TractorQuestionCard;
