document.addEventListener("DOMContentLoaded", function () {
  gsap.set(".img", { y: 500 });
  gsap.set(".loader-imgs", { x: 500 });
  gsap.set(".nav-item", { y: 25, opacity: 0 });
  gsap.set("h1,.item,footer", { y: 200 });

  const t1 = gsap.timeline({ delay: 1 });

  t1.to(".img", {
    y: 0,
    duration: 1.5,
    stagger: 0.05,
    ease: "power3.inOut",
  })
    .to(
      ".loader-imgs",
      {
        x: 0,
        duration: 3,
        ease: "power3.inOut",
      },
      "-=2.5"
    )
    .to(
      ".img:not(#loader-logo)",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        stagger: 0.1,
        ease: "power3.inOut",
      },
      "-=1"
    )
    .to(
      ".loader",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.5,
        ease: "power3.inOut",
      },
      "-=0.5"
    )
    .to(
      ".nav-item,h1,footer,.item",
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.inOut",
      },
      "-=0.5"
    );
});

const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);

  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    cursor.style.display = "none";
  } else {
    document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.clientX - cursor.offsetWidth / 2, // Adjusted to center
        y: e.clientY - cursor.offsetHeight / 2, 
        duration: 0.1, // Fast response
        ease: "none",
      });
    });

    // Select interactive elements
    const interactiveSections = document.querySelectorAll("#interactive-section, .nav-item");

    interactiveSections.forEach((section) => {
      section.addEventListener("mouseenter", () => {
        cursor.style.display = "block";
        gsap.to(cursor, { width: 80, height: 80, duration: 0.3, ease: "power2.out" });
      });

      section.addEventListener("mouseleave", () => {
        gsap.to(cursor, { width: 0, height: 0, duration: 0.3, ease: "power2.out" });
      });
    });

    // Hide cursor when moving out of interactive sections
    document.addEventListener("mousemove", (e) => {
      const inInteractiveSection = [...interactiveSections].some((section) => section.contains(e.target));
      if (!inInteractiveSection) {
        gsap.to(cursor, { width: 10, height: 10, duration: 0.3, ease: "power2.out" });
      }
    });
  }