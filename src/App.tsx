import { useEffect, useState } from "react";
import "./App.css";

// Define TypeScript interfaces based on the retoldin implementation
interface Testimonial {
  _id: string;
  content: string;
  authorName: string;
  authorTitle?: string;
  authorCompany?: string;
  metadata?: {
    rating?: number;
  };
  createdAt: string;
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
  layout: string;
  theme: string;
  limit: number;
  selectedTestimonials?: string[];
  settings: WidgetSettings;
  isActive: boolean;
}

interface WidgetWithTestimonials {
  widget: WidgetData;
  testimonials: Testimonial[];
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
        const baseUrl = "http://localhost:3000";
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

    // Set up auto-rotation if enabled
    let intervalId = null;
    if (data?.widget.settings.autoRotate) {
      intervalId = setInterval(() => {
        // Logic for rotating testimonials would go here
        console.log("Rotating testimonials...");
      }, data.widget.settings.rotationInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Function to send resize message to parent frame
  useEffect(() => {
    const sendResizeMessage = () => {
      const contentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      );
      window.parent.postMessage(
        {
          type: "resize",
          widgetId: data?.widget._id,
          height: contentHeight + 20, // Add some padding
        },
        "*",
      );
    };

    // Send initial resize after content loads
    const timer = setTimeout(sendResizeMessage, 100);

    // Also send resize on window resize
    window.addEventListener("resize", sendResizeMessage);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", sendResizeMessage);
    };
  }, [data]);

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

  // Render based on widget type
  if (widget.type === "single" && testimonials.length > 0) {
    const testimonial = testimonials[0];

    return (
      <div className="testimonial-container">
        <div className="testimonial-content">{testimonial.content}</div>

        {widget.settings.showRating && (
          <div className="rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`star ${i < (testimonial.metadata?.rating || 5) ? "filled" : ""}`}
              >
                ★
              </span>
            ))}
          </div>
        )}

        <div className="testimonial-author">{testimonial.authorName}</div>
        <div className="testimonial-meta">
          {testimonial.authorTitle}
          {testimonial.authorCompany && ` • ${testimonial.authorCompany}`}
        </div>

        {/* {widget.settings.showDate && (
          <div className="testimonial-footer">
            Shared on {new Date(testimonial.createdAt).toLocaleDateString()}
          </div>
        )} */}
      </div>
    );
  } else {
    // Multiple testimonials view
    return (
      <div className="testimonials-container">
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="testimonial-card">
              <div className="testimonial-content">{testimonial.content}</div>

              {widget.settings.showRating && (
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < (testimonial.metadata?.rating || 5) ? "filled" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              <div className="testimonial-author">{testimonial.authorName}</div>
              <div className="testimonial-meta">
                {testimonial.authorTitle}
                {testimonial.authorCompany && ` • ${testimonial.authorCompany}`}
              </div>

              {/* {widget.settings.showDate && (
                <div className="testimonial-footer">
                  Shared on{" "}
                  {new Date(testimonial.createdAt).toLocaleDateString()}
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
