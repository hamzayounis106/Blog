import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
    
      <main className="container px-6 py-10 mx-auto">
        <section className="mb-12">
          <h1 className="mb-6 text-4xl font-bold text-center text-gray-800">
            About Us
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            Welcome to GupShup! We are a community-driven platform where users
            can share and explore various posts. Our mission is to provide a seamless
            and engaging experience for our users, enabling them to connect, share
            knowledge, and grow together.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            We are committed to maintaining a safe and respectful environment for
            everyone. Our team is dedicated to ensuring that all content adheres to
            our community guidelines and standards.
          </p>
        </section>
        <section>
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Upcoming Features
          </h2>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">
              AI Integration
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              We are excited to announce that we will be introducing AI integration to
              our platform. This advanced feature will help us monitor each post being
              uploaded to ensure compliance with our terms and policies. Our AI system
              will analyze content to detect and prevent any violations, making our
              community safer and more enjoyable for everyone.
            </p>
          </div>
        </section>
      </main>

    </div>
  );
};

export default AboutUs;
