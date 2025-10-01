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
  const iconClass =
    "text-6xl sm:text-7xl lg:text-8xl mb-3 sm:mb-4 text-yellow-400 transition-transform duration-300 hover:scale-110";

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
      title: "Cancun, Mexico",
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

      {/* Features Section */}
      <div className="container mx-auto my-12 sm:my-16 lg:my-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Card 1 */}
          <Card className="border-0 shadow-none hover:shadow-lg transition-all duration-300 rounded-xl p-2">
            <CardHeader className="text-center space-y-3">
              <div className="flex justify-center">
                <GiGlobe className={iconClass} />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold">
                Discover the possibilities
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                With nearly half a million attractions, hotels & more, you're
                sure to find joy
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 2 */}
          <Card className="border-0 shadow-none hover:shadow-lg transition-all duration-300 rounded-xl p-2">
            <CardHeader className="text-center space-y-3">
              <div className="flex justify-center">
                <MdOutlineDiscount className={iconClass} />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold">
                Enjoy deals & delights
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Quality activities. Great prices. Plus, earn credits to save
                more.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 3 */}
          <Card className="border-0 shadow-none hover:shadow-lg transition-all duration-300 rounded-xl p-2">
            <CardHeader className="text-center space-y-3">
              <div className="flex justify-center">
                <TbBeach className={iconClass} />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold">
                Exploring made easy
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Book last minute, skip lines & get free cancellation for easier
                exploring.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 4 */}
          <Card className="border-0 shadow-none hover:shadow-lg transition-all duration-300 rounded-xl p-2">
            <CardHeader className="text-center space-y-3">
              <div className="flex justify-center">
                <GiRibbonMedal className={iconClass} />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold">
                Travel you can trust
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Read reviews & get reliable customer support. We're with you at
                every step
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Top Destinations Section */}
      <div className="container mx-auto mt-16 sm:mt-20 lg:mt-24 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Top Destinations
          </h2>
          <p className="hidden sm:block text-sm text-gray-500">
            Explore amazing places
          </p>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-2 sm:-ml-4">
            {cardCarouselItems.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-2 sm:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="rounded-2xl overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 h-full">
                  <div className="relative w-full h-64 sm:h-72 lg:h-80 group">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                      <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-200 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-6" />
          <CarouselNext className="hidden sm:flex -right-4 lg:-right-6" />
        </Carousel>
      </div>

      {/* Subscription Section */}
      <div className="container mx-auto mt-16 sm:mt-20 lg:mt-24 mb-16 sm:mb-20 lg:mb-24 px-4 sm:px-6 lg:px-8">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl min-h-[400px] sm:min-h-[500px]">
          <img
            src="https://travelwp.physcode.com/main-demo/wp-content/uploads/sites/7/2023/07/subrice.png"
            alt="Subscribe banner"
            className="w-full h-full object-cover absolute inset-0"
          />

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Subscription card */}
          <div className="relative flex items-center justify-center min-h-[400px] sm:min-h-[500px] p-4 sm:p-6">
            <div className="bg-gradient-to-br from-black/90 to-black/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-2xl shadow-2xl border border-white/10">
              <div className="text-white space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Subscribe & Get{" "}
                  <span className="text-yellow-400">20% off</span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
                  Join our newsletter and discover new destinations to inspire
                  the traveler within. Plus, get 20% off at our online shop.
                  Every week you'll receive expert advice, tips, exclusive
                  offers, and much more.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 pt-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white/95 text-black border-0 h-11 sm:h-12 text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-yellow-400"
                  />
                  <Button className="h-11 sm:h-12 px-6 sm:px-8 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="container mx-auto mt-16 sm:mt-20 lg:mt-24 mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-8">
        <TestimonialSection />
      </div>
    </LayoutCommon>
  );
}

export default Home;
