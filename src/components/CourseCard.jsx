import React from "react";
import { motion } from "framer-motion";

const CourseCard = ({ course }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div
        className="
          bg-[#0b0319]
          rounded-[20px]
          border
          border-purple-600/40
          overflow-hidden
          backdrop-blur-sm
          hover:border-purple-500
          transition-all
          group
        "
      >
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Category + Duration */}
          <div className="absolute top-3 left-3 flex gap-2 z-20">
            <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-semibold uppercase">
              {course.category}
            </span>

            <span className="px-3 py-1 rounded-full bg-purple-700 text-white text-[10px] font-semibold">
              {course.duration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white text-2xl font-bold uppercase mb-3">
            {course.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-4">
            {course.description}
          </p>

          <button
            className="
              px-8
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-purple-700
              to-fuchsia-600
              text-white
              text-sm
              font-semibold
              transition
              hover:opacity-90
            "
          >
            ENROLL NOW
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;