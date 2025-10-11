// "use client";
import { openApiDocument } from "@/lib/openApi";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function SwaggerClient() {
  return (
    <div style={{ padding: "20px" }}>
      <SwaggerUI spec={openApiDocument} />
    </div>
  );
}
