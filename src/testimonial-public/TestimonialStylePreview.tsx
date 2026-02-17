// Test component to display all 15 styles
"use client";

import PublicTestimonialItem from "./PublicTestimonialItem";

const SAMPLE_TESTIMONIAL = {
  _id: "test-1",
  authorName: "John Doe",
  authorTitle: "CEO",
  authorCompany: "TechCorp",
  authorProfilePhoto: "",
  content: "This product is amazing! It has completely transformed how we work.",
  rating: 5,
  metadata: {},
  createdAt: new Date().toISOString(),
};

export default function TestimonialStylePreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      <div><h3 className="font-bold mb-2">Default</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} /></div>
      <div><h3 className="font-bold mb-2">Style 1 - Modern</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-1" /></div>
      <div><h3 className="font-bold mb-2">Style 2 - Dark</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-2" /></div>
      <div><h3 className="font-bold mb-2">Style 3 - Glass</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-3" /></div>
      <div><h3 className="font-bold mb-2">Style 4 - Minimal</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-4" /></div>
      <div><h3 className="font-bold mb-2">Style 5 - Nature</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-5" /></div>
      <div><h3 className="font-bold mb-2">Style 6 - Warm</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-6" /></div>
      <div><h3 className="font-bold mb-2">Style 7 - Ocean</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-7" /></div>
      <div><h3 className="font-bold mb-2">Style 8 - Premium</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-8" /></div>
      <div><h3 className="font-bold mb-2">Style 9 - Bold</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-9" /></div>
      <div><h3 className="font-bold mb-2">Style 10 - Soft</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-10" /></div>
      <div><h3 className="font-bold mb-2">Style 11 - Retro</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-11" /></div>
      <div><h3 className="font-bold mb-2">Style 12 - Tech</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-12" /></div>
      <div><h3 className="font-bold mb-2">Style 13 - Fresh</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-13" /></div>
      <div><h3 className="font-bold mb-2">Style 14 - Airy</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-14" /></div>
      <div><h3 className="font-bold mb-2">Style 15 - Love</h3><PublicTestimonialItem testimonial={SAMPLE_TESTIMONIAL} variant="style-15" /></div>
    </div>
  );
}
