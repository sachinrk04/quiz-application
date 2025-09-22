interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <div>
      <div className="flex items-center">
        <h1 className="inline-block text-xl sm:text-2xl font-bold text-primary tracking-tight">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageHeader;
