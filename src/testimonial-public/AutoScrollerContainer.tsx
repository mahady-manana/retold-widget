import { type FC } from "react";

import TestimonialScroller from "./AutoScrollTestimonials";
import type { ITestimonial } from "./PublicTestimonialItem";
import PublicTestimonialItem from "./PublicTestimonialItem";

function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}
interface AutoScrollerContainerProps {
  testimonials: ITestimonial[];
  style?: string;
}
export const AutoScrollerContainer: FC<AutoScrollerContainerProps> = ({
  testimonials,
  style,
}) => {
  // Multiple testimonials view
  const splitTestimonials = chunkArray(testimonials || [], 4);

  return (
    <>
      {splitTestimonials.map((item, idx) => {
        return (
          <TestimonialScroller
            key={item?.at(0)?._id ?? idx}
            direction={idx === 0 || idx % 2 === 0 ? "left" : "right"}
            testimonials={item}
            DarkTestimonial={(props) => (
              <PublicTestimonialItem
                {...props}
                variant={style || "style-1"}
                contentLines={5}
              ></PublicTestimonialItem>
            )}
            contentLines={5}
          />
        );
      })}
    </>
  );
};
