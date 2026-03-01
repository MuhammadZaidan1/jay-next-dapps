export default function Skeleton({ className }) {
  return (
    <div 
      className={`animate-pulse bg-gray-300 border-2 border-black/10 ${className}`}
    />
  );
}