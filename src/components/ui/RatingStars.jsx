export default function RatingStars({ rating = 5 }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(star => (
        <span key={star} className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
      ))}
    </div>
  );
}