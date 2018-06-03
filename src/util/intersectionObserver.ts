function loadImages(img) {
  if (img.dataset) {
    img.src = img.dataset.src;
  }
}

function iterate(arr, next) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      next(arr[i]);
    }
  }
}

export const lazyLoadImages = () => {
  // Elements to be observed
  const boxes = document.querySelectorAll('#content img');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(onChange, {threshold: 0.8});

    function onChange(changes) {
      changes.forEach((change) => {
        if (change.isIntersecting && change.intersectionRatio >= 0.8) {
          change.target.src = change.target.dataset.src;
          io.unobserve(change.target);
        }
      });
    }

    iterate(boxes, (img) => io.observe(img));
  } else {
    console.log('Intersection Observers not supported');

    iterate(boxes, loadImages);
  }
};
