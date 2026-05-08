import { createFileRoute } from "@tanstack/react-router";
import { Route as YoetzRoute } from "./yoetz";

const YoetzComponent = YoetzRoute.options.component ?? (() => null);

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "התחל כאן — אבחון פיננסי AI | המפה הפיננסית" },
      { name: "description", content: "אבחון פיננסי חכם מבוסס AI ב-7 שאלות. קבלו ציון, תובנה אישית והמלצות פעולה תוך פחות מדקה." },
      { property: "og:title", content: "התחל כאן — אבחון פיננסי AI" },
      { property: "og:description", content: "ציון פיננסי, תובנה אישית והמלצות פעולה מותאמות לכם." },
    ],
  }),
  component: YoetzComponent,
});
