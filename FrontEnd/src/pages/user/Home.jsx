import Hero from "../../components/common/Hero";
import LayoutCommon from "../../components/common/LayoutCommon";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GiGlobe, GiRibbonMedal } from "react-icons/gi";
import { MdOutlineDiscount } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TestimonialSection from "@/components/TestimonialSection";

function Home() {
  const iconClass = "text-8xl mb-4"; // uniform icon size

  const cardCarouselItems = [
    {
      title: "Bali, Indonesia",
      description: "Experience the serene beaches and vibrant culture of Bali.",
      imageUrl:
        "https://travelwp.physcode.com/main-demo/wp-content/uploads/sites/7/2023/07/bali-1.png",
    },
    {
      title: "Bangkok, Thailand",
      description:
        "Discover the bustling city life and rich history of Bangkok.",
      imageUrl:
        "https://travelwp.physcode.com/main-demo/wp-content/uploads/sites/7/2023/07/bangkok.png",
    },
    {
      title: "Cancum, Mexico",
      description:
        "Relax on the stunning beaches and explore ancient ruins in Cancun.",
      imageUrl:
        "https://travelwp.physcode.com/main-demo/wp-content/uploads/sites/7/2023/07/cancun.png",
    },
    {
      title: "Nih-Tarang, Nepal",
      description:
        "Embark on a spiritual journey in the tranquil town of Nih-Tarang.",
      imageUrl:
        "https://travelwp.physcode.com/main-demo/wp-content/uploads/sites/7/2023/07/nah-trang.png",
    },
  ];

  return (
    <LayoutCommon>
      <Hero />

      <div className="container mx-auto my-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center">
              <div className="flex justify-center">
                <GiGlobe className={iconClass} />
              </div>
              <CardTitle>Discover the possibilities</CardTitle>
              <CardDescription>
                With nearly half a million attractions, hotels & more, you're
                sure to find joy
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 2 */}
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center">
              <div className="flex justify-center">
                <MdOutlineDiscount className={iconClass} />
              </div>
              <CardTitle>Enjoy deals & delights</CardTitle>
              <CardDescription>
                Quality activities. Great prices. Plus, earn credits to save
                more.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 3 */}
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center">
              <div className="flex justify-center">
                <TbBeach className={iconClass} />
              </div>
              <CardTitle>Exploring made easy</CardTitle>
              <CardDescription>
                Book last minute, skip lines & get free cancellation for easier
                exploring.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 4 */}
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center">
              <div className="flex justify-center">
                <GiRibbonMedal className={iconClass} />
              </div>
              <CardTitle>Travel you can trust</CardTitle>
              <CardDescription>
                Read reviews & get reliable customer support. We're with you at
                every step
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="mt-16 px-4">
        <h2 className="text-2xl font-bold mb-6">Top Destinations</h2>
        <Carousel
          opts={{ align: "start" }}
          className="w-full overflow-x-hidden relative"
        >
          <CarouselContent className="flex gap-6">
            {cardCarouselItems.map((item, index) => (
              <CarouselItem
                key={index}
                className="flex-none w-44 md:w-60 lg:w-76"
              >
                <Card className="rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl p-0">
                  <div className="relative w-full h-64 md:h-72 lg:h-80">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg md:text-xl">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            ‹
          </CarouselPrevious>
          <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            ›
          </CarouselNext>
        </Carousel>
      </div>

      {/* subscription card */}
      <div className="mt-16 px-4 mb-20">
        <div className="relative w-full">
          <img
            src="https://travelwp.physcode.com/main-demo/wp-content/uploads/sites/7/2023/07/subrice.png"
            alt=""
            className="w-full h-auto object-cover rounded-xl"
          />

          {/* Overlay subscription card */}
          <div className="absolute inset-x-1/2 -translate-x-3/4 -translate-y-1/2 top-1/2 bg-black rounded-2xl p-6 sm:p-8 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/2 shadow-xl">
            <div className="text-white">
              <h2 className="text-3xl font-bold">Subscribe & Get 20% off</h2>
              <p className="mt-4 text-sm md:text-base">
                Join our newsletter and discover new destinations to inspire the
                traveler within. Plus, get 20% off at our online shop. Every
                week you’ll receive expert advice, tips, exclusive offers, and
                much more.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-auto sm:flex-1 bg-white text-black"
                />
                <Button className="mt-2 sm:mt-0" variant="secondary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="mt-16 px-4">
        <TestimonialSection />
      </div>
    </LayoutCommon>
  );
}

export default Home;
