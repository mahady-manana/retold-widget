# Retold.me Public Widget

## Overview

This is the public testimonial collection widget for Retold.me - a production-ready SaaS platform for collecting and managing customer testimonials with zero friction for submitters and full control for business owners.

The widget is built as a standalone Vite React application that can be embedded on external websites to collect testimonials seamlessly.

## Purpose

The Retold.me public widget serves as the embeddable component that businesses can place on their websites to allow customers to submit testimonials easily. It connects to the main Retold.me application ([../retoldin/]) to securely collect, moderate, and publish testimonials.

## Key Features

### Submission Interface

- Clean, minimal form interface for easy testimonial submission
- Support for text testimonials with optional ratings
- Author information capture (name, email, company, title)
- Media attachment support (images, videos) where applicable

### Security & Validation

- CSRF protection for all submission endpoints
- Rate limiting to prevent spam submissions
- Zod schema validation for all inputs
- Automatic sanitization of content before storage
- Public key authentication for targeted testimonial requests

### Integration Capabilities

- Embeddable as an iframe or script tag
- Responsive design that adapts to different website layouts
- Customizable styling to match brand colors
- Real-time submission feedback and confirmation

## Technical Architecture

### Frontend Framework

- Built with React 19.x and TypeScript
- Vite as the build tool for fast development and optimized builds
- Tailwind CSS for styling and responsive design
- React Hook Form for form management and validation

### Security Measures

- All submissions sent via secure HTTPS connections
- Input sanitization using DOMPurify
- Public key validation for targeted requests
- Automatic expiration of temporary submission links

### Communication with Main Application

- API endpoints secured with JWT tokens
- Real-time status updates for submission processing
- Error handling and user feedback mechanisms

## Widget Configuration

The widget supports various configuration options:

- Custom branding and colors
- Required vs optional form fields
- Different testimonial types (text, video, audio)
- Success message customization
- GDPR compliance settings

## Development Setup

To develop the widget locally:

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: `npm run dev` or `yarn dev`
4. Access the widget at http://localhost:5173

## Deployment

The widget is built using `npm run build` which creates optimized static assets that can be served independently or integrated with the main Retold.me application.

## Integration with Retold.me Platform

The widget communicates with the main Retold.me application to:

- Validate submission tokens and permissions
- Submit testimonials to the central database
- Receive real-time feedback on submission status
- Sync with dashboard analytics and moderation tools

## Anti-Duplicate Measures

- For targeted submissions: Uses unique testimonialRequestId to prevent duplicates
- For organic submissions: Prevents duplicate submissions by company ID and author name combination
- Ensures one testimonial per request link

## Future Enhancements

Planned features for the widget include:

- Advanced form builder integration
- Multi-language support
- Enhanced media upload capabilities
- A/B testing for form layouts
- Advanced analytics tracking
