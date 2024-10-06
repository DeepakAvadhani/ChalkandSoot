document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const blurryPrev = document.querySelector(".blurry-prev img");
  const items = document.querySelectorAll(".item");
  const sootText = document.querySelector('.soot-text'); // Target the Soot text
  let activeIndex = 0;
  const itemCount = items.length;
  let isAnimating = false;
  let autoLoad = true; // Variable for auto-loading images

  // Function to update background image
  function updateBackground(index) {
    const newImageSrc = items[index].querySelector("img").src;
    gsap.to(blurryPrev, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        blurryPrev.src = newImageSrc;
        gsap.to(blurryPrev, { opacity: 1, duration: 0.5 });
      },
    });
  }

  // Function to slide images based on scroll
  function slideImages(direction) {
    if (isAnimating) return;
    isAnimating = true;

    if (direction === "down") {
      activeIndex = (activeIndex + 1) % itemCount;
    } else if (direction === "up") {
      activeIndex = (activeIndex - 1 + itemCount) % itemCount;
    }

    gsap.to(gallery, {
      y: `-${activeIndex * 35}vh`, // Adjust the slide distance
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        updateBackground(activeIndex);
        isAnimating = false;
      },
    });
  }

  // Function to show the Soot text
  function showSootText() {
    sootText.classList.add('visible'); // Add visible class to animate
  }

  // Function for auto sliding of images
  function autoSlide() {
    if (autoLoad) {
      slideImages("down"); // Automatically slide down
    }
  }

  // Start auto slide once and then stop
  const autoSlideInterval = setInterval(() => {
    if (autoLoad) {
      autoSlide();
    }
  }, 2000); // Adjust the interval time for faster/slower loading

  // Animate Soot text after the page loads
  window.addEventListener('load', () => {
    showSootText(); // Animate the Soot text on load
  });

  // Set a timeout to remove auto-loading after it finishes
  setTimeout(() => {
    autoLoad = false; // Stop auto loading after a specified time
    clearInterval(autoSlideInterval); // Clear the interval
  }, 6000); // Duration for auto sliding before allowing manual control (e.g., 6 seconds)

  // Stop auto sliding on user scroll
  window.addEventListener('scroll', () => {
    autoLoad = false; // Stop auto sliding after user interacts
    clearInterval(autoSlideInterval); // Clear the interval
  });

  // Handle mouse wheel scroll to slide images
  window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0 && !isAnimating) {
      slideImages("down");
    } else if (event.deltaY < 0 && !isAnimating) {
      slideImages("up");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});
