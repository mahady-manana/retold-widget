import { useEffect, useRef, useState } from "react";
import "./App.css";
import { AutoScrollerContainer } from "./testimonial-public/AutoScrollerContainer";
import PublicTestimonialItem from "./testimonial-public/PublicTestimonialItem";

// Define TypeScript interfaces based on the retoldin implementation
export interface ITestimonialMetadata {
  consent_website: boolean;
  consent_social_media: boolean;
  consent_promotional: boolean;
  audioUrl?: string;
  audioKey?: string;
  audioDurationSeconds?: number;
  videoUrl?: string;
  videoKey?: string;
  videoDurationSeconds?: number;
}

// Testimonial Types

export type TestimonialStatus = "published" | "pending" | "rejected";
export interface ITestimonial {
  _id: string;
  authorName: string;
  authorTitle: string;
  authorEmail?: string;
  authorCompany?: string;
  authorProfilePhoto?: string;
  content: string;
  rating?: number;
  companyId: string; // Reference to the company this testimonial is for
  userId: string; // Reference to the user who owns this testimonial
  linkId?: string; // Reference to the link used to submit this testimonial (optional)
  status: "pending" | "published" | "rejected"; // Moderation status (matches backend)
  publishedAt?: Date; // When the testimonial was published (if approved)
  metadata: ITestimonialMetadata;
  original?: string; // Stores the original testimonial data before any edits
  createdAt: Date;
  updatedAt: Date;
}

interface WidgetSettings {
  showAuthorImage: boolean;
  showRating: boolean;
  showDate: boolean;
  autoRotate: boolean;
  rotationInterval: number;
}

interface WidgetData {
  _id: string;
  name: string;
  description?: string;
  type: string;
  layout: "masonry" | "animated";
  theme: string;
  limit: number;
  style?: string;
  selectedTestimonials?: string[];
  settings: WidgetSettings;
  isActive: boolean;
}

interface WidgetWithTestimonials {
  widget: WidgetData;
  testimonials: ITestimonial[];
}

// Skeleton component for loading state
const TestimonialSkeleton = () => (
  <div className="testimonial-card">
    <div className="skeleton-header">
      <div className="skeleton-author"></div>
      <div className="skeleton-meta"></div>
    </div>
    <div className="skeleton-content"></div>
    <div className="skeleton-rating"></div>
    <div className="skeleton-footer"></div>
  </div>
);

// Skeleton for single testimonial
const SingleTestimonialSkeleton = () => (
  <div className="testimonial-container">
    <div className="skeleton-content"></div>
    <div className="skeleton-rating"></div>
    <div className="skeleton-author"></div>
    <div className="skeleton-meta"></div>
    <div className="skeleton-footer"></div>
  </div>
);

function App() {
  const [data, setData] = useState<WidgetWithTestimonials | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract widget parameters from URL
  useEffect(() => {
    const fetchWidgetAndTestimonials = async () => {
      try {
        setLoading(true);

        // Get parameters from URL
        const urlParams = new URLSearchParams(window.location.search);
        const widgetId = urlParams.get("widget_id");
        const publishableKey = urlParams.get("publishable_key");
        const sizeParam = urlParams.get("size");
        const testimonialsParam = urlParams.get("testimonials");

        if (!widgetId || !publishableKey) {
          setError(
            "Missing required parameters: widget_id and publishable_key",
          );
          setLoading(false);
          return;
        }

        // Construct API URL with all parameters - using the new combined endpoint
        const baseUrl = "https://www.retold.me";
        // const baseUrl = "http://localhost:3000";
        let comboEndpoint = `${baseUrl}/api/widgets/public/combo/${widgetId}?publishable_key=${publishableKey}`;

        if (sizeParam) comboEndpoint += `&size=${sizeParam}`;
        if (testimonialsParam)
          comboEndpoint += `&testimonials=${testimonialsParam}`;

        // Using fetch with credentials omitted to avoid CORS issues
        const response = await fetch(comboEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "omit", // Don't send cookies to avoid CORS issues
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch widget and testimonials: ${response.status} ${response.statusText}`,
          );
        }

        const result: WidgetWithTestimonials = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error("Error fetching widget data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWidgetAndTestimonials();
  }, []);

  // Function to send resize message to parent frame
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    let lastHeight = 0; // track previous height

    const updateHeight = () => {
      const el = rootRef.current!;
      const newHeight = el.scrollHeight;

      // Only update if difference > 5px
      if (Math.abs(newHeight - lastHeight) > 5) {
        lastHeight = newHeight;

        window.parent.postMessage(
          { type: "resized", widgetId: data?.widget?._id, height: newHeight },
          "*",
        );
      }
    };

    // Initial height send
    updateHeight();

    // Observe size changes
    const resizeObserver = new ResizeObserver(() => updateHeight());
    resizeObserver.observe(rootRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [data?.widget?._id]); // no scrollHeight dependency

  // Show skeleton while loading
  if (loading) {
    if (data?.widget.type === "single") {
      return <SingleTestimonialSkeleton />;
    } else {
      return (
        <div className="testimonials-container">
          <div className="testimonial-grid">
            {[...Array(3)].map((_, index) => (
              <TestimonialSkeleton key={index} />
            ))}
          </div>
        </div>
      );
    }
  }

  if (error) {
    return (
      <div className="testimonial-container">
        <div className="error">Error: {error}</div>
        <div className="error error-details">
          Note: This may be due to misconfiguration. Check the script and
          element (div).
        </div>
      </div>
    );
  }

  if (!data || data.testimonials.length === 0) {
    return (
      <div className="testimonial-container">
        <div className="no-testimonials">No testimonials to display</div>
      </div>
    );
  }

  const { widget, testimonials } = data;

  if (testimonials.length === 1) {
    const testimonial = testimonials[0];

    return (
      <div className="testimonial-container">
        <PublicTestimonialItem
          variant={data.widget.style}
          testimonial={testimonial}
        />
      </div>
    );
  }

  if (testimonials.length === 2) {
    return (
      <div
        className="flex gap-4 md:flex-row flex-col"
        // className="break-inside testimonial-item dflex-[1_1_200px] dmin-w-[33%]dp-2 dh-full"
      >
        <div className="md:w-1/2 w-full">
          <PublicTestimonialItem
            variant={data.widget.style}
            testimonial={testimonials[0] as unknown as ITestimonial}
          />
        </div>
        <div className="md:w-1/2 w-full">
          <PublicTestimonialItem
            variant={data.widget.style}
            testimonial={testimonials[1] as unknown as ITestimonial}
          />
        </div>
      </div>
    );
  }
  // Render based on widget type

  // Multiple testimonials view
  return (
    <div className="testimonials-container" ref={rootRef}>
      <div className="space-y-4">
        {widget.layout === "animated" ? (
          <>
            <AutoScrollerContainer
              testimonials={testimonials}
              style={widget.style}
            />
          </>
        ) : (
          <div className="masonry-3-col">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="break-inside testimonial-item dflex-[1_1_200px] dmin-w-[33%]dp-2 dh-full"
              >
                <PublicTestimonialItem
                  variant={data.widget.style}
                  testimonial={testimonial}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
