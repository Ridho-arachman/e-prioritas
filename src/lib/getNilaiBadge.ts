export const getNilaiBadge = (nilai: string | number) => {
  const val = Number(nilai);
  switch (val) {
    case 1:
      return { label: "Tidak Penting", variant: "outline" as const };
    case 2:
      return { label: "Kurang Penting", variant: "secondary" as const };
    case 3:
      return { label: "Cukup Penting", variant: "default" as const };
    case 4:
      return { label: "Penting", variant: "default" as const };
    case 5:
      return { label: "Sangat Penting", variant: "destructive" as const };
    default:
      return { label: "-", variant: "outline" as const };
  }
};
