import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt =
  "Delta V — Accelerating adoption of decentralized technologies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(80% 80% at 80% 40%, #1f3551 0%, #0d1722 60%, #07101a 100%)",
          color: "#f3f5f9",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#a8b4c5",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 28,
              height: 28,
              borderRadius: 999,
              background: "#85c8ff",
              boxShadow: "0 0 40px #5fb0ff",
            }}
          />
          <div style={{ display: "flex" }}>DELTA V</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            lineHeight: 0.95,
            fontWeight: 300,
            letterSpacing: -1,
          }}
        >
          <div style={{ display: "flex" }}>Accelerating</div>
          <div style={{ display: "flex", color: "#85c8ff", fontStyle: "italic" }}>
            adoption
          </div>
          <div style={{ display: "flex" }}>of decentralized</div>
          <div style={{ display: "flex" }}>
            <span>technologies</span>
            <span style={{ color: "#85c8ff" }}>.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "monospace",
            fontSize: 22,
            color: "#a8b4c5",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div>Tech · Growth · Security · Research</div>
          <div>deltav.cc</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
