import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github as GithubIcon, Linkedin as LinkedinIcon } from "lucide-react";

const teamMembers = [
  {
    name: "Melvin Lee",
    bio: "I love building things",
    image: "https://avatars.githubusercontent.com/u/126877680?v=4",
    github: "https://github.com/leechiahwa",
    linkedin: "https://www.linkedin.com/in/melvin-lee-681a63269/",
  },
  {
    name: "Krishan Sugumaran",
    bio: "Hi",
    github: "",
    linkedin: "",
  },
  {
    name: "Teoh Zhen Ying",
    bio: "Hi",
    github: "",
    linkedin: "",
  },
  {
    name: "Sim Jun Xin",
    bio: "Hi",
    github: "",
    linkedin: "",
  },
];

function About() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Welcome to Weather Wave
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          We are a team of 4 CS degree students from SEGi College Penang. <br />
          Weather Wave represents our vision to revolutionize how people
          interact with weather information. We combine cutting-edge technology
          with thoughtful design to deliver weather forecasts that are both
          powerful and beautifully simple.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <Card
            key={member.name}
            className="group hover:shadow-lg transition-shadow"
          >
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
              <div className="flex justify-center gap-2">
                <Button size="icon" variant="ghost" asChild>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" asChild>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default About;
