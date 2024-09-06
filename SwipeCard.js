import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

const SwipeCard = ({ imageUrl, onSwipe }) => {
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isSwiped, setIsSwiped] = useState(false);
  const [borderColor, setBorderColor] = useState('transparent'); // Initial transparent border

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setSwipeDirection('left');
      setBorderColor('red'); // Set red border for "Disliked"
      setIsSwiped(true);
      setTimeout(() => {
        onSwipe('left'); // Trigger the next image after the delay
      }, 500); // Delay the image change
    },
    onSwipedRight: () => {
      setSwipeDirection('right');
      setBorderColor('green'); // Set green border for "Liked"
      setIsSwiped(true);
      setTimeout(() => {
        onSwipe('right'); // Trigger the next image after the delay
      }, 500); // Delay the image change
    },
  });

  useEffect(() => {
    if (isSwiped) {
      // Clear the swipe direction and border color after 1 second
      const timer = setTimeout(() => {
        setSwipeDirection(null);
        setIsSwiped(false);
        setBorderColor('transparent'); // Reset the border color
      }, 500);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isSwiped]);

  return (
    <div {...handlers} style={styles.cardContainer}>
      {/* Feedback stays after image change */}
      {swipeDirection && (
        <div style={{ ...styles.feedback, ...styles[swipeDirection] }}>
          {swipeDirection === 'right' ? 'Liked' : 'Disliked'}
        </div>
      )}

      {/* Image with dynamic border color and swipe animation */}
      <div
        style={{
          ...styles.card,
          borderColor: borderColor, // Dynamic border color based on swipe direction
          transform: isSwiped
            ? `translateX(${swipeDirection === 'right' ? '500px' : '-500px'})` // Swipe animation
            : 'none',
          transition: 'transform 1s ease, border-color 0.5s ease', // Smooth swipe and border color transition
        }}
      >
        <img src={imageUrl} alt="Swipe" style={styles.image} />
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    width: '80vw',
    height: '60vh',
    maxWidth: '400px',
    maxHeight: '500px',
    position: 'relative',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '30px',
  },
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '5px solid transparent', // Default no border
    borderRadius: '40px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  feedback: {
    position: 'absolute',
    top: '-55px', // Directly above the image
    left: '50%', // Center horizontally
    transform: 'translateX(-50%)', // Ensure perfect centering
    fontSize: '2rem',
    color: 'white',
    fontWeight: 'bold',
    padding: '5px 15px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 10,
  },
  left: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red for disliked
  },
  right: {
    backgroundColor: 'rgba(0, 255, 0, 0.7)', // Green for liked
  },
};

export default SwipeCard;
