export default function CircleProgressBar({ percentage, circleWidth }: { percentage: number, circleWidth: number }) {
    const radius = 85;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percentage) / 100;
    
    let color;
    if (percentage < 65) {
      color = "#E12E31"; // red
    } else if (percentage >= 65 && percentage < 75) {
      color = "#F3C34B"; // yellow
    } else {
      color = "#58C36A"; // green
    }
  
    return (
      <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          r={radius}
          strokeWidth="15px"
          className="fill-none stroke-[#CBBABA]" // background circle
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          r={radius}
          strokeWidth="15px"
          className="fill-none"
          style={{
            stroke: color,
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`} // rotate to start from top
        />
        <text
          x="50%"
          y="50%"
          dy="0.4rem"
          textAnchor="middle"
          className="text-3xl montserrat"
        >
          {percentage}%
        </text>
      </svg>
    );
  }
  