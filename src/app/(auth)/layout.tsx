const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="grid min-h-svh lg:grid-cols-2">{children}</div>;
};

export default layout;
