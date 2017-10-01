function loadImages(img) {
  if (img.dataset) {
    img.src = img.dataset.src;
  }
}

/* eslint-disable callback-return */
function iterate(arr, next) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      next(arr[i]);
    }
  }
}
/* eslint-enable callback-return */

export const lazyLoadImages = () => {
  // Elements to be observed
  const boxes = document.querySelectorAll('#content img');

  if ('IntersectionObserver' in window) {

    const io = new IntersectionObserver(onChange, { threshold: 0.8 });

    /* eslint-disable no-inner-declarations */
    function onChange(changes) {
      changes.forEach((change) => {
        if (change.isIntersecting && change.intersectionRatio >= 0.8) {
          change.target.src = change.target.dataset.src;
          io.unobserve(change.target);
        }
      });
    }
    /* eslint-enable no-inner-declarations */

    iterate(boxes, (img) => io.observe(img));

  } else {
    console.log('Intersection Observers not supported');

    iterate(boxes, loadImages);
  }
};
