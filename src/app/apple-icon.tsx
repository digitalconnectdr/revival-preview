import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#0b0d10",
        border: "8px solid #c8a45c",
        color: "#c8a45c",
        display: "flex",
        fontFamily: "Georgia, serif",
        fontSize: 132,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-0.08em",
        lineHeight: 1,
        paddingBottom: 7,
        width: "100%",
      }}
    >
      R
    </div>,
    size,
  );
}
