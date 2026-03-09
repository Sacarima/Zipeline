"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import Image from "next/image";

type ContainerScrollProps = {
  titleComponent: React.ReactNode;
};

type HeaderProps = {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
};

type CardProps = {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
};

export const ContainerScroll = ({ titleComponent }: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      aria-label="Scrolling feature showcase"
      className="relative flex h-320 items-center justify-center p-20"
    >
      <div
        className="relative w-full py-40"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} />
      </div>
    </section>
  );
};

export const Header = ({ translate, titleComponent }: HeaderProps) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, scale }: CardProps) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="mx-auto -mt-12 h-120 w-full max-w-5xl rounded-[30px] bg-[#222222] p-6 shadow-2xl md:h-160"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 p-4 transition-all">
        <Image
          src="/temp-banner.png"
          fill
          alt="Product banner preview"
          className="rounded-2xl border-8 object-cover"
        />
      </div>
    </motion.div>
  );
};
