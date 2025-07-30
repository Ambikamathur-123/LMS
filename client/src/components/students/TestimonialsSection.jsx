import React from 'react';
import { dummyTestimonial, assets } from '../../assets/assets'; // Ensure both dummyTestimonial & assets are imported

const TestimonialsSection = () => {
  return (
    <div className='pb-10 px-8 md:px-0 mt-2'>
      <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
      <p className='md:text-base text-gray-500 mt-2'>
        Hear from our learners as they share their journeys of transformation, success, and how our <br />
        platform has made a difference in their lives.
      </p>

      <div className='grid grid-cols-auto gap-8 mt-14'>
        {dummyTestimonial.map((testimonial, index) => (
          <div key={index} className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] overflow-hidden shadow bg-white'>
            <div className='flex items-center gap-4 px-4 py-4 bg-gray-500/10'>
              <img  src={testimonial.image} alt={testimonial.name} className='w-12 h-12 rounded-full object-cover' />
              <div>
                <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
                <p className='text-sm text-gray-500'>{testimonial.role}</p>
              </div>
            </div>
             <div className='flex gap-0.5 pl-3'>
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                  alt="star"
                  className=' h-5 '
                />
              ))}
            </div>

            <p className='mt-4 px-4 text-gray-500 text-sm'>{testimonial.feedback}</p>
            <a href="#"className="text-blue-500 underline px-4" >Read More</a>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
