export const scrollToTop = (ref) => {
  if (ref?.current) {
    ref.current.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export const scrollToSection = (ref, id, isCollapsed = false, offsetCollapsed = 0, offsetExpanded = 310) => {
  if (!ref?.current) return;

  const container = ref.current;
  const section = container.querySelector(`#${id}`);
  if (!section) return;

  const containerTop = container.getBoundingClientRect().top;
  const sectionTop = section.getBoundingClientRect().top;

  const offset = isCollapsed ? offsetCollapsed : offsetExpanded;

  const scrollTarget = container.scrollTop + (sectionTop - containerTop - offset);

  container.scrollTo({
    top: scrollTarget,
    behavior: 'smooth',
  });
};