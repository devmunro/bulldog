import React, { useState } from "react";
import LoginForm from "./UserForms/userLogin";
import RegisterForm from "./UserForms/userRegistration";
import { Link } from "react-router-dom";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showRegistrationBox, setShowRegistrationBox] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };

  const showRegistration = () => {
    setShowRegistrationBox(!showRegistrationBox);
  };

  return (
    <div>
      <div>
        {/* Header */}
        <header className="bg-gray-900 text-white py-4 px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-bold text-lg sm:text-xl">
              Active AI
            </Link>
            <button
              onClick={openModal}
              className="bg-white text-gray-900 py-2 px-4 rounded"
            >
              Log In
            </button>
          </div>
        </header>
      </div>

      {/* HERO SECTION */}
      <section className="bg-black">
        <div className="w-full h-full bg-black opacity-70 z-0"></div>
        <div className=" w-1/2 h-full opacity-70 z-10"></div>
        <div className="relative z-20 py-10 md:py-14 text-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="flex justify-between gap-4 px-1 md:px-2 lg:px-4 flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2"></div>

              <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <h1 className="font-bold text-4xl sm:text-5xl mb-4 leading-tight">
                  Get fit and stay healthy with Active AI
                </h1>
                <p className="text-gray-300 text-xl mb-6">
                  Join Active AI today and take control of your fitness journey.
                </p>
                <button
                  onClick={showRegistration}
                  className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                >
                  Sign Up Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 text-white py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h2 className="font-bold text-3xl sm:text-4xl mb-4">
              Why Choose Active AI?
            </h2>
            <p className="text-gray-300 text-xl">
              Here are some of the features that make Active AI the best choice
              for your fitness journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center">
              <h3 className="font-bold text-2xl mb-4 text-center">
                Fitness Tracking
              </h3>
              <p className="text-gray-300 text-center">
                Keep track of your workouts, set goals and monitor your progress
                with our easy to use fitness tracking system.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center">
              <h3 className="font-bold text-2xl mb-4 text-center">
                Custom Workouts
              </h3>
              <p className="text-gray-300 text-center">
                Create custom workouts or choose from a library of pre-designed
                workouts tailored to your fitness level and goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* "Coming Soon" section */}
      <section className="bg-gray-900 text-gray-300 py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h2 className="font-bold text-3xl sm:text-4xl mb-4">
              More Exciting Features Coming Soon!
            </h2>
            <p className="text-gray-300 text-xl">
              We're always working hard to improve Active AI and bring you the
              best experience possible. Check back soon for more updates and new
              features!
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <div className="bg-gray-700 p-8 rounded-lg shadow-md">
                <h3 className="font-bold text-2xl mb-4">New Features</h3>
                <p className="text-gray-300">
                  We're always working on new features to help you achieve your
                  fitness goals. Check back soon for exciting updates and
                  improvements!
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <div className="bg-gray-700 p-8 rounded-lg shadow-md">
                <h3 className="font-bold text-2xl mb-4">Workout Generation</h3>
                <p className="text-gray-300">
                  Use our cutting-edge Chat GPT technology to generate
                  customized workouts based on your fitness level, goals, and
                  preferences. Say goodbye to generic workouts and hello to a
                  personalized fitness experience.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <div className="bg-gray-700 p-8 rounded-lg shadow-md">
                <h3 className="font-bold text-2xl mb-4">Global Community</h3>
                <p className="text-gray-300">
                  Connect with fitness enthusiasts from all over the world and
                  share your fitness journey. Join our global community today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The modal */}
      {showModal && (
        <div className="fixed w-full h-full top-0 left-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-80"
            onClick={openModal}
          />
          <div className="w-1/2 z-10">
            {/* Your LoginForm component here */}
            <LoginForm />
          </div>
        </div>
      )}

      {showRegistrationBox && (
        <div className="fixed w-full h-full top-0 left-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-80"
            onClick={showRegistration}
          />
          <div className="w-1/2 z-10">
            {/* Your Reguster component here */}
            <RegisterForm />
          </div>
        </div>
      )}
    </div>
  );
}
