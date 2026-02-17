interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="px-[24px] py-[40px]">
      <h1 className="text-foreground">{headline}</h1>
      <p className="mt-[8px] prose-width text-muted-foreground">
        {subtext}
      </p>
    </section>
  );
};

export default ContextHeader;
