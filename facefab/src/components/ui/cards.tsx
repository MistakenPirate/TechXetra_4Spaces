import CircleProgressBar from "./CircleProgressBar";

interface CardProps {
  subject: string;
  percentage: number;
  classes: number[];
}

export default function Cards({ subject, percentage, classes }: CardProps) {
  return (
    <div className="w-[25%] h-[53%] rounded-lg flex flex-col items-center gap-2 py-4 bg-gradient-to-r from-[#D4BFFF] to-[#A0CFFF] shadow-md shadow-white">
      <h1 className="font-bold text-2xl tracking-widest text-white leading-10 montserrat">
        {subject}
      </h1>
      <CircleProgressBar percentage={percentage} circleWidth={200} />
      <p className="space-y-2 text-white">
        You have attended {classes[0]} out of {classes[1]} class
        {classes[1] !== 1 ? "es" : ""}
      </p>
    </div>
  );
}
