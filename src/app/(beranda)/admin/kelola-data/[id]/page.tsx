import DataMasterFormEdit from "@/components/dataMaster/dataMasterFormEdit";
import React from "react";

const page = () => {
  return (
    <div className="px-10 py-4 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">📊 Edit Data Master</h1>
        <p className="text-muted-foreground">
          Perbarui Data Master Desa Sesuai Kebutuhan.
        </p>
      </div>
      <DataMasterFormEdit />
    </div>
  );
};

export default page;
