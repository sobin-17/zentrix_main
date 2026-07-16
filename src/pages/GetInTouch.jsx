import React from "react";

const GetInTouch = () => {
    return (
        <div className="bg-black text-white overflow-hidden">

            {/* HERO SECTION */}
            <section className="relative min-h-screen overflow-hidden">

                <img
                    src="/getintouch.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <img
                    src="/getintouch2.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
                />

                <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-24 pb-30">

                    <div className="grid lg:grid-cols-[1.2fr_0.8fr] items-center gap-6">

                        {/* FORM */}
                        <div
                            className="
        backdrop-blur-xl
        bg-white/[0.04]
        border border-white/20
        rounded-[35px]
        px-14
        py-0
        max-w-[790px]
        h-[550px]
        "
                        >
                            <h2 className="flex items-center gap-3 mb-8">

                                <span className="text-[72px] font-bold leading-none">
                                    drop us a
                                </span>

                                <span
                                    className="
            text-[72px]
            font-light
            text-transparent
            [-webkit-text-stroke:1px_white]
            "
                                >
                                    line
                                </span>

                            </h2>

                            <form className="space-y-4">

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="
            w-full
            h-[54px]
            bg-transparent
            border border-white/30
            rounded-full
            px-6
            outline-none
            "
                                />

                                <input
                                    type="text"
                                    placeholder="Phone number"
                                    className="
            w-full
            h-[54px]
            bg-transparent
            border border-white/30
            rounded-full
            px-6
            outline-none
            "
                                />

                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="
            w-full
            h-[54px]
            bg-transparent
            border border-white/30
            rounded-full
            px-6
            outline-none
            "
                                />

                                <textarea
                                    placeholder="Tell us about your idea"
                                    className="
            w-full
            h-[120px]
            bg-transparent
            border border-white/30
            rounded-[25px]
            px-6 py-4
            resize-none
            outline-none
            "
                                />

                                <button
                                    className="
            mt-2
            bg-white
            text-black
            px-14
            py-3
            rounded-full
            font-semibold
            "
                                >
                                    Enquire
                                </button>

                            </form>

                        </div>

                        {/* RIGHT */}
                        <div className="text-right">

                            <h1 className="leading-[0.82]">

                                <div>

                                    <span className="text-[150px] font-bold">
                                        Get
                                    </span>

                                    <span
                                        className="
              ml-4
              text-[110px]
              font-light
              text-transparent
              [-webkit-text-stroke:1px_white]
              "
                                    >
                                        in
                                    </span>

                                </div>

                                <div className="text-[150px] font-bold">
                                    touch
                                </div>

                            </h1>

                            <p className="max-w-[420px] ml-auto mt-5 text-gray-300">
                                Want to get in touch? We'd love to hear from you —
                                here's how you can reach us.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* HAVE SECTION */}
            <section className="max-w-[1400px] mx-auto px-8 py-24">

                <div className="relative h-[650px]">

                    <img
                        src="/getintouch3.png"
                        alt=""
                        className="
      absolute
      left-0
      top-24
      w-[560px]
      h-[340px]
      object-cover
      rounded-md
      "
                    />

                    <h2
                        className="
      absolute
      left-[320px]
      top-0
      text-[190px]
      font-extralight
      tracking-[-0.05em]
      leading-none
      z-20
      "
                    >
                        have
                    </h2>

                    <div
                        className="
      absolute
      right-0
      top-[250px]
      max-w-[520px]
      "
                    >
                        <p className="text-lg leading-relaxed text-center">
                            Our team is here to help. Reach out to us for inquiries about
                            services, courses, projects, or career opportunities, and we'll
                            get back to you as soon as possible.
                        </p>
                    </div>

                </div>

            </section>

            {/* NEED ASSISTANCE SECTION */}
            <section className="max-w-[1400px] mx-auto px-8 pb-32">

                <div className="relative h-[700px]">

                    <div
                        className="
      absolute
      left-0
      top-0
      max-w-[500px]
      "
                    >
                        <p className="text-lg leading-relaxed">
                            We're always ready to connect with you. Whether you're looking
                            for technology solutions, professional training, or business
                            support, feel free to contact our team for guidance and
                            assistance.
                        </p>
                    </div>

                    <h2
                        className="
      absolute
      left-0
      top-[220px]
      whitespace-nowrap
      z-20
      tracking-[-0.04em]
      "
                    >

                        <span
                            className="
        text-[170px]
        font-extralight
        "
                        >
                            need
                        </span>

                        <span
                            className="
        ml-4
        text-[95px]
        font-light
        "
                        >
                            assistance
                        </span>

                    </h2>

                    <img
                        src="/getintouch4.png"
                        alt=""
                        className="
      absolute
      right-0
      top-[120px]
      w-[650px]
      h-[380px]
      object-cover
      rounded-md
      "
                    />

                </div>

            </section>

        </div>
    );
};

export default GetInTouch;