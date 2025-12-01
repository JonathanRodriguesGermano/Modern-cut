// component to wrap the entire page content
export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-6 p-5 md:container md:mx-auto md:px-8">
      {children}
    </div>
  );
};

// component for page section titles
export const PageSectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <h2 className="text-foreground text-xs md:text-2xl font-semibold uppercase">
      {children}
    </h2>
  );
};

// component to wrap page sections
export const PageSection = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-3">{children}</div>;
};

// component to wrap horizontally scrollable sections
export const PageSectionScroller = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
};
