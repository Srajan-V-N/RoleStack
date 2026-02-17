interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="px-[24px] py-[40px]">
      <h1 className="text-[hsl(var(--foreground))]">{headline}</h1>
      <p className="mt-[8px] prose-width text-[hsl(var(--muted-foreground))]">
        {subtext}
      </p>
    </section>
  );
};

export default ContextHeader;
