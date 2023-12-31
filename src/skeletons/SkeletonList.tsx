export function SkeletonList() {
  return (
    <div className="flex flex-col gap-4">
      <div id="skeleton-box" style={{ width: "220px", height: "10vh", borderRadius: "8px", marginBottom: "40px" }} />
      <div id="skeleton-box" style={{ height: "20vh", borderRadius: "8px", marginBottom: "20px" }} />
      <div id="skeleton-box" style={{ height: "50vh", borderRadius: "8px", marginBottom: "2px" }} />
    </div>
  )
}