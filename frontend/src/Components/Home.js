import React, { useState } from "react";
import LoginForm from "./UserForms/userLogin";
import RegisterForm from "./UserForms/userRegistration";
import { Link } from "react-router-dom";
import FirebaseStorage from "../images/firebaseStorage";

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
    <div className="defaultFont">
      <div>
        {/* Header */}
        <header className="bg-primary text-white py-4 px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-bold sub-heading">
              Active AI
            </Link>
            <button onClick={openModal} className="btn-secondary">
              Log In
            </button>
          </div>
        </header>
      </div>

      {/* HERO SECTION */}
      <section className="bg-primary text-white ">
        <div className="relative z-20 py-4 md:py-8 text-white">
          <div className="container mx-auto px-4 md:px-4 lg:px-8">
            <div className="flex justify-center gap-4 px-1 md:px-2 lg:px-4 flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2">
                <FirebaseStorage imageBase="homepage.jpg" />
              </div>

              <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <h1 className="heading mb-4 text-center">
                  Get fit and stay healthy with Active AI
                </h1>
                <p className=" mb-6 text-center">
                  Join Active AI today and take control of your fitness journey.
                </p>
                <div className=" flex justify-center">
                  <button onClick={showRegistration} className="btn-secondary">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary text-tertiary py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h2 className="heading mb-4">
              Why Choose Active AI?
            </h2>
            <p className="">
              Here are some of the features that make Active AI the best choice
              for your fitness journey.
            </p>
          </div>
          <div className="  grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className=" text-white bg-primary p-8 rounded-lg shadow-lg flex flex-col items-center">
              <h3 className="sub-heading mb-4 text-center">
                Fitness Tracking
              </h3>
              <p className="text-center ">
                Keep track of your workouts, set goals and monitor your progress
                with our easy to use fitness tracking system.
              </p>
            </div>
            <div className="text-white bg-primary p-8 rounded-lg shadow-lg flex flex-col items-center">
              <h3 className="sub-heading mb-4 text-center">
                Custom Workouts
              </h3>
              <p className=" text-center">
                Create custom workouts or choose from a library of pre-designed
                workouts tailored to your fitness level and goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* "Coming Soon" section */}
      <section className="text-secondary bg-primary py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h2 className="sub-heading text-white mb-4">
              More Exciting Features Coming Soon!
            </h2>
            <p className="">
              We're always working hard to improve Active AI and bring you the
              best experience possible. Check back soon for more updates and new
              features!
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between text-tertiary space-x-2 ">
            <div className="w-full md:w-1/3 mb-8 md:mb-0 ">
              <div className=" p-8 rounded-lg shadow-md bg-secondary">
                <h3 className="sub-heading mb-4">New Features</h3>
                <p className="">
                  We're always working on new features to help you achieve your
                  fitness goals. Check back soon for exciting updates and
                  improvements!
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <div className=" p-8 rounded-lg shadow-md bg-secondary">
                <h3 className="sub-heading mb-4">Workout Generation</h3>
                <p className="">
                  Use our cutting-edge Chat GPT technology to generate
                  customized workouts based on your fitness level, goals, and
                  preferences. Say goodbye to generic workouts and hello to a
                  personalized fitness experience.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <div className=" p-8 rounded-lg shadow-md bg-secondary">
                <h3 className="sub-heading mb-4">Global Community</h3>
                <p className="">
                  Connect with fitness enthusiasts from all over the world and
                  share your fitness journey. Join our global community today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGIN The modal */}
      {showModal && (
        <div className="fixed w-full h-full top-0 left-0 z-50 flex items-center justify-center ">
          <div
            className="absolute inset-0  bg-tertiary opacity-80"
            onClick={openModal}
          />
          <div className="md:w-1/2 w-full z-10 p-4">
            {/* Your LoginForm component here */}
            <LoginForm openModal={openModal} />
          </div>
        </div>
      )}

      {/* REGistration The modal */}
      {showRegistrationBox && (
        <div className="fixed w-full h-full top-0 left-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-tertiary opacity-80"
            onClick={showRegistration}
          />
          <div className="md:w-1/2 w-full z-10 sm:p-8">
            {/* Your Reguster component here */}
            <RegisterForm showRegistration={showRegistration} />
          </div>
        </div>
      )}
    </div>
  );
}
