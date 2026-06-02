
export default function Marquee({ children, duration = "15s" }: { children: React.ReactNode; duration?: string }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="inline-block animate-(--animate-marquee)"
        style={{ animationDuration: duration }}
      >
        {children}
      </div>
    </div>
  );
}
