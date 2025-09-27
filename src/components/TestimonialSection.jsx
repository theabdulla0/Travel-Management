import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "John Doe",
    role: "Traveler",
    message:
      "Amazing experience! The destinations and activities were perfectly curated. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Smith",
    role: "Adventurer",
    message:
      "The booking process was seamless and the trips exceeded my expectations. Fantastic service!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Johnson",
    role: "Explorer",
    message:
      "I loved every moment of my trip. The platform made planning so much easier.",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: " Johnson",
    role: "Explorer",
    message:
      "I loved every moment of my trip. The platform made planning so much easier.",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="my-16 px-4 bg-gray-50 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        What Our Travelers Say
      </h2>

      <Carousel
        opts={{ align: "start" }}
        className="relative w-full overflow-x-hidden"
      >
        <CarouselContent className="flex gap-6 pb-4">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="flex-none w-72 md:w-80 lg:w-96"
            >
              <Card className="rounded-xl shadow-lg transform transition duration-300 hover:scale-105 h-full flex flex-col">
                <CardContent className="flex flex-col items-center text-center gap-4 flex-1 p-6">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <p className="text-gray-700 italic">{`"${testimonial.message}"`}</p>
                </CardContent>
                <CardFooter className="text-center mt-2">
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <span className="text-sm text-gray-500">
                    {testimonial.role}
                  </span>
                </CardFooter>
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
    </section>
  );
};

export default TestimonialSection;
