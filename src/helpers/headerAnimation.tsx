// The debounce function receives our function as a parameter
const debounce = (fn: Function) => {
  let frame: number;
  console.log('debounce');

  return () => {
    if (frame) {
      cancelAnimationFrame(frame);
    }
    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      fn();
    });
  };
};

// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
export function storeScroll() {
  const scrollY = window.scrollY.toString();
  console.log(scrollY);
  document.documentElement.dataset.scroll = scrollY;
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });
//document.addEventListener('scroll', debounce(storeScroll));
