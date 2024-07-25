import Link from 'next/link';

const homePageCards = [{
  name: 'Users Page',
  description: "This is a page where all the users are listed in cards",
  href: "/users"
},
{
  name: "Users Table Page",
  description: "This is a page where all the users are listed in table",
  href: "/users-table"
}, {

  name: "Posts Page",
  description: "This is a page where all the posts are listed in table",
  href: "/posts"
}, {
  name: "Form Validation Page",
  description: "This is a page We have performed form validation using react hook form and zod",
  href: "/form-validation"
}
]
export default function Home() {
  return <div className=" font-bold underline grid grid-cols-3 mt-8">
    {
      homePageCards.map((card) => {
        return <Link
          href={card.href}
          className="mt-4 no-underline block max-w-sm rounded-lg bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 h-36 mx-2 text-black"
        >
          <h1 className='text-center '>{card.name}</h1>
          <p className='font-normal italic mt-3'>{card.description}</p>
        </Link>
      })
    }
  </div>;
}
