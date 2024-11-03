// import { Card } from "@/components/ui/card";
// import {
//   Area,
//   AreaChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const data = [
//   { name: "Jan", users: 400, orders: 240 },
//   { name: "Feb", users: 300, orders: 139 },
//   { name: "Mar", users: 200, orders: 980 },
//   { name: "Apr", users: 278, orders: 390 },
//   { name: "May", users: 189, orders: 480 },
//   { name: "Jun", users: 239, orders: 380 },
//   { name: "Jul", users: 349, orders: 430 },
// ];

// const AnalyticsChart = () => {
//   return (
//     <Card className="p-6">
//       <h3 className="text-lg font-semibold mb-4">Platform Analytics</h3>
//       <div className="h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart
//             data={data}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//           >
//             <defs>
//               <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1} />
//                 <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
//               </linearGradient>
//               <linearGradient id="orders" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
//                 <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <XAxis
//               dataKey="name"
//               stroke="#888888"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//             />
//             <YAxis
//               stroke="#888888"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//               tickFormatter={(value) => `${value}`}
//             />
//             <Tooltip />
//             <Area
//               type="monotone"
//               dataKey="users"
//               stroke="#6366F1"
//               fillOpacity={1}
//               fill="url(#users)"
//             />
//             <Area
//               type="monotone"
//               dataKey="orders"
//               stroke="#10B981"
//               fillOpacity={1}
//               fill="url(#orders)"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//   );
// };

// export default AnalyticsChart;