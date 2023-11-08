export function SkeletonFormCategory() {
  return (
    <div className="flex flex-col gap-4">
      <div id="skeleton-box" style={{ width: "220px", height: "10vh", borderRadius: "8px", marginBottom: "40px" }} />
      <div id="skeleton-box" style={{ height: "20vh", borderRadius: "8px", marginBottom: "20px" }} />
      <div className="flex gap-4">
        <div id="skeleton-box" style={{ width: "200px", height: "8vh", borderRadius: "8px", marginBottom: "20px" }} />
        <div id="skeleton-box" style={{ width: "200px", height: "8vh", borderRadius: "8px", marginBottom: "20px" }} />
      </div>
    </div>
  )
}