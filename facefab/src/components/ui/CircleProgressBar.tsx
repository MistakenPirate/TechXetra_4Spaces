export default function CircleProgressBar({percentage, circleWidth}:{percentage: number, circleWidth: number})  {
    const radius= 85
    const dashArray =  radius* Math.PI * 2
    const dashOffset = dashArray - (dashArray * percentage) / 100
    return (
    <svg width={circleWidth} height={circleWidth} viewBox="0 0 ${circleWidth} ${circleWidth}">
        <circle cx={circleWidth/2} cy={circleWidth/2} strokeWidth="15px" r={radius} className="fill-none stroke-[#CBBABA]"/>
        <circle cx={circleWidth/2} cy={circleWidth/2} strokeWidth="15px" r={radius} className="fill-none stroke-[#58C36A] " style={{strokeDasharray:dashArray,strokeDashoffset:dashOffset}} transform="rotate(-90 ${circleWidth/2} ${circleWidth/2})"/>
    </svg>
    );
}