import { FC, memo, ReactNode } from "react";

const Section: FC<{ title: string; children: ReactNode }> = memo(
  ({ title, children }) => (
    <section className={"mt-[20px]"}>
      <h4 className={"text-custom-primary font-bold"}>{title}</h4>
      {children}
    </section>
  )
);

export default Section;
