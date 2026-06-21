"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Order {
  id: string;
  userId: string;
  user?: {
    name: string;
    email: string;
  };
  items: {
    menuItem: {
      name: string;
    };
    quantity: number;
  }[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

const colors = {
  bg: "#F8F6F1",
  card: "#FFFFFF",
  accent: "#7B9E74",
  accentDark: "#4A6741",
  text: "#1E1E1E",
  muted: "#8A8A80",
  border: "#E8E4DC",
};


const statusStyles: Record<string, any> = {
  pending: {
    bg: "#FFF3CD",
    text: "#B7791F",
    label: "Pending",
  },
  confirmed: {
    bg: "#DBEAFE",
    text: "#2563EB",
    label: "Confirmed",
  },
  preparing: {
    bg: "#FDE2E2",
    text: "#DC2626",
    label: "Preparing",
  },
  out_for_delivery: {
    bg: "#DCFCE7",
    text: "#16A34A",
    label: "Out Delivery",
  },
  delivered: {
    bg: "#D1FAE5",
    text: "#047857",
    label: "Delivered",
  },
};


export default function AdminPage() {

  const [orders,setOrders] = useState<Order[]>([]);
  const [loading,setLoading] = useState(true);


  useEffect(()=>{
    fetchOrders();
  },[]);


  const fetchOrders = async()=>{

    try{

      const res = await fetch("/api/admin/orders");
      const data = await res.json();

      if(data.success){
        setOrders(data.data);
      }

    }catch(err){
      console.log(err);
    }
    finally{
      setLoading(false);
    }

  };


  const updateStatus = async(
    id:string,
    status:string
  )=>{

    try{

      const res = await fetch(
        `/api/admin/orders/${id}`,
        {
          method:"PATCH",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            status
          })
        }
      );


      if(res.ok){

        setOrders(prev =>
          prev.map(order =>
            order.id===id
            ? {...order,status}
            : order
          )
        );

      }


    }catch(err){
      console.log(err);
    }

  };


  const pending =
    orders.filter(
      o=>o.status==="pending"
    ).length;


  const delivered =
    orders.filter(
      o=>o.status==="delivered"
    ).length;


  const revenue =
    orders.reduce(
      (sum,o)=>sum+o.totalPrice,
      0
    );



return (

<div
style={{
background:colors.bg,
minHeight:"100vh",
paddingTop:"120px",
paddingBottom:"80px"
}}
>


<div
style={{
maxWidth:"1200px",
margin:"auto",
padding:"0 24px"
}}
>


{/* HEADER */}

<motion.div
initial={{
opacity:0,
y:30
}}
animate={{
opacity:1,
y:0
}}
>

<h1
style={{
fontFamily:"serif",
fontSize:"52px",
fontWeight:700,
color:colors.text,
marginBottom:"8px"
}}
>
Good Evening, Admin ☕
</h1>


<p
style={{
color:colors.muted,
fontSize:"17px"
}}
>
Manage your cafe orders and customer activity
</p>


</motion.div>



{/* STATS */}


<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px",
marginTop:"45px"
}}
>


{
[
["Total Orders",orders.length],
["Pending Orders",pending],
["Completed",delivered],
["Revenue",`Rs. ${revenue}`]
].map((item,i)=>(

<motion.div
key={i}
initial={{
opacity:0,
y:20
}}
animate={{
opacity:1,
y:0
}}
transition={{
delay:i*0.1
}}

style={{
background:colors.card,
borderRadius:"20px",
padding:"25px",
border:`1px solid ${colors.border}`,
boxShadow:
"0 10px 30px rgba(0,0,0,0.05)"
}}
>


<p
style={{
color:colors.muted,
fontSize:"14px",
marginBottom:"12px"
}}
>
{item[0]}
</p>


<h2
style={{
fontSize:"32px",
fontWeight:700,
color:colors.text
}}
>
{item[1]}
</h2>


</motion.div>

))
}


</div>





{/* ACTIONS */}


<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px",
marginTop:"35px"
}}
>


<Link href="/admin/orders">

<div
style={{
background:colors.accent,
padding:"25px",
borderRadius:"20px",
color:"white",
cursor:"pointer",
fontWeight:700,
fontSize:"18px",
boxShadow:
"0 10px 25px rgba(123,158,116,.3)",
transition:"background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease"
}}
onMouseEnter={(e) => {
e.currentTarget.style.background = colors.accentDark;
e.currentTarget.style.transform = "translateY(-4px)";
e.currentTarget.style.boxShadow = "0 15px 35px rgba(123,158,116,.4)";
}}
onMouseLeave={(e) => {
e.currentTarget.style.background = colors.accent;
e.currentTarget.style.transform = "translateY(0)";
e.currentTarget.style.boxShadow = "0 10px 25px rgba(123,158,116,.3)";
}}
>
📦 Manage Orders
</div>

