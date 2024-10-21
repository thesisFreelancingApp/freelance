// "use client";
// import { Mail, Phone, MapPin, Calendar, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { getUsers } from "@/server.actions/seller-dashboard.actions";
// import { useState, useEffect } from "react";
// import { Role, Level, Plan, Jobs } from "@prisma/client";

// interface Service {
//   images: any;
//   image: string;
//   name: string;
//   description: string;
//   rating: number;
//   review: string;
// }

// interface Profile {
//   freelancerRatings: any;
//   id: string;
//   firstName?: string;
//   lastName?: string;
//   profilePic?: string;
//   role?: Role;
//   level?: Level;
//   plan?: Plan;
//   skills?: string;
//   languages?: string;
//   education?: string;
//   certifications?: string;
//   jobs?: Jobs;
//   phoneNumber?: string;
//   address?: string;
//   bio?: string;
//   birthDate?: Date;
//   username: string;
//   userEmail: string;
//   createdAt: Date;
//   updatedAt: Date;
//   isSeller?: boolean;
//   isBuyer?: boolean;
//   sellerRating?: number;
//   totalEarnings?: number;
//   totalSpent?: number;
//   createdServices: Service[];
// }

// export default function FreelancerProfile() {
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const profileData = await getUsers();
//         setProfile(profileData[1]); // Assuming getUsers returns an array, we're taking the second user
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!profile) {
//     return <div>No profile found.</div>;
//   }

//   const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim();
//   const skillsArray = profile.skills ? profile.skills.split(",").map(skill => skill.trim()) : [];
//   const languagesArray = profile.languages ? profile.languages.split(",").map(lang => lang.trim()) : [];
//   console.log(profile);
  
//   return (
//     <div className="container mx-auto p-4 space-y-6">
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//             <Avatar className="w-32 h-32">
//               <AvatarImage src={profile.profilePic || "/placeholder.svg"} alt={fullName} />
//               <AvatarFallback>{fullName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
//             </Avatar>
//             <div className="space-y-4 text-center md:text-left">
//               <h1 className="text-3xl font-bold">{fullName}</h1>
//               <div className="flex flex-col md:flex-row gap-4 text-muted-foreground">
//                 <div className="flex items-center gap-2">
//                   <Mail className="w-4 h-4" />
//                   <span>{profile.userEmail}</span>
//                 </div>
//                 {profile.phoneNumber && (
//                   <div className="flex items-center gap-2">
//                     <Phone className="w-4 h-4" />
//                     <span>{profile.phoneNumber}</span>
//                   </div>
//                 )}
//                 {profile.address && (
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4" />
//                     <span>{profile.address}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Professional Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="mb-4">{profile.bio || "No bio available."}</p>
//           <div className="space-y-4">
//             <div>
//               <h3 className="font-semibold mb-2">Skills</h3>
//               <div className="flex flex-wrap gap-2">
//                 {skillsArray.map((skill, index) => (
//                   <Badge key={index} variant="secondary">
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-2">Languages</h3>
//               <div className="flex flex-wrap gap-2">
//                 {languagesArray.map((language, index) => (
//                   <Badge key={index} variant="outline">
//                     {language}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Services Offered</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {profile.createdServices.map((service, index) => (
//               <Card key={index} className="overflow-hidden">
//                 <div
//                   style={{
//                     backgroundImage: `url(${service.images[0]})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     height: "200px",
//                   }}
//                 />
//                 <CardHeader>
//                   <CardTitle>{service.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-muted-foreground">{service.description}</p>
//                 </CardContent>
//                 <CardFooter className="flex flex-col items-start gap-2">
//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-4 h-4 ${
//                           i < Math.floor(profile.freelancerRatings
//                             .rating)
//                             ? "text-yellow-400 fill-yellow-400"
//                             : i < profile.freelancerRatings
//                             .rating
//                             ? "text-yellow-400 half-filled"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <p className="text-sm italic">{service.review}</p>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Communication and Booking</CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col sm:flex-row gap-4">
//           <Button className="flex-1">
//             <Mail className="mr-2 h-4 w-4" /> Contact Me
//           </Button>
//           <Button variant="outline" className="flex-1">
//             <Calendar className="mr-2 h-4 w-4" /> Book Consultation
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }









import Image from "next/image"
import { Mail, Phone, MapPin, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Dummy data
const freelancerData = {
  name: "Jane Doe",
  profilePicture: "https://www.freelancinggig.com/blog/wp-content/uploads/2021/01/freelancer-profile-tips-1008x641.jpg",
  email: "jane.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, USA",
  bio: "Experienced web developer with a passion for creating beautiful and functional websites. Specializing in React and Node.js.",
  skills: ["React", "Node.js", "TypeScript", "UI/UX Design", "RESTful APIs"],
  languages: ["English", "Spanish", "French"],
  services: [
    {
      title: "Web Development",
      description: "Custom website development using modern technologies and best practices.",
      image: "https://straitwebsolutions.com/wp-content/uploads/2022/09/Web-Development-Services.jpg",
      review: "Jane delivered an outstanding website that exceeded our expectations!",
      rating: 5,
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive and visually appealing user interfaces for web and mobile applications.",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/239209748/original/3655b57f9ed1a5e858c138d21ffc5084bce700b2.jpg",
      review: "The UI design was sleek and user-friendly. Great work!",
      rating: 4.5,
    },
    {
      title: "API Development",
      description: "Designing and implementing robust RESTful APIs for your applications.",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/138445590/original/11d6fa0d5e8fb3ec2b514edbba067c02a2466231.jpeg",
      review: "Jane's API was well-structured and thoroughly documented.",
      rating: 4.8,
    },
  ],
}

export default function FreelancerProfile() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={freelancerData.profilePicture} alt={freelancerData.name} />
              <AvatarFallback>{freelancerData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-3xl font-bold">{freelancerData.name}</h1>
              <div className="flex flex-col md:flex-row gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{freelancerData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{freelancerData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{freelancerData.location}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{freelancerData.bio}</p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {freelancerData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {freelancerData.languages.map((language, index) => (
                  <Badge key={index} variant="outline">{language}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services Offered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {freelancerData.services.map((service, index) => (
              <Card key={index} className="overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(service.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : i < service.rating
                            ? "text-yellow-400 fill-yellow-400 half-filled"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm font-medium">{service.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-sm italic">&quot;{service.review}&quot;</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Communication and Booking</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1">
            <Mail className="mr-2 h-4 w-4" /> Contact Me
          </Button>
          <Button variant="outline" className="flex-1">
            <Calendar className="mr-2 h-4 w-4" /> Book Consultation
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}