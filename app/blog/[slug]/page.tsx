"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";


const posts: Record<string, any> = {

  "perfect-espresso": {
    title: "The Art of the Perfect Espresso",
    date: "March 12, 2025",
    readTime: "4 min read",
    category: "Craft",
    image: "/blog/espress.jpg",

    intro:
      "An espresso is the foundation of almost every coffee drink — but mastering the perfect shot requires precision, patience, and passion.",

    content: [
      "A perfect espresso lives inside a very small window. Too fast and the coffee becomes sour. Too slow and it becomes bitter.",

      "At Brew & Co., we focus on three important variables: grind size, dose, and extraction time. Every shot is carefully calibrated to bring out sweetness and balance.",

      "The grind size controls how water moves through the coffee puck. A small adjustment can completely change the flavour profile.",

      "Temperature also plays an important role. The right extraction temperature helps preserve the natural sweetness and aroma of the beans.",

      "The result is a rich espresso with beautiful crema, balanced acidity, and a smooth finish."
    ],

    quote:
      "Great espresso is not just coffee. It is precision, patience, and passion."
  },


  "cold-brew-lahore": {

    title:"Why Cold Brew is Taking Over Lahore",
    date:"February 28, 2025",
    readTime:"5 min read",
    category:"Culture",
    image:"/blog/coldb.jpeg",

    intro:
    "Lahore summers are intense. Cold brew has become the perfect answer for coffee lovers who want something refreshing.",


    content:[

      "Unlike iced coffee, cold brew is made by slowly steeping coffee grounds in cold water for several hours.",

      "This slow extraction process creates naturally smooth coffee with lower acidity and sweeter notes.",

      "At Brew & Co., we prepare our cold brew with carefully selected beans and a long extraction process.",

      "The result is a refreshing drink that has become a favourite among our customers."

    ],

    quote:
    "Sometimes the best coffee experience comes cold."
  },



  "bean-sourcing": {

    title:"Our Bean Sourcing Journey",
    date:"January 15, 2025",
    readTime:"6 min read",
    category:"Sourcing",
    image:"/blog/beans.jpg",

    intro:
    "Every cup of coffee has a story that begins thousands of miles away.",


    content:[

      "We work with carefully selected coffee farms around the world to bring unique flavours into every cup.",

      "Our beans come from regions known for exceptional quality and unique characteristics.",

      "From farming to roasting, every step influences the final taste.",

      "We roast our beans carefully to preserve their natural flavours and aromas."

    ],

    quote:
    "Behind every great coffee is a journey worth discovering."
  }

};



export default function BlogPostPage(){


const params = useParams();

const slug = params?.slug as string;

const post = posts[slug];



if(!post){

return(

<main
style={{
minHeight:"70vh",
display:"flex",
alignItems:"center",
justifyContent:"center",
background:"#F8F6F1",
flexDirection:"column",
gap:"20px"
}}
>

<h1
style={{
fontFamily:"var(--font-dm-serif)" , marginTop:"32px", 
}}
>
Post Not Found
</h1>


<Link href="/blog">
Back To Blog
</Link>


</main>

)

}



return(

<main>


{/* HERO */}

<section
style={{
background:"#1E1E1E",
padding:"140px 24px 60px"
}}
>


<div
style={{
maxWidth:"850px",
margin:"auto",
textAlign:"center"
}}
>


<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.6
}}

>


<Link
href="/blog"
style={{
color:"#7B9E74",
fontSize:"14px",
fontWeight:700,
textDecoration:"none",
marginTop:"20px"
}}
>
← Back To Blog
</Link>



<div
style={{
display:"flex",
justifyContent:"center",
gap:"12px",
marginTop:"28px",
fontSize:"13px",
color:"#999"
}}
>

<span
style={{
color:"#7B9E74"
}}
>
{post.category}
</span>

<span>
•
</span>

<span>
{post.readTime}
</span>

<span>
•
</span>

<span>
{post.date}
</span>


</div>




<h1
style={{
fontFamily:"var(--font-dm-serif)",
fontSize:"clamp(38px,5vw,58px)",
lineHeight:1.15,
color:"#F8F6F1",
marginTop:"25px"
}}
>

{post.title}

</h1>


</motion.div>





{/* FEATURE IMAGE */}


<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.7,
delay:.2
}}

style={{
position:"relative",
height:"380px",
marginTop:"50px",
borderRadius:"18px",
overflow:"hidden"
}}

>


<Image

src={post.image}

alt={post.title}

fill

sizes="(max-width:900px) 100vw, 850px"

style={{
objectFit:"cover"
}}

/>


</motion.div>



</div>


</section>





{/* ARTICLE */}


<section
style={{
background:"#F8F6F1",
padding:"80px 24px 100px"
}}
>


<div
style={{
maxWidth:"720px",
margin:"auto"
}}
>



<p
style={{
fontSize:"21px",
lineHeight:1.8,
fontWeight:600,
color:"#333",
marginBottom:"45px"
}}
>

{post.intro}

</p>




{post.content.map((paragraph:string,index:number)=>(


<motion.p

key={index}

initial={{
opacity:0,
y:15
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:.5
}}

style={{
fontSize:"17px",
lineHeight:1.9,
color:"#555",
marginBottom:"30px"
}}

>

{paragraph}

</motion.p>


))}





{/* QUOTE */}


<div
style={{
background:"#EEF2EC",
padding:"35px",
borderRadius:"14px",
margin:"60px 0",
borderLeft:"4px solid #7B9E74"
}}
>


<p
style={{
fontFamily:"var(--font-dm-serif)",
fontSize:"28px",
lineHeight:1.5,
color:"#1E1E1E"
}}
>

"{post.quote}"

</p>


</div>





{/* FOOTER ACTION */}


<div
style={{
borderTop:"1px solid #ddd",
paddingTop:"40px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
flexWrap:"wrap",
gap:"20px"
}}
>


<Link

href="/blog"

style={{
color:"#3D5C38",
fontWeight:700,
textDecoration:"none"
}}

>

← All Posts

</Link>



<Link

href="/order"

style={{
background:"#3D5C38",
color:"#fff",
padding:"14px 28px",
borderRadius:"8px",
textDecoration:"none",
fontWeight:700
}}

>

Order Coffee ☕

</Link>


</div>




</div>


</section>


</main>

)

}