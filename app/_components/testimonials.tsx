import Image, { type StaticImageData } from 'next/image';
import person1 from '@/public/images/person1.png';
import person2 from '@/public/images/person2.png';
import person3 from '@/public/images/person3.png';
import person4 from '@/public/images/person4.png';
import arrow_right_white from '@/public/svgs/arrow-right-white.svg';

const testimonials: {
  id: number;
  name: string;
  image: StaticImageData;
  designation: string;
  testament: string;
}[] = [
  {
    id: 1,
    name: 'Candice Wu',
    designation: 'Product Manager, Google',
    image: person1,
    testament:
      'Talgach transformed how I learn new skills. The platform is intuitive and the results speak for themselves.',
  },
  {
    id: 2,
    name: 'John Smith',
    designation: 'Communication Specialist',
    image: person2,
    testament:
      'Thanks to Talgach, I enhanced my communication skills and can now effectively convey ideas and collaborate with others.',
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    designation: 'Digital Marketing Lead',
    image: person3,
    testament:
      'Talgach helped me gain proficiency in digital tools and technologies. I now thrive in the modern workplace.',
  },
  {
    id: 4,
    name: 'Michael Chen',
    designation: 'Senior Project Manager',
    image: person4,
    testament:
      'With Talgach, I learned project management methodologies that helped me successfully deliver projects on time.',
  },
];

export function Testimonials() {
  return (
    <section className="flex flex-col items-center mt-30 text-center">
      <small className="text-sm font-medium text-talgach-green">Trust</small>

      <h2 className="text-3xl mt-2 font-medium">
        Our users speak for us
        <span className="text-talgach-green">.</span>
      </h2>

      <p className="mt-4 text-neutral-600 max-w-xl">
        Join thousands of satisfied users who have transformed their skills with
        Talgach. Hear what they have to say about their learning journey.
      </p>

      <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-14">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col gap-y-2 border border-neutral-200 hover:border-talgach-green hover:bg-green-50 transition duration-300 rounded p-3.5 hover:cursor-pointer"
          >
            <p className="text-start max-w-xs text-sm">
              {testimonial.testament}
            </p>

            <div className="flex gap-x-3 mt-5">
              <Image
                src={testimonial.image}
                alt={`${testimonial.name} image`}
                className="size-8"
              />

              <div className="text-start">
                <p className="text-sm font-medium leading-none">
                  {testimonial.name}
                </p>
                <p className="text-xs text-neutral-600">
                  {testimonial.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="flex items-center bg-talgach-green py-1.5 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-8 w-fit"
      >
        <span>See more</span>
        <Image
          src={arrow_right_white}
          alt="Arrow right icon"
          className="ml-2 size-2.5"
        />
      </button>
    </section>
  );
}
