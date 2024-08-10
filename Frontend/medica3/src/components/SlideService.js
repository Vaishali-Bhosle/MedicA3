const getSlides = async () => {
  // Mocking a fetch request. Replace with actual API call if necessary.
  return [
    { content: '<div>Slide 1 Content</div>' },
    { content: '<div>Slide 2 Content</div>' },
    { content: '<div>Slide 3 Content</div>' }
  ];
};

const SlideService = {
  getSlides
};

export default SlideService;
