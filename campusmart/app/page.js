import Link from "next/link";
import { BookOpen, Laptop, Armchair, Pencil, ArrowRight } from "lucide-react";

const categories = [{ name: "books", icon: BookOpen },
  { name: "electronics", icon: Laptop },
  { name: "furniture", icon: Armchair },
  { name: "Stationary", icon: Pencil },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-5">
      <section className="grid items-center gap-10 py-20 md:grid-cols-2 md:py-28" >
        <div>
        <span className="rounded-full bg-green-100  px-4 py-2 text-sm font-medium text-green-800 " >
          Your student marketplace
        </span>
        <h1 className="mt-5 " >
          Buy smarter Sell easier.{" "}
        <span className="text-green-800" >
          save more
        </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white">
          Discover affordable second-hand books, electronics,
          furniture and more from your student community.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">

          <Link href="/marketplace" className="inline-flex w-fit items-center gap-2 rounded-lg bg-green-800 px-6 py-3 font-medium text-white hover:bg-green-900">
            Explore Marketplace
            <ArrowRight size={18} />
          </Link>

          <Link href="/sell" className="inline-flex w-fit rounded-lg border border-gray-300 px-6 py-3 font-medium text-black hover:bg-green-500">
            Sell an Item
          </Link>
        </div>
        </div>
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <img src="https://cdn.autonomous.ai/static/upload/images/new_post/10-common-college-school-supplies-4907-1685856878885.webp" alt="College school supplies" className="h-full max-h-[440px] w-full rounded-3xl object-contain"/>
        </div>
      </section>

      <section className="pb-20">
        <h2 className="text-2xl font-bold text-green-900" >
          Browse categories
        </h2>
        <p>
          Find what you need from diffrent categories    
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4" >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link href="/marketplace" key={category.name} className="flex items-center gap-4 rounded-xl border bg-white p-6 transition hover:border-green-700 hover:shadow-sm">
                <div className="rounded-lg bg-green-30 p-4 " >
                  <Icon className="text-green-800" size={24} />
                </div>
                <span className="font-semibold text-shadow-gray-600 text-black" >
                  {category.name}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

    </div>
  )



}