export function generateBreadcrumbSegments(pathname: string) {
  const hiddenSegments = ["admin", "perangkat", "lurah"];

  const isId = (segment: string) => {
    return (
      /^[a-z0-9]{25,}$/i.test(segment) || // CUID-like
      /^[0-9a-fA-F-]{20,}$/i.test(segment) || // UUID-like
      /^[0-9]+$/.test(segment) // numeric id
    );
  };

  // Dapatkan semua segmen
  const allSegments = pathname.split("/").filter(Boolean);

  // Jika hanya satu segmen dan itu adalah role (hiddenSegments)
  if (
    allSegments.length === 1 &&
    hiddenSegments.includes(allSegments[0].toLowerCase())
  ) {
    return ["Dashboard"];
  }

  // Filter segmen yang disembunyikan
  const segments = allSegments.filter(
    (segment) => !hiddenSegments.includes(segment.toLowerCase()),
  );

  // Jika setelah filter tidak ada segmen, cek apakah ada segmen role?
  if (segments.length === 0) {
    // Jika pathname mengandung role, maka Dashboard
    if (allSegments.some((seg) => hiddenSegments.includes(seg.toLowerCase()))) {
      return ["Dashboard"];
    }
    return [];
  }

  return segments.map((segment, index, arr) => {
    const isLast = index === arr.length - 1;

    if (isLast && isId(segment)) {
      const prevSegment = arr[index - 1]?.toLowerCase().replace(/-/g, " ");
      if (prevSegment === "rekomendasi") {
        return "Detail Rekomendasi";
      }
      return "Edit";
    }

    return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  });
}
