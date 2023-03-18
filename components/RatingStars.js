import React from 'react';
import ReactStars from 'react-stars';

export default function RatingStars({
  size,
  rating,
  editRating,
  ratingChanged,
  half,
}) {
  return (
    <ReactStars
      count={5}
      size={size}
      color2={'#ffd700'}
      value={Number(rating)}
      edit={editRating}
      half={half}
      onChange={ratingChanged}
    />
  );
}
