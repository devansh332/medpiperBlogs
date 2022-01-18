// Container Component Documentation
// Container is a generic container component.

const Container = ({ children }) => {
  return <div className="container mx-auto px-5">{children}</div>;
};

export default Container;
