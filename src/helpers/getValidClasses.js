const getValidClasses = (...classes) => {
  return classes.filter((className) => !!className).join(' ');
};

export { getValidClasses };