</Link>



<Link href="/admin/contact">

<div
style={{
background:colors.accentDark,
padding:"25px",
borderRadius:"20px",
color:"white",
cursor:"pointer",
fontWeight:700,
fontSize:"18px",
transition:"background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
boxShadow: "0 10px 25px rgba(74,103,65,.3)"
}}
onMouseEnter={(e) => {
e.currentTarget.style.background = "#2A4620";
e.currentTarget.style.transform = "translateY(-4px)";
e.currentTarget.style.boxShadow = "0 15px 35px rgba(74,103,65,.4)";
}}
onMouseLeave={(e) => {
e.currentTarget.style.background = colors.accentDark;
e.currentTarget.style.transform = "translateY(0)";
e.currentTarget.style.boxShadow = "0 10px 25px rgba(74,103,65,.3)";
}}
>
💬 Customer Messages
</div>

</Link>


</div>

{/* RECENT ORDERS */}

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
delay:0.3
}}

style={{
marginTop:"50px"
}}
>


<h2
style={{
fontFamily:"serif",
fontSize:"32px",
fontWeight:700,
color:colors.text,
marginBottom:"25px"
}}
>
Recent Orders
</h2>



{
loading ? (

<p style={{
color:colors.muted
}}>
Loading orders...
</p>


)

:

orders.length===0 ? (

<p
style={{
color:colors.muted
}}
>
No orders yet
</p>

)


:

(


<div
style={{
background:colors.card,
borderRadius:"24px",
border:`1px solid ${colors.border}`,
overflow:"hidden",
boxShadow:
"0 15px 35px rgba(0,0,0,0.05)"
}}
>


<div
style={{
overflowX:"auto"
}}
>


<table
style={{
width:"100%",
borderCollapse:"collapse"
}}
>


<thead>

<tr
style={{
background:colors.accentDark
}}
>

{
[
"Order",
"Customer",
"Items",
"Amount",
"Status",
"Date"
].map((head)=>(

<th
key={head}
style={{
padding:"18px",
textAlign:"left",
color:"white",
fontSize:"14px",
letterSpacing:"0.5px"
}}
>
{head}
</th>


))

}

</tr>

</thead>



<tbody>


{
orders
.slice(0,8)
.map((order,index)=>(


<motion.tr

key={order.id}

initial={{
opacity:0,
x:-20
}}

animate={{
opacity:1,
x:0
}}

transition={{
delay:index*0.05
}}

style={{
borderBottom:
`1px solid ${colors.border}`
}}

>



<td
style={{
padding:"18px",
fontFamily:"monospace",
fontSize:"13px",
color:colors.muted
}}
>
#{order.id.slice(0,8)}
</td>




<td
style={{
padding:"18px"
}}
>

<div
style={{
fontWeight:700,
color:colors.text
}}
>
{
order.user?.name || "Guest"
}
</div>


<div
style={{
fontSize:"13px",
color:colors.muted
}}
>
{
order.user?.email
}
</div>


</td>





<td
style={{
padding:"18px",
color:colors.textMid,
fontSize:"14px"
}}
>


{
order.items?.map(
(item,i)=>(

<div key={i}>
{item.menuItem.name}
 × {item.quantity}
</div>

)

)
}


</td>





<td
style={{
padding:"18px",
fontWeight:700,
color:colors.text
}}
>

Rs. {order.totalPrice}

</td>





<td
style={{
padding:"18px"
}}
>


<select

value={order.status}

onChange={(e)=>
updateStatus(
order.id,
e.target.value
)
}


style={{
background:
statusStyles[order.status]?.bg
|| "#eee",

color:
statusStyles[order.status]?.text
|| colors.text,


border:"none",

padding:"8px 14px",

borderRadius:"30px",

fontWeight:700,

fontSize:"12px",

cursor:"pointer",

outline:"none"

}}

>


<option value="pending">
Pending
</option>

<option value="confirmed">
Confirmed
</option>


<option value="preparing">
Preparing
</option>


<option value="out_for_delivery">
Out for Delivery
</option>


<option value="delivered">
Delivered
</option>


</select>


</td>






<td

style={{
padding:"18px",
fontSize:"14px",
color:colors.muted
}}

>

{
new Date(
order.createdAt
)
.toLocaleDateString()
}

</td>





</motion.tr>


))

}



</tbody>


</table>


</div>





{
orders.length>8 &&

<Link href="/admin/orders">

<div

style={{
padding:"18px",
textAlign:"center",
background:colors.bg,
color:colors.accentDark,
fontWeight:700,
cursor:"pointer"
}}

>
View All Orders →
</div>


</Link>

}



</div>


)


}



</motion.div>



</div>

</div>


);

}