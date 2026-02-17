interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-[24px] py-[64px]">
      <h1 className="text-foreground">{title}</h1>
      <p className="mt-[16px] text-muted-foreground prose-width text-center">
        This section will be built in the next step.
      </p>
    </main>
  );
};

export default PlaceholderPage;
