export function generateBreadcrumbSegments(pathname: string) {
  const hiddenSegments = ["admin", "perangkat", "lurah"];

  const isId = (segment: string) => {
    return (
      /^[a-z0-9]{25,}$/i.test(segment) || // CUID-like
      /^[0-9a-fA-F-]{20,}$/i.test(segment) || // UUID-like
      /^[0-9]+$/.test(segment) // numeric id
    );
  };

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => !hiddenSegments.includes(segment.toLowerCase()));

  return segments.map((segment, index, arr) => {
    const isLast = index === arr.length - 1;

    if (isLast && isId(segment)) {
      // Jika sebelum ID adalah "Rekomendasi" → "Detail Rekomendasi"
      const prevSegment = arr[index - 1]?.toLowerCase().replace(/-/g, " ");
      if (prevSegment === "rekomendasi") {
        return "Detail Rekomendasi";
      }
      return "Edit";
    }

    // Format biasa: replace '-' dan capitalize
    return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  });
}
