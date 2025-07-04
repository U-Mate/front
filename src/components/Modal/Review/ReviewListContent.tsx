import { useEffect, useState } from 'react';
import { getMyReviews } from '../../../apis/ReviewApi';
import { useSelector } from 'react-redux';
import { Review } from '../../../types/review';
import { RootState } from '../../../store/store';
import ReviewCard from '../../ReviewCard';
import { formatToShortKoreanDate } from '../../../utils/formatDate';

const ReviewListContent = () => {
  const user = useSelector((state: RootState) => state.user);
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReview = async () => {
    if (!user?.id) return;
    try {
      const res = await getMyReviews(user?.id);
      setReviews(res.reviews);
    } catch (err) {
      // Error handled silently
    }
  };

  useEffect(() => {
    fetchReview();
  }, [user?.id]);

  return (
    <>
      <div className="flex flex-col flex-1 min-h-0">
        <h2 className="text-m font-bold text-center mb-8 shrink-0 md:text-lm">내가 작성한 리뷰</h2>
        <div className="overflow-y-auto scrollbar-hide px-6 pb-4 flex-1">
          <div className="flex flex-col items-center space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard
                  key={review.REVIEW_ID}
                  reviewId={review.REVIEW_ID}
                  planName={review.PLAN_NAME}
                  isMyPage={true}
                  writerName={user.name}
                  writerAge={user.birthDay}
                  content={review.REVIEW_CONTENT}
                  date={formatToShortKoreanDate(review.UPDATED_AT)}
                  rating={review.STAR_RATING}
                  onRefresh={() => fetchReview()}
                />
              ))
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <p className="text-m font-bold text-center mb-8 shrink-0 md:text-lm text-zinc-400">
                  작성한 리뷰가 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewListContent;
